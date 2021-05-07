<template>
	<view class="lhform form-select">
		<view class="uib-item" >
			<view class="item-left">服务场次</view>
			<view class="item-right">
				<picker class="select" @change="bindPickerChange" :value="index" :range="array">
					<view class="select-item" :key="index">{{array[index]}}</view>
				</picker>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: 0,
				array: ['中国', '美国', '巴西', '日本'],
			};
		},
		methods:{
			bindPickerChange: function(e) {
			            console.log('picker发送选择改变，携带值为', e.target.value)
			            this.index = e.target.value
			        },
		}
	}
</script>

<style lang="scss">
</style>
