<template>
	<view class="user-visitor">
		<view class="visitor-list">

			<view class="visitor-item" v-for="traveller in  Travellers" :key="traveller.TravellerID"
				@tap="goToPage(traveller)">
				<view class="top">
					<view class="name-box">
						<text :class="  traveller.TravellerSex === 0 ? 'iconfont lhddmale' : 'iconfont lhddfemale' "></text>
						<text class="name">{{ traveller.TravellerName + ' ' + traveller.TravellerEnname }}</text>
					</view>
					<view class="edit" v-if="traveller.Height && traveller.ShoesSize && traveller.Weight">
						<text class="iconfont lhddyouji"></text>
					</view>
				</view>
				<view class="bottom">
					<view class="post">护照：{{ traveller.PassportNo }}</view>
					<view class="birthday">生日：{{ traveller.Birthday | filterDate }}</view>
				</view>
			</view>

			<!-- <view class="visitor-item">
				<view class="top">
					<view class="name-box">
						<text class="iconfont lhddfemale"></text>
						<text class="name">袁丁 YUANDING</text>
					</view>
					<view class="edit">
						<navigator url="/pages/user/edit_visitor" open-type="navigate">
							<text class="iconfont lhddyouji"></text>
						</navigator>
					</view>
				</view>
				<view class="bottom">
					<view class="post">护照：EH8750978</view>
					<view class="birthday">生日：1978-10-30</view>
				</view>
			</view>
			<view class="visitor-item">
				<view class="top">
					<view class="name-box">
						<text class="iconfont lhddmale"></text>
						<text class="name">袁丁 YUANDING</text>
					</view>
					<view class="edit">
						<text class="iconfont lhddyouji"></text>
					</view>
				</view>
				<view class="bottom">
					<view class="post">护照：EH8750978</view>
					<view class="birthday">生日：1978-10-30</view>
				</view>
			</view> -->


		</view>

		<view class="visitor-bottom">
			<view class="btn-box">
				<!-- <button class="btn-invite" open-type="share"><text class="iconfont">&#xe7dd;</text>邀请好友填写</button> -->
				<button class="btn-add" @tap="addVisitor"><text class="iconfont">&#xe7a7;</text>新增常用游客</button>
			</view>
		</view>


	</view>
</template>

<script>
	import util from '@/common/util.js';
	export default {
		data() {
			return {
				Travellers: [],
			};
		},
		onLoad() {
			
		},
		onShow(){
			this.getCustomer();
			uni.removeStorageSync('meansInfo');
		},
		filters: {
			filterDate(value) {
				return util.dateFormat(value, 'd');
			}
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
						this.Travellers = Travellers;
					}
				})
			},
			goToPage(traveller) {
				uni.navigateTo({
					url: '/pages/user/addTraveller?pageType=2&traveller=' + JSON.stringify(traveller)
				});
			},
			addVisitor() {
				uni.navigateTo({
					url: '/pages/user/addTraveller?pageType=1',
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.user-visitor {
		font-size: 20rpx;

		.visitor-list {
			padding: 0 24rpx;
			height: calc(100vh - 140rpx);
			overflow: auto;

			.visitor-item {
				background: #ffffff;
				border-radius: 10px;
				margin-top: 24rpx;
				padding: 12rpx 24rpx;

				.top {
					overflow: hidden;
					border-bottom: 1px solid #eeeeee;
					font-size: 0;
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 60rpx;

					.name-box {
						//float: left;
						font-size: 24rpx;

						.iconfont {
							font-size: 24rpx;
							padding-right: 10rpx;
						}

						.lhddmale {
							color: #4992e7;
						}

						.lhddfemale {
							color: #ff6600;
						}
					}

					.edit {
						//float: right;
						line-height: 24rpx;

						.iconfont {
							font-size: 36rpx;
							vertical-align: middle;
						}
					}
				}

				.bottom {
					overflow: hidden;
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 60rpx;
					
					.post {
						//float: left;
						font-size: 24rpx;
					}

					.birthday {
						//float: right;
						font-size: 24rpx;
					}
				}
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
				width: 300rpx;
				height: 65rpx;
				line-height: 65rpx;
				border: 1px solid #4992e7;
				border-radius: 0;
				margin-right: 24rpx;
				font-size: 24rpx;


			}

			.btn-add {
				width: 100%;
				//width: 442rpx;
				height: 65rpx;
				line-height: 65rpx;
				border: 1px solid #4992e7;
				border-radius: 0;
				font-size: 24rpx;
			}
		}

		.visitor-bottom {
			position: fixed;
			bottom: 50rpx;
			width: 100%;
			font-size: 24rpx;
			overflow: hidden;
		}
	}
</style>
