<template>
	<view >
		<editTravellerMeans :myTraveller="traveller" :pageType="pageType"></editTravellerMeans>
	</view>
</template>

<script>
	import editTravellerMeans from '../../components/editTravellerMeans.vue'
	
	export default {
		components:{
			editTravellerMeans
		},
		data() {
			return {
				traveller:{},
				pageType:0, //1.新增，2.修改
			}
		},
		onLoad(options) {
			const {
				traveller,
				pageType
			} = options;
			
			this.pageType = pageType;
			if(traveller){
				this.traveller = JSON.parse(traveller);
			}
			
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
