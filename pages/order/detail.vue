<template>
	<view class="order-detail">
		<web-view  :src="detailUrl"></web-view>
		<!-- <view class="detail-top">
			<image class="logo" :style="{backgroundImage:`url(${imageLogo})`,backgroundSize: 'cover'}" />
			<text class="title">确认单 Voucher</text>
		</view>
		<view :class=" 'order-status ' + orderStatusColor[orderStatus]">
			<text class="iconfont" v-if="orderStatus===3">&#xe8a9;</text>
			<text class="iconfont" v-if="orderStatus===6">&#xe8ad;</text>
			<text class="iconfont" v-if="orderStatus===11">&#xe86d;</text>
			<text class="iconfont" v-if="orderStatus===14">&#xe8a9;</text>
			<text class="iconfont" v-if="orderStatus===15">&#xe8a9;</text>
			<text class="iconfont" v-if="orderStatus===4">&#xe8a9;</text>
			<text class="text">{{ orderStatusMap[orderStatus] }}</text>
		</view>
		<view class="template">
			<web-view :webview-styles="webviewStyles" src="http://order.dodotour.cn/Orders/Details/1151324"></web-view>
		</view>
		<view class="detail-bottom">
			<image class="qr" :style="{backgroundImage:`url(${imageQr})`,backgroundSize: 'cover'}" />
			<view class="marktips">
				<text class="one-line">微信扫码添加</text>
				<text class="one-line">快速优惠预订</text>
				<text class="one-line">行程专属管家</text>
				<text class="one-line">尊享私人服务</text>
			</view>
			<view class="line-vertical"></view>
			<view class="right">
				产品服务信息：本产品由SupplierEnName提供服务，本公司不是组团社，仅代游客进行预订，一切责任由提供产品的当地旅游经营者承担。
			</view>
		</view> -->
	</view>
</template>

<script>
	import imageLogo from '@/static/dodotour_logo_cn_color.png';
	import imageQr from '@/static/dodotour_tmall_shop.jpg';
	export default {
		data() {
			return {
				imageLogo,
				imageQr,
				detailUrl:'',
				orderId: 0,
				orderStatus: -1,
				orderStatusMap: {
					0: "未填写",
					1: "待核对",
					2: "已核对",
					3: "已发送",
					4: "新单已接",
					5: "确认待检",
					6: "已确认",
					7: "拒绝待检",
					8: "已拒绝",
					9: "请求取消",
					10: "取消待检",
					11: "已取消",
					12: "请求变更",
					13: "已作废",
					14: "取消已接",
					15: "变更已接",
				},
				orderStatusColor: {
					3: 'yfs',
					4: 'xdyj',
					14: 'qxyj',
					15: 'bgyj',
					11: 'cancel',
					6: 'ok'
				},
			}
		},
		onLoad(options) {
			const {
				id
			} = options;
			this.orderId = id;
			//this.detailUrl = 'https://my.dodotour.cn/Orders/Details/64DB1BDE8DDD6BC7A217BE3D79ED04A5F52348103D17B5A4B21C160D06EAF99087404AFA4375D6150830C85979165A2BFD60D22AFF262C1416A647EC8D4F6928A9199EA5D9D93305C882155CE07DFF6E3591FD3F0FA6958C4A02AF8D6F2683CA78435924A2F65159A93DD6F9FB13BF0CC976887A53FA12C1961616C0618AEF29';
		},
		mounted() {
			this.encrypteOderID();
		},
		methods: {

			encrypteOderID() {
				uni.showLoading({
					title: '加载中'
				});
				this.$sendRequest({
					url: "/WxOpen/EncrypteOderID",
					method: "GET",
					data: {
						id: this.orderId
					},
				}).then(res => {
					uni.hideLoading();
					if (res.Code === 200) {
						//this.orderStatus = res.data.Status;
						//this.html = res.data.html;
						this.detailUrl = 'https://my.dodotour.cn/Orders/Details/' + res.data;
					}
				});
			}
		},
	}
</script>

