<template>
	<view class="lhform form-hotel">


		<view v-for="(element,index) in initFormData.elements" :key="index"
			:class="form[index].errorText ? 'error-item':'' " v-if="isReturnHotel === false || (isReturnHotel === true &&  index < initFormData.elements.length/2) ">
			<view class="uib-item">
				<view class="item-left">{{ element.name }}</view>
				<view class="item-right">
					<template v-if="hotelNameList.includes(form[index].code)">
						<input disabled class="input" @tap="selectHotel(1)" v-model="form[index].value"
							:placeholder="element.tips" />
					</template>
					<template v-if="hotelTelList.includes(form[index].code)">
						<input class="input" @blur="inputHotelTel(1,$event)" v-model="form[index].value"
							:placeholder="element.tips" />
					</template>
					<template v-if="hotelAreaList.includes(form[index].code)">
						<!-- <input class="input" @tap="clickPicker(1)" v-model="form[index].value"
							:placeholder="element.tips" disabled/> -->
						<picker class="input" @cancel="cancelPickerChange1" @change="bindPickerChange1" range-key="label" :value="pickerValue1" :range="pickerList1">
							<input class="input" disabled :placeholder="element.tips || '请选择'"
								v-model="form[index].value" />
						</picker>
					</template>
					<template v-if="hotelAddressList.includes(form[index].code)">
						<input class="input" @blur="inputHotelAddress(1,$event)" v-model="form[index].value" :placeholder="element.tips" />
					</template>
				</view>
			</view>
			<view class="error-text">{{form[index].errorText}}</view>
		</view>

		<view class="uib-item" v-if="isReturnHotel">
			<view class="item-left">返回酒店信息</view>
			<view class="item-right">
				<radio-group @change="radioChange">
					<label class="radio">
						<radio style="transform:scale(0.6);" color="#007AFF" value="1" :checked="radioIndex == 1" />
						与接人酒店相同
					</label>
					<label class="radio">
						<radio style="transform:scale(0.6);" color="#007AFF" value="2" :checked="radioIndex == 2" />
						填写另一个酒店
					</label>
				</radio-group>
			</view>
		</view>

		<view v-if="showReturnHotel">

			<view v-for="(element,index) in initFormData.elements" :key="index"
				:class="form[index].errorText ? 'error-item':'' " v-if="index >= initFormData.elements.length/2">
				<view class="uib-item">
					<view class="item-left">{{ element.name }}</view>
					<view class="item-right">
						<template v-if="hotelNameList.includes(form[index].code)">
							<input disabled class="input" disabled @tap="selectHotel(2)" v-model="form[index].value"
								:placeholder="element.tips" />
						</template>
						<template v-if="hotelTelList.includes(form[index].code)">
							<input class="input" :disabled="orderDetail.Status !== 0" @blur="inputHotelTel(2,$event)" v-model="form[index].value"
								:placeholder="element.tips" />
						</template>
						<template v-if="hotelAreaList.includes(form[index].code)">
							<!-- <input class="input" disabled @tap="clickPicker(2)" v-model="form[index].value"
								:placeholder="element.tips" /> -->
							<picker class="input" @cancel="cancelPickerChange2" @change="bindPickerChange2" range-key="label" :value="pickerValue2" :range="pickerList2">
								<input class="input" disabled :placeholder="element.tips || '请选择'"
									v-model="form[index].value" />
							</picker>
						</template>
						<template v-if="hotelAddressList.includes(form[index].code)">
							<input class="input" @blur="inputHotelAddress(2,$event)" :disabled="orderDetail.Status !== 0" v-model="form[index].value" :placeholder="element.tips" />
						</template>
					</view>
				</view>
				<view class="error-text">{{form[index].errorText}}</view>
			</view>

		</view>

		<SelectHotel ref="hotelPicker" :cityID="cityID" @selectedHotel="selectedHotel"></SelectHotel>
		<LHPicker ref="hotelRegionPicker" mode="one" :pickerList="pickerList" :defaultIndex="defaultIndex"
			@onConfirm="onConfirm"></LHPicker>
	</view>
</template>

