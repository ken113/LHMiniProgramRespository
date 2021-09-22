<template>
	<view class="lhform ">
		<view v-for="(element,index) in initFormData.elements" :key="index"
			:class="form[index].errorText ? 'error-item':'' ">
			<view class="uib-item textarea">
				<view class="item-left">{{ element.name }}</view>
				<view class="item-right">
					<textarea @blur="changeInput" placeholder-style="" class="textarea"
						:disabled="orderDetail.CustomerState !== 0 && orderDetail.CustomerState !== 20 " :placeholder="element.tips || '请填写'" v-model="form[index].value" />
				</view>
			</view>
			<view class="error-text">{{form[index].errorText}}</view>
		</view>
	</view>
</template>

<script>
	export default {
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
			};
		},
		created() {
			let data = null;
			if (this.orderDetail.Product.ElementsValue && this.orderDetail.Product.ElementsValue !== '{}') {
				let ElementsValue = JSON.parse(this.orderDetail.Product.ElementsValue);
				data = ElementsValue[this.initFormData.componentItem];
			}
			this.initFormData.elements.forEach( item=>{
				let _value = '',
					errorText = '';
				
				if( data && data.formData[item.code] ){
					const {
						value, tipsClass, formTips
					} = data.formData[item.code];	
					
					_value = value;
					
					if (tipsClass.indexOf('tips') > -1) {
						errorText = formTips;
					}
				}
				this.form.push({
					code:item.code,
					value:_value,
					errorText,
					tips:item.tips,
				});
			});
		},
		methods: {
			changeInput(e) {
				const value = e ? e.detail.value.trim() : this.form[0].value;
				let tips = '';
				if (this.initFormData.mandatory === '1' && !value) {
					tips =  '请填写';
				}
				this.form[0].errorText = tips;
			},
			getFiledsValue(type){
				if( type === 1){
					this.changeInput();
				}
				
				const ElementsValue = {};
				const ServiceItemTemplteValue = {};
				let hasError = [];
				ElementsValue[this.initFormData.componentItem] = {
					componentInfo:this.initFormData,
					formData:{}
				};
				this.form.forEach( item=>{
					const { value,errorText,tips } = item;
					let tipsClass = errorText ? 'help-inline tips' : 'help-inline';
					let formTips = errorText ? errorText : tips;
					ElementsValue[this.initFormData.componentItem].formData[item.code] = {
						value,
						text:value,
						formTips,
						tipsClass
					};
					ServiceItemTemplteValue[ item.code ] = value;
					if( errorText ){
						hasError.push( errorText );
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
