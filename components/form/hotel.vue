<template>
	<view class="lhform form-hotel">

		<view class="uib-item">
			<view class="item-left">酒店名称</view>
			<view class="item-right">
				<input />
			</view>
		</view>
		<view class="uib-item">
			<view class="item-left">酒店电话</view>
			<view class="item-right">
				<input />
			</view>
		</view>
		<view class="uib-item">
			<view class="item-left">酒店区域</view>
			<view class="item-right">
				<picker class="select" @change="bindPickerChange" :value="index" :range="array">
					<view class="select-item">{{array[index]}}</view>
				</picker>
			</view>
		</view>
		
		<view class="uib-item">
			<view class="item-left">返回酒店信息</view>
			<view class="item-right">
				<radio-group @change="radioChange">
					 <label class="radio"><radio style="transform:scale(0.6);" color="#007AFF" value="1" :checked="radioIndex == 1" />与接人酒店相同</label>
					 <label class="radio"><radio style="transform:scale(0.6);" color="#007AFF" value="2" :checked="radioIndex == 2"/>填写另一个酒店</label>
				</radio-group>
			</view>
		</view>
		
		<view v-if="showReturnHotel">
			<view class="uib-item" >
				<view class="item-left">返回酒店名称</view>
				<view class="item-right">
					<input />
				</view>
			</view>
			<view class="uib-item">
				<view class="item-left">返回酒店电话</view>
				<view class="item-right">
					<input />
				</view>
			</view>
			<view class="uib-item">
				<view class="item-left">返回酒店区域</view>
				<view class="item-right">
					<picker class="select" @change="bindPickerChange" :value="index" :range="array">
						<view class="select-item">{{array[index]}}</view>
					</picker>
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
				array: ['南山区', '福田区'],
				radioIndex:1,
				showReturnHotel:false,
			};
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			radioChange(e){
				const value = e.target.value;
				if( value == 1){
					this.showReturnHotel = false;
				}else{
					this.showReturnHotel = true;
				}
			},
		}
	}
</script>

<style lang="scss">

</style>
