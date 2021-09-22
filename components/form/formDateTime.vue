<template>
	<view class="lhform form-flight-time">
		<!-- yyyy-mm-dd hh:mm -->
		<view v-for="(element,index) in initFormData.elements" :key="index"
			:class="form[index].errorText ? 'error-item':'' ">
			<view class="uib-item">
				<view class="item-left">{{ element.name }}</view>
				<view class="item-right" @tap="selectDate(index)">
					<input class="ipt" disabled :placeholder="element.tips || 'YYYY-MM-DD hh:mm'"
						v-model="form[index].value" />
					<text class="iconright iconfont">&#xe602;</text>
				</view>
			</view>
			<view class="error-text">{{form[index].errorText}}</view>
		</view>

		<LHCalendar ref="lhcalendar" :value="calendarValue" :startDate="startDate" :endDate="endDate"
			:disabledList="disabledList" type="datetime" :showSeconds=false @confirm="confirmDate" @cancel="cancelDate">
		</LHCalendar>

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
			let hourKey = [{
					key: '凌晨0点',
					value: '00'
				}, {
					key: '凌晨1点',
					value: '01'
				}, {
					key: '凌晨2点',
					value: '02'
				}, {
					key: '凌晨3点',
					value: '03'
				}, {
					key: '凌晨4点',
					value: '04'
				},
				{
					key: '凌晨5点',
					value: '05'
				}, {
					key: '上午6点',
					value: '06'
				}, {
					key: '上午7点',
					value: '07'
				}, {
					key: '上午8点',
					value: '08'
				}, {
					key: '上午9点',
					value: '09'
				},
				{
					key: '上午10点',
					value: '10'
				}, {
					key: '中午11点',
					value: '11'
				}, {
					key: '中午12点',
					value: '12'
				}, {
					key: '下午13点',
					value: '13'
				}, {
					key: '下午14点',
					value: '14'
				},
				{
					key: '下午15点',
					value: '15'
				}, {
					key: '下午16点',
					value: '16'
				}, {
					key: '下午17点',
					value: '17'
				}, {
					key: '下午18点',
					value: '18'
				}, {
					key: '晚上19点',
					value: '19'
				},
				{
					key: '晚上20点',
					value: '20'
				}, {
					key: '晚上21点',
					value: '21'
				}, {
					key: '晚上22点',
					value: '22'
				}, {
					key: '晚上23点',
					value: '23'
				},
			];
			return {
				hourKey,
				form: [],
				selectType: null,
				disabledList: [],
				startDate: '',
				endDate: '',
				dateOptions: {
					disabledList: [],
					startDate: '1900-01-01',
					endDate: '2100-01-01',
				},
				calendarValue: ''
			}
		},
		created() {

			if (this.initFormData.componentItem === 'ArrivalTime' || this.initFormData.componentItem === 'PickTime') {
				this.getProductRules();
			}


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
						hour,
						minutes,
						tipsClass,
						formTips
					} = data.formData[item.code];
					if (value) {
						_value = value;
					}
					if (hour && hour != '-1') {
						//_value += ' ' + hour;
						_value += ' ' + this.hourKey[hour.replace(/[\u4e00-\u9fa5]/g, "") * 1].key;
					}
					if (minutes && minutes != '-1') {
						_value += ':' + (minutes.replace(/[\u4e00-\u9fa5]/g, "") + '分');
					}

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
				if (this.orderDetail.CustomerState !== 0 && this.orderDetail.CustomerState !== 20) {
					return;
				}
				if (index === 1) {
					const {
						disabledList,
						startDate,
						endDate
					} = this.dateOptions;

					this.disabledList = disabledList;

					if (startDate != '1900-01-01' && (this.initFormData.componentItem === 'ArrivalTime' || this
							.initFormData.componentItem === 'PickTime')) {
						this.startDate = startDate;
					} else {
						this.startDate = util.dateFormat(new Date(), 'd')
					}
					this.endDate = endDate;
				} else {
					this.disabledList = [];
					this.startDate = util.dateFormat(new Date(), 'd');
					this.endDate = '';
				}
				this.calendarValue = this.form[index].value;
				this.selectType = index;
				this.$refs.lhcalendar.showCalendar();

			},
			confirmDate(value) {
				this.form[this.selectType].value = value;
				this.validateDate();
			},
			cancelDate() {
				this.validateDate();
			},
			validateDate() {

				if (this.initFormData.mandatory === '1') {
					this.form.forEach((item, index) => {
						if (!item.value) {
							this.form[index].errorText = '请选择正确的时间';
						} else {
							this.form[index].errorText = '';
						}
					})
				}


				const [startDate, endDate] = this.form;
				let _startDate = startDate.value.replace(/[\u4e00-\u9fa5]/g, "").replace(/-/g, "/");
				let _endDate = endDate.value.replace(/[\u4e00-\u9fa5]/g, "").replace(/-/g, "/");


				if (_startDate && _endDate) {
					let tips = '';
					let {
						elements,
						componentItem,
						pickTimeMin,
						pickTimeMax
					} = this.initFormData;
					if (+new Date(_startDate) >= +new Date(_endDate) && componentItem !== 'PickTime') {
						tips = elements[1].name + '不能小于' + elements[0].name;
					}

					//接人时间需要3-15个小时之内
					if (componentItem === 'PickTime') {
						pickTimeMin = pickTimeMin || '3:00';
						pickTimeMax = pickTimeMax || '15:00';

						let pickTimeMinLen = pickTimeMin.split(':'),
							pickTimeMaxLen = pickTimeMax.split(':');
						let minValue = pickTimeMinLen[0] * 60 * 60 * 1000 + parseInt(pickTimeMinLen[1] * 60 * 1000),
							maxValue = pickTimeMaxLen[0] * 60 * 60 * 1000 + parseInt(pickTimeMaxLen[1] * 60 * 1000);

						if ((+new Date(_startDate) - (+new Date(_endDate))) > maxValue) {
							tips = elements[1].name + '只能比' + elements[0].name + '提前' + this.changeTimeFormat(pickTimeMax);
						} else if (minValue > (+new Date(_startDate) - (+new Date(_endDate)))) {
							tips = elements[1].name + '需要比' + elements[0].name + '提前' + this.changeTimeFormat(pickTimeMin);
						}

					}

					

					this.form[1].errorText = tips;
				}

				let _endDate2 = _endDate.substring(0, 10);

				if (_endDate2 && this.dateOptions && (this.initFormData.componentItem === 'ArrivalTime' || this
						.initFormData.componentItem === 'PickTime')) {
					if (+new Date(_endDate2) < +new Date(this.dateOptions.startDate)) {
						this.form[1].value = '';
						this.form[1].errorText = '请选择正确的日期';
					}
					if (+new Date(_endDate2) > +new Date(this.dateOptions.endDate)) {
						this.form[1].value = '';
						this.form[1].errorText = '请选择正确的日期';
					}
					if (this.dateOptions.disabledList.indexOf(_endDate2.replace(/\//g, "-")) > -1) {
						this.form[1].value = '';
						this.form[1].errorText = '请选择正确的日期';
					}
				}

			},
			changeTimeFormat(time) {
				if (!time) {
					return '';
				}
				var timeLen = time.indexOf(':') > -1 ? time.split(':') : [0, '00'],
					h = parseInt(timeLen[0]) || 0,
					m = parseInt(timeLen[1]) || 0;

				return (h ? (h + '小时') : '0小时') + (m ? (m + '分钟') : '');

			},
			changeDate(index, e) {

				let value = e ? e.detail.value.trim() : this.form[index].value;
				let tips = '';
				if (!value) {
					tips = '请选择正确的日期';
				}
				// else {
				// 	value = value.replace(/[\u4e00-\u9fa5]/g, "");
				// 	let reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2})$/;
				// 	 let r = value.match(reg);
				// 	 if( r == null){
				// 		 tips = '请选择正确的日期';
				// 	 }

				// }
				this.form[index].errorText = tips;
				this.validateDate();
			},
			getFiledsValue(type) {
				if (type === 1) {
					// this.changeDate(0);
					// this.changeDate(1);
					this.validateDate();
				}
				if (this.initFormData.componentItem === 'ArrivalTime' || this.initFormData.componentItem === 'PickTime') {
				
					if (this.form[1].value && this.orderDetail.PlatformTravelDate && this.orderDetail
						.PlatformTravelDate.substring(0, 10) != this.form[1].value.substring(0, 10)) {
						uni.showToast({
							title: '拍下时日期与提交的不同，请仔细核对！',
							icon: 'none'
						});
					}
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

					let times = value.split(' ');
					let _value = times[0];
					let hour = '-1',
						minutes = '-1';
					if (times.length > 1) {
						hour = times[1].split(':')[0].replace(/[\u4e00-\u9fa5]/g, "") * 1;
						minutes = times[1].split(':')[1].replace(/[\u4e00-\u9fa5]/g, "") * 1;

						hour = hour > 9 ? hour + '' : '0' + hour;
						minutes = minutes > 9 ? minutes + '' : '0' + minutes;
					}

					ElementsValue[this.initFormData.componentItem].formData[item.code] = {
						hour,
						minutes,
						value: _value,
						text: value,
						formTips,
						tipsClass
					};
					ServiceItemTemplteValue[item.code] = value;
					if (errorText) {
						hasError.push(errorText);
					}
				});

				if (['ArrivalTime', 'PickTime'].includes(this.initFormData.componentItem)) {
					const date = {
						date1: this.form[1].value.replace(/[\u4e00-\u9fa5]/g, ""),
						date2: ''
					};
					this.$emit('changeDate', date)
				}
				return {
					ElementsValue,
					ServiceItemTemplteValue,
					hasError
				};
			},
			getProductRules() {
				this.$sendRequest({
					url: "/WxOpen/GetProductRules",
					method: "GET",
					data: {
						serviceItemID: this.orderDetail.Product.ProductID
					},
				}).then(res => {
					if (res.Code === 200) {
						this.getDisabledDateList(res.data);
						if (res.data.length) {
							this.validateDate();
						}

					}
				});
			},
			getDisabledDateList(ruleArr) {
				let startDate = +new Date('2010/01/01'),
					endDate = +new Date('2100/01/01'),
					datesDisabled = [];

				ruleArr.forEach((item) => {
					let RuleUseTypeValue = item.RuleUseTypeValue, //0:只允许，1：禁止
						SelectRuleType = item.SelectRuleType, //0:日期范围，1：星期选择，2：单双选择，3：固定日期
						RangeStart = item.RangeStart.substring(0, 10).replace(/-/g, "/"),
						RangeEnd = item.RangeEnd.substring(0, 10).replace(/-/g, "/"),
						StartTime = item.StartTime.substring(0, 10).replace(/-/g, "/"),
						EndTime = item.EndTime.substring(0, 10).replace(/-/g, "/"),
						Week = item.Week && item.Week.split('|'),
						IsDouble = item.IsDouble,
						UseDate = item.UseDate && item.UseDate.split('|');
					if (RuleUseTypeValue) {

						//范围内，其他时间可以选择

						if (SelectRuleType == 0) {
							for (var i = (+new Date(RangeStart)); i <= (+new Date(RangeEnd)); i = i + 24 * 60 *
								60 * 1000) {
								var tmp = new Date(i);
								if (datesDisabled.indexOf(tmp) === -1) {
									datesDisabled.push(tmp);
								}
							}
						} else if (SelectRuleType == 1) {
							for (var i = (+new Date(StartTime)); i <= (+new Date(EndTime)); i = i + 24 * 60 * 60 *
								1000) {
								var tmp = new Date(i);
								if (datesDisabled.indexOf(tmp) === -1 && Week.indexOf(tmp.getDay() + '') > -1) {
									datesDisabled.push(tmp);
								}
							}
						} else if (SelectRuleType == 2) {
							for (var i = (+new Date(StartTime)); i <= (+new Date(EndTime)); i = i + 24 * 60 * 60 *
								1000) {
								var tmp = new Date(i);
								if (datesDisabled.indexOf(tmp) === -1) {

									if (IsDouble && tmp.getDate() % 2 == 0) { //双号
										datesDisabled.push(tmp);
									} else if (!IsDouble && tmp.getDate() % 2 == 1) {
										datesDisabled.push(tmp);
									}
								}
							}
						} else if (SelectRuleType == 3) {
							for (var i = (+new Date(StartTime)); i <= (+new Date(EndTime)); i = i + 24 * 60 * 60 *
								1000) {
								var tmp = new Date(i);
								if (datesDisabled.indexOf(tmp) === -1 && UseDate.indexOf(tmp.getDate() + '') > -
									1) {
									datesDisabled.push(tmp);
								}
							}
						}
					} else { //只允许，日期排除放入datesDisabled

						//获取最近的开始时间
						if (+new Date(StartTime) > startDate) {
							startDate = +new Date(StartTime);
						}
						//获取最近的结束时间
						if (+new Date(EndTime) < endDate) {
							endDate = +new Date(EndTime);
						}

						if (SelectRuleType == 0) {

							if (+new Date(RangeStart) > startDate) {
								startDate = +new Date(RangeStart);
							}
							if (+new Date(RangeEnd) < endDate) {
								endDate = +new Date(RangeEnd);
							}
						} else if (SelectRuleType == 1) {
							for (var i = (+new Date(startDate)); i <= (+new Date(endDate)); i = i + 24 * 60 * 60 *
								1000) {
								var tmp = new Date(i);
								if (datesDisabled.indexOf(tmp) === -1 && Week.indexOf(tmp.getDay() + '') === -1) {
									datesDisabled.push(tmp);
								}
							}
						} else if (SelectRuleType == 2) {
							for (var i = (+new Date(startDate)); i <= (+new Date(endDate)); i = i + 24 * 60 * 60 *
								1000) {
								var tmp = new Date(i);
								if (datesDisabled.indexOf(tmp) === -1) {

									if (IsDouble && tmp.getDate() % 2 == 1) { //双号
										datesDisabled.push(tmp);
									} else if (!IsDouble && tmp.getDate() % 2 == 0) {
										datesDisabled.push(tmp);
									}
								}
							}
						} else if (SelectRuleType == 3) {
							for (var i = (+new Date(startDate)); i <= (+new Date(endDate)); i = i + 24 * 60 * 60 *
								1000) {
								var tmp = new Date(i);
								if (datesDisabled.indexOf(tmp) === -1 && UseDate.indexOf(tmp.getDate() + '') === -
									1) {
									datesDisabled.push(tmp);
								}
							}
						}
					}

					datesDisabled.forEach((item, index) => {
						datesDisabled[index] = util.dateFormat(item, 'd');
					})

					let today = util.dateFormat(new Date(), 'd')
					if (startDate < +new Date(today)) {
						startDate = +new Date(today);
					}
					this.dateOptions = {
						startDate: util.dateFormat(startDate, 'd'),
						endDate: util.dateFormat(endDate, 'd'),
						disabledList: datesDisabled
					};



				});
			},
		}
	}
</script>

<style lang="scss">

</style>
