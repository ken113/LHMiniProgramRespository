<template>
	<view class="lhform form-select">
		<view class="uib-item">
			<view class="item-left">服务场次</view>
			<view class="item-right">
				<!-- <picker class="select" @change="bindPickerChange" :value="index" :range="array">
					<view class="select-item" :key="index">{{array[index]}}</view>
				</picker> -->
				<uni-data-picker class="select" :localdata="items" popup-title="请选择服务场次" @change="onchange"
					@nodeclick="onnodeclick"></uni-data-picker>
			</view>
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
				items: [{
						text: "二年级",
						value: "2-0"
					},
					{
						text: "三年级",
						value: "3-0"
					}
				]

			}
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			onchange(e) {
				const value = e.detail.value
			},
			onnodeclick(node) {}
		}
	}
</script>

<style lang="scss">
</style>
