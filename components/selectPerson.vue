<template>
	<view class="select-person">
		<view class="top-buttom">
			<view class="btn-cancel">取消</view>
			<view class="text-num">已选1人</view>
			<view class="btn-ok">确定</view>
		</view>
		<view class="btn-box">
			<button class="btn-invite"><text class="iconfont">&#xe7dd;</text>邀请好友填写</button>
			<button class="btn-add"><text class="iconfont">&#xe7a7;</text>新增常用游客</button>
		</view>
		
		<view class="person-list">
			
			<view class="person-item">
				<view class="person-line">
					<radio class="person-radio" color="#007AFF" checked></radio>
					<view class="person-right">
						<text class="user-sex iconfont male">&#xe735;</text>
						<text class="user-name ">袁丁</text>
						<text class="user-enname">YUANDING</text>
						<text class="user-extra iconfont">&#xe8ac;</text>
						<text class="user-edit iconfont">&#xe8cf;</text>
					</view>
				</view>
			</view>
			
			<view class="person-item">
				<view class="person-line error">
					<radio class="person-radio" color="#007AFF" ></radio>
					<view class="person-right">
						<text class="user-sex iconfont female">&#xe735;</text>
						<text class="user-name ">妲己</text>
						<text class="user-enname">DAJI</text>
						<text class="user-extra iconfont">&#xe8ac;</text>
						<text class="user-edit iconfont">&#xe8cf;</text>
					</view>
				</view>
				<view class="person-error">需要填写信息</view>
			</view>
			
			<view class="person-item">
				<view class="person-line">
					<radio class="person-radio" color="#007AFF" ></radio>
					<view class="person-right">
						<text class="user-sex iconfont female">&#xe735;</text>
						<text class="user-name ">妲己2</text>
						<text class="user-enname">DAJI</text>
						<text class="user-extra iconfont">&#xe8ac;</text>
						<text class="user-edit iconfont">&#xe8cf;</text>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		name: "selectPerson",
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.select-person {
		.top-buttom {
			border-top: 1px solid #eeeeee;
			border-bottom: 1px solid #eeeeee;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			height: 60rpx;
			font-size:  24rpx;
			padding: 0  24rpx;

			.btn-cancel {
				font-size:  24rpx;
				color: #303030;
			}

			.text-num {
				font-size:  24rpx;
			}

			.btn-ok {
				font-size:  24rpx;
				color: #4992E7;
			}
		}

		.btn-box {
			margin-top: 20rpx;
			overflow: hidden;
			display: flex;
			//flex-direction: row;
			align-items: center;
			justify-content: space-between;
			padding: 0  24rpx;
			
			.iconfont{
				margin-right: 10rpx;
			}
			.btn-invite {
				width:  195rpx;
				height:  65rpx;
				line-height:  65rpx;
				border: 1px solid #4992e7;
				border-radius: 0;
				margin-right:  24rpx;
				font-size:  22rpx;
			}

			.btn-add {
				width:  442rpx;
				height:  65rpx;
				line-height:  65rpx;
				border: 1px solid #4992e7;
				border-radius: 0;
				font-size:  22rpx;
			}
		}
		.person-list{
			
			margin-top: 20rpx;
			
			.person-item{
				
				.person-line{
					padding: 0  24rpx;
					height:  60rpx;
					display: flex;
					align-items: center;
					
					&.error{
						
						.person-right{
							border-bottom: 1px solid #FF0000;
						}
					}
					.person-radio{
						transform:scale(0.6);
					}
					
					.person-right{
						width:100%;
						border-bottom: 1px solid #EEEEEE;
						height:  60rpx;
						line-height:  60rpx;
						margin-top: 10rpx;
						
						.user-sex{
							font-size: 24rpx;
							
							&.male{
								color: #4992e7;
							}
							&.female {
							  color: #ff6600;
							}
						}
						
						.user-name{
							margin: 0 10rpx;
							font-size: 24rpx;
						}
						.user-enname{
							margin: 0 10rpx;
							font-size: 24rpx;
						}
						.user-extra{
							font-size: 30rpx;
						}
						.user-edit{
							font-size: 32rpx;
							float: right;
						}
					}
				}
				.person-error{
					font-size: 18rpx;
					color:#ff0000;
					padding-left:75rpx;
					margin-top: 5rpx;
				}
			}
		}
	}
</style>
