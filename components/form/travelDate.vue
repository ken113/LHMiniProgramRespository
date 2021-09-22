<template>
	<view class="lhform form-travel-date">

		<view v-for="(element,index) in initFormData.elements" :key="index"
			:class="form[index].errorText ? 'error-item':'' " v-if="form[index].show">
			<view class="uib-item">
				<view class="item-left">{{ element.name }}</view>
				<view class="item-right" @tap="selectDate(index)">
					<input class="ipt" disabled :placeholder="element.tips || 'YYYY-MM-DD'" v-model="form[index].value"
						@blur="changeDate(index,$event)" />
					<text class="iconright iconfont">&#xe602;</text>
				</view>
			</view>
			<view class="error-text">{{form[index].errorText}}</view>
		</view>


		<LHCalendar ref="lhcalendar" :value="calendarValue" :startDate="startDate" :endDate="endDate"
			:disabledList="disabledList" type="date" @confirm="confirmDate" @cancel="cancelDate"></LHCalendar>
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
				rules: [],
				selectType: null,
				disabledList: [],
				startDate: '',
				endDate: '',
				dateOptions: {
					disabledList: [],
					startDate: '1900-01-01',
					endDate: '2100-01-01',
				},
				calendarValue: '',
			};
		},
		created() {


			this.getProductRules();
			let data = null;
			let _ServiceDate = '',
				_ServiceDateError = '',
				_BackupDate = '',
				_BackupDateError = '';
			if (this.orderDetail.Product.ElementsValue && this.orderDetail.Product.ElementsValue !== '{}') {

				let ElementsValue = JSON.parse(this.orderDetail.Product.ElementsValue);
				data = ElementsValue[this.initFormData.componentItem];

				if (data) {
					if (data.formData && data.formData.ServiceDate) {
						_ServiceDate = data.formData.ServiceDate.value;
						if (data.formData.ServiceDate.tipsClass.indexOf('tips') > -1) {
							_ServiceDateError = data.formData.ServiceDate.formTips;
						}
					}
					if (data.formData && data.formData.BackDate) {
						_BackupDate = data.formData.BackDate.value;
						if (data.formData.BackDate.tipsClass.indexOf('tips') > -1) {
							_BackupDateError = data.formData.BackDate.formTips;
						}
					}
				}


			} else {
				const {
					ServiceDate,
					BackupDate
				} = this.orderDetail.Product;
				if (ServiceDate) {
					_ServiceDate = ServiceDate.substring(0, 10);
				}
				if (BackupDate) {
					_BackupDate = BackupDate.substring(0, 10);
				}
				if (_ServiceDate == '0001-01-01' || _ServiceDate == '1900-01-01') {
					_ServiceDate = '';
				}
				if (_ServiceDate.substring(0, 4) * 1 < 1901) {
					_ServiceDate = '';
				}
				if (_BackupDate == '0001-01-01' || _BackupDate == '1900-01-01') {
					_BackupDate = '';
				}
				if (_BackupDate.substring(0, 4) * 1 < 1901) {
					_BackupDate = '';
				}
				if (this.orderDetail.PlatformTravelDate) {
					_ServiceDate = this.orderDetail.PlatformTravelDate.substring(0, 10);
				}
			}

			this.initFormData.elements.forEach((item, index) => {
				let _value = '',
					errorText = '';

				if (index === 0) {
					_value = _ServiceDate;
					if (!_ServiceDate) {
						errorText = '请选择出行日期';
					}
					if (_ServiceDateError) {
						errorText = _ServiceDateError;
					}
				}
				if (index === 1) {
					_value = _BackupDate;
					if (!_BackupDate) {
						errorText = '请选择返回日期';
					}
					if (_BackupDateError) {
						errorText = _BackupDateError;
					}
				}
				this.form.push({
					code: item.code,
					value: _value,
					errorText,
					show: true,
					tips: item.tips,
				});
			});

			let showBackDate = true;
			const {
				ServiceTypeID,
				FixedDays
			} = this.orderDetail.Product;

			if (ServiceTypeID == 2) { //行程类
				if (FixedDays == 1) { //行程天数等于1，不需要显示
					showBackDate = false;
				}
			} else if (ServiceTypeID == 1) { //交通类
				showBackDate = false;
			} else if (ServiceTypeID == 3) { //门票类
				showBackDate = false;
			}

			if (!showBackDate) {
				this.form[1].show = false;
			}
		},
		methods: {
			selectDate(selectType) {
				if (this.orderDetail.CustomerState !== 0 && this.orderDetail.CustomerState !== 20) {
					return;
				}
				if (selectType === 0) {
					const {
						disabledList,
						startDate,
						endDate
					} = this.dateOptions;

					this.disabledList = disabledList;

					if (startDate != '1900-01-01') {
						this.startDate = startDate;
					} else {
						this.startDate = util.dateFormat(new Date(), 'd')
					}
					this.endDate = endDate;

					this.calendarValue = this.form[0].value;

				} else {
					this.disabledList = [];
					this.startDate = '';
					this.endDate = '';
					this.calendarValue = this.form[1].value;
				}

				this.$refs.lhcalendar.showCalendar();
				this.selectType = selectType;
			},
			confirmDate(value) {
				this.form[this.selectType].value = value;
				this.form[this.selectType].errorText = '';
				if (this.selectType === 0) {

					//自动填写返回日期
					if (this.form[1].show) {
						this.setBackDate(value);
					}
					if (this.orderDetail.PlatformTravelDate && this.orderDetail.PlatformTravelDate.substring(0, 10) !=
						value) {
						uni.showToast({
							title: '您修改的出行日期和拍下商品填写的出行日期不一致，请您做好核对！',
							icon: 'none'
						});
					}
				}
				this.validateDate();
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
			cancelDate() {
				if (!this.form[this.selectType].value) {
					this.form[this.selectType].errorText = '请选择日期';
				}
			},
			validateDate() {
				const {
					ServiceTypeID,
					FixedDays,
					RightNum
				} = this.orderDetail.Product;

				if (this.initFormData.mandatory === '1') {
					this.form.forEach((item, index) => {
						if (!item.value && item.show) {
							this.form[index].errorText = '请选择正确的日期';
						}
					})
				}


				const [startDate, endDate] = this.form;
				const _FixedDays = FixedDays - 1;
				if (this.form.length === 2) {
					if (startDate.value && endDate.value) {
						let tips = '';
						if (+new Date(startDate.value.replace(/-/g, "/")) > +new Date(endDate.value.replace(/-/g, "/"))) {
							tips = this.initFormData.elements[1].name + '不能小于' + this.initFormData.elements[0].name;
						}
						if (ServiceTypeID == 2 && _FixedDays > 0) {

							if (+new Date(startDate.value.replace(/-/g, "/")) + _FixedDays * 24 * 60 * 60 * 1000 != +
								new Date(endDate.value.replace(/-/g, "/"))) {
								tips = this.initFormData.elements[0].name + '和' + this.initFormData.elements[1].name +
									'应该相差' + _FixedDays + '天';
							}
						}
						if (ServiceTypeID == 4) {
							if (+new Date(startDate.value.replace(/-/g, "/")) + RightNum * 24 * 60 * 60 * 1000 != +
								new Date(endDate.value.replace(/-/g, "/"))) {
								tips = this.initFormData.elements[0].name + '和' + this.initFormData.elements[1].name +
									'应该相差' + RightNum + '晚';
							}

						}
						this.form[1].errorText = tips;
					}
				}
				if (startDate.value && this.dateOptions) {

					if (+new Date(startDate.value.replace(/-/g, "/")) < +new Date(this.dateOptions.startDate)) {
						this.form[0].value = '';
						this.form[0].errorText = '请选择正确的日期';
					}
					if (+new Date(startDate.value.replace(/-/g, "/")) > +new Date(this.dateOptions.endDate)) {
						this.form[0].value = '';
						this.form[0].errorText = '请选择正确的日期';
					}
					if (this.dateOptions.disabledList.indexOf(startDate.value) > -1) {
						this.form[0].value = '';
						this.form[0].errorText = '请选择正确的日期';
					}
				}
				
				
			},
			changeDate(index, e) {
				const value = e ? e.detail.value.trim() : this.form[index].value;
				let tips = '';
				if (!value) {
					tips = '请选择正确的日期';
				} else {
					if (!util.isDate(value)) {
						tips = '请选择正确的日期';
					}
				}
				this.form[index].errorText = tips;

			},
			setBackDate(serviceDate) {

				//默认返回日期，出行天数等于0,1，等于出行时间，否则等于出行时间 + 天数 - 1;
				let backDate = '';
				const {
					FixedDays,
					ServiceTypeID
				} = this.orderDetail.Product;
				if (ServiceTypeID === 2) {
					if (FixedDays < 2) {
						backDate = serviceDate;
					} else {
						backDate = util.dateFormat(+new Date(serviceDate) + (FixedDays - 1) * 24 * 60 * 60 * 1000, 'd');
					}
				}
				this.form[1].value = backDate;
				this.form[1].errorText = '';
			},
			getFiledsValue(type) {
				if (type === 1) {
					this.validateDate();
				}
				if (this.form[0].value && this.orderDetail.PlatformTravelDate && this.orderDetail
					.PlatformTravelDate.substring(0, 10) != this.form[0].value.substring(0, 10)) {
					uni.showToast({
						title: '拍下时日期与提交的不同，请仔细核对！',
						icon: 'none'
					});
				}
				const ElementsValue = {};
				const ServiceItemTemplteValue = {};
				let hasError = [];
				ElementsValue[this.initFormData.componentItem] = {
					componentInfo: this.initFormData,
					formData: {}
				};
				if (!this.form[1].show) {
					this.form[1].errorText = '';
				}
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
					if (errorText) {
						hasError.push(errorText);
					}
					ServiceItemTemplteValue[item.code] = value;
				});
				const date = {
					date1: this.form[0].value,
					date2: this.form[1].value,
				};
				this.$emit('changeDate', date)
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
