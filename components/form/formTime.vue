<template>
	<view class="lhform form-select">
		
		<view v-for="(element,index) in initFormData.elements" :key="index" :class="form[index].errorText ? 'error-item':'' ">
			<view class="uib-item">
				<view class="item-left">{{ element.name }}</view>
				<view class="item-right" >
					<!-- <input class="input" disabled :placeholder="element.tips || '请选择'" v-model="form[index].value"  /> -->
					
					<picker class="input" mode="multiSelector" :range="times" @change="bindPickerChange" :value="selectTime" >
						<input class="input" disabled :placeholder="element.tips || '请选择'"
							v-model="form[index].value" />
					</picker>
				</view>
			</view>
			<view class="error-text">{{form[index].errorText}}</view>
		</view>
		
		<view :class="{'calendar-mask':true,'show-year':showPopup }" @tap="closeCalendar" catchtouchmove="true"
			v-show="showPopup"></view>
		<view class="select-time-popup" :class="{'showPopup':showPopup}">
			<view class="top">
				<text @tap="cancel">取消</text>
				<text @tap="complate">确定</text>
			</view>
			<view class="center">
				<picker-view :value="selectTime" @change="bindChangeTime" class="year-month-box2"
					:indicator-style="indicatorStyle2">
					<picker-view-column>
						<view class="year-item2" v-for="(item,index) in hours" :key="index">{{item}}时</view>
					</picker-view-column>
					<picker-view-column>
						<view class="month-item2" v-for="(item,index) in mins" :key="index">{{item}}分</view>
					</picker-view-column>
				</picker-view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import LHPicker from './../LHPicker.vue';
	import util from '@/common/util.js';
	
	export default {
		components:{
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
			let hourKey = [
				{ key: '凌晨0点', value: '00' }, { key: '凌晨1点', value: '01' }, { key: '凌晨2点', value: '02' }, { key: '凌晨3点', value: '03' }, { key: '凌晨4点', value: '04' },
				{ key: '凌晨5点', value: '05' }, { key: '上午6点', value: '06' }, { key: '上午7点', value: '07' }, { key: '上午8点', value: '08' }, { key: '上午9点', value: '09' },
				{ key: '上午10点', value: '10' }, { key: '中午11点', value: '11' }, { key: '中午12点', value: '12' }, { key: '下午13点', value: '13' }, { key: '下午14点', value: '14' },
				{ key: '下午15点', value: '15' }, { key: '下午16点', value: '16' }, { key: '下午17点', value: '17' }, { key: '下午18点', value: '18' }, { key: '晚上19点', value: '19' },
				{ key: '晚上20点', value: '20' }, { key: '晚上21点', value: '21' }, { key: '晚上22点', value: '22' }, { key: '晚上23点', value: '23' },
			];
			console.log( this.initFormData);
			let hours = [];
			for (let i = 0; i < 24; i++) {
				//hours.push(i > 9 ? i : '0' + i);
				hours.push( hourKey[i].key );
			}
			let mins = [];
			for (let i = 0; i < 60; i++) {
				let min = i > 9 ? i : '0' + i;
				mins.push( min + '分');
			}
			return {
				hourKey,
				form: [],
				selectTime: [0,0],
				hours,
				mins,
				indicatorStyle: `height:100%;`,
				showPopup:false,
				indicatorStyle2: `height: 50px;`,
				selectText:'',
				times:[ hours,mins],
				
			};
		},
		created(){
			let data = null;
			if (this.orderDetail.Product.ElementsValue && this.orderDetail.Product.ElementsValue !== '{}') {
				let ElementsValue = JSON.parse(this.orderDetail.Product.ElementsValue);
				data = ElementsValue[this.initFormData.componentItem];
			}
			this.initFormData.elements.forEach( item=>{
				let _value = '',
					errorText = '';
					
				
				if( data && data.formData[item.code] ){
					
					let {
						hour,minutes,text,value, tipsClass, formTips
					} = data.formData[item.code];	
					
					_value = text;
					hour = hour == '-1' ? 0 : hour;
					minutes = minutes == '-1' ? 0 :minutes;
					
					this.selectTime = [hour*1,minutes*1];
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
		methods:{
			bindPickerChange(e) {
				const [ hours,mins ] = e.detail.value;
				this.form[0].value = this.times[0][hours] + ':' + this.times[1][mins];
				
				this.selectTime = e.detail.value;
				
				this.validateTime();
			},
			bindChangeTime(e) {
				 const val = e.detail.value;
				// //this.selectTime = this.hours[val[0]] + ':' + this.mins[val[1]];
				// this.form[0].value = this.hours[val[0]] + ':' + this.mins[val[1]];
				// this.validateTime();
				this.selectTime = val;
			},
			cancel(){
				this.showPopup = false;
			},
			complate(){
				const [ hour,minutes ] = this.selectTime;
				this.form[0].value = this.hours[hour]  + ':' + this.mins[minutes];
	
				this.validateTime();
				this.showPopup = false;
			},
			showSelectTime(){
				this.showPopup = true;
			},
			validateTime(){
				let tips = '';
				const value = this.form[0].value;
				if( this.initFormData.mandatory === '1' && !value ){
					tips = '请选择';
				}
				if( value ){
					const { timeBefore,timeBeforeCheck,timeSince,timeSinceCheck } = this.initFormData;
					const thisValue = util.dateFormat(new Date(), 'd') + ' ' +  value.replace(/[\u4e00-\u9fa5]/g, "");
					if( timeBeforeCheck ){
						let timeBefore1 = util.dateFormat(new Date(), 'd') + ' ' +  timeBefore;
						if (+new Date(timeBefore1.replace(/-/g, "/")) < +new Date(thisValue.replace(/-/g, "/"))) {
							 tips = '不能晚于' + timeBefore;	
						}
					}
					if( timeSinceCheck ){
						let timeSince1 = util.dateFormat(new Date(), 'd') + ' ' +  timeSince;
						
						if (+new Date(timeSince1.replace(/-/g, "/")) > +new Date(thisValue.replace(/-/g, "/"))) {
							 tips = '不能早于' + timeSince;	
						}
					}
				}
				this.form[0].errorText = tips;
			},
			getFiledsValue(type){
				if( type === 1 ){
					this.validateTime();
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
					let hour = "-1",minutes = "-1";
					let _value = value.replace(/[\u4e00-\u9fa5]/g, "").split(':');
					if( _value.length > 1){
						hour = _value[0];
						minutes = _value[1];
					}
					ElementsValue[this.initFormData.componentItem].formData[item.code] = {
						hour,
						minutes,
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

<style lang="scss" scoped>
	.time-box {
		width: 260rpx;
		height: 100%;
	
		.item {
			align-items: center;
			justify-content: center;
			text-align: center;
			display: flex;
		}
	}
	
	.calendar-mask {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		z-index: 50;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
	
		&.show-year {
			z-index: 101;
		}
	}
	
	.select-time-popup {
		flex-direction: column;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 1002;
		width: 100%;
		//height: 600upx;
		background-color: #FFFFFF;
		transform: translateY(100%);
		transition: all 300ms ease;
	
		&.showPopup {
			transform: translateY(0) !important;
		}
	
		.top {
	
			justify-content: space-between;
			height: 80rpx;
			line-height: 80rpx;
			display: flex;
	
			text {
				width: 120rpx;
				font-size: 28rpx;
				font-weight: 500;
				display: block;
				text-align: center;
			}
		}
	
		.top text:first-child {
			color: #303030;
		}
	
		.top text:last-child {
			color: #4992E7;
		}
	
		.center {
			
			border-top: #eee 1upx solid;
	
			.year-month-box2 {
				width: 750rpx;
				height: 500rpx;
				margin-top: 20rpx;
				
				.year-item2 {
					height: 50px;
					align-items: center;
					justify-content: center;
					text-align: center;
					display: flex;
				}
	
				.month-item2 {
					height: 50px;
					align-items: center;
					justify-content: center;
					text-align: center;
					display: flex;
				}
			}
		}
	}
</style>
