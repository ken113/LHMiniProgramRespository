<template>
	<view >
		<editTraveller ref="myTraveller" :myTraveller="traveller" :pageType="pageType"></editTraveller>
	</view>
</template>

<script>
	import editTraveller from '../../components/editTraveller.vue'
	import editTravellerMeans from '../../components/editTravellerMeans.vue'
	
	export default {
		components:{
			editTraveller,
			editTravellerMeans
		},
		data() {
			return {
				traveller:{
					TravellerName: '',
					TravellerEnname: '',
					PassportNo: '',
					TravellerSex: 0,
					Birthday: '',
				},
				pageType:0, //1.新增，2.修改
			
			}
		},
		onInit(options){
		},
		onShow(){
			uni.$on("closeMeans", res => {
				//debugger;
			    //console.log(res);
				this.traveller = res.traveller;
			    // 清除监听
			    uni.$off('closeMeans');
			})
		},
		onLoad(options) {
			
			const {
				traveller,
				pageType
			} = options;
			
			this.pageType = pageType;
			
			if( traveller){
				this.traveller = JSON.parse(traveller);
			}
			
			if( pageType === "1"){
				
				uni.setNavigationBarTitle({
				　　title:'新增常用游客'
				})
			}else{
				uni.setNavigationBarTitle({
				　　title:'编辑常用游客'
				})
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
