<template>
	<view class="page-order">
		<!-- <button open-type="getUserInfo" @click="loginMP">获取用户信息</button> -->
		<view class="uni-tab-bar">
			<scroll-view class="order-tab" scroll-x>
				<block v-for="(tab,index) in tabBars" :key="index">
					<view class="swiper-tab-list" :class="{active:tabIndex==index}" @tap="tabtap(index)"
						v-bind:id="'tabNum'+index">
						<view class="tab-name">
							{{tab.name}}
							<text v-if="index===1" :class="tab.num ? 'num':'hidden'">{{tab.num?tab.num:""}}</text>
						</view>
					</view>
				</block>
			</scroll-view>
			<view class="order-tab-line" :style="{left: tabLineLeft + 'px' }"></view>
		</view>

		<!-- <view class="top-img" :style="{backgroundImage:`url(${indexBackgroundImage})`,backgroundSize: 'cover'}"></view> -->
		<swiper class="ui-order" @change="swiperChange" :current="tabIndex" :style="'height: ' + height +'px;'">
			<swiper-item class="ui-order-item" v-for="(item,index) in tabBars" :key="index">
				<view class="order-list-ctn" :id="'orderListCtn'+index">
					<view class="order-list">
						<!-- @tap="openOrderEidt(index,$event)" -->
						<view  v-for="(item,index) in orderList[index]" :key="item.OrderId">

							<navigator class="order-item-box" hover-class="active"
								:url=" item.isEidt ? '/pages/order/edit?id=' + item.OrderId : '/pages/order/detail?id=' + item.OrderId "
								open-type="navigate">
								<!-- item.AdultNetPrice ===0 && item.BobyNetPrice ===0 && item.ChildNetPrice ===0 -->
								<view v-if="false" class="free-iamge"
									style="background:url('./../../static/u128.png');background-size: cover"></view>

								<view class="item-top">
									<text class="order-number">订单号：{{ item.OrderNo}}</text>
									<text :class=" 'order-status ' + cusotmrStatusColor[item.CusotmrStatus]"><text
											v-if="item.CusotmrStatus ===70"
											class="iconfont">&#xe8ad;</text>{{ item.CustomrStatusName }}</text>
								</view>
								<view class="item-center">
									<view class="order-name">{{ item.cnItemName }}</view>
								</view>
								<view class="item-bottom">
									<text class="order-date">出行：{{ item.ServiceDate }}</text>
									<text class="order-person">{{ item.personText }}</text>
								</view>
								<view class="item-bottom2" v-if="item.ReceiveManTime">接人时间：{{ item.ReceiveManTime }}
								</view>

							</navigator>

						</view>

						<view class="order-item-nomore"
							v-if=" orderList[tabIndex].length === 0 || ( tabIndex===0 && total === orderList[0].length)">
							<view class="top">
								<view class="txt1"></view>
								<view class="txt2" v-if="orderList[tabIndex].length === 0">还没有订单</view>
								<view class="txt2" v-if="orderList[tabIndex].length > 0">我也是有底线的</view>
								<view class="txt3"></view>
							</view>
							<view class="center" :style="{backgroundImage:`url(${imageLogo})`,backgroundSize: 'cover'}">
							</view>
						</view>


					</view>
				</view>
			</swiper-item>
		</swiper>

		<!-- <view class="order-item-null" >
			<view class="center">
				<view class="img" style="background:url('./../../static/u64.png');background-size: cover"></view>
				<view class="text">还没有订单，去逛逛</view>
			</view>
			<view class="bottom">
				<view class="txt1"></view>
				<view class="txt2">你可能还能喜欢</view>
				<view class="txt3"></view>
			</view> 
		</view> -->
		<!-- 		<view class="goods-list" v-if="orderList.length === 0">
			<view class="goods-item">
				<view class="goods-img" style="background:url('./../../static/u13.png')"></view>
				<view class="goods-name">泰国曼谷金东尼人妖秀演出门票</view>
				<view class="goods-bottom">
					<text class="goods-price">￥50</text>
					<text class="goods-link iconfont lhddcart"></text>
				</view>
			</view>
			<view class="goods-item">
				<view class="goods-img" style="background:url('./../../static/u13.png')"></view>
				<view class="goods-name">泰国旅游曼谷到芭提雅华欣象岛一日包车游可预...</view>
				<view class="goods-bottom">
					<text class="goods-price">￥347</text>
					<text class="goods-link iconfont lhddcart"></text>
				</view>
			</view>
			<view class="goods-item">
				<view class="goods-img" style="background:url('./../../static/u13.png')"></view>
				<view class="goods-name">泰国曼谷金东尼人妖秀演出门票</view>
				<view class="goods-bottom">
					<text class="goods-price">￥50</text>
					<text class="goods-link iconfont lhddcart"></text>
				</view>
			</view>
			<view class="goods-item">
				<view class="goods-img" style="background:url('./../../static/u13.png')"></view>
				<view class="goods-name">泰国旅游曼谷到芭提雅华欣象岛一日包车游可预...</view>
				<view class="goods-bottom">
					<text class="goods-price">￥347</text>
					<text class="goods-link iconfont lhddcart"></text>
				</view>
			</view>
		</view> -->
		<selectUser ref="selectUser" :customerList="customerList" @selectedUser="selectedUser"></selectUser>
	</view>
