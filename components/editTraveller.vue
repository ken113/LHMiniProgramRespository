<template>
	<view class="user-edit-visitor">
		<view class="top-visitor">
			<view class="lh-title">游客信息</view>
			<text class="iconfont close" v-if=" pageType=='4' || pageType=='5' " @tap="closeVisitor">&#xe86d;</text>
		</view>

		<view class="user-info-box lhform">

			<view :class="rules.TravellerName ? 'error-item':'' ">
				<view class="uib-item" style="border-top:1px solid #eeeeee;">
					<view class="item-left">中文姓名</view>
					<view class="item-right">
						<input class="input" placeholder="张三" v-model="traveller.TravellerName"
							@blur="changeTravellerName" />
					</view>
				</view>
				<view class="error-text">{{rules.TravellerName}}</view>
			</view>

			<view :class="rules.TravellerEnname ? 'error-item':'' ">
				<view class="uib-item">
					<view class="item-left">姓名拼音</view>
					<view class="item-right">
						<input class="input" placeholder="ZHANGSAN" v-model="traveller.TravellerEnname"
							@blur="changeTravellerEnname" />
					</view>
				</view>
				<view class="error-text">{{rules.TravellerEnname}}</view>
			</view>

			<view :class="rules.PassportNo ? 'error-item':'' ">
				<view class="uib-item">
					<view class="item-left">证件号码</view>
					<view class="item-right">
						<input class="input" placeholder="出国游请优先填写护照号" v-model="traveller.PassportNo"
							@blur="changePassportNo" />
					</view>
				</view>
				<view class="error-text">{{rules.PassportNo}}</view>
			</view>


			<view :class="rules.Birthday ? 'error-item':'' ">
				<view class="uib-item">
					<view class="item-left">出生日期</view>
					<view class="item-right" @tap="selectDate">
						<!-- <text class="lh-date-input" >{{ traveller.Birthday }}</text> -->
						<input class="ipt" placeholder="YYYY-MM-DD" disabled v-model="traveller.Birthday" />
						<text class="iconright iconfont lhddrili"></text>
					</view>
				</view>
				<view class="error-text">{{rules.Birthday}}</view>
			</view>


			<view class="uib-item">
				<view class="item-left">性别</view>
				<view class="item-right">
					<radio-group @change="radioChange">
						<label class="radio">
							<radio value="0" :checked="traveller.TravellerSex == 0" color="#4992E7"
								style="transform:scale(0.7)" />男
						</label>
						<label class="radio" style="margin-left:30px;">
							<radio value="1" :checked="traveller.TravellerSex == 1" color="#ff6600"
								style="transform:scale(0.7)" />女
						</label>
					</radio-group>
				</view>
			</view>
		</view>

		<view v-if="!initFormData || ( initFormData && initFormData.needExtraInfo === '1')">
			<view class="lh-title">附加资料</view>
			<view class="user-info-box lhform">
				<view class="uib-item" @tap="showMeansPage">
					<view class="item-left">
						<text class="iconfont lhddyouji"></text>
						<text class="label">附加资料</text>
					</view>
					<view class="item-right">
						<text style="width: 100%;">
							<text class="iconright iconfont lhddright"></text>
							<text class="text">{{ means ? '已填写':'未填写'}}</text>
						</text>
					</view>
				</view>

			</view>
			<view class="page-tips">附加资料是潜水等项目需要的身高、体重、鞋码等信息，以便提前准备装备。</view>
		</view>

		<view class="page-btm">
			<button class="btn-primary btn-save" @tap="saveTraveller">保存</button>
			<button class="btn-default btn-delete" @tap="delateTraveller"
				v-if="pageType != '1' &&  pageType != '4' ">删除</button>
		</view>
		<!-- 		{{pageType}} -->
		<LHCalendar ref="lhcalendar" :value="traveller.Birthday" :startDate="startDate" :endDate="endDate"
			type="birthdate" @confirm="confirmDate" @cancel="cancelDate"></LHCalendar>

	</view>
</template>

