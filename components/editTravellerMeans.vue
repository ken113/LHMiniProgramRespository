<template>
	<view class="user-means">

		<view class="top-visitor">
			<view class="lh-title">{{traveller.TravellerName || ''}}附加资料</view>
			<text class="iconfont close" v-if=" pageType=='4' || pageType=='5' " @tap="closeVisitor">&#xe86d;</text>
		</view>

		<view class="user-means-box lhform">

			<view :class="rules.Height ? 'error-item':'' "
				v-if="!initFormData || (initFormData && initFormData.Height)">
				<view class="uib-item">
					<view class="item-left">身高</view>
					<view class="item-right">
						<input class=" ipt" type="number" v-model="traveller.Height" @blur="inputHeight"
							placeholder="如：175" />
						<text class="txt">CM</text>
					</view>
				</view>
				<view class="error-text">{{rules.Height}}</view>
			</view>

			<view :class="rules.Weight ? 'error-item':'' "
				v-if="!initFormData || (initFormData && initFormData.Weight)">
				<view class="uib-item">
					<view class="item-left">体重</view>
					<view class="item-right">
						<input class="ipt" type="number" v-model="traveller.Weight" @blur="inputWeight"
							placeholder="如：65" />
						<text class="txt">KG</text>
					</view>
				</view>
				<view class="error-text">{{rules.Weight}}</view>
			</view>

			<view :class="rules.ShoesSize ? 'error-item':'' "
				v-if="!initFormData || (initFormData && initFormData.ShoesSize)">
				<view class="uib-item">
					<view class="item-left">鞋子码数</view>
					<view class="item-right">
						<input class="input" type="number" v-model="traveller.ShoesSize" @blur="inputShoesSize"
							placeholder="如：43" />
					</view>
				</view>
				<view class="error-text">{{rules.ShoesSize}}</view>
			</view>

			<view :class="rules.ClothesSize ? 'error-item':'' "
				v-if="!initFormData || (initFormData && initFormData.ClothesSize)">
				<view class="uib-item">
					<view class="item-left">衣服码数</view>
					<view class="item-right">
						<input class="input" v-model="traveller.ClothesSize" @blur="inputClothesSize"
							placeholder="如：XL" />
					</view>
				</view>
				<view class="error-text">{{rules.ClothesSize}}</view>
			</view>

			<view :class="rules.GlassesNum ? 'error-item':'' "
				v-if="!initFormData || (initFormData && initFormData.GlassesNum)">
				<view class="uib-item">
					<view class="item-left">近视度数</view>
					<view class="item-right">
						<input class="input" type="number" v-model="traveller.GlassesNum" @blur="inputGlassesNum"
							placeholder="如：200" />
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
		data() {
			return {
				traveller: {
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
			};
		},
		watch: {
			myTraveller: {
				deep: true,
				handler(n, o) {
					const meansInfo = uni.getStorageSync("meansInfo");

					if (n) {
						this.traveller = JSON.parse(JSON.stringify(n));
					} else {
						this.traveller = {
							Height: '',
							Weight: '',
							ShoesSize: '',
							ClothesSize: '',
							GlassesNum: ''
						}
					}
					if (meansInfo) {
						this.traveller = JSON.parse(meansInfo);
					}
				},
			}
		},
		mounted() {
			const meansInfo = uni.getStorageSync("meansInfo");

			if (this.myTraveller) {
				this.traveller = JSON.parse(JSON.stringify(this.myTraveller));
			}
			if (meansInfo) {
				this.traveller = JSON.parse(meansInfo);
			}
		},
		methods: {
			inputHeight(e) {
				let value = e ? e.detail.value.trim() : this.traveller.Height;
				let error = '';
				if (this.initFormData) {
					const Height = this.initFormData.Height,
						heightMin = this.initFormData.heightMin == '' ? -1 : this.initFormData.heightMin * 1,
						heightMax = this.initFormData.heightMax == '' ? -1 : this.initFormData.heightMax * 1,
						needExtraInfo = this.initFormData.needExtraInfo,
						heightMinChecked = this.initFormData.heightMinChecked,
						heightMaxChecked = this.initFormData.heightMaxChecked;
					if (!value && Height && needExtraInfo === '1') {
						error = '请填写';
					} else {
						if (!util.isNumber(value) && value) {
							error = '请填写正确的身高';
						} else {
							value = parseInt(value);
							if (value && heightMinChecked && value < heightMin) {
								error = '身高不能小于' + heightMin;
							}
							if (value && heightMaxChecked && value > heightMax) {
								error = '身高不能大于' + heightMax;
							}
						}
					}
				} else {
					if (!value) {
						error = '请填写';
					} else {
						if (!util.isNumber(value)) {
							error = '请填写正确的身高';
						}
					}
				}

				this.rules.Height = error;
			},
			inputWeight(e) {
				let value = e ? e.detail.value.trim() : this.traveller.Weight;
				let error = '';
				if (this.initFormData) {
					const Weight = this.initFormData.Weight,
						weightMinChecked = this.initFormData.weightMinChecked,
						weightMaxChecked = this.initFormData.weightMaxChecked,
						weightMin = this.initFormData.weightMin == '' ? -1 : this.initFormData.weightMin * 1,
						weightMax = this.initFormData.weightMax == '' ? -1 : this.initFormData.weightMax * 1,
						needExtraInfo = this.initFormData.needExtraInfo;

					if (!value && Weight && needExtraInfo === '1') {
						error = '请填写';
					} else {
						if (!util.isNumber(value)) {
							error = '请填写正确的体重';
						} else {
							value = parseInt(value);
							if (value && weightMinChecked && value < weightMin) {
								error = '体重不能小于' + weightMin;
							}
							if (value && weightMaxChecked && value > weightMax) {
								error = '体重不能大于' + weightMax;
							}
						}
					}
				} else {
					if (!value) {
						error = '请填写';
					} else {
						if (!util.isNumber(value) && value) {
							error = '请填写正确的体重';
						}
					}
				}

				this.rules.Weight = error;
			},
			inputShoesSize(e) {
				let value = e ? e.detail.value.trim() : this.traveller.ShoesSize;
				let error = '';
				if (this.initFormData) {
					const ShoesSize = this.initFormData.ShoesSize,
						needExtraInfo = this.initFormData.needExtraInfo;
					if (!value && ShoesSize && needExtraInfo === '1') {
						error = '请填写';
					} else {
						if (!util.isNumber(value) && value) {
							error = '请填写正确的鞋子码数';
						}
					}
				} else {
					if (!value) {
						error = '请填写';
					} else {
						if (!util.isNumber(value)) {
							error = '请填写正确的鞋子码数';
						}
					}
				}

				this.rules.ShoesSize = error;
			},
			inputClothesSize(e) {
				const value = e ? e.detail.value.trim() : this.traveller.ClothesSize;
				let error = '';
				if (this.initFormData) {
					const ClothesSize = this.initFormData.ClothesSize,
						needExtraInfo = this.initFormData.needExtraInfo;
					if (!value && ClothesSize && needExtraInfo === '1') {
						error = '请填写';
					} else {
						if (!/^[a-zA-Z]+$/.test(value) && value) {
							error = '请填写正确的衣服码数';
						}
					}
				} else {
					if (!value) {
						error = '';
					} else {
						if (!/^[a-zA-Z]+$/.test(value)) {
							error = '请填写正确的衣服码数';
						}
					}
				}

				this.rules.ClothesSize = error;
			},
			inputGlassesNum(e) {
				const value = e ? e.detail.value.trim() : this.traveller.GlassesNum;
				let error = '';
				if (this.initFormData) {
					const GlassesNum = this.initFormData.GlassesNum,
						needExtraInfo = this.initFormData.needExtraInfo;
					if ((value === '' || value === undefined) && GlassesNum && needExtraInfo === '1') {
						error = '请填写';
					} else {
						if (!util.isNumber(value) && value) {
							error = '请填写正确的近视度数';
						}
					}
				} else {
					if (!value) {
						error = '';
					} else {
						if (!util.isNumber(value)) {
							error = '请填写正确的近视度数';
						}
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

				this.$nextTick(() => {
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
					const meansInfo = {
						Height: traveller.Height,
						Weight: traveller.Weight,
						ShoesSize: traveller.ShoesSize,
						ClothesSize: traveller.ClothesSize,
						GlassesNum: traveller.GlassesNum,
					};

					uni.setStorageSync("meansInfo", JSON.stringify(meansInfo));

					if (this.pageType === '1') {
						//游客列表-新增附加资料
						uni.navigateBack();
						uni.$emit("closeMeans", {
							traveller
						});
						return;
					}
					if (this.pageType === '4') {
						this.$emit("showMeansPage", false, this.pageType);
					}
					if (traveller.TravellerID) {
						//meansInfo.TravellerID = traveller.TravellerID;
						this.$sendRequest({
							url: "/WxOpen/UpdateTraveller",
							method: "POST",
							data: {
								traveller,
							},
						}).then(res => {

							if (res.Code === 200) {
								if (this.pageType == '2') {
									//游客列表-修改附加资料
									uni.navigateBack();
									uni.$emit("closeMeans", {
										traveller
									});
								}
								if (this.pageType == '5') {
									this.$emit("showMeansPage", false, this.pageType);
								}
							} else {
								uni.showToast({
									title: res.Msg,
									icon: 'none',
								});
							}

						})
					}


				});

			},
			closeVisitor() {
				this.$emit("showMeansPage", false, this.pageType);
			}
		},
	};
</script>

<style lang="scss" scoped>
	.user-means {
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
