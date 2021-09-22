<template>
	<view class="user-content" :class="{'userShow':userShow}">
		<view class="user-top">
			<text class="iconfont" @tap="closeUserPicker">&#xe86d;</text>
			<text class="text">该微信登录过多个用户，请选择其中一个登录:</text>
			<text class="fill">&nbsp;</text>
		</view>
		<view class="user-center">
			<view class="user-list">

				<!-- <view class="user-item" @tap="selectedUser">
					<view class="user-item-top">童话天使哎网购</view>
					<view class="user-item-bottom">
						<view class="login-time">最后登录:2021-08-09 12:12:12</view>
						<view class="order-count">已有订单: <text class="count">8</text> 个</view>
					</view>
				</view> -->

				<view class="user-item" v-for="customer in customerList" :key="customer.CustomerID"
					@tap="selectedUser(customer)">
					<view class="user-item-top">
						<text class="name">{{ customer.CustomerTBCode}}</text>
						<text class="current" v-if="customer.isLogin && type==='2' ">当前使用</text>
					</view>
					<view class="user-item-bottom">
						<view class="login-time">最后登录：{{ customer.LastLoginTime | filterDate }}</view>
						<view class="order-count">已有订单：<text class="count">{{ customer.OrdersCount }}</text>{{ ' '+' 个' }}</view>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import util from '@/common/util.js';

	export default {
		props: {
			customerList: {
				type: Array,
				default: function() {
					return [];
				}
			},
			type: {
				type: String,
				default: function() {
					return '1';
				}
			}
		},
		filters: {
			filterDate(value) {
				return util.dateFormat(value);
			},
		},
		data() {
			return {
				userShow: false,
			}
		},
		methods: {
			closeUserPicker() {
				if (this.type === '2') {
					this.userShow = false;
				} else {
					uni.redirectTo({
						url: '/pages/index/login'
					});
				}
			},
			selectedUser(customer) {
				
				//uni.removeStorageSync('sessionId');
				uni.removeStorageSync('userInfo');
				uni.removeStorageSync("meansInfo");
				uni.removeStorageSync("CustomerID");
				
				//公众号
				if( this.type === '1'){
					
					this.getSessionId(customer.CustomerID)
					return;
				}
				this.$sendRequest({
					url: '/WxOpen/Logout',
					method: "GET",
					data: {

					},
				}).then(res => {
					if (res.Code === 200) {

						this.getSessionId(customer.CustomerID)
					}
				})
			},

			getSessionId(customerId) {
				const _this = this;
				wx.login({
					success(res) {
						if (res.code) {
							const data = {
								code: res.code,
								type: _this.type === '2' ? 3 : 1,//3：切换用户，1：公众号
								customerId
							};
							// uni.showLoading({
							// 	title: "切换用户中...",
							//     mask: true,
							// });
							_this.$sendRequest({
								url: "/WxOpen/OnLogin",
								method: "GET",
								data,
								loadding: false,
							}).then((response) => {

								if (response.Code === 200) {
									uni.setStorageSync("sessionId", response.data.Key);

									_this.userShow = false;
									_this.$emit('selectedUser');
								}

							})
						}
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	.user-content {
		flex-direction: column;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 100;
		width: 100%;
		height: 100%;
		background-color: #F8F8F8;
		transform: translateY(100%);
		transition: all 400ms ease;

		&.userShow {
			transform: translateY(0) !important;
		}

		.user-top {
			border-top: 1px solid #EEEEEE;
			border-bottom: 1px solid #EEEEEE;
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 24rpx;

			.iconfont {
				font-size: 32rpx;
				font-weight: 600;
				width: 50rpx;
			}

			.text {
				font-size: 26rpx;
			}

			.fill {
				font-size: 32rpx;
				width: 50rpx;
			}
		}

		.user-center {

			margin-top: 30rpx;

			.user-list {
				margin: 24rpx;
				height: calc( 100vh - 150rpx );
				overflow: auto;
				
				.user-item {
					background: #fff;
					padding: 12rpx 24rpx;
					border-radius: 10rpx;
					margin-bottom: 30rpx;

					.user-item-top {
						height: 60rpx;
						line-height: 60rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;

						.name {
							font-size: 30rpx;
							font-weight: 600;
						}

						.current {
							font-size: 24rpx;
							color: #4992E7;
						}


					}

					.user-item-bottom {
						display: flex;
						justify-content: space-between;
						align-items: center;
						height: 60rpx;
						border-top: #eee 1upx solid;

						.login-time {
							font-size: 24rpx;
							color: #999999;
						}

						.order-count {
							font-size: 24rpx;

							.count {
								color: #FF6600;
								font-weight: 600;
							}
						}
					}
				}
			}
		}

	}
</style>