<script>
	import util from '@/common/util.js';
	import LHCalendar from './LHCalendar.vue'

	export default {
		components: {
			LHCalendar
		},
		props: {
			pageType: {
				type: String,
			},
			myTraveller: {
				type: Object,
				default: function() {
					return {};
				}
			},
			initFormData: {
				type: Object,
				default: function() {
					return null;
				}
			},
		},
		watch: {
			myTraveller: {
				deep: true,
				handler(n, o) {
					this.getTraveller(n);
				},
			}
		},
		mounted() {
			this.getTraveller(this.myTraveller);
		},
		data() {
			return {
				traveller: {
					TravellerName: '',
					TravellerEnname: '',
					PassportNo: '',
					TravellerSex: 0,
					Birthday: '',
					Height: '',
					Weight: '',
					ShoesSize: '',
					ClothesSize: '',
					GlassesNum: ''
				},
				rules: {
					TravellerName: '',
					TravellerEnname: '',
					PassportNo: '',
					Birthday: '',
				},
				autoBirthday: '',
				means: false,
				startDate: '1900-01-01',
				endDate: util.dateFormat(new Date(), 'd'),
			}

		},
		computed: {

		},
		methods: {
			getTraveller(myTraveller) {
				if (myTraveller) {

					this.traveller = JSON.parse(JSON.stringify(myTraveller));

					if (this.traveller.Birthday) {
						this.traveller.Birthday = util.dateFormat(this.traveller.Birthday, 'd');
					}
					this.traveller.TravellerEnname = this.traveller.TravellerEnname || this.traveller.TravellerEnName;

					const {
						Height,
						Weight,
						ShoesSize,
						ClothesSize,
						GlassesNum
					} = this.traveller;

					if (this.initFormData) {

						const _Height = this.initFormData.Height,
							_Weight = this.initFormData.Weight,
							_ShoesSize = this.initFormData.ShoesSize,
							_ClothesSize = this.initFormData.ClothesSize,
							_GlassesNum = this.initFormData.GlassesNum;

						let means = true;
						if (_Height && !Height) {
							means = false;
						}
						if (_Weight && !Weight) {
							means = false;
						}
						if (_ShoesSize && !ShoesSize) {
							means = false;
						}
						if (_ClothesSize && !ClothesSize) {
							means = false;
						}
						if (_GlassesNum && (GlassesNum == '' || GlassesNum === undefined)) {
							means = false;
						}
						//必填写的附加项目，必须填写
						this.means = means;


					} else {
						if (Height && Weight && ShoesSize) {
							this.means = true;
						}
					}
					if (this.traveller.TravellerName === null) {
						this.traveller.TravellerName = '';
						this.traveller.TravellerEnname = '';
						this.traveller.PassportNo = '';
						this.traveller.TravellerSex = 0;
						this.traveller.Birthday = '';
					}
				}else{
					this.traveller = {
						TravellerName: '',
						TravellerEnname: '',
						PassportNo: '',
						TravellerSex: 0,
						Birthday: '',
						Height: '',
						Weight: '',
						ShoesSize: '',
						ClothesSize: '',
						GlassesNum: ''
					}
				}
			},
			selectDate() {
				this.$refs.lhcalendar.showCalendar();
			},
			confirmDate(value) {
				this.traveller.Birthday = value;
				this.rules.Birthday = '';

				this.$set(this.traveller, 'Birthday', value);
			},
			cancelDate() {
				if (!this.traveller.Birthday) {
					this.rules.Birthday = '请选择生日';
				}
			},
			changeTravellerName(e) {
				const value = e ? e.detail.value.trim() : this.traveller.TravellerName;
				let error = '';
				if (!value) {
					error = '请填写中文姓名';
				} else {
					if (!util.isChineseChar(value)) {
						error = '请填写中文姓名';
					}
				}
				this.rules.TravellerName = error;
			},
			changeTravellerEnname(e) {
				const value = e ? e.detail.value.trim() : this.traveller.TravellerEnname;
				let error = '';
				if (!value) {
					error = '请填写姓名拼音';
				} else {
					if (!util.isEnChar(value)) {
						error = '请填写姓名拼音(全部字母)';
					} else {
						this.traveller.TravellerEnname = value.toUpperCase();
					}
				}
				this.rules.TravellerEnname = error;
			},
			changePassportNo(e) {
				let value = e ? e.detail.value.trim() : this.traveller.PassportNo;
				let error = '';

				if (!value) {
					error = '请填写证件号码';
				} else {
					if (!/^[a-zA-Z0-9]+$/.test(value)) {
						error = '请填写有效的证件号码';
					} else {
						if (value.length !== 18 && value.length != 9) {
							error = '请填写有效的证件号码';
						}
					}
				}
				if (!error) {

					if (value.length === 18) {
						const year = value.substring(6, 10),
							month = value.substring(10, 12),
							date = value.substring(12, 14),
							sex = value.substring(16, 17);

						this.autoBirthday = year + '-' + month + '-' + date;

						//填写的才自动修改生日
						if (e) {
							this.traveller.Birthday = year + '-' + month + '-' + date;
						}
						this.traveller.TravellerSex = sex % 2 === 0 ? 1 : 0;
					}
				}
				this.rules.PassportNo = error;
			},
			changeBirthday(e) {
				const value = e ? e.detail.value.trim() : this.traveller.Birthday;
				let error = '';
				if (!value) {
					error = '请填写出生日期';
				} else {
					if (!/^[0-9\-]+$/.test(value)) {
						error = '请填写正确的日期';
					} else if (new Date(value).toString() === 'Invalid Date') {
						tips = '请填写正确的日期';
					}
				}
				this.rules.Birthday = error;
			},
			radioChange(evt) {
				this.traveller.TravellerSex = evt.detail.value;
				if (this.traveller.PassportNo.length === 18) {

					let sex = this.traveller.PassportNo.substring(16, 17) * 1;

					let travellerSex = this.traveller.TravellerSex * 1;

					sex = sex % 2 === 0 ? 1 : 0;
					if (travellerSex !== sex) {
						this.rules.PassportNo = '性别与身份证信息不一致！';
					} else {
						this.rules.PassportNo = '';
					}
				}
			},
			saveTraveller() {
				this.changeTravellerName();
				this.changeTravellerEnname();
				this.changePassportNo();
				this.changeBirthday();


				if (this.autoBirthday !== '' && this.autoBirthday !== this.traveller.Birthday) {
					this.rules.Birthday = '生日与身份证信息不一致！';
					return;
				}
				if (this.traveller.PassportNo.length === 18) {

					let sex = this.traveller.PassportNo.substring(16, 17) * 1;

					let travellerSex = this.traveller.TravellerSex * 1;

					sex = sex % 2 === 0 ? 1 : 0;
					if (travellerSex !== sex) {
						this.rules.PassportNo = '性别与身份证信息不一致！';
						return;
					}
				}

				this.$nextTick(() => {

					const {
						Birthday,
						TravellerName,
						TravellerEnname,
						PassportNo
					} = this.rules;

					if (Birthday || TravellerName || TravellerEnname || PassportNo) {
						return;
					}

					const traveller = {
						...this.traveller
					};
					let url = '/WxOpen/AddTraveller';
					if (traveller.TravellerID) {
						url = '/WxOpen/UpdateTraveller';
					}
					let meansInfo = uni.getStorageSync("meansInfo");

					if (meansInfo) {
						meansInfo = JSON.parse(meansInfo);
						traveller.Height = meansInfo.Height;
						traveller.Weight = meansInfo.Weight;
						traveller.ShoesSize = meansInfo.ShoesSize;
						traveller.ClothesSize = meansInfo.ClothesSize;
						traveller.GlassesNum = meansInfo.GlassesNum;
					}
					this.$sendRequest({
						url,
						method: "POST",
						data: {
							traveller
						},
					}).then(res => {
						if (res.Code === 200) {
							
							this.traveller = {
								TravellerName: '',
								TravellerEnname: '',
								PassportNo: '',
								TravellerSex: 0,
								Birthday: '',
								Height: '',
								Weight: '',
								ShoesSize: '',
								ClothesSize: '',
								GlassesNum: ''
							};
							uni.removeStorageSync("meansInfo");
							if (this.pageType == '4' || this.pageType == '5') {
								this.$emit("updateTraveller");
							} else {
								// uni.navigateTo({
								// 	url: '/pages/user/travellerList'
								// });
								uni.navigateBack();
							}
						} else {
							uni.showToast({
								title: res.Msg,
								icon: 'none',
							});
						}
					})
				});

			},
			delateTraveller() {
				const that = this;
				uni.showModal({
					title: '',
					content: '确定要删除吗?',
					confirmColor: '#4992E7',
					success: function(res) {
						if (res.confirm) {
							that.$sendRequest({
								url: '/WxOpen/DeleteTraveller',
								method: "POST",
								data: {
									traveller: that.traveller
								},
							}).then(res => {
								if (res.Code === 200) {
									if (that.pageType == '5') {
										that.$emit("updateTraveller");
									} else {
										uni.navigateTo({
											url: '/pages/user/travellerList'
										});
									}
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			showMeansPage() {
				if (this.pageType === '2') {
					uni.navigateTo({
						url: '/pages/user/travellerMeans?pageType=2&traveller=' + JSON.stringify(this.traveller)
					});
				} else if (this.pageType === '1') {
					uni.navigateTo({
						url: '/pages/user/travellerMeans?pageType=1'
					});
				} else {
					this.$emit("showMeansPage", true, this.pageType);
				}
			},
			closeVisitor() {
				this.$emit('closeEditPage');
			},
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
		},
	};
</script>

<style lang="scss" scoped>
	.user-edit-visitor {
		font-size: 20rpx;

		.top-visitor {
			display: flex;
			justify-content: space-between;
			margin-right: 40rpx;
			align-items: center;

			.close {
				width: 50rpx;
				text-align: right;
			}
		}

		.title {
			height: 56rpx;
			line-height: 56rpx;
			font-size: 20rpx;
			color: #999999;
			padding-left: 24rpx;
		}

		.page-tips {
			font-size: 20rpx;
			color: #999999;
			padding: 10px 24rpx;
		}

		.user-info-box {}

		.page-btm {
			margin: 24rpx;

			.btn-save {
				margin-bottom: 24rpx;
			}

			.btn-delete {
				color: #ff0000;
			}
		}
	}
</style>