</template>

<script>
	//import indexBackgroundImage from "@/static/1.png";
	import imageLogo from '@/static/u55.png';
	import util from '@/common/util.js';

	import selectUser from '@/components/selectUser.vue';

	export default {
		components: {
			selectUser
		},
		beforeCreate() {

		},

		data() {
			return {
				imageLogo,
				page: 1,
				page2: 1,
				pageSize: 10,
				total: 0,
				orderDataList: [], //所以的数据，缓存到列表
				orderList: [
					[],
					[],
					[],
					[],
					[]
				], //页面展示
				tabIndex: 0, // 选中的
				tabLineLeft: 0,
				height: 0,
				tabBars: [{
						name: "全部",
						id: "all",
						num: 0,
					},
					{
						name: "待处理",
						id: "pending",
						num: 0
					},
					{
						name: "处理中",
						id: "processing",
						num: 0
					},
					{
						name: "已确认",
						id: "confirm",
						num: 0
					},
					{
						name: "已取消",
						id: "cancel",
						num: 0
					},
				],
				orderStatusMap: {
					0: "未填写",
					1: "待核对",
					2: "已核对",
					3: "已发送",
					4: "新单已接",
					5: "确认待检",
					6: "已确认",
					7: "拒绝待检",
					8: "已拒绝",
					9: "请求取消",
					10: "取消待检",
					11: "已取消",
					12: "请求变更",
					13: "已作废",
					14: "取消已接",
					15: "变更已接",
				},
				cusotmrStatusColor: {
					0: 'noedit',
					70: 'ok'
				},
				customerList:[],
			};
		},
		filters: {
			filterDate(value) {
				if (!value || value.substring(0, 10) == '0001-01-01' || value.substring(0, 10) == '1900-01-01') {
					return '';
				}
				return util.dateFormat(value, 'd');
			},
		},

		onLoad(options) {

			util.autoUpdater();
			//pages/order/index?officialAccount=2&openID=oQO72jnXxbKwWhkfeTZtCLCddDBs&customerId=156624&path=105540_0 
			// options = {
			// 	officialAccount:'2',
			// 	openID:'oQO72jnXxbKwWhkfeTZtCLCddDBs',
			// 	customerId:'156624',
			// 	path:'105540_40'
			// };

			console.log('orderlist', options)
			let officialAccount = options && options.officialAccount;
			//officialAccount = 1;

			//从公众号菜单跳转过来
			if (officialAccount == '1') {
				uni.hideTabBar();
				this.getSessionId(officialAccount);
			} else if (officialAccount == '2') {
				const {
					openID,
					customerId,
					path
				} = options;
				this.getSessionId(officialAccount, openID, customerId, path);
			} else {
				if (!uni.getStorageSync("sessionId")) {
					uni.redirectTo({
						url: '/pages/index/login'
					});
				} else {
					this.init();
				}

			}
		},
		onShow() {

		},
		onHide() {},
		mounted() {},
		onShareAppMessage: function() {

		},
		//下拉刷新
		onPullDownRefresh() {
			
			if(!uni.getStorageSync("sessionId")){
				return;
			}
			this.page = 1;
			this.pageSize = 10;
			this.orderDataList = [];
			this.orderList = [
				[],
				[],
				[],
				[],
				[]
			];
			this.getOrderList();
		},
		onReachBottom() {

			if (this.total === this.orderDataList && this.tabIndex === 0) {
				return;
			}

			if (this.page > this.page2 || this.total > this.orderDataList.length) {
				this.page2++;
				this.renderList(this.tabIndex);

			}
			if (this.tabIndex === 0) {
				this.page++;
				this.getOrderList();
			}
		},
		onShow(e) {},
		methods: {

			getSessionId(officialAccount, openID, customerId, path) {
				const _this = this;
				wx.login({
					success(res) {
						if (res.code) {
							const data = {
								code: res.code,
								type: 1,
							};
							if (officialAccount == '2') {
								data.openID = openID;
								data.customerId = customerId;
								data.type = 2;
							}
							_this.$sendRequest({
									url: "/WxOpen/OnLogin",
									method: "GET",
									data,
									loadding: false,
								})
								.then((response) => {
									console.log('获取微信code', response);
									
									if( response.Code === 301 && response.data.length > 1){
										uni.removeStorageSync('sessionId');
										_this.customerList = response.data;
										_this.$refs.selectUser.userShow = true;
									}else if (response.Code === 200) {
										
										uni.showTabBar();
										uni.setStorageSync("sessionId", response.data.Key);

										if (officialAccount == '1') {
											_this.init();
										}
										if (officialAccount == '2') {

											let tabIndex = 0;
											let [orderNo, CusotmrStatus] = path.split('_');

											console.log('CusotmrStatus', CusotmrStatus);
											CusotmrStatus = parseInt(CusotmrStatus);

											if (CusotmrStatus === 0) {
												_this.init();
												uni.navigateTo({
													url: '/pages/order/edit?id=' + orderNo
												});
											} else if (CusotmrStatus === 70) {
												_this.init();
												uni.navigateTo({
													url: '/pages/order/detail?id=' + orderNo
												});
											} else {

												//待处理
												if ([0, 20, 30, 10].includes(CusotmrStatus)) {
													tabIndex = 1;
												}
												//处理中
												if ([40, 50, 60].includes(CusotmrStatus)) {
													tabIndex = 2;
												}
												//已确认
												if ([70].includes(CusotmrStatus)) {
													tabIndex = 3;
												}
												//已取消
												if ([80].includes(CusotmrStatus)) {
													tabIndex = 4;
												}

												_this.init(tabIndex);
											}
										}
									} else {
										uni.showToast({
											icon: "none",
											title: response.Msg,
										});
									}
								});
						} else {
							console.log("登录失败！" + res.errMsg);
						}
					},
				});
			},
			selectedUser() {

			},
			init(tabIndex = 0) {
				this.page = 1;
				this.pageSize = 10;
				this.orderDataList = [];
				this.orderList = [
					[],
					[],
					[],
					[],
					[]
				];
				this.tabIndex = tabIndex;
				this.setScrollLeft(tabIndex);
				//this.height =uni.getSystemInfoSync().windowHeight -((66 * 1.2) / 750) * uni.getSystemInfoSync().windowHeight;
				this.getOrderList();
				//uni.startPullDownRefresh();

			},
			tabtap: function(index) {
				this.page2 = 1;
				this.tabIndex = index;
				this.setScrollLeft(index);
				this.renderList(index);

				uni.pageScrollTo({
					duration: 0, //过渡时间必须为0，否则运行到手机会报错
					scrollTop: 0
				})
			},
			swiperChange: function(e) {
				this.page2 = 1;
				var index = e.target.current || e.detail.current;
				this.tabIndex = index;
				this.setScrollLeft(index);
				this.renderList(index);


			},
			setScrollLeft: function(tabIndex) {
				let winWidth = uni.getSystemInfoSync().windowWidth,
					tabLineWidth = Math.floor(
						(80 / 750) * uni.getSystemInfoSync().windowWidth
					);
				this.tabLineLeft = (Math.floor(winWidth / 5) - tabLineWidth) / 2 + Math.floor(winWidth / 5) * tabIndex;


			},
			getOrderList() {
				uni.showLoading({
					title: "加载中",
					mask: false,

				});
				this.$sendRequest({
					url: "/WxOpen/GetIndexList",
					method: "POST",
					data: {
						page: this.page,
						pageSize: this.pageSize,
					},
				}).then(res => {
					uni.stopPullDownRefresh();
					const tabBars = [];
					console.log('加载订单列表', res);
					if (res.Code === 200) {

						res.data.orders.forEach(item => {

							const {
								AdultNum,
								ChildNum,
								RoomNum,
								INFNum,
								RightNum,
								ServiceTypeID,
								ServiceDate
							} = item;

							let personText = AdultNum + ' 成人 ' + ChildNum + ' 儿童 ' + INFNum + ' 婴儿';
							if (ServiceTypeID === 4) {
								personText = AdultNum + ' 成人 ' + ChildNum + ' 儿童 ' + INFNum + ' 婴儿 ' + RoomNum + ' 间 ' + RightNum + ' 晚';
							}
							item.personText = personText;

							let _ServiceDate = '';
							if (!ServiceDate || ServiceDate.substring(0, 10) == '0001-01-01' || ServiceDate
								.substring(0, 10) == '1900-01-01') {
								_ServiceDate = '';
							} else {
								_ServiceDate = util.dateFormat(ServiceDate, 'd');
							}
							item.ServiceDate = _ServiceDate;
							if( [0,20].includes(item.CusotmrStatus) ){
								item.isEidt = true;
							}
							
						})

						if (this.page === 1) {
							this.orderDataList = res.data.orders;
						} else {
							this.orderDataList = this.orderDataList.concat(res.data.orders);
						}

						//this.orderList = [...res.data.data];
						this.total = res.data.TotalCount;

						this.renderList(this.tabIndex, '2');

						let num1 = 0;
						let num2 = 0;
						let num3 = 0;
						let num4 = 0;

						this.orderDataList.forEach(item => {
							//待处理
							if ([0, 20, 30, 10].includes(item.CusotmrStatus)) {
								num1++;
							}
							//处理中
							if ([40, 50, 60].includes(item.CusotmrStatus)) {
								num2++;
							}
							//已确认
							if ([70].includes(item.CusotmrStatus)) {
								num3++;
							}
							//已取消
							if ([80].includes(item.CusotmrStatus)) {
								num4++;
							}
						});

						this.$set(this.tabBars[0], 'num', this.orderDataList.length);
						this.$set(this.tabBars[1], 'num', num1);
						this.$set(this.tabBars[2], 'num', num2);
						this.$set(this.tabBars[3], 'num', num3);
						this.$set(this.tabBars[4], 'num', num4);

						this.$nextTick(() => {

							const query = uni.createSelectorQuery().in(this);
							const id = '#orderListCtn' + this.tabIndex;
							query.select(id).boundingClientRect(data => {
								if (data) {
									const height = uni.getSystemInfoSync().windowHeight - 60;
									this.height = Math.max(height, data.height);
								}
							}).exec();

						});

					}
				});
			},
			renderList(index, type) {
				// if (index === 0 && !type) {
				// 	this.orderList = [...this.orderDataList];
				// 	return;
				// }

				let statusList = [];
				if (index === 0) {
					statusList = [-1];
				} else if (index === 1) {
					statusList = [0, 20, 30, 10];
				} else if (index === 2) {
					statusList = [40, 50, 60];
				} else if (index === 3) {
					statusList = [70];
				} else if (index === 4) {
					statusList = [80];
				}

				//debugger;
				let tempList = [];
				let tempPage = type ? this.page : this.page2;
				const len = tempPage * this.pageSize;
				if (index === 0) {
					tempList = [...this.orderDataList];
				} else {
					this.orderDataList.forEach(item => {
						if (statusList.includes(item.CusotmrStatus)) {
							tempList.push(item);
						}
					});
				}
				this.orderList[index] = [...tempList];
				//缓存加载
				//this.orderList = [...tempList].splice(0,len);

				this.$nextTick(() => {

					const query = uni.createSelectorQuery().in(this);
					const id = '#orderListCtn' + this.tabIndex;
					query.select(id).boundingClientRect(data => {
						if (data) {
							const height = uni.getSystemInfoSync().windowHeight - 60;
							this.height = Math.max(height, data.height);
						}
					}).exec();

				});
			},
			openOrderEidt(a, b) {
				const order = this.orderList[this.tabIndex][a];
				if ([0, 20].includes(order.CusotmrStatus)) {
					uni.navigateTo({
						url: '/pages/order/edit?id=' + order.OrderId
					});
				} else {
					uni.navigateTo({
						url: '/pages/order/detail?id=' + order.OrderId
					});
				}
			},
			selectedUser(){
				this.init();
				uni.showTabBar();
			},
		},
	};
