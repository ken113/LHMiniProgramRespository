<template>
	<view class="hotel-content" :class="{'hotelShow':hotelShow}">
		<view class="hotel-top">
			<text class="iconfont" @tap="closeHotelPicker">&#xe86d;</text>
			<text class="text">酒店</text>
			<text class="fill">&nbsp;</text>
		</view>
		<view class="hotel-center">
			<view class="input-hotel">
				<text class="iconfont">&#xe86e;</text>
				<input class="input" placeholder="输入酒店进行搜索" v-model="searchInput" @input="changeInput"/>
			</view>
			<view class="hotel-tips" v-if="!searchInput">最近填写的酒店</view>
			<view class="hotel-tips" v-if="searchInput">{{ hotelTips}}</view>
			<view class="hotel-list">
				<template v-if="!searchInput">
					<template v-if="hotelList1.length">
						<view class="hotel-item" v-for="(hotel,index) in hotelList1" :key="index" @tap="selectedHotel(hotel)">
							<view class="hotel-name">
								{{ hotel.HotelName}}
							</view>
							<view class="hotel-region-tel">
								<text class="areaName" v-if="hotel.AreaName">{{ hotel.AreaName}}</text>
								<text class="hotelTel" v-if="hotel.HotelTel">{{ ',' + hotel.HotelTel}}</text>
							</view>
						</view>
					</template>
					<template v-else>
						<view class="hotel-nolist">暂无数据</view>
					</template>
					
				</template>
				<template v-if="searchInput">
					<template v-if="hotelList2.length">
					<view class="hotel-item" v-for="(hotel,index) in hotelList2" :key="index" @tap="selectedHotel(hotel)">
						<view class="hotel-name">
							<!-- {{ hotel.HotelName}} -->
							<text>{{ hotel.name1}}</text>
							<text class="name2">{{ hotel.name2}}</text>
							<text>{{ hotel.name3}}</text>
						</view>
						<view class="hotel-region-tel">
							<text class="areaName" v-if="hotel.AreaName">{{ hotel.AreaName}}</text>
							<text class="hotelTel" v-if="hotel.HotelTel">{{ ', ' + hotel.HotelTel}}</text>
						</view>
					</view>
					</template>
					<view v-else class="hotel-nolist" @tap="selectedHotel">
						<view>没找到这个酒店，点击直接填写</view>
						<view class="hotel-name">{{ searchInput }}</view>
					</view>
					
				</template>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"selectHotel",
		props: {
			
		},
		data() {
			return {
				cityID:0,
				hotelShow: false,
				searchInput: '',
				hotelTips: '',
				hotelList1:[],
				hotelList2:[],
				setTimeoutInput:null,
			};
		},
		mounted(){
			//this.getHistoryHotels();
		},
		methods:{
			closeHotelPicker() {
				this.hotelShow = false;
			},
			getHistoryHotels(cityID) {
				
				this.cityID = cityID;
				this.$sendRequest({
					url: "/WxOpen/GetHistoryHotels",
					method: "GET",
					data:{
						cityID
					},
				}).then(res => {
					if (res.Code === 200) {
						// res.data = [{
						// 	HotelName:123,
						// 	AreaName:456,
						// 	HotelTel:789
						// }];
						this.hotelList1 = res.data;
					}
				});
			},
			changeInput(e){
				if( !this.searchInput ){
					return;
				}
				if( this.setTimeoutInput ){
					clearTimeout(this.setTimeoutInput);
				}
				this.setTimeoutInput = setTimeout(()=>{
					this.$sendRequest({
						url: "/WxOpen/GetHotelsByKey",
						method: "POST",
						loadding:false,
						data:{
							hotelNameKey:this.searchInput,
							cityID:this.cityID
						},
					}).then(res => {
						if (res.Code === 200) {
							res.data.forEach( hotel =>{
								const hotelName = hotel.HotelName;
								
								
								const index = hotelName.toLowerCase().indexOf( this.searchInput.toLowerCase() );
								
								hotel.name1 = hotelName.substring(0,index);
								hotel.name2 = hotelName.substring(index,index + this.searchInput.length);
								hotel.name3 = hotelName.substring(index + this.searchInput.length)
							});
							this.hotelList2 = res.data;
							this.hotelTips = '共找到' + res.data.length + '个酒店';
						}
					});
					
				},300)
			},
			selectedHotel( hotel){
				let selectedHotel = {};
				if( hotel && hotel.HotelName ){
					selectedHotel = hotel;
				}else{
					selectedHotel.HotelName = this.searchInput;
				}
				this.$emit('selectedHotel',selectedHotel)
				this.hotelShow = false;
			},
		}
	}
</script>

<style lang="scss">
.hotel-content {
		flex-direction: column;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 100;
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
		transform: translateY(100%);
		transition: all 400ms ease;

		&.hotelShow {
			transform: translateY(0) !important;
		}

		.hotel-top {
			border-top: 1px solid #EEEEEE;
			border-bottom: 1px solid #EEEEEE;
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 24rpx;

			.iconfont {
				font-size: 32rpx;
				font-weight: 600;
				width: 50rpx;
			}

			.text {
				font-size: 26rpx;
			}
			.fill{
				font-size: 32rpx;
				width: 50rpx;
			}
		}

		.hotel-center {

			.input-hotel {
				height: 80rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin: 24rpx;
				border: 1px solid #eee;
				border-radius: 5px;

				.iconfont {
					padding-left: 24rpx;
					font-size: 32rpx;
				}

				.input {
					padding-left: 24rpx;
					width: 100%;
				}
			}

			.hotel-tips {
				height: 70rpx;
				line-height: 70rpx;
				font-size: 24rpx;
				background: #F7F9FB;
				color: #999;
				padding-left: 24rpx;
			}
			.hotel-list{
				
				height: calc( 100vh - 300rpx );
				overflow: auto;
				.hotel-item{
					
					border-bottom: 1px solid #eee;
					padding: 5rpx 24rpx;
					.hotel-name{
						font-size:26rpx;
						font-weight: 600;
						color:#303030;
						
						.name2{
							color:#FF6600;
						}
					}
					.hotel-region-tel{
						font-size:24rpx;
						color:#999;
					}
				}
				
				.hotel-nolist{
					color:#303030;
					text-align: center;
					font-size:26rpx;
					font-weight: 600;
					border-bottom: 1px solid #eee;
					padding: 5rpx 24rpx;
				}
			}
		}
	}
</style>
