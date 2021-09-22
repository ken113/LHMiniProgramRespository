<template>
	<view class="lhform form-select">
		<!-- <view class="uib-item">
			<view class="item-left">服务场次</view>
			<view class="item-right" @tap="clickPicker">
				<input placeholder="请选择" v-model="pickerValue" />
			</view>
		</view> -->

		<view v-for="(element,index) in initFormData.elements" :key="index"
			:class="form[index].errorText ? 'error-item':'' ">
			<view class="uib-item">
				<view class="item-left">{{ element.name }}</view>
				<view class="item-right" >
					<!-- <input class="input"  disabled :placeholder="element.tips || '请选择'" v-model="form[index].value" /> -->
					<picker class="input" @change="bindPickerChange" :value="pickerValue" :range="pickerList">
						<input class="input" disabled :placeholder="element.tips || '请选择'"
							v-model="form[index].value" />
					</picker>
				</view>
			</view>
			<view class="error-text">{{form[index].errorText}}</view>
		</view>

		<LHPicker ref="wzpPicker" mode="one" :pickerList="pickerList" :defaultIndex="defaultIndex"
			@closePicker="closePicker" @onConfirm="onConfirm"></LHPicker>
	</view>
</template>

<script>
	import LHPicker from './../LHPicker.vue';

	export default {
		components: {
			LHPicker
		},
		props: {
			orderDetail: {
				type: Object,
				default: function() {
					return {};
				},
			},
			initFormData: {
				type: Object,
				default: function() {
					return {};
				},
			},
		},
		data() {
			console.log(this.initFormData);
			return {
				form: [],
				selectType: 0,
				pickerValue: -1,
				pickerList: [],
				defaultIndex: [0],
				array: ['中国', '美国', '巴西', '日本'],
				index: 0,
			};
		},
		created() {
			this.initFormData.selectList.forEach((item, index) => {
				// this.pickerList.push({
				// 	label: item,
				// 	value: index
				// });
				this.pickerList.push(item)
			})

			let data = null;
			if (this.orderDetail.Product.ElementsValue && this.orderDetail.Product.ElementsValue !== '{}') {
				let ElementsValue = JSON.parse(this.orderDetail.Product.ElementsValue);
				data = ElementsValue[this.initFormData.componentItem];
			}
			this.initFormData.elements.forEach(item => {
				let _value = '',
					errorText = '';

				if (data && data.formData[item.code]) {
					let {
						value,
						tipsClass,
						formTips
					} = data.formData[item.code];
					if (value === '-1') {
						_value = '';
					} else {
						//_value = this.pickerList[value * 1].label;
						_value = this.pickerList[value*1]
						this.pickerValue = value * 1;
						this.defaultIndex = [value * 1];
					}

					if (tipsClass.indexOf('tips') > -1) {
						errorText = formTips;
					}
				}
				this.form.push({
					code: item.code,
					value: _value,
					errorText,
					tips: item.tips,
				});
			});


		},
		methods: {
			bindPickerChange(e) {
				this.form[0].value = this.pickerList[e.target.value];
				this.pickerValue = e.target.value;
				if( e.target.value > -1 ){
					this.form[0].errorText = '';
				}
			},
			clickPicker() {
				if (this.orderDetail.CustomerState !== 0 && this.orderDetail.CustomerState !== 20) {
					return;
				}
				this.defaultIndex = [0];
				this.$refs.wzpPicker.showPicker();
			},
			onConfirm(e) {
				this.form[0].value = this.pickerList[e[0]].label;
				this.form[0].errorText = '';
				this.pickerValue = e[0];
				this.$refs.wzpPicker.closePicker();
			},
			closePicker() {
				if (!this.form[this.selectType].value && this.initFormData.mandatory === '1') {
					let tips = '请选择';
					this.form[this.selectType].errorText = tips;
				}
			},
			getFiledsValue(type) {
				if (type === 1) {
					this.closePicker();
				}
				const ElementsValue = {};
				const ServiceItemTemplteValue = {};
				let hasError = [];
				ElementsValue[this.initFormData.componentItem] = {
					componentInfo: this.initFormData,
					formData: {}
				};
				this.form.forEach(item => {
					const {
						value,
						errorText,
						tips
					} = item;
					let tipsClass = errorText ? 'help-inline tips' : 'help-inline';
					let formTips = errorText ? errorText : tips;
					ElementsValue[this.initFormData.componentItem].formData[item.code] = {
						value: this.pickerValue + '',
						text: value,
						formTips,
						tipsClass
					};
					ServiceItemTemplteValue[item.code] = value;
					if (errorText) {
						hasError.push(errorText);
					}
				});
				return {
					ElementsValue,
					ServiceItemTemplteValue,
					hasError
				};
			}
		}
	}
</script>

<style lang="scss">
</style>
