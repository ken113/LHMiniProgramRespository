<template>
	<view class="user-means">
		<view class="lh-title">{{traveller.TravellerName}}附加资料</view>

		<view class="user-means-box lhform">

			<view :class="rules.Height ? 'error-item':'' ">
				<view class="uib-item">
					<view class="item-left">身高</view>
					<view class="item-right">
						<input class=" ipt" v-model="traveller.Height" @blur="inputHeight" placeholder="如：175" />
						<text class="txt">CM</text>
					</view>
				</view>
				<view class="error-text">{{rules.Height}}</view>
			</view>
			
			<view :class="rules.Weight ? 'error-item':'' ">
			<view class="uib-item">
				<view class="item-left">体重</view>
				<view class="item-right">
					<input class="ipt" v-model="traveller.Weight" @blur="inputWeight" placeholder="如：65" />
					<text class="txt">KG</text>
				</view>
			</view>
			<view class="error-text">{{rules.Weight}}</view>
			</view>
			
			<view :class="rules.ShoesSize ? 'error-item':'' ">
			<view class="uib-item">
				<view class="item-left">鞋子码数</view>
				<view class="item-right">
					<input v-model="traveller.ShoesSize" @blur="inputShoesSize" placeholder="如：43" />
				</view>
			</view>
			<view class="error-text">{{rules.ShoesSize}}</view>
			</view>
			
			<view :class="rules.ClothesSize ? 'error-item':'' ">
			<view class="uib-item">
				<view class="item-left">衣服码数</view>
				<view class="item-right">
					<input v-model="traveller.ClothesSize" @blur="inputClothesSize" placeholder="如：XL" />
				</view>
			</view>
			<view class="error-text">{{rules.ClothesSize}}</view>
			</view>
			
			<view :class="rules.GlassesNum ? 'error-item':'' ">
			<view class="uib-item">
				<view class="item-left">近视度数</view>
				<view class="item-right">
					<input v-model="traveller.GlassesNum" @blur="inputGlassesNum" placeholder="如：200" />
				</view>
			</view>
			<view class="error-text">{{rules.GlassesNum}}</view>
			</view>
			
		</view>

		<view class="user-means-tips">
			<text class="text">参加深潜后18小时不能乘坐飞机，否则会对身体造成伤害，请检查您的航班时间在深潜之后至少18小时！</text>
			<br />
			<text
				class="text">如您点击保存按钮并填写了深潜需要的附加资料后，代表您已经知晓以上提示。浪花朵朵已尽到告知义务，对因此带来的无法参加深潜，航班改签，以及造成的身体伤害等全部后果不承担任何责任！</text>
		</view>
		<view class="user-means-bottom">
			<button class="btn-primary" @tap="saveTraveller">保存</button>
		</view>
	</view>
</template>

<script>
	import util from '@/common/util.js';
	export default {
		data() {
			return {
				traveller: {
					TravellerName: '',
					TravellerEnname: '',
					PassportNo: '',
					TravellerSex: '',
					Height: '',
					Weight: '',
					ShoesSize: '',
					ClothesSize: '',
					GlassesNum: ''
				},
				rules: {
					Height: '',
					Weight: '',
					ShoesSize: '',
					ClothesSize: '',
					GlassesNum: ''
				},
				pageType:0,
			};
		},
		onLoad(options) {
			const {
				traveller,
				pageType
			} = options;
			this.pageType = pageType;
			this.traveller = JSON.parse(traveller || '{}');
		},
		methods: {
			inputHeight(e) {
				const value = e ? e.detail.value.trim() : this.traveller.Height;
				let error = '';
				if (!value) {
					error = '';
				} else {
					if (!util.isNumber(value)) {
						error = '请填写正确的身高';
					}
				}
				this.rules.Height = error;
			},
			inputWeight(e){
				const value = e ? e.detail.value.trim() : this.traveller.Weight;
				let error = '';
				if (!value) {
					error = '';
				} else {
					if (!util.isNumber(value)) {
						error = '请填写正确的体重';
					}
				}
				this.rules.Weight = error;
			},
			inputShoesSize(e){
				const value = e ? e.detail.value.trim() : this.traveller.ShoesSize;
				let error = '';
				if (!value) {
					error = '';
				} else {
					if (!util.isNumber(value)) {
						error = '请填写正确的鞋子码数';
					}
				}
				this.rules.ShoesSize = error;
			},
			inputClothesSize(e){
				const value = e ? e.detail.value.trim() : this.traveller.ClothesSize;
				let error = '';
				if (!value) {
					error = '';
				} else {
					if (!/^[a-zA-Z]+$/.test(value)) {
						error = '请填写正确的衣服码数';
					}
				}
				this.rules.ClothesSize = error;
			},
			inputGlassesNum(e){
				const value = e ? e.detail.value.trim() : this.traveller.GlassesNum;
				let error = '';
				if (!value) {
					error = '';
				} else {
					if (!util.isNumber(value)) {
						error = '请填写正确的近视度数';
					}
				}
				this.rules.GlassesNum = error;
			},
			saveTraveller() {
				
				this.inputHeight();
				this.inputClothesSize();
				this.inputGlassesNum();
				this.inputShoesSize();
				this.inputWeight();
				
				this.$nextTick(() =>{
					const {
						Height,
						Weight,
						ShoesSize,
						ClothesSize,
						GlassesNum
					} = this.rules;
					
					if (Height || Weight || ShoesSize || ClothesSize || GlassesNum) {
						return;
					}
					const traveller = {
						...this.traveller
					};
					
					if( traveller.TravellerID){
						this.$sendRequest({
							url: "/WxOpen/UpdateTraveller",
							method: "POST",
							data: {
								traveller
							},
						}).then(res => {
							if (res.Code === 200) {
								uni.navigateTo({
									url: '/pages/user/edit_visitor?traveller=' + JSON.stringify(this.traveller)
								});
							}
						})
					}else{
						uni.navigateTo({
							url: '/pages/user/edit_visitor?pageType=1&traveller=' + JSON.stringify(this.traveller)
						});
						
					}
				});
				
			},
		},
	};
</script>

<style lang="scss" scoped>
	.user-means {
		font-size: 20rpx;

		.title {
			height: 56rpx;
			line-height: 56rpx;
			font-size: 20rpx;
			color: #999999;
			padding-left: 24rpx;
		}

		.user-means-tips {
			padding: 24rpx;
			font-size: 20rpx;
			color: #ccc;

			.text {
				padding-left: 34rpx;
			}
		}

		.user-means-box {
			background: #ffffff;
			//border-bottom: 1px solid #eeeeee;

			.uib-item {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				height: 80rpx;
				//border-top: 1px solid #eeeeee;
				position: relative;


				.item-right {


					.txt {
						position: absolute;
						top: 0;
						right: 24rpx;
						height: 80rpx;
						line-height: 80rpx;
					}
				}
			}
		}

		.user-means-bottom {
			margin-top: 15rpx;
			padding: 0 24rpx;
		}
	}
</style>
