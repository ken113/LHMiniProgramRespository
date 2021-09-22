<template>
	<view class="select-person" :class="{'selectPersonShow':selectPersonShow}">
		<view class="top-buttom">
			<view class="btn-cancel" @tap="cancelPick">取消</view>
			<view class="text-num">已选{{ pickerList.length }}人</view>
			<view class="btn-ok" @tap="confirmPick">确定</view>
		</view>
		<view class="btn-box">
			<!-- <button class="btn-invite "><text class="iconfont">&#xe7dd;</text>邀请好友填写</button> -->
			<view class="btn-add" @tap="addTraveller"><text class="iconfont">&#xe7a7;</text>新增常用游客</view>
		</view>

		<view class="person-list">
			<view class="person-item" v-for="(person,index) in travellerList" :key="person.TravellerId">
				<view class="person-line">
					<checkbox class="checkbox" :disabled="person.disabled" value="cb" @tap="changeSelected(index)"
						:checked="person.checked" color="#007AFF" />
					<view class="person-right">
						<text @tap="changeSelected(index)" :class=" person.TravellerSex ? 'user-sex iconfont female':'user-sex iconfont male' ">&#xe735;</text>
						<text @tap="changeSelected(index)" class="user-name ">{{ person.TravellerName }}</text>
						<text @tap="changeSelected(index)" class="user-enname">{{ person.TravellerEnname }}</text>
						<text  class="user-extra iconfont" v-if="person.hasEract">&#xe8ac;</text>
						<text  class="user-edit iconfont" @tap="goToEditTraveller(index)">&#xe8cf;</text>
					</view>
				</view>
				<view class="person-error" v-if="person.errorText">{{ person.errorText }}</view>
			</view>
		</view>

		<view class="edit-traveller-content" :class="{'editTravellerShow':editTravellerShow}" >
			<editTraveller ref="editTraveller"  :myTraveller="traveller" :pageType="pageType"
				:initFormData="initFormData"  @closeEditPage="closeEditPage" @showMeansPage="showMeansPage" @showEditPage="showEditPage" @updateTraveller="updateTraveller"></editTraveller>
		</view>
		<view class="edit-traveller-content" :class="{'editTravellerShow':showMeans }">
			<editTravellerMeans  ref="editTravellerMeans" :myTraveller="traveller" :initFormData="initFormData" :pageType="pageType"
				@showMeansPage="showMeansPage"  @updateTraveller="updateTraveller" >
			</editTravellerMeans>
		</view>

	</view>
</template>

