<template>
	<view class="user-info">
		<view class="lh-title">基本资料</view>
		<view class="user-info-box lhform">

			<view :class="rules.CustomerName ? 'error-item':'' ">
				<view class="uib-item" style="border-top:1px solid #eeeeee;">
					<view class="item-left">中文姓名</view>
					<view class="item-right">
						<input class="input" v-model="contact.CustomerName" @blur="changeCustomerName" />
					</view>
				</view>
				<view class="error-text">{{rules.CustomerName}}</view>
			</view>

			<view :class="rules.CustomerEnname ? 'error-item':'' ">
				<view class="uib-item">
					<view class="item-left">姓名拼音</view>
					<view class="item-right">
						<input class="input" v-model="contact.CustomerEnname" @blur="changeCustomerEnname" />
					</view>
				</view>
				<view class="error-text">{{rules.CustomerEnname}}</view>
			</view>

			<view :class="rules.Tel ? 'error-item':'' ">
				<view class="uib-item">
					<view class="item-left">联系电话</view>
					<view class="item-right">
						<text class="region" @tap="selectRegion('Tel')">{{ region.Tel }}</text>
						<text class="iconleft iconfont lhddunfold" @tap="selectRegion('Tel')"></text>
						<input name="input" type="number" class="ipt2" v-model="contact.Tel" @blur="changeTel" />
					</view>
				</view>
				<view class="error-text">{{rules.Tel}}</view>
			</view>
			<view :class="rules.BakTel ? 'error-item':'' ">
				<view class="uib-item">
					<view class="item-left">备用联系电话</view>
					<view class="item-right">
						<text class="region" @tap="selectRegion('BakTel')">{{ region.BakTel }}</text>
						<text class="iconleft iconfont lhddunfold" @tap="selectRegion('BakTel')"></text>
						<input class="ipt2" type="number" v-model="contact.BakTel" @blur="changeBakTel" />
					</view>
				</view>
				<view class="error-text">{{rules.BakTel}}</view>
			</view>

			<view :class="rules.Email ? 'error-item':'' ">
				<view class="uib-item">
					<view class="item-left">Email地址</view>
					<view class="item-right">
						<input ref="Email" class="input" v-model="contact.Email" @blur="changeEmail" />
					</view>
				</view>
				<view class="error-text">{{rules.Email}}</view>
			</view>

			<view :class="rules.Wechat ? 'error-item':'' ">
				<view class="uib-item">
					<view class="item-left">微信号</view>
					<view class="item-right">
						<input class="input" v-model="contact.Wechat" @blur="changeWeChat" />
					</view>
				</view>
				<view class="error-text">{{rules.Wechat}}</view>
			</view>

		</view>
		<view class="user-info-bottom">
			<button class="btn" @tap="saveContact" v-if="orderStatus==='0' || orderStatus==='1'">保存</button>
		</view>

		<LHIndexedList ref="indexList" @selectCode="selectCode" @closeIndexList="closeIndexList" v-if="showIndexList"
			:data="code" />
		<!-- <uni-indexed-list :options="list" :showSelect="false" @click="bindClick"></uni-indexed-list> -->

	</view>
</template>

