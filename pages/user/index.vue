<template>
	<view class="page-user">
		<view class="user-top" :style="{backgroundImage:`url(${indexBackgroundImage})`,backgroundSize: 'cover'}">
			<view class="user-box">
				<view class="user-box-top">
					<view class="user-img">
						<img :src="avatarUrl" />
					</view>
					<view class="user-name">{{ nickName  }}</view>
				</view>
				<view class="user-box-bottom">
					<view class="ubb-left">
						<view class="text1">订单</view>
						<view class="text2" @tap="clickOrderCount">{{ordersCount}}</view>
					</view>
					<view class="ubb-right">
						<view class="text1">最近登录</view>
						<view class="text2">{{ lastLoginTime}}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="user-menu">
			<navigator url="/pages/user/info" open-type="navigate">
				<view class="langhua-menu-list">
					<view class="iconleft iconfont lhddwode"></view>
					<view class="menu-name">个人资料</view>
					<view class="iconright iconfont lhddright"></view>
				</view>
			</navigator>
			<view class="lml-btm-line"></view>
			<navigator url="/pages/user/travellerList" open-type="navigate">
				<view class="langhua-menu-list">
					<view class="iconleft iconfont lhddchangyongxinxi"></view>
					<view class="menu-name">常用游客</view>
					<view class="iconright iconfont lhddright"></view>
				</view>
			</navigator>

		</view>

		<!-- <view class="official">
			<official-account></official-account>
		</view> -->

		<view v-if="customerList.length" class="user-logout change" @tap="changeUser">切换账号</view>

		<view class="user-logout" @tap="logout">退出登录</view>

		<selectUser ref="selectUser" type="2" :customerList="customerList" @selectedUser="selectedUser"></selectUser>

	</view>
</template>

