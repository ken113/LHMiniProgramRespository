<template>
	<view class="lhform form-person">

		<view v-for="(element,index) in initFormData.elements" :key="index"
			:class="form[index].errorText ? 'error-item':'' ">
			<view class="uib-item">
				<view class="item-left">{{ element.name }}</view>
				<view class="item-right">
					<view class="right-box" @tap="pickPerson">
						<text class="iconright iconfont ">&#xe6a3;</text>
						<text class="text">已选{{ pickerList.length }}人</text>
					</view>
				</view>
			</view>
			<view class="error-text">{{form[index].errorText}}</view>
		</view>
		

		<selectPerson v-if="showPerson" :product="product" :initFormData="initFormData" :travellers="travellers"
			:initPickerList="pickerList" ref="selectPerson" @confirm="confirm" @cancel="cancel"></selectPerson>
	</view>
</template>

<script>
	import selectPerson from '../../components/selectPerson.vue'
	export default {
		components: {
			selectPerson
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
				pickerList: [],
				form: [],
				showPerson:false,
				//initList:[],
				product:null,
				travellers:[]
			}
		},
		created() {
			let data = null;
			this.product = this.orderDetail.Product;
			this.travellers = this.orderDetail.Customer.Travellers;
			
			if (this.orderDetail.Product.ElementsValue && this.orderDetail.Product.ElementsValue !== '{}') {
				let ElementsValue = JSON.parse(this.orderDetail.Product.ElementsValue);
				data = ElementsValue[this.initFormData.componentItem];
				
				let list = [];
				if( !data || data.formData.selectedNum === 0 ){
					this.pickerList = [];
				}else{
					
					const memberList = data.formData[ data.componentInfo.componentItem ].memberList.MemberList;
					
					for(let meber in memberList){

						list.push( memberList[meber] );
					}
					
					this.pickerList = list;
				}
				
			}
			
			//this.pickerList = this.orderTravellers;
			this.initFormData.elements.forEach(item => {
				let _value = '',
					errorText = '';
					
				this.form.push({
					code: item.code,
					value: _value,
					errorText,
					tips: item.tips,
				});
				
				if (data) {
					this.validatePerson();
				}
			});
		},
		methods: {
			pickPerson() {
				this.showPerson = true;
				this.$nextTick(()=>{
					this.$refs.selectPerson.selectPersonShow = true;
				})
				
			},
			confirm(data) {
				this.pickerList = data;
				this.showPerson = false;
				this.validatePerson();
			},
			cancel(){
				this.showPerson = false;
			},
			getFiledsValue(type) {
				if( type === 1){
					this.validatePerson();
				}
				
				const ElementsValue = {};
				const ServiceItemTemplteValue = {};
				let hasError = [];
				const {
					componentItem,
					elements
				} = this.initFormData;

				ElementsValue[componentItem] = {
					componentInfo: this.initFormData,
					formData: {}
				};

				const {
					tips,
					name,
					code,
				} = elements[0];
				const memberList = {};
				memberList['MemberList'] = {};

				this.pickerList.forEach(item => {
					item.personID = item.TravellerID || item.personID;
					item.text = item.TravellerName;
					memberList['MemberList'][item.personID] = item;
				})
				let errorText = this.form[0].errorText;
				let tipsClass = errorText ? 'help-inline tips' : 'help-inline';
				
				ElementsValue[componentItem].formData[componentItem] = {
					formTips: tips,
					tipsClass,
					selectedNum: this.pickerList.length,
					memberList,
					text: {
						name,
						type: 'PersonPicker',
						value: this.pickerList
					}
				};
				ServiceItemTemplteValue[code] = {
					name,
					type: 'PersonPicker',
					value: this.pickerList
				}
				if( errorText ){
					hasError.push( errorText );
				}
				return {
					ElementsValue,
					ServiceItemTemplteValue,
					hasError
				};
			},
			validatePerson() {
				
				const {
					Attaches
				} = this.orderDetail.Product;
				const {
					controlPerson,
					componentItem,
					isAllPerson
				} = this.initFormData;
				let ServiceNum = -1;
				let errorText = '';
				
				
				Attaches.forEach(item => {
					if (controlPerson == item.AttachId) {
						ServiceNum = item.ServiceNum;
					}
				});
					
				const selectedNum = this.pickerList.length;
				
				if( componentItem === 'MemberList' || true ){
					let total = 0;
					const {AdultNum,ChildNum,INFNum } = this.orderDetail.Product;
					
					total =  AdultNum + ChildNum + INFNum ;
					if( selectedNum > total ){
						errorText = '人数不能超过' + total + '人';
					}
				}
				
				if (ServiceNum !== -1) {

					if (selectedNum > ServiceNum) {
						errorText = '人数不能大于' + ServiceNum + '人！';
					}else{
						errorText = '';
					}
					
					if (componentItem !== 'MemberList' && isAllPerson === '1' && ServiceNum != selectedNum ) {
						errorText = '人数必须等于' + ServiceNum + '人！';
					}
					
					if( componentItem !== 'MemberList' && ServiceNum > 0 ){
						if( selectedNum === 0){
							errorText = '请选择客人！';
						}
					}
				}
				
				if( selectedNum === 0 ){
					errorText = '请选择' + this.initFormData.elements[0].name;
				}
				
				this.form[0].errorText = errorText;
			},
		}
	}
</script>

<style lang="scss">
	.right-box {
		height: 100%;
		width: 100%;
		line-height: 80rpx;
	}
</style>
