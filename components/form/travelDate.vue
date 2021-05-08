<template>
	<view class="lhform form-travel-date">
		<view class="uib-item" >
			<view class="item-left">出行日期</view>
			<view class="item-right">
				<uni-datetime-picker border="false" class="datetime" type="date" placeholder="请选择出行日期"></uni-datetime-picker>
			</view>
		</view>
		<view class="uib-item" >
			<view class="item-left">返回日期</view>
			<view class="item-right">
				<uni-datetime-picker border="false" class="datetime" type="date" placeholder="请选择返回日期"></uni-datetime-picker>
			</view>
		</view>
		
		<uni-calendar 
		    ref="calendar"
		    :insert="false"
		    @confirm="confirm"
		     />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				openType:1,
				travelDate:'',
				backDate:'',
			};
		},methods:{
			open( type ){
				this.$refs.calendar.open();
				this.openType = type;
			},
			confirm(e) {
				console.log(e);
				if( this.openType === 1){
					this.travelDate = e.fulldate;
				}else{
					this.backDate = e.fulldate;
				}
			}
		}
	}
</script>

<style lang="scss">

</style>