<script>
	import LHPicker from './../LHPicker.vue';
	import SelectHotel from './../selectHotel.vue';

	import util from '@/common/util.js';
	export default {
		components: {
			LHPicker,
			SelectHotel
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
		created() {
			console.log(this.initFormData);

			const {
				elements,
				hotelCodeA,
				hotelCodeB
			} = this.initFormData;
			
			let _isReturnHotel = this.initFormData.isReturnHotel;
			if( this.initFormData.isReturnHotel === '0'){
				_isReturnHotel = false;
			}
			if( this.initFormData.isReturnHotel === '1'){
				_isReturnHotel = true;
			}
			this.isReturnHotel = _isReturnHotel;
			
			this.hotelNameList.push(hotelCodeA.name);
			this.hotelTelList.push(hotelCodeA.tel);
			this.hotelAreaList.push(hotelCodeA.area);
			if (hotelCodeA.address) {
				this.hotelAddressList.push(hotelCodeA.address);
			}
			if (hotelCodeB) {
				this.hotelNameList.push(hotelCodeB.name);
				this.hotelTelList.push(hotelCodeB.tel);
				this.hotelAreaList.push(hotelCodeB.area);
				if (hotelCodeB.address) {
					this.hotelAddressList.push(hotelCodeB.address);
				}
			}
			
			let data = null;
			if (this.orderDetail.Product.ElementsValue && this.orderDetail.Product.ElementsValue !== '{}') {
				let ElementsValue = JSON.parse(this.orderDetail.Product.ElementsValue);
				data = ElementsValue[this.initFormData.componentItem];
			}
			
			
			elements.forEach(item => {

				let _value = '',
					errorText = '',
					area = '';
				if (data && data.formData[item.code] ) {
					const {
						value,
						text,
						tipsClass,
						formTips
					} = data.formData[item.code];
					_value = value;

					if (this.hotelAreaList.includes(item.code)) {

						_value = text || '';
						area = value;
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
					area,
				});
				
			});
			
			//返回酒店不同
			if( data && data.formData.isSameHotel === "2"){
				this.radioIndex = 2;
				this.showReturnHotel = true;
			}
			if( data && data.formData.isSameHotel === "1"){
				this.setReturnHotel();
			}
			
		},
		data() {
			return {
				form: [],
				hotelNameList: [],
				hotelTelList: [],
				hotelAreaList: [],
				hotelAddressList: [],
				pickerValue1:-1,
				pickerValue2:-1,
				pickerList1:[], //酒店区域
				pickerList2:[], //返回酒店区域
				pickerList: [],
				defaultIndex: [0],
				radioIndex: 1,
				showReturnHotel: false,
				cityID: 0,
				selectNameType: 1,
				selectTelType: 1,
				selectAreaType: 1,
				isReturnHotel:true,
			};
		},
		mounted() {
			//this.getProductAreas();
			this.getCityAreas();
		},
		methods: {
			bindPickerChange1(e) {
				this.pickerValue1 = e.target.value;	
				this.form[2].value = this.pickerList1[e.target.value].label;
				this.form[2].area = this.pickerList1[e.target.value].value;
				this.form[2].errorText = '';
			},
			cancelPickerChange1(){
				if( this.pickerValue1 == '' || this.pickerValue1 == -1  ){
					this.form[2].value = '';
					this.form[2].errorText = '请选择酒店区域';
				}
			},
			bindPickerChange2(e) {
				
				let index = 5;
				if (this.form.length === 8) {
					index = 6;
				}
				this.pickerValue1 = e.target.value;	
				this.form[index].value = this.pickerList2[e.target.value].label;
				this.form[index].area = this.pickerList2[e.target.value].value;
				this.form[index].errorText = '';
			},
			cancelPickerChange2(){
				let index = 5;
				if (this.form.length === 8) {
					index = 6;
				}
				if( this.pickerValue2 == '' || this.pickerValue2 == -1 ){
					this.form[index].value = '';
					this.form[index].errorText = '请选择酒店区域';
				}
			},
			clickPicker(type) {
				if( this.orderDetail.CustomerState !== 0 && this.orderDetail.CustomerState !== 20){
					return;
				}
				if( type === 1){
					this.pickerList = [ ...this.pickerList1 ];
				}else{
					this.pickerList = [ ...this.pickerList2 ];
				}
				this.selectAreaType = type;
				this.defaultIndex = [0];
				this.$refs.hotelRegionPicker.showPicker();
			},
			onConfirm(e) {
				//this.pickerValue = this.pickerList[e[0]].label;
				let index = 2;
				if (this.selectAreaType === 2) {
					index = 5;
					if (this.form.length === 8) {
						index = 6;
					}
				}
				//this.hotel.areaName = this.pickerList[e[0]].label;
				const labelValue = this.pickerList[e[0]].label;
				if( labelValue ){
					this.form[index].value = labelValue;
					this.form[index].area = this.pickerList[e[0]].value;
					this.form[index].errorText = '';
				}
				this.$refs.hotelRegionPicker.closePicker();
			},
			radioChange(e) {
				const value = e.target.value;
				if (value == 1) {
					this.showReturnHotel = false;
				} else {
					this.showReturnHotel = true;
				}
				this.setReturnHotel();
			},
			setReturnHotel(){
				
				if( this.form.length === 6){
					
					//酒店名称
					this.form[3].value = this.form[0].value;
					this.form[3].errorText = this.form[0].errorText;
					
					//酒店电话
					this.form[4].value = this.form[1].value;
					this.form[4].errorText = this.form[1].errorText;
					
					//酒店区域
					this.form[5].value = this.form[2].value;
					this.form[5].errorText = this.form[2].errorText;
					this.form[5].area = this.form[2].area;
					
				}
				if( this.form.length === 8){
					//酒店名称
					this.form[4].value = this.form[0].value;
					this.form[4].errorText = this.form[0].errorText;
					
					//酒店电话
					this.form[5].value = this.form[1].value;
					this.form[5].errorText = this.form[1].errorText;
					
					
					//酒店区域
					this.form[6].value = this.form[2].value;
					this.form[6].errorText = this.form[2].errorText;
					this.form[6].area = this.form[2].area;
					
					
					//酒店地址
					this.form[7].value = this.form[3].value;
					this.form[7].errorText = this.form[3].errorText;
					
				}
				
			},
			selectHotel(type) {
				this.selectNameType = type;
				const {
					area,
					area2
				} = this.initFormData;
				if (type === 1) {
					this.cityID = area;
				} else {
					this.cityID = area2;
				}
				if( type === 1){
					this.pickerList = [ ...this.pickerList1 ];
				}else{
					this.pickerList = [ ...this.pickerList2 ];
				}
				this.$refs.hotelPicker.searchInput = '';
				this.$refs.hotelPicker.hotelShow = true;
				this.$refs.hotelPicker.getHistoryHotels(this.cityID);

			},

			getProductAreas() {
				const { area,area2} = this.initFormData;
				
				this.$sendRequest({
					url: "/WxOpen/GetProductAreas",
					method: "POST",
					data: {
						orderId: this.orderDetail.Product.OrderId
					},
				}).then(res => {
					if (res.Code === 200) {
						const list = [];
						res.data.forEach(item => {
							const {
								AreaID,
								AreaEnName,
								AreaName
							} = item;
							list.push({
								value: AreaID,
								label: AreaEnName + '-' + AreaName,
							});
						});

						this.pickerList = list;
					}
				});
			},
			getCityAreas(){
				const { area,area2} = this.initFormData;
				
				this.$sendRequest({
					url: "/WxOpen/GetCityAreas",
					method: "POST",
					data: {
						cityIDs: [area,area2 ]
					},
				}).then(res => {
					if (res.Code === 200) {
						const list1 = [];
						const list2 = [];
						res.data.forEach(item => {
							// const {
							// 	AreaID,
							// 	AreaEnName,
							// 	AreaName
							// } = item;
							// list.push({
							// 	value: AreaID,
							// 	label: AreaEnName + '-' + AreaName,
							// });
							if( item.CityID == area){
								
								item.Areas.forEach( (im,ix) =>{
									const {
										AreaID,
										AreaEnName,
										AreaName
									} = im;

									list1.push({
										value: AreaID,
										label: AreaEnName + '-' + AreaName,
									});
									if( this.form[2].area == AreaID){
										this.pickerValue1 = ix+'';
									}
								})
								
								this.pickerList1 = list1;
							}
							if( item.CityID == area2 && this.form.length > 4){
								let index = 5;
								if( this.form.length === 8){
									index = 6;
								}
								item.Areas.forEach( (im,ix) =>{
									const {
										AreaID,
										AreaEnName,
										AreaName
									} = im;
								
									list2.push({
										value: AreaID,
										label: AreaEnName + '-' + AreaName,
									});
									if( this.form[index].area == AreaID){
										this.pickerValue1 = ix+'';
									}
								})
								this.pickerList2 = list2;
							}
						});
						if( !list2.length ){
							this.pickerList2 = [ ...this.pickerList1 ];
						}
						//this.pickerList = list;
					}
				});
			},
			selectedHotel(hotel) {
				const {
					HotelName,
					AreaName,
					AreaID,
					HotelTel,
					HotelAddress
				} = hotel;

				if (this.selectNameType === 1) {
					this.form[0].value = HotelName;
					this.form[0].errorText = '';

					if (HotelTel) {
						this.form[1].value = HotelTel;
						this.form[1].errorText = '';
					}
					if (AreaName) {

						const find_area = this.pickerList.find( item => item.value == AreaID );
						//debugger;
						
						if( find_area ){
							this.form[2].value = find_area.label;
							this.form[2].errorText = '';
							this.form[2].area = AreaID;
						}
						
					}
					if (HotelAddress && [4, 8].includes(this.form.length)) {
						this.form[3].value = HotelAddress;
						this.form[3].errorText = '';
					}

					//返回酒店一样
					if (!this.showReturnHotel && this.form.length > 4) {
						
						let index = 3;
						if( this.form.length === 8){
							index++;
						}
						
						this.form[index].value = HotelName;
						this.form[index].errorText = '';

						if (HotelTel) {
							this.form[index+1].value = HotelTel;
							this.form[index+1].errorText = '';
						}
						if (AreaName) {
							
							const find_area = this.pickerList.find( item =>{ item.value == AreaID });
							if( find_area ){
								this.form[index+2].value = find_area.label;
								this.form[index+2].errorText = '';
								this.form[index+2].area = AreaID;
							}
						}
						if (HotelAddress && this.form.length === 8) {
							this.form[index+3].value = HotelAddress;
							this.form[index+3].errorText = '';
						}
					}

				} else {
					let index = 3;

					if (this.form.length === 8) {
						index = 4;
					}
					this.form[index].value = HotelName;
					this.form[index].errorText = '';

					if (HotelTel) {
						this.form[index + 1].value = HotelTel;
						this.form[index + 1].errorText = '';
					}
					if (AreaName) {
						this.form[index + 2].value = AreaName;
						this.form[index + 2].errorText = '';
						this.from[index + 2].area = AreaID;
					}
					if (HotelAddress && [4, 8].includes(this.form.length)) {
						this.form[index + 3].value = HotelAddress;
						this.form[index + 3].errorText = '';
					}
				}


			},

			inputHotelTel(type, e) {
				this.selectTelType = type;
				let value = e.detail.value.trim();
				let index = 1;
				if (!e) {
					if (type === 2) {
						index = 4;
						if (this.form.length === 8) {
							index = 5;
						}
					}

				}
				let error = '';
				if (!value) {
					error = '请填写正确的号码';
				} else {
					if (!util.isNumber(value)) {
						error = '请填写正确的号码';
					}
				}
				this.form[index].errorText = error;
				
				//同步到返回酒店
				if( type === 1 && !this.showReturnHotel && this.form.length > 5){
					let returnIndex = 4;
					
					if( this.form.length === 8){
						returnIndex = 5;
					}
					this.form[returnIndex].value = this.form[index].value;
					this.form[returnIndex].errorText = error;
				}
			},
			inputHotelAddress(type, e) {
				this.selectTelType = type;
				let value = e.detail.value.trim();
				let index = 3;
				if (!e) {
					if (type === 2) {
						index = 7
					}
			
				}
				let error = '';
				if (!value) {
					error = '请填写酒店地址';
				} 
				this.form[index].errorText = error;
				
				//同步到返回酒店
				if( type === 1 && !this.showReturnHotel && this.form.length === 8){
					let returnIndex = 7;
					
					this.form[returnIndex].value = this.form[index].value;
					this.form[returnIndex].errorText = error;
				}
			},
			validateFiles() {
				if (this.initFormData.mandatory === '1') {
					this.form.forEach((item, index) => {
						if (!item.value) {
							this.form[index].errorText = '请填写';
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
						tips,
						area
					} = item;
					
					let tipsClass = errorText ? 'help-inline tips' : 'help-inline';
					let formTips = errorText ? errorText : tips;
					ElementsValue[this.initFormData.componentItem].formData[item.code] = {
						value,
						text: value,
						formTips,
						tipsClass
					};
					//更新酒店区域值
					if (this.hotelAreaList.includes(item.code)) {
				
						ElementsValue[this.initFormData.componentItem].formData[item.code].value = area+'';
					}
					
					ServiceItemTemplteValue[item.code] = value;
					if (errorText) {
						hasError.push(errorText);
					}
				});
				ElementsValue[this.initFormData.componentItem].formData.isSameHotel = this.showReturnHotel ? '2':'1';
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
