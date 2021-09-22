<template>
	<view class="page-login">
		<!-- <view class="top-image" style="background:url('./../../static/u6.jpg');background-size: cover"></view> -->
		<!-- <image src="./../../static/dodotour_wechat_public.jpg" show-menu-by-longpress @tap="previewImage"></image> -->
		<image class="top-image" src="./../../static/u6.jpg"></image>
		<view class="ctn">
			<view class="cmd-box">
				<textarea class="textarea" v-model="pasteText" />
				<text class="text" v-if="!pasteText">请粘贴浪口令到此登录</text>
				<button v-if="!pasteText" class="btn-default btn-paste" @click="handlerPaste">
					粘贴
				</button>
			</view>
			<button :loading="loadding" class="btn-primary btn-login" @click="login">登录</button>
			<view class="text">
				浪口令是浪花朵朵专属口令
				<br />请联系客服提供
			</view>
			<!-- <view class="logo" style="background:url('./../../static/u55.png');background-size: cover"></view> -->
			<image class="logo" :style="{backgroundImage:`url(${imageLogo})`,backgroundSize: 'cover'}" />

		</view>
	</view>
</template>

<script>
	import LHCalendar from '../../components/LHCalendar.vue'
	import imageLogo from '@/static/u55.png';
	export default {

		components: {
			LHCalendar
		},
		data() {
			return {
				imageLogo,
				loadding: false,
				pasteText: "",
			};
		},
		onInit() {

		},
		onLoad() {
			if (wx.hideHomeButton) {
				wx.hideHomeButton();
			}
			this.getSessionId();
		},
		onShow() {
			
		},
		onShareAppMessage: function() {

		},
		onShow() {
			const _this = this;
			uni.getClipboardData({
				success: function(res) {
					if (res.data) {

						const index1 = res.data.indexOf('￥'),
							index2 = res.data.lastIndexOf('￥');

						if (index1 > -1 && index2 > index1) {
							_this.pasteText = res.data;
						}

					}

					//_this.pasteText ="【ken，新姿势“浪口令”快速登录预订系统】嶶♂信♀关注“dodotour”，復·制浪口令￥ImW2upshP+Y=￥粘贴发送。（整段内容全部復·制）";
				},
			});
		},
		methods: {
			previewImage() {
				wx.previewImage();
			},

			showSubscribeMessage() {

			},
			login2() {
				this.wxAuth();
			},
			wxAuth() {
				//弹出授权窗口
				const _this = this;
				uni.getUserProfile({
					desc: "获取个人信息",
					success: (res) => {
						
						uni.getUserInfo({
							success(r) {
								console.log('用户信息',r)
							}
						})
						//_this.login();
					},
					fail() {
						uni.showToast({
							title: '您拒绝了授权，无法获取小程序信息，请前往授权',
							icon: 'none'
						})
					}
				})
			},
			login() {
				const _this = this;
				if (this.pasteText === "") {
					uni.showToast({
						title: "浪口令不能为空",
						icon: "error",
					});
					return;
				}
				this.loadding = true;
				// uni.showToast({
				//     title: '登录中',
				//     icon: "loading",
				// });

				this.$sendRequest({
					url: "/WxOpen/LangCmdLogin",
					method: "GET",
					loadding: false,
					data: {
						langcode: _this.pasteText,
					},
				}).then((res) => {
					this.loadding = false;
					if (res.Code === 200) {

						uni.switchTab({
							url: '/pages/order/index',
							success: (res) => {
								let page = getCurrentPages().pop();
								//page.onLoad();
								if( page.route === 'pages/order/index'){
									page.onLoad();
								}
								
							}
						});
						uni.showToast({
							title: '登录成功',
							icon: "success",
						});
					} else {
						const icon = res.Code === 401 ? 'error' : 'none';
						uni.showToast({
							title: res.Msg,
							icon,
						});
					}
				});


			},

			getSessionId() {
				const _this = this;

				wx.login({
					success(res) {
						if (res.code) {
							// console.log(res);
							
							// let appid = 'wx50cb5a72b0035c68';
							// let secret = '';
							// let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${res.code}&grant_type=authorization_code`;
							// uni.request({
							// 	url,
							// 	success(result) {
									
							// 	}
							// })
							
							_this.$sendRequest({
									url: "/WxOpen/OnLogin",
									method: "GET",
									data: {
										code: res.code,
									},
									loadding: false,
								})
								.then((response) => {
									if (response.Code === 200) {
										uni.setStorageSync("sessionId", response.data.Key);
									} else {
										uni.showToast({
											icon: "none",
											title: response.Msg,
										});
									}
								});
						} else {
							console.log("登录失败！" + res.errMsg);
						}
					},
				});
			},
			handlerPaste() {
				//this.showSubscribeMessage();
				const _this = this;
				uni.getClipboardData({
					success: function(res) {
						_this.pasteText = res.data;
						//_this.pasteText ="【ken，新姿势“浪口令”快速登录预订系统】嶶♂信♀关注“dodotour”，復·制浪口令￥ImW2upshP+Y=￥粘贴发送。（整段内容全部復·制）";
					},
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.page-login {
		height: 100%;
		font-size: 24rpx;

		.top-image {
			width: 100%;
			height: 496rpx;
		}

		.ctn {
			padding: 24rpx;
			text-align: center;

			.cmd-box {
				width: 100%;
				height: 288rpx;
				position: relative;

				.textarea {
					border: 1px solid #797979;
					display: inline-block;
					width: 100%;
					height: 288rpx;
				}

				.text {
					position: absolute;
					width: 100%;
					text-align: center;
					top: 100rpx;
					left: 0;
					color: #ccc;
					font-size: 24rpx;
				}

				.btn-paste {
					position: absolute;
					width: 120rpx;
					height: 44rpx;
					line-height: 44rpx;
					//top: 144rpx;
					bottom: 100rpx;
					left: 50%;
					margin-left: -60rpx;
					border: 1px solid #797979;
					border-radius: 5px;
					z-index: 2;
				}
			}

			.btn-login {
				margin: 24rpx 0;
				display: flex;
				justify-content: center;
				align-items: center;
				line-height: 1;
			}

			.text {
				text-align: right;
				line-height: 28rpx;
				color: #797979;
				font-size: 24rpx;
			}

			.logo {
				height: 44rpx;
				width: 135rpx;
				display: inline-block;
				margin-top: 50rpx;
			}
		}
	}
</style>