</script>

<style lang="scss" scoped>
	.page-order {
		font-size: 24rpx;
		//overflow: hidden;

		.uni-tab-bar {
			height: 80rpx;
			line-height: 80rpx;
			position: fixed;
			background: #fff;
			top: 0;
			width: 100%;
			z-index: 100;

			.order-tab-line {
				border-top: 2px solid #4992e7;
				width: 80rpx;
				position: absolute;
				bottom: 2px;
				transition: all 0.3s;
			}

			.order-tab {
				.swiper-tab-list {
					color: #999;

					&.active {
						color: #4992e7;
						font-weight: 600;
					}

					.tab-name {
						position: relative;
						display: inline;

						.num {
							position: absolute;
							height: 24rpx;
							line-height: 24rpx;
							width: 24rpx;
							border-radius: 50%;
							right: -24rpx;
							background: #ff6600;
							color: #fff;
							top: -5rpx;
							font-size: 18rpx;
							text-align: center;
						}
					}
				}
			}
		}

		.order-item-nomore {
			margin: 0 auto;
			margin-top: 40rpx;
			text-align: center;
			width: 100%;

			.top {
				color: #999;
				display: flex;
				justify-content: space-between;
				height: 40rpx;
				align-items: center;

				.txt1,
				.txt3 {
					border-bottom: 1px solid #eeeeee;
					width: 33.33%;
					transform: translate(0, -10rpx);
				}

				.txt2 {
					margin-bottom: 20rpx;
				}
			}

			.center {
				height: 44rpx;
				width: 140rpx;
				display: inline-block;
				margin-top: 20rpx;
			}
		}

		.order-item-null {
			margin: 40rpx auto;
			text-align: center;
			font-size: 24rpx;

			.center {
				margin: 0 auto;
				text-align: center;

				.img {
					height: 126rpx;
					width: 126rpx;
					display: inline-block;

					image {
						display: inline-block;
						height: 100%;
						width: 100%;
					}
				}

				.text {
					color: #999;
					font-size: 24rpx;
				}
			}

			.bottom {
				margin-top: 20rpx;
				padding: 0 24rpx;
				color: #ff6600;
				display: flex;
				justify-content: center;

				.txt1,
				.txt3 {
					border-bottom: 1px solid #ff6600;
					width: 204rpx;
					transform: translate(0, -14rpx);
					position: relative;
					font-size: 24rpx;
				}

				.txt2 {
					display: inline-block;
					width: 200rpx;
					text-align: center;
					font-size: 24rpx;
				}

				.txt1:after {
					content: "";
					position: absolute;
					display: inline-block;
					height: 6px;
					width: 6px;
					background: #ff6600;
					bottom: -5rpx;
					right: 0;
					transform: rotate(45deg);
				}

				.txt3:after {
					content: "";
					position: absolute;
					display: inline-block;
					height: 6px;
					width: 6px;
					background: #ff6600;
					bottom: -5rpx;
					left: 0;
					transform: rotate(45deg);
				}
			}
		}

		.goods-list {
			padding: 0 24rpx;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.goods-item {
				width: 345rpx;
				margin-bottom: 20rpx;

				.goods-img {
					width: 345rpx;
					height: 345rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.goods-name {
					margin-top: 12rpx;
					font-size: 24rpx;
					width: 100%;
					line-height: 24rpx;
				}

				.goods-bottom {
					margin-top: 12rpx;
					line-height: 24rpx;
					overflow: hidden;
					height: 40rpx;

					.goods-price {
						color: #4992e7;
						float: left;
						font-weight: 600;
						height: 40rpx;
						line-height: 40rpx;
						font-size: 24rpx;
					}

					.goods-link {
						float: right;
						padding-right: 20rpx;
						color: #4992e7;
						font-size: 42rpx;
						vertical-align: middle;
						height: 40rpx;
						line-height: 40rpx;
					}
				}
			}
		}

		.ui-order {
			//height: 885rpx;
			position: relative;
			margin-top: 80rpx;

			.ui-order-item {
				overflow: auto;
				height: fit-content !important;
			}
		}

		.top-img {
			margin: 24rpx;
			height: 120rpx;
			margin-bottom: 0;
		}

		.order-list-ctn {
			padding: 24rpx;
			padding-top: 0;

			.order-list {
				margin-top: 24rpx;

				.order-item-box {
					margin-bottom: 24rpx;
					background: #fff;
					padding: 0 24rpx;
					border-radius: 10px;

					position: relative;
					
					&.active{
						background: rgba(51,51,51,.1);
					}

					.free-iamge {
						position: absolute;
						height: 54rpx;
						width: 52rpx;
						top: 0;
						left: 0;
						z-index: 10;
					}

					.item-top {
						border-bottom: 1px solid #eeeeee;
						overflow: hidden;
						//padding: 24rpx 0 5rpx 0;
						height: 72rpx;
						line-height: 72rpx;

						.order-number {
							font-size: 24rpx;
							color: #999;
							float: left;
						}

						.order-status {
							float: right;
							font-size: 24rpx;

							&.noedit {
								color: #FF6600;
							}

							&.ok {
								color: #4992E7;
							}

							.iconfont {

								margin: 0rpx 5rpx;
								font-size: 28rpx;
								padding-top: 0rpx;
							}
						}
					}

					.item-center {
						.order-name {
							font-size: 26rpx;
							color: #303030;
							margin: 10rpx 0;
							font-weight: 600;
						}
					}

					.item-bottom {
						overflow: hidden;
						font-size: 24rpx;
						//padding-bottom: 10rpx;
						height: 72rpx;
						line-height: 72rpx;

						.order-date {
							float: left;

						}

						.order-person {
							float: right;
							color: #999;
						}
					}

					.item-bottom2 {
						border-top: 1px solid #eeeeee;
						//padding: 8rpx 0;
						color: #ff6600;
						font-size: 24rpx;
						height: 72rpx;
						line-height: 72rpx;
					}
				}
			}
		}
	}
</style>