<script>
	import indexBackgroundImage from "@/static/mybg.png";
	import util from '@/common/util.js';
	import selectUser from '@/components/selectUser.vue';
	

	export default {
		components: {
			selectUser,
		},
		data() {
			return {
				avatarUrl: '',
				nickName: '',
				indexBackgroundImage: indexBackgroundImage,
				lastLoginTime: '',
				ordersCount: 0,
				customerList: [],
			};
		},
		onLoad() {
			// 执行查看授权选项
			//this.getSettingMes();
			util.autoUpdater();
			this.getUserCenter();
		},
		mounted() {
			
		},
		methods: {
			getUserCenter( type ) {
				uni.showLoading({
					title: "加载中",
				    mask: true,
				});
				this.$sendRequest({
					url: "/WxOpen/GetUserCenter",
					method: "GET",
				}).then(res => {
					if (res.Code === 200) {

						const {
							LastLoginTime,
							OrdersCount,
							Profile,
							NickName,
							TBID,
							UnionID
						} = res.data;
						this.lastLoginTime = util.dateFormat(LastLoginTime);
						this.ordersCount = OrdersCount;

						this.avatarUrl = Profile;
						this.nickName = TBID || '微信用户';
							this.getUserList(UnionID);
							if( type === 1){
								uni.switchTab({
									url: '/pages/order/index',
									success: (res) => {
										let page = getCurrentPages().pop();
										if( page.route === 'pages/order/index'){
											page.onLoad();
										}
									}
								});
							}
					}
				})
			},
			getUserList(unionId) {
				const _this = this;
				this.$sendRequest({
					url: "/WxOpen/GetCustomerListByUnionID",
					method: "GET",
					data: {
						unionId
					}
				}).then(res => {
					uni.hideLoading();
					if (res.Code === 200) {
						
						if (res.data && res.data.length > 1) {
							const list = [];
							res.data.forEach( item=>{
								if( _this.nickName === item.CustomerTBCode ){
									item.isLogin = true;
								}
								list.push(item);
							})
							_this.customerList = [ ...list ];
						}
					}
				});
			},
			clickOrderCount() {
				uni.switchTab({
					url: '/pages/order/index'
				});
			},
			goMyShop() {
				uni.navigateToMiniProgram({
					appId: 'wxef566e29f18afb8a',
					//path: 'pages/index/index',
					extraData: {
						'data1': 'test'
					},
					success(res) {
						// 打开成功
					}
				})
			},
			changeUser() {
				this.$refs.selectUser.userShow = true;
			},
			selectedUser(){
				this.getUserCenter(1);
				
			},
			logout() {
				const that = this;
				uni.showModal({
					title: '',
					content: '确定退出吗?',
					confirmColor: '#4992E7',
					success: function(res) {
						if (res.confirm) {

							that.$sendRequest({
								url: '/WxOpen/Logout',
								method: "GET",
								data: {

								},
							}).then(res => {
								if (res.Code === 200) {
									uni.removeStorageSync('sessionId');
									uni.removeStorageSync('userInfo');
									uni.removeStorageSync("meansInfo");
									uni.removeStorageSync("CustomerID");
									
									uni.redirectTo({
										url: '/pages/index/login'
									});
								}
							})
							
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			getSettingMes() {

				let _this = this;
				uni.getSetting({
					success(res) {
						if (res.authSetting['scope.userInfo']) {
							// 用户信息已授权，获取用户信息
							let userInfo = uni.getStorageSync("userInfo");
							if (userInfo) {
								userInfo = JSON.parse(userInfo);
								_this.avatarUrl = userInfo.avatarUrl || '';
								_this.nickName = userInfo.nickName || '微信用户';
							}
						} else if (!res.authSetting['scope.userInfo']) {
							console.log("需要点击按钮手动授权")
						}
					},
					fail() {
						console.log("获取已授权选项失败")
					}
				})
			},
		},
	};
</script>

<style lang="scss" scoped>
	.page-user {
		font-size: 20rpx;

		.user-top {
			height: 336rpx;
			overflow: hidden;

			.user-box {
				height: 320rpx;
				width: 700rpx;
				background: #ffffff;
				border-radius: 10px;
				margin: 0 auto;
				margin-top: 80rpx;
				padding-top: 20rpx;

				.user-box-top {
					overflow: hidden;

					.user-img {
						float: left;
						margin-left: 70rpx;

						img {
							height: 120rpx;
							width: 120rpx;
							border-radius: 50%;
							//background: #eee;
						}
					}

					.user-name {
						float: left;
						padding-left: 10px;
						font-size: 28rpx;
						height: 120rpx;
						line-height: 120rpx;
					}
				}

				.user-box-bottom {
					overflow: hidden;

					.text1 {
						color: #999999;
						font-size: 24rpx;
					}

					.text2 {
						color: #303030;
						font-size: 24rpx;
					}

					.ubb-left {
						width: 50%;
						float: left;
						padding-left: 70rpx;
						box-sizing: border-box;
						border-right: 1px solid #eeeeee;
					}

					.ubb-right {
						width: 50%;
						float: left;
						padding-left: 30rpx;
						box-sizing: border-box;
					}
				}
			}
		}

		.user-menu {
			width: 700rpx;
			margin: 70rpx auto;
			background: #ffffff;
			border-radius: 10px;
			
			.lml-btm-line {
				margin-left: 24rpx;
				border-bottom: 1px solid #eeeeee;
			}
		}

		.user-logout {
			width: 700rpx;
			height: 80rpx;
			margin: 0 auto;
			background: #ffffff;
			margin-bottom: 30rpx;
			border-radius: 10px;
			text-align: center;
			color: #ff0000;
			font-size: 24rpx;
			line-height: 80rpx;

			&.change {
				color: #333333;
			}
		}

		.official {
			width: 700rpx;
			margin: 20rpx auto;
		}
	}

	.langhua-menu-list {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		height: 80rpx;
	}

	.langhua-menu-list .iconleft {
		padding-left: 24rpx;
		width: 32rpx;
		font-size: 32rpx;
	}

	.langhua-menu-list .menu-name {
		text-align: left;
		padding-left: 20rpx;
		width: 100%;
		font-size: 24rpx;
	}

	.langhua-menu-list .iconright {
		width: 28rpx;
		font-size: 28rpx;
		padding-right: 30rpx;
	}
</style>