<script>
	import editTraveller from './editTraveller.vue'
	import editTravellerMeans from './editTravellerMeans.vue'

	export default {
		name: "selectPerson",
		components: {
			editTraveller,
			editTravellerMeans
		},
		props: {
			product: {
				type: Object,
				default: function() {
					return {};
				},
			},
			initFormData: {
				type: Object,
				default: function() {
					return {};
				},
			},
			travellers: {
				type: Array,
				default: function() {
					return [];
				},
			},
			initPickerList: {
				type: Array,
				default: function() {
					return [];
				},
			},
		},
		data() {
			return {
				selectPersonShow: false,
				travellerList: [],
				pickerList: [],
				initSelectIdList: [],
				editTravellerShow: false,
				showMeans: false,
				traveller: null,
				pageType: '4',
			};
		},
		created() {
			this.initPickerList.forEach(item => {
				let tid = item.TravellerID || item.personID;
				this.initSelectIdList.push( tid );
			});
		},
		mounted() {
			//this.getTravellerList(this.travellers);
			uni.removeStorageSync("meansInfo");
			this.getCustomer();
		},
		methods: {
			
			getCustomer() {
				this.$sendRequest({
					url: "/WxOpen/GetCustomer",
					method: "POST",
					data: {
						sessionId: uni.getStorageSync("mySessionKey"),
						customerID: 0,
					},
				}).then(res => {
					if (res.Code === 200) {
						const {
							Travellers
						} = res.data;
						this.getTravellerList(Travellers);
					}
				})
			},
			
			getTravellerList(dataList) {
				const travellerList = [];
				const pickerList = [];
				const ageMaxChecked = this.initFormData.ageMaxChecked,
					ageMinChecked = this.initFormData.ageMinChecked,
					ageMin = this.initFormData.ageMin == '' ? -1 : this.initFormData.ageMin*1,
					ageMax = this.initFormData.ageMax == '' ? -1 : this.initFormData.ageMax*1,
					heightMinChecked = this.initFormData.heightMinChecked,
					heightMaxChecked = this.initFormData.heightMaxChecked,
					heightMin = this.initFormData.heightMin == '' ? -1 : this.initFormData.heightMin*1,
					heightMax = this.initFormData.heightMax == '' ? -1 : this.initFormData.heightMax*1,
					weightMinChecked = this.initFormData.weightMinChecked,
					weightMaxChecked = this.initFormData.weightMaxChecked,
					weightMin = this.initFormData.weightMin == '' ? -1 : this.initFormData.weightMin*1,
					weightMax = this.initFormData.weightMax == '' ? -1 : this.initFormData.weightMax*1,
					needExtraInfo = this.initFormData.needExtraInfo,
					Height = this.initFormData.Height,
					Weight = this.initFormData.Weight,
					ShoesSize = this.initFormData.ShoesSize,
					GlassesNum = this.initFormData.GlassesNum,
					ClothesSize = this.initFormData.ClothesSize;
				
				
				dataList.forEach(item => {

					let hasEract = true;
					let errorText = '';
					const _ClothesSize = item.ClothesSize,
						_GlassesNum = item.GlassesNum,
						_ShoesSize = item.ShoesSize*1,
						_Weight = item.Weight*1,
						_Height = item.Height*1;
					
					const age = this.getPersonAge(item.Birthday);
					
					// if ( _ShoesSize && _Weight && _Height) {
					// 	hasEract = true;
					// }
					if (needExtraInfo === '1') {
						
						let extraError = [];
						if( Height && !_Height){
							extraError.push('身高');
						}
						if( Weight && !_Weight){
							extraError.push('体重');
						}
						if( ShoesSize && !_ShoesSize){
							extraError.push('鞋子码数');
						}
						if( ClothesSize && !_ClothesSize){
							extraError.push('衣服码数');
						}
						if( GlassesNum && (_GlassesNum =='' || _GlassesNum === undefined) ){
							extraError.push('近视度数');
						}
						if( extraError.length){
							errorText = '需要填写' + extraError.join(';');
							hasEract = false; //必填的附加项目，存在未填写情况,不显示图标
						}
					}
					if (ageMinChecked && age < ageMin) {
						errorText = '年龄不能小于' + ageMin + '岁';
					}
					if (ageMaxChecked && age > ageMax) {
						errorText = '年龄不能大于' + ageMax + '岁';
					}
					if (_Height && heightMinChecked && _Height < heightMin) {
						errorText = '身高不能小于' + heightMin;
					}
					if (_Height && heightMaxChecked && _Height > heightMax) {
						errorText = '身高不能大于' + heightMax;
					}
					if (_Weight && weightMinChecked && _Weight < weightMin) {
						errorText = '体重不能小于' + weightMin;
					}
					if (_Weight && weightMaxChecked && _Weight > weightMax) {
						errorText = '体重不能大于' + weightMax;
					}
					item.hasEract = hasEract;
					item.errorText = errorText;

					item.checked = false;
					item.disabled = false;
					
					if (this.initSelectIdList.includes(item.TravellerID)) {
						item.checked = true;
						pickerList.push(item);
					}
					if (errorText) {
						item.disabled = true;
					}
					
					travellerList.push(item);

				});
				this.travellerList = travellerList;
				this.pickerList = pickerList;
			},
			changeSelected(index) {
				if( this.travellerList[index].disabled){
					return;
				}
				const selected = this.travellerList[index].checked;
				this.travellerList[index].checked = !selected;

				const pickerList = [];
				this.travellerList.forEach(item => {
					if (item.checked) {
						pickerList.push(item);
					}
				})

				this.pickerList = pickerList;
			},
			cancelPick() {
				this.selectPersonShow = false;
				this.$emit('cancel')
			},
			confirmPick() {
				this.selectPersonShow = false;
				this.$emit('confirm', this.pickerList)
			},
			addTraveller() {
				uni.removeStorageSync("meansInfo");
				this.$refs.editTraveller.means = false;
				this.pageType = '4';
				this.traveller = null;
				this.editTravellerShow = true;
				
			},
			showMeansPage(show,pageType) {
				this.showMeans = show;
				this.pageType = pageType;
				this.editTravellerShow = true;
				this.$nextTick(()=>{
					if(uni.getStorageSync("meansInfo")){
						this.$refs.editTraveller.means = true;
					}else{	
						//新增的附加资料,清空缓存数据
						if( pageType === '4'){
							this.$refs.editTravellerMeans.traveller = {
								Height: '',
								Weight: '',
								ShoesSize: '',
								ClothesSize: '',
								GlassesNum: ''
							}
						}
						
					}
				})
			},
			showEditPage(show,pageType) {
				this.showMeans = show;
				this.pageType = pageType;
				this.editTravellerShow = true;
			},
			closeEditPage(traveller) {
				
				this.editTravellerShow = false;
				this.showMeans = false;
				uni.removeStorageSync("meansInfo");
				
			},
			updateTraveller(traveller) {
				//this.traveller = JSON.stringify(traveller);
				
				//本地更新附加项目
				if( traveller){
					this.$refs.editTraveller.means = true;
				}else{
					this.getCustomer();
					this.editTravellerShow = false;
				}
				
				
			},
			goToEditTraveller(index) {
				const traveller = this.travellerList[index];

				this.traveller = traveller;
				this.pageType = '5';
				this.editTravellerShow = true;
			},
			//通过生日，获取年龄
			getPersonAge(strBirthday) {
				var returnAge = -1;
				if (!strBirthday) {
					return -1;
				}
				strBirthday = strBirthday.substring(0, 10);
				if (strBirthday == '0001-01-01' || strBirthday == '1900-01-01') {
					return -1;
				}
				var strBirthdayArr = strBirthday.split("-");
				var birthYear = strBirthdayArr[0];
				var birthMonth = strBirthdayArr[1];
				var birthDay = strBirthdayArr[2];

				var d = new Date(this.product.ServiceDate);

				//已选中的出行日期为准，判断年龄
				let ServiceDate = this.product.ServiceDate.substring(0, 10);
				if (ServiceDate == '0001-01-01' || ServiceDate == '1900-01-01') {
					d = new Date();
				}

				var nowYear = d.getFullYear();
				var nowMonth = d.getMonth() + 1;
				var nowDay = d.getDate();

				if (nowYear == birthYear) {
					returnAge = 0; //同年 则为0岁  
				} else {
					var ageDiff = nowYear - birthYear; //年之差  
					if (ageDiff > 0) {
						if (nowMonth == birthMonth) {
							var dayDiff = nowDay - birthDay; //日之差  
							if (dayDiff < 0) {
								returnAge = ageDiff - 1;
							} else {
								returnAge = ageDiff;
							}
						} else {
							var monthDiff = nowMonth - birthMonth; //月之差  
							if (monthDiff < 0) {
								returnAge = ageDiff - 1;
							} else {
								returnAge = ageDiff;
							}
						}
					} else {
						returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天  
					}
				}
				return returnAge; //返回周岁年龄  
			}
		}
	}
