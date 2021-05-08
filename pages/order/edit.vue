<template>
	<view class="order-edit">
		<view class="lh-title">基本资料</view>
		
		<view class="lhform">
			<view class="uib-item" style="border-bottom:1px solid #eeeeee;">
				<view class="item-left">基本资料</view>
				<view class="item-right">
					<navigator url="/pages/order/base" open-type="navigate" style="width: 100%;">
						<text class="iconright iconfont lhddright"></text>
						<text class="text">袁丁，+86 13826519281</text>
					</navigator>
				</view>
			</view>
		</view>
		
		<view class="order-extra">王权免税店海鲜自助餐购（特价款）（全岛免费接送）</view>
		<view class="order-extra-number">深潜一次：2人； 深潜两次：1人； 仅浮潜：1人；</view>

		<view class="form-bottom">
			<view class="lhform">
				<view class="uib-item">
					<view class="item-left">人数</view>
					<view class="item-right">2 成人　0 儿童　0 婴儿</view>
				</view>
			</view>
			<view class="lhform">
			<view class="uib-item">
				<view class="item-left">参加行程的客人</view>
				<view class="item-right">
					<navigator url="/components/selectPerson" open-type="navigate" style="width: 100%;">
						<text class="iconright iconfont lhddright"></text>
						<text class="text">已选 1 人</text>
					</navigator>
				</view>
			</view>
			</view>
			<travelDate></travelDate>
			<flightNumber></flightNumber>
			<flightTime></flightTime>
			<formSelect></formSelect>
			<hotel></hotel>
			<view class="notice">
				<radio style="transform:scale(0.6);" color="#007AFF"></radio>
				<view class="text">
					我已打开并阅读《<text class="link">旅游风险须知和安全提示告知书</text>》，我承诺转达全部内容给全体参与以上行程的人员，并代表他们进行签字。
				</view>
			</view>
		</view>
		
		<view class="form-btn">
			<button class="save-btn">提交保存</button>
			<button class="save2-btn">暂存，稍后继续填写</button>
		</view>
	</view>
</template>

<script>
	import travelDate from '../../components/form/travelDate.vue';
	import flightNumber from '../../components/form/flightNumber.vue'
	import flightTime from '../../components/form/flightTime.vue'
	import formSelect from '../../components/form/formSelect.vue'
	import hotel from '../../components/form/hotel.vue'
	export default {
		data() {
			return {
				title: "Hello",
			};
		},
		components:{
			travelDate,
			flightNumber,
			flightTime,
			formSelect,
			hotel
		},
		onLoad() {},
		methods: {},
	};
</script>

<style lang="scss" scoped>
	.order-edit {
		margin-bottom: 30rpx;

		.order-extra {
			font-size: 24rpx;
			height: 80rpx;
			line-height: 80rpx;
			padding: 0 24rpx;
			color: #999;
		}

		.order-extra-number {
			font-size: 24rpx;
			height: 80rpx;
			line-height: 80rpx;
			padding: 0 24rpx;
			background: #ffffff;
			border-top: 1px solid #eeeeee;
			border-bottom: 1px solid #eeeeee;
			color: #999;
		}

		.form-bottom {
			margin-top: 20rpx;
		}
		.notice{
			font-size: 24rpx;
			height: 80rpx;
			padding: 0 24rpx;
			color: #999;
			display: flex;
			align-items: center;
			background: #ffffff;
			border-top: 1px solid #eeeeee;
			border-bottom: 1px solid #eeeeee;
			.text{
				font-size: 22rpx;
				padding: 5rpx 0;
				line-height: 24rpx;
			}
			.link{
				font-size: 24rpx;
				color:#4992E7;
			}
		}
		.form-btn{
			
			.save-btn{
				display: block;
				margin:24rpx;
				height: 90rpx;
				line-height: 90rpx;
				background: #4992E7;
				color:#fff;
				font-size:24rpx;
				border-radius: 0;
			}
			.save2-btn{
				display: block;
				height: 90rpx;
				line-height: 90rpx;
				background: #fff;
				border:1px solid #4992E7;
				font-size:24rpx;
				margin:0 24rpx;
				border-radius: 0;
			}
		}
	}
</style>
