<template>
	<view class="order-edit">
		<view class="lh-title">基本资料</view>

		<view class="lhform">
			<view class="uib-item" style="border-top:1px solid #eeeeee;border-bottom:1px solid #eeeeee;">
				<view class="item-left">基本资料</view>
				<view class="item-right">
					<navigator
						:url="'/pages/user/info?orderId='+orderId +'&orderStatus='+ orderStatus +'&customer='+JSON.stringify(Customer)"
						open-type="navigate" style="width: 100%;">
						<text class="iconright iconfont lhddright"></text>
						<text :class="{ text:true,error:baseName =='未填写完整'}">{{baseName}}</text>
					</navigator>
				</view>
			</view>
		</view>

		<view class="order-extra">{{ Product.cnItemName || '' }}</view>
		<view class="order-extra-number" v-if="attachesText">
			<text>{{attachesText}}
			</text>
		</view>

		<view class="form-bottom">
			<!-- <person :customer="Customer"></person>
			<travelDate></travelDate>
			<flightNumber></flightNumber>
			<flightTime></flightTime>
			<formSelect></formSelect>
			<hotel :orderId="orderId"></hotel> -->
			<view class="lhform">
				<view class="uib-item">
					<view class="item-left">人数</view>
					<view class="item-right">{{ personText }}</view>
				</view>
			</view>


			<template v-for="(element,index) in Elements">
				<person :ref="element.componentItem" :key="index"
					v-if="!deletePersonIdex.includes(index) && element.componentType==='LHPersonInfo'"
					:initFormData="element" :orderTravellers="OrderTravellers" :orderDetail="orderDetail">
				</person>

				<travelDate :ref="element.componentItem" :key="index"
					v-if="showTravelDate && element.componentType==='LHServiceDateBackDate'" :initFormData="element"
					@changeDate="changeDate" :orderDetail="orderDetail"></travelDate>

				<hotel :ref="element.componentItem" :key="index" v-if="element.componentType==='LHHotel'"
					:initFormData="element" :orderDetail="orderDetail">
				</hotel>

				<formDate :ref="element.componentItem" :key="index" v-if="element.componentType==='LHSelectDate'"
					:initFormData="element" :orderDetail="orderDetail"></formDate>

				<formDateTime :ref="element.componentItem" :key="index" v-if="element.componentType==='LHDate'"
					:initFormData="element" @changeDate="changeDate" :orderDetail="orderDetail"></formDateTime>

				<formTime :ref="element.componentItem" :key="index" v-if="element.componentType==='LHDateTime'"
					:initFormData="element" :orderDetail="orderDetail"></formTime>

				<formSelect :ref="element.componentItem" :key="index" v-if="element.componentType==='LHSelect'"
					:initFormData="element" :orderDetail="orderDetail"></formSelect>

				<formInput :ref="element.componentItem" :key="index" v-if="element.componentType==='LHInput'"
					:initFormData="element" :orderDetail="orderDetail"></formInput>

				<formTextarea :ref="element.componentItem" :key="index" v-if="element.componentType==='LHTextarea'"
					:initFormData="element" :orderDetail="orderDetail"></formTextarea>
			</template>

			<view class="notice" v-if="orderDetail.Status === 0 || orderDetail.Status === 1">
				<radio style="transform:scale(0.6);" color="#007AFF" :checked="noticeChecked" @tap="changeNotice">
				</radio>
				<view class="text" @tap="changeNotice">
					我已打开并阅读《<text class="link"
						@tap="clickNotice">旅游风险须知和安全提示告知书</text>》，我承诺转达全部内容给全体参与以上行程的人员，并代表他们进行签字。
				</view>
			</view>
		</view>

		<view class="form-btn">
			<button class="save-btn" @tap="save(1)"
				v-if="orderDetail.Status === 0 || orderDetail.Status === 1">提交保存</button>
			<button class="save2-btn" @tap="save(2)" v-if="orderDetail.Status === 0">暂存，稍后继续填写</button>
		</view>


		<notice ref="notice"></notice>
	</view>
</template>