</script>

<style lang="scss">
	.select-person {
		flex-direction: column;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 100;
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
		transform: translateY(100%);
		transition: all 400ms ease;

		&.selectPersonShow {
			transform: translateY(0) !important;
		}

		.top-buttom {
			border-top: 1px solid #eeeeee;
			border-bottom: 1px solid #eeeeee;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			height: 80rpx;
			//font-size:  24rpx;
			padding: 0 40rpx 0 24rpx;

			.btn-cancel {
				font-size: 24rpx;
				color: #303030;
				height: 100%;
				    line-height: 80rpx;
			}

			.text-num {
				font-size: 24rpx;
			}

			.btn-ok {
				font-size: 24rpx;
				color: #4992E7;
				height: 100%;
				line-height: 80rpx;
			}
		}

		.btn-box {
			margin-top: 20rpx;
			overflow: hidden;
			display: flex;
			//flex-direction: row;
			align-items: center;
			justify-content: space-between;
			padding: 0 24rpx;

			.iconfont {
				margin-right: 10rpx;
			}

			.btn-invite {
				width: 195rpx;
				height: 80rpx;
				line-height: 80rpx;
				border: 1px solid #4992e7;
				border-radius: 0;
				margin-right: 24rpx;
				font-size: 24rpx;
			}

			.btn-add {
				text-align: center;
				width: 442rpx;
				margin: 0 auto;
				height: 65rpx;
				line-height: 65rpx;
				border: 1px solid #4992e7;
				border-radius: 0;
				font-size: 24rpx;
			}
		}

		.person-list {

			background: #fff;

			margin-top: 20rpx;

			.person-item {

				.person-line {
					padding: 0 40rpx 0 24rpx;
					height: 80rpx;
					display: flex;
					align-items: center;

					&.error {

						.person-right {
							border-bottom: 1px solid #FF0000;
						}
					}
					
					.checkbox{
						transform: scale(0.6);
						    margin-top: 5px;
						    margin-left: -10rpx;
					}
					.person-radio {
						transform: scale(0.6);
					}

					.person-right {
						width: 100%;
						border-bottom: 1px solid #EEEEEE;
						height: 60rpx;
						line-height: 60rpx;
						margin-top: 10rpx;

						.user-sex {
							font-size: 24rpx;

							&.male {
								color: #4992e7;
							}

							&.female {
								color: #ff6600;
							}
						}

						.user-name {
							margin: 0 10rpx;
							font-size: 24rpx;
						}

						.user-enname {
							margin: 0 10rpx;
							font-size: 24rpx;
						}

						.user-extra {
							font-size: 30rpx;
						}

						.user-edit {
							font-size: 32rpx;
							float: right;
							width: 50rpx;
							    text-align: right;
						}
					}
				}

				.person-error {
					font-size: 22rpx;
					color: #ff0000;
					padding-left: 75rpx;
					margin-top: 5rpx;
				}
			}
		}
	}

	.edit-traveller-content {

		backface-visibility: hidden;
		perspective: 1000;
		-webkit-overflow-scrolling : touch;
		-webkit-transform: translateZ(0);
		//transform: translate3d(0, 0, 0);
		flex-direction: column;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 101;
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
		//transform: translate3d(0, 100%, 0);
		transform: translateY(100%);
		transition: all 400ms ease;
		//padding-bottom: 40rpx;
	}

	.editTravellerShow {
		transform: translateY(0) !important;
	}
</style>