<style lang="scss" scoped>
	.order-detail {
		padding: 24rpx;

		.detail-top {

			display: flex;
			height: 48rpx;
			justify-content: center;
			align-items: center;

			.logo {
				width: 250rpx;
				height: 48rpx;
			}

			.title {
				font-size: 28rpx;
				font-weight: 600;
			}
		}

		.order-status {
			margin-top: 20rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			font-size: 28rpx;
			display: flex;
			    justify-content: center;
			    align-items: center;
			
			.iconfont{
				margin-right: 20rpx;
				font-weight: 600;
			}
			&.cancel {
				background: #C9C9C9;
				color: red;
			}
			&.yfs{
				background: #66FFCC;
			}
			&.ok {
				background: #009DD9;
				color: #fff;
			}
			&.xdyj{
				background: #66FFCC;
			}
			&.qxyj {
				background: #66FFCC;
			}

			&.bgyj {
				background: #66FFCC;
			}
		}
		.detail-bottom{
			display: flex;
			align-items: center;
			
			.qr{
				height: 150rpx;
				width: 150rpx;
			}
			.marktips{
				width: 150rpx;
				font-size:24rpx;
				line-height: 34rpx;
				    margin-top: 10rpx;
				.one-line{
					
				}
			}
			.line-vertical{
				display: inline-block;
				vertical-align: middle;
				height: 140rpx;
				border-right: 1px solid black;
				margin:0 10rpx;
				
			}
			.right{
				flex: 1;
				font-size: 23rpx;
				font-weight: 600;
				line-height: 34rpx;
			}
		}
	}
</style>
<style>
	table > thead > tr > th,
	table > tbody > tr > th,
	table > tfoot > tr > th,
	table > thead > tr > td,
	table > tbody > tr > td,
	table > tfoot > tr > td {
		border: 1px solid #dddddd;
	}
	table > thead > tr > th,
	table > thead > tr > td {
		border-bottom-width: 2px;
	}

	table{
		table-layout: fixed;
		font-size:9px;
		border: 1px solid #dddddd;
        font-family: "Microsoft YaHei Tahoma";
        line-height: 1.42857143;
        color: #000000;
        clear: both;
        max-width: none !important;

        border-collapse: collapse !important;
	}
	table td{
		word-break:break-all;
		padding-left:1px;
		padding-right:1px;
		word-wrap:break-word

	}
	table .align-left{
		text-align:left;
	}
	table .align-center{
		text-align:center;
	}

	table .align-right{
		text-align:right;
	}
	table .font9{
		font-size:9pt;
	}
	table .font12{
		font-size:12pt;

	}
	table .font14{
		font-size:14pt;

	}
	table.template .font18{
		font-size:18pt;

	}
	table.template .font25{
		font-size:25pt;

	}
	table.template .font50{
		font-size:50pt;

	}
	table .bold{
		font-weight:bold;
	}

	.divcss1{color:#F00}
	table td p{ margin:0; }
</style>
<style>
	table.template > thead > tr > th,
	table.template > tbody > tr > th,
	table.template > tfoot > tr > th,
	table.template > thead > tr > td,
	table.template > tbody > tr > td,
	table.template > tfoot > tr > td {
		border: 1px solid #dddddd;
	}
	table.template > thead > tr > th,
	table.template > thead > tr > td {
		border-bottom-width: 2px;
	}

	table.template{
		table-layout: fixed;
		font-size:9px;
		border: 1px solid #dddddd;
        font-family: "Microsoft YaHei Tahoma";
        line-height: 1.42857143;
        color: #000000;
        clear: both;
        max-width: none !important;

        border-collapse: collapse !important;
	}
	table.template td{
		word-break:break-all;
		padding-left:1px;
		padding-right:1px;
		word-wrap:break-word

	}
	table.template .align-left{
		text-align:left;
	}
	table.template .align-center{
		text-align:center;
	}

	table.template .align-right{
		text-align:right;
	}
	table.template .font9{
		font-size:9pt;
	}
	table.template .font12{
		font-size:12pt;

	}
	table.template .font14{
		font-size:14pt;

	}
	table.template .font18{
		font-size:18pt;

	}
	table.template .font25{
		font-size:25pt;

	}
	table.template .font50{
		font-size:50pt;

	}
	table.template .bold{
		font-weight:bold;
	}

	.divcss1{color:#F00}
</style>