<script>
	import notice from './notice.vue';
	import person from '../../components/form/person.vue';
	import travelDate from '../../components/form/travelDate.vue';
	import formInput from '../../components/form/formInput.vue'
	import formDate from '../../components/form/formDate.vue'
	import formDateTime from '../../components/form/formDateTime.vue'
	import formTime from '../../components/form/formTime.vue'
	import formSelect from '../../components/form/formSelect.vue'
	import hotel from '../../components/form/hotel.vue'
	import formTextarea from '../../components/form/formTextarea.vue'
	import util from '@/common/util.js';
	
	export default {
		data() {
			return {
				orderDetail: '',
				orderId: "",
				Attaches: '',
				Customer: '',
				Product: '',
				Elements: [],
				OrderTravellers: [],
				baseName: '',
				attachesText: '',
				personText: '',
				templateList: [],
				noticeChecked: false,
				showTravelDate: true,
				deletePersonIdex: [],
				orderDate: {
					ServiceDate: '',
					BackupDate: ''
				},
				orderStatus: 0,
				noClick: true,
			};
		},
		components: {
			notice,
			person,
			travelDate,
			formInput,
			formDate,
			formDateTime,
			formSelect,
			hotel,
			formTextarea,
			formTime,
		},
		onLoad(options) {
			util.autoUpdater();
			const {
				id,
				customer,
			} = options;
			this.orderId = id;
			this.getTemplateList();
			if (customer) {
				this.Customer = JSON.parse(customer);
			}
			uni.removeStorageSync("meansInfo");
			
		},
		onBackPress(e) {},
		onUnload(e) {
			// const that = this;
			// uni.showModal({
			// 	title: '',
			// 	content: '是否暂存?',
			// 	confirmColor: '#4992E7',
			// 	success: function(res) {
			// 		if (res.confirm) {
			// 			debugger;
			// 		} else if (res.cancel) {
			// 			console.log('用户点击取消');
			// 		}
			// 	},
			// });
		},
		onHide() {},
		onShow(e) {
			
			//个人中心修改的值
			uni.$on("updateCustomer", (data) => {
				this.Customer = data;
				if (this.Customer.CustomerName && this.Customer.Tel && this.Customer.CustomerEnname && this
					.Customer.Email && this.Customer.Wechat) {
					this.baseName = this.Customer.CustomerName + ',  ' + this.Customer.Tel;
				} else {
					this.baseName = '未填写完整';
				}
			});
		},
		mounted() {
			this.getOrderDetail();
		},
		methods: {
			//获取订单信息
			getOrderDetail() {
				uni.showLoading({
					title: '加载中'
				});
				this.$sendRequest({
					url: "/WxOpen/GetOrderDetail",
					method: "POST",
					data: {
						orderId: this.orderId
					},
				}).then(res => {
					uni.hideLoading();
					if (res.Code === 200) {
						const {
							CustomerId,
							CustomerName,
							CustomerEnname,
							Tel,
							BakTel,
							Email,
							Wechat,
							//Customer,
							Product, //产品信息
							OrderTravellers, //选中的出行人
							PlatformTravelDate //平台的出行日期
						} = res.data;
						this.orderDetail = res.data;
						this.orderStatus = res.data.Status;
						
						if( res.data.Status === 13){
							uni.showToast({
								icon: 'none',
								title: '该订单已作废！'
							})
							uni.switchTab({
								url: '/pages/order/index',
								success() {
									let page = getCurrentPages().pop();
									if (!page) return;
									page.onLoad();
								}
							});
							return;
						}
						if (!this.Customer) {
							this.Customer = {
								CustomerId,
								CustomerName,
								CustomerEnname,
								Tel,
								BakTel,
								Email,
								Wechat,
							};
						}

						this.Product = Product;
						this.PlatformTravelDate = PlatformTravelDate;

						if (this.Customer.CustomerName && this.Customer.Tel && this.Customer.CustomerEnname && this
							.Customer.Email && this.Customer.Wechat) {
							this.baseName = this.Customer.CustomerName + ',  ' + this.Customer.Tel;
						} else {
							this.baseName = '未填写完整';
						}


						const {
							AdultNum,
							ChildNum,
							INFNum,
							ServiceTypeID,
							RightNum,
							RoomNum
						} = Product;
						let personText = AdultNum + ' 成人  ' + ChildNum + ' 儿童  ' + INFNum + ' 婴儿  ';
						if (ServiceTypeID === 4) {
							//personText += (' 间数:' + RoomNum + ' 晚数:' + RightNum);
							personText = AdultNum + ' 成人 ' + ChildNum + ' 儿童 ' + INFNum + ' 婴儿 ' + RoomNum + ' 间 ' + RightNum + ' 晚';
						}
						this.personText = personText;
						
						let attachesList = [];
						Product.Attaches.forEach(item => {
							if (item.ServiceNum > 0) {
								attachesList.push(item.ServiceName + '：' + item.ServiceNum + item
									.ServiceUnit);
							}
						});
						this.attachesText = attachesList.join('; ');

						if (Product.Elements) {
							const Elements = JSON.parse(Product.Elements);

							let showTravelDate = true;
							let deletePersonIdex = [];

							Elements.forEach((item, index) => {
								if (['ArrivalTime', 'PickTime'].includes(item.componentItem)) {
									//是否有航班起飞时间，为出行日期
									showTravelDate = false;
								}
								if (item.componentType === 'LHPersonInfo') {

									if (item.controlPerson != '-1') {

										if (Product.Attaches == null || Product.Attaches.length === 0) {
											deletePersonIdex.push(index);
										} else {

											let hasPerson = false,
												extraidList = [];

											Product.Attaches.forEach((im, ix) => {
												extraidList.push(im.AttachId);
												if (im.AttachId == item.controlPerson && im
													.ServiceNum != 0) {
													hasPerson = true;
												}
											})

											if (hasPerson == false) {
												deletePersonIdex.push(index);
											}

										}
									}
								}
							})

							this.showTravelDate = showTravelDate;
							this.deletePersonIdex = deletePersonIdex;

							this.Elements = Elements;
						}
						this.OrderTravellers = OrderTravellers;
					}
				});
			},

			getTemplateList() {
				this.$sendRequest({
					url: "/WxOpen/GetTemplateList",
					method: "GET",
				}).then(res => {
					if (res.Code === 200) {
						res.data.data.forEach(item => {
							this.templateList.push(item.priTmplId);
						})
					}


				});
			},
			changeNotice() {
				this.noticeChecked = true;
			},
			clickNotice() {
				this.$refs.notice.noticeShow = true;
			},
			changeDate(date) {
				const {
					date1,
					date2
				} = date;
				if (date1) {
					this.orderDate.ServiceDate = date1;
				}
				if (date2) {
					this.orderDate.BackupDate = date2;
				}
			},
			save(type) {
				const that = this;
				if (!this.noClick) {
					return;
				}
				this.noClick = false;

				let _ElementsValue = {};
				let _OrderTravellers = [];
				let _ServiceItemTemplteValue = {};
				let _hasError = false;
				let hotelHistory = [];

				this.Elements.forEach(item => {

					if (this.$refs[item.componentItem]) {
						const {
							ElementsValue,
							ServiceItemTemplteValue,
							hasError
						} = this.$refs[item.componentItem][0].getFiledsValue(type);
						if (hasError && hasError.length) {
							console.log(hasError, item.componentItem)
							_hasError = true;
						}
						if (item.componentType === 'LHPersonInfo') {
							let selectPerson = this.$refs[item.componentItem][0].pickerList;
							_OrderTravellers = _OrderTravellers.concat(selectPerson);
						}
						if (item.componentType === 'LHHotel') {
							const info = ElementsValue[item.componentItem];
							let hotelA = info.componentInfo.hotelCodeA;
							let hotelB = info.componentInfo.hotelCodeB;

							let hotel = {
								customerID: this.Customer.CustomerId,
								hotelIdByCustomer: 0,
							};
							for (let key in hotelA) {

								if (key === 'name') {
									hotel.hotalName = info.formData[hotelA[key]].text;
								}
								if (key === 'tel') {
									hotel.hotalPhone = info.formData[hotelA[key]].text;
								}
								if (key === 'area') {
									hotel.areaID = info.formData[hotelA[key]].value;
								}
								if (key === 'address' && hotelA[key]) {
									hotel.hotalAddress = info.formData[hotelA[key]].text;
								} else {
									hotel.hotalAddress = '';
								}
							}
							if (hotel.hotalName) {
								hotelHistory.push(hotel);
							}

							if (hotelB && info.formData.isSameHotel === '2') {
								let hotel2 = {
									customerID: this.Customer.CustomerId,
									hotelIdByCustomer: 0,
								};
								for (let key in hotelB) {

									if (key === 'name') {
										hotel2.hotalName = info.formData[hotelB[key]].text;
									}
									if (key === 'tel') {
										hotel2.hotalPhone = info.formData[hotelB[key]].text;
									}
									if (key === 'area') {
										hotel2.areaID = info.formData[hotelB[key]].value;
									}
									if (key === 'address' && hotelB[key]) {
										hotel2.hotalAddress = info.formData[hotelB[key]].text;
									} else {
										hotel2.hotalAddress = '';
									}
								}
								if (hotel2.hotalName) {
									hotelHistory.push(hotel2);
								}
							}

						}
						_ElementsValue = Object.assign({}, _ElementsValue, ElementsValue);
						_ServiceItemTemplteValue = Object.assign({}, _ServiceItemTemplteValue,
							ServiceItemTemplteValue);
					}

				});

				//基本资料更新
				this.orderDetail = Object.assign({}, this.orderDetail, this.Customer);

				const postData = Object.assign({}, {
					order: this.orderDetail
				}, {
					isCommit: false,
				});
				_OrderTravellers.forEach(item => {
					item.TravellerID = item.personID;
				})
				console.log('表单保存值:' + JSON.stringify(_ElementsValue));
				postData.order.Product.ElementsValue = JSON.stringify(_ElementsValue);
				postData.order.Product.ServiceItemTemplteValue = JSON.stringify(_ServiceItemTemplteValue);


				postData.order.OrderTravellers = _OrderTravellers;
				//postData.order.hotelHistory = hotelHistory;
				postData.customerHotals = hotelHistory;

				const {
					ServiceDate,
					BackupDate
				} = this.orderDate;
				if (ServiceDate) {
					postData.order.Product.ServiceDate = ServiceDate;
				}
				if (BackupDate) {
					postData.order.Product.BackupDate = BackupDate;
				}

				if (type === 1) {
					postData.isCommit = true;
					if (_hasError) {

						uni.showToast({
							icon: 'error',
							title: '请完善表单填写！'
						})
						this.noClick = true;
						return;
					}
					if (!this.noticeChecked) {
						uni.showToast({
							title: '请勾选并阅读《旅游风险须知和安全提示告示书》',
							icon: 'none'
						});
						this.noClick = true;
						return;
					}
					//return;
					this.$sendRequest({
						url: "/WxOpen/CheckTravelDate",
						method: "POST",
						data: {
							orderId: this.orderId,
							travelDate: ServiceDate,
							customerName: postData.order.CustomerName,
							tel: postData.order.Tel,
							CustomerID: postData.order.CustomerId
						}
					}).then(res => {

						if (res.Code === 401) {
							uni.showModal({
								title: '提示',
								content: res.Msg,
								confirmText: '继续保存',
								confirmColor: '#4992E7',
								success: function(res) {
									if (res.confirm) {
										that.postSave(1, postData);
									} else if (res.cancel) {
										that.noClick = true;
										console.log('用户点击取消');
									}
								}
							});
						}
						if (res.Code === 200) {
							this.postSave(1, postData);
						}

					})
				} else {
					this.postSave(2, postData);
				}

				if (type === 1 || type === 2) {
					return;
				}

				wx.requestSubscribeMessage({
					tmplIds: this.templateList,
					success(res) {
						console.log("success:" + res);
					},
					fail(res) {
						console.log("fail:" + res);
					},
					complete(res) {
						console.log("complete:" + res);

					}
				})
			},

			postSave(type, postData) {
				//return;
				this.$sendRequest({
					url: "/WxOpen/UpdateOrderDetail",
					method: "POST",
					data: postData
				}).then(res => {
					setTimeout(() => {
						this.noClick = true;
					}, 1000)

					if (res.Code === 200) {
						let title = '保存成功!'
						if (type === 2) {
							title = '暂存成功'
						}
						uni.showToast({
							icon: 'success',
							title
						})

						if (type) {
							setTimeout(() => {
								uni.switchTab({
									url: '/pages/order/index',
									success(e) {
										let page = getCurrentPages().pop();
										if (page == undefined || page == null) return;
										page.onLoad();
									}
								});
							}, 1000)
						}
					} else {
						uni.showToast({
							icon: 'none',
							title: res.Msg
						})
					}
				});
			},
			sendSubscribeMessage(templateId) {
				this.$sendRequest({
					url: "/WxOpen/SendSubscribeMessage",
					method: "POST",
					data: postData
				}).then(res => {
					if (res.Code === 200) {

					}
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.order-edit {
		margin-bottom: 30rpx;

		.item-right .error {
			color: #FF0000;
		}

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
			line-height: 32rpx;
			padding: 0 24rpx;
			background: #ffffff;
			border-top: 1px solid #eeeeee;
			margin-bottom: 20rpx;
			border-bottom: 1px solid #EEE;
			color: #999;
			display: flex;
			align-items: center;
		}



		.form-bottom {
			//margin-top: 20rpx;
			border-top: 1px solid #eeeeee;
		}

		.notice {
			font-size: 24rpx;
			height: 80rpx;
			padding: 0 24rpx;
			color: #999;
			display: flex;
			align-items: center;
			background: #ffffff;
			//border-top: 1px solid #eeeeee;
			border-bottom: 1px solid #eeeeee;

			.text {
				font-size: 22rpx;
				padding: 5rpx 0;
				line-height: 24rpx;
			}

			.link {
				font-size: 24rpx;
				color: #4992E7;
			}
		}

		.form-btn {

			.save-btn {
				display: block;
				margin: 24rpx;
				height: 90rpx;
				line-height: 90rpx;
				background: #4992E7;
				color: #fff;
				font-size: 24rpx;
				border-radius: 0;
			}

			.save2-btn {
				display: block;
				height: 90rpx;
				line-height: 90rpx;
				background: #fff;
				border: 1px solid #4992E7;
				font-size: 24rpx;
				margin: 0 24rpx;
				border-radius: 0;
			}
		}
	}
</style>
