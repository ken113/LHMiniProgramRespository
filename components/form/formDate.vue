<template>
	<view class="lhform form-flight-time">
		<!-- yyyy-mm-dd -->
		<view v-for="(element,index) in initFormData.elements" :key="index"
			:class="form[index].errorText ? 'error-item':'' ">
			<view class="uib-item">
				<view class="item-left">{{ element.name }}</view>
				<view class="item-right" @tap="selectDate(index)">
					<input class="ipt" disabled :placeholder="element.tips || 'YYYY-MM-DD'" v-model="form[index].value" />
					<text class="iconright iconfont">&#xe602;</text>
				</view>
			</view>
			<view class="error-text">{{form[index].errorText}}</view>
		</view>

		<LHCalendar ref="lhcalendar" :value="calendarValue" type="date" @confirm="confirmDate" @cancel="cancelDate"></LHCalendar>

	</view>
</template>

<script>
	import util from '@/common/util.js';
	import LHCalendar from '../LHCalendar.vue'
	export default {
		components: {
			LHCalendar
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
				selectType: null,
				saveType:1,
				calendarValue:'',
			}
		},
		created() {

			let data = null;
			if (this.orderDetail.Product.ElementsValue && this.orderDetail.Product.ElementsValue !== '{}') {
				let ElementsValue = JSON.parse(this.orderDetail.Product.ElementsValue);
				data = ElementsValue[this.initFormData.componentItem];
			}
			this.initFormData.elements.forEach(item => {
				let _value = '',
					errorText = '';

				if (data && data.formData[item.code]) {
					const {
						value,
						tipsClass,
						formTips
					} = data.formData[item.code];
					_value = value;

					if (tipsClass.indexOf('tips') > -1) {
						errorText = formTips;
					}
				}
				this.form.push({
					code: item.code,
					value: _value,
					errorText,
					tips: item.tips
				});
			});
		},
		methods: {
			selectDate(index) {
				if( this.orderDetail.CustomerState !== 0 && this.orderDetail.CustomerState !== 20){
					return;
				}
				this.selectType = index;
				this.$refs.lhcalendar.showCalendar();
				this.calendarValue = this.form[this.selectType].value;
			},
			confirmDate(value) {
				this.form[this.selectType].value = value;
			},
			cancelDate() {
				this.validateFiles();
			},
			validateFiles() {
				if (this.initFormData.mandatory === '1') {
					this.form.forEach((item, index) => {
						if (!item.value) {
							this.form[index].errorText =  '请选择正确的日期';
						}
					})
				}

			},
			getFiledsValue(type) {
				
				if( type === 1){
					this.validateFiles();
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
						value,
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