<script>
	import util from '@/common/util.js';
	import LHIndexedList from '@/components/LHIndexedList.vue'

	export default {
		components: {
			LHIndexedList
		},
		data() {
			return {
				orderId: '',
				orderStatus: '0',
				showIndexList: false,
				code: '',
				contact: {
					BakTel: '',
					CustomerEnname: '',
					CustomerName: '',
					Email: '',
					Tel: '',
					Wechat: ''
				},
				rules: {
					BakTel: '',
					CustomerEnname: '',
					CustomerName: '',
					Email: '',
					Tel: '',
					Wechat: ''
				},
				region: {
					Tel: '',
					BakTel: ''
				},
				regionType: '',
				validate: true,
			};
		},
		onLoad(options) {
			const {
				orderId,
				customer,
				orderStatus
			} = options;
			if (!customer) {
				this.getCustomer();
				return;
			}

			const temp = JSON.parse(customer || '{}');

			const Tel = temp.Tel.split('-');
			if (Tel.length > 1) {
				this.region.Tel = Tel[0];
				temp.Tel = Tel[1];
			} else {
				temp.Tel = Tel[0];
			}

			const BakTel = temp.BakTel.split('-');
			if (BakTel.length > 1) {
				this.region.BakTel = BakTel[0];
				temp.BakTel = BakTel[1];
			} else {
				temp.BakTel = BakTel[0];
			}
			if( temp.Tel === ''){
				this.region.Tel = '+86';
			}
			this.contact = temp;
			this.orderId = orderId;
			this.orderStatus = orderStatus;
			//this.contact = JSON.parse(customer || '{}');

		},
		watch: {
			rules: {
				deep: true,
				handler(n, l) {}
			}
		},
		methods: {
			getCustomer() {
				this.$sendRequest({
					url: "/WxOpen/GetCustomer",
					method: "POST",
					data: {
						customerID: 0,
					},
				}).then(res => {
					if (res.Code === 200) {

						const Tel = res.data.Tel.split('-');
						if (Tel.length > 1) {
							this.region.Tel = Tel[0];
							res.data.Tel = Tel[1];
						} else {
							res.data.Tel = Tel[0];
							this.region.Tel = '+86';
						}

						const BakTel = res.data.BakTel.split('-');
						if (BakTel.length > 1) {
							this.region.BakTel = BakTel[0];
							res.data.BakTel = BakTel[1];
						} else {
							res.data.BakTel = BakTel[0];
							if(  BakTel[0] ){
								this.region.BakTel = '+86';
							}
						}

						this.contact = res.data;
						uni.setStorageSync('CustomerID', res.data.CustomerID)
					}
				})
			},
			bindClick() {},
			selectCode(code) {
				this.showIndexList = false;
				this.region[this.regionType] = "+" + code;
				
				if( this.regionType === 'Tel'){
					if( this.contact.Tel ){
						this.rules.Tel = '';
					}
				}
				if( this.regionType === 'BakTel'){
					
					if( this.contact.BakTel ){
						this.rules.Tel = '';
					}
				}
			},
			closeIndexList() {
				this.showIndexList = false;
			},
			selectRegion(type) {
				// uni.redirectTo({
				//     url: '/components/LHIndexedList'
				// });
				this.showIndexList = true;
				this.regionType = type;

				this.code = this.region[type].replace('+', '');
				
				
			},
			changeCustomerName(e) {
				const value = e ? e.detail.value.trim() : this.contact.CustomerName;
				let error = '';
				if (!value) {
					error = '请填写中文姓名';
				} else {
					if (!util.isChineseChar(value)) {
						error = '请填写中文姓名';
					}
				}
				this.rules.CustomerName = error;
			},
			changeCustomerEnname(e) {
				const value = e ? e.detail.value.trim() : this.contact.CustomerEnname;
				let error = '';
				if (!value) {
					error = '请填写姓名拼音';
				} else {
					if (!util.isEnChar(value)) {
						error = '请填写姓名拼音(全部字母)';
					} else {
						this.contact.CustomerEnname = value.toUpperCase();
					}
				}
				this.rules.CustomerEnname = error;
			},
			changeTel(e) {
				const value = e ? e.detail.value.trim() : this.contact.Tel;
				let error = '';
				if (!value) {
					error = '请填写联系电话';
				} else {
					if (!util.isNumber(value)) {
						error = '请填写正确的号码';
					}
				}
				if (this.region.Tel === '') {
					error = '请选择国家区号';
				}
				this.rules.Tel = error;
			},
			changeBakTel(e) {
				const value = e ? e.detail.value.trim() : this.contact.BakTel;
				let error = '';
				if (!value) {
					error = '';
				} else {
					if (!util.isNumber(value)) {
						error = '请填写正确的号码';
					} else {
						if (this.region.BakTel === '') {
							error = '请选择国家区号';
						}
					}
				}

				this.rules.BakTel = error;
			},
			changeEmail(e) {
				const value = e ? e.detail.value.trim() : this.contact.Email;
				let error = '';
				if (!value) {
					error = '请填写Email地址';
				} else {
					if (!util.isEmail(value)) {
						error = '请填写正确的Email地址';
					}
				}
				this.rules.Email = error;
			},
			changeWeChat(e) {
				const value = e ? e.detail.value.trim() : this.contact.Wechat;
				let error = '';
				if (!value) {
					error = '请填写微信号';
				}
				this.rules.Wechat = error;
			},


			saveContact() {

				this.changeCustomerName();
				this.changeCustomerEnname();
				this.changeTel();
				this.changeBakTel();
				this.changeEmail();
				this.changeWeChat();

				this.$nextTick(() => {
					const {
						BakTel,
						CustomerEnname,
						CustomerName,
						Email,
						Wechat,
						Tel
					} = this.rules;

					if (BakTel || CustomerEnname || CustomerName || Email || Wechat || Tel) {
						return;
					}
					const customer = {
						...this.contact
					};
					customer.Tel = this.region.Tel + '-' + customer.Tel;
					customer.BakTel = this.region.BakTel + '-' + customer.BakTel;
					
					//customer.Tel = '13826519280';
					
					if (this.orderId) {
						// uni.redirectTo({
						// 	url: '/pages/order/edit?id=' + this.orderId + '&customer=' + JSON.stringify(
						// 		customer)
						// });
						uni.$emit("updateCustomer", customer);
						uni.navigateBack({});
						return;
					}
					this.$sendRequest({
						url: "/WxOpen/UpdateCustomer",
						method: "POST",
						data: {
							sessionId: uni.getStorageSync("mySessionKey"),
							customer,
						},
					}).then(res => {
						if (res.Code === 200) {
							uni.switchTab({
								url: '/pages/user/index',
								success() {
									let page = getCurrentPages().pop();
									if (!page) return;
									page.onLoad();
								}
							});

						} else {
							uni.showToast({
								icon: 'none',
								title: res.Msg
							})
						}
					});
				})

			}

		},
	};
</script>

<style lang="scss" scoped>
	.user-info {
		font-size: 20rpx;

		.title {
			height: 66rpx;
			line-height: 66rpx;
			font-size: 24rpx;
			color: #999999;
			padding-left: 24rpx;
		}

		.user-info-box {
			background: #ffffff;
		}

		.user-info-bottom {
			margin-top: 90rpx;
			padding: 0 24rpx;

			.btn {
				display: inline-block;
				width: 100%;
				height: 75rpx;
				line-height: 75rpx;
				background: #4992e7;
				color: #ffffff;
				font-size: 24rpx;
				border-radius: 0;
			}
		}
	}
</style>
