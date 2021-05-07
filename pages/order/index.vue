<template>
  <view class="page-order">
    <view class="uni-tab-bar">
      <scroll-view class="order-tab" scroll-x>
        <block v-for="(tab,index) in tabBars" :key="index">
          <view
            class="swiper-tab-list"
            :class="{active:tabIndex==index}"
            @tap="tabtap(index)"
            v-bind:id="'tabNum'+index"
          >
            <view class="tab-name">
              {{tab.name}}
              <text :class="tab.num ? 'num':'hidden'">{{tab.num?tab.num:""}}</text>
            </view>
          </view>
        </block>
      </scroll-view>
      <view class="order-tab-line" :style="{left: tabLineLeft + 'px' }"></view>
    </view>

    <!-- <swiper class="ui-carinfos" @change="swiperChange" :current="tabIndex">
      <swiper-item
        class="ui-carinfo-item"
        v-for="(item,index) in carinfos"
        :key="index"
      >{{item.carinfo}}</swiper-item>
    </swiper>-->

    <view class="top-img" style="background:url('./../../static/1.jpg');background-size: cover"></view>

    <swiper
      class="ui-order"
      @change="swiperChange"
      :current="tabIndex"
      :style="'height: ' + height +'px;'"
      v-if="tabIndex!==3"
    >
      <swiper-item class="ui-order-item" v-for="(item,index) in tabBars" :key="index">
        <view class="order-list-ctn">
          <view class="order-list">
            <navigator url="/pages/order/edit" open-type="navigate">
              <view class="order-item-box">
                <view class="item-top">
                  <text class="order-number">订单号：201708231501206310</text>
                  <text class="order-status">未填写</text>
                </view>
                <view class="item-center">
                  <view class="order-name">普吉小车接机MG</view>
                </view>
                <view class="item-bottom">
                  <text class="order-date">出行：2020-09-01</text>
                  <text class="order-person">2 成人 0 儿童 0 婴儿</text>
                </view>
              </view>
            </navigator>

            <view class="order-item-box">
              <view
                class="free-iamge"
                style="background:url('./../../static/u128.png');background-size: cover"
              ></view>
              <view class="item-top">
                <text class="order-number">订单号：201708231501206310</text>
                <text class="order-status">未填写</text>
              </view>
              <view class="item-center">
                <view class="order-name">王权免税店海鲜自助餐购（特价款）（全岛免费接送）</view>
              </view>
              <view class="item-bottom">
                <text class="order-date">出行：2020-09-01</text>
                <text class="order-person">2 成人 0 儿童 0 婴儿</text>
              </view>
              <view class="item-bottom2">接人时间：08:00-08:15</view>
            </view>
            <view class="order-item-box" v-if="index===1">
              <view class="item-top">
                <text class="order-number">订单号：201708231501206310</text>
                <text class="order-status">未填写</text>
              </view>
              <view class="item-center">
                <view class="order-name">王权免税店海鲜自助餐购（特价款）（全岛免费接送）</view>
              </view>
              <view class="item-bottom">
                <text class="order-date">出行：2020-09-01</text>
                <text class="order-person">2 成人 0 儿童 0 婴儿</text>
              </view>
              <view class="item-bottom2">接人时间：08:00-08:15</view>
            </view>

            <view class="order-item-nomore">
              <view class="top">
                <view class="txt1"></view>
                <view class="txt2">我也是有底线的</view>
                <view class="txt3"></view>
              </view>
              <view
                class="center"
                style="background:url('./../../static/u55.png');background-size: cover"
              ></view>
            </view>
          </view>
        </view>
      </swiper-item>
    </swiper>

    <view class="order-item-null">
      <view class="center">
        <view class="img" style="background:url('./../../static/u64.png');background-size: cover"></view>
        <view class="text">还没有订单，去逛逛</view>
      </view>
      <view class="bottom">
        <view class="txt1"></view>
        <view class="txt2">你可能还能喜欢</view>
        <view class="txt3"></view>
      </view>
    </view>
    <view class="goods-list">
      <view class="goods-item">
        <view class="goods-img" style="background:url('./../../static/u12.png')"></view>
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
        <view class="goods-img" style="background:url('./../../static/u12.png')"></view>
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
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello",
      tabIndex: 0, // 选中的
      tabLineLeft: 0,
      height: 0,
      tabBars: [
        { name: "全部", id: "all", num: 12 },
        { name: "待处理", id: "pending", num: 0 },
        { name: "处理中", id: "processing", num: 10 },
        { name: "已确认", id: "confirm", num: 999 },
        { name: "已取消", id: "cancel", num: 0 },
      ],
      carinfos: [
        {
          carinfo: "全部",
        },
        {
          carinfo: "待处理",
        },
        {
          carinfo: "处理中",
        },
        {
          carinfo: "已确认",
        },
        {
          carinfo: "已取消",
        },
      ],
    };
  },
  onLoad() {
    this.setScrollLeft(0);

    this.height =
      uni.getSystemInfoSync().windowHeight -
      ((66 * 1.2) / 750) * uni.getSystemInfoSync().windowHeight;
  },
  methods: {
    tabtap: function (index) {
      this.tabIndex = index;
      this.setScrollLeft(index);
    },
    swiperChange: function (e) {
      var index = e.target.current || e.detail.current;
      this.tabIndex = index;
      this.setScrollLeft(index);
    },
    setScrollLeft: function (tabIndex) {
      let winWidth = uni.getSystemInfoSync().windowWidth,
        tabLineWidth = Math.floor(
          (96 / 750) * uni.getSystemInfoSync().windowWidth
        );
      this.tabLineLeft =
        (Math.floor(winWidth / 5) - tabLineWidth) / 2 +
        Math.floor(winWidth / 5) * tabIndex;
    },
  },
};
</script>

<style lang="scss" scoped>
.page-order {
  font-size:  22rpx;
  .uni-tab-bar {
    height:  66rpx;
    line-height:  66rpx;
    position: relative;

    .order-tab-line {
      border-top: 2px solid #4992e7;
      width:  80rpx;
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
            height:  24rpx;
            line-height:  24rpx;
            width:  24rpx;
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
    margin-top:  90rpx;
    text-align: center;
    width: 100%;

    .top {
      color: #999;
      display: flex;
      justify-content: space-between;
      .txt1,
      .txt3 {
        border-bottom: 1px solid #eeeeee;
        width: 33.33%;
        transform: translate(0, 20rpx);
      }
    }
    .center {
      height: 44rpx ;
      width: 135rpx;
      display: inline-block;
      margin-top: 5rpx;
    }
  }
  .order-item-null {
    margin:  40rpx auto;
    text-align: center;
    font-size: 22rpx;
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
      .txt {
        color: #999;
      }
    }
    .bottom {
      margin-top:  20rpx;
      padding: 0 24rpx;
      color: #ff6600;
      display: flex;
      justify-content: center;
      .txt1,
      .txt3 {
        border-bottom: 1px solid #ff6600;
        width:  170rpx;
        transform: translate(0, 20rpx);
        position: relative;
      }
      .txt2 {
        display: inline-block;
        width: 200rpx;
        text-align: center;
      }
      .txt1:after {
        content: "";
        position: absolute;
        display: inline-block;
        height: 6px;
        width: 6px;
        background: #ff6600;
        bottom: -3px;
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
        bottom: -3px;
        left: 0;
        transform: rotate(45deg);
      }
    }
  }
  .goods-list {
    padding: 0  24rpx;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .goods-item {
      width:  300rpx;
      margin-bottom:  20rpx;
      .goods-img {
        width:  300rpx;
        height:  300rpx;

        image {
          width: 100%;
          height: 100%;
        }
      }
      .goods-name {
        margin-top: 12rpx;
        font-size: 24rpx;
        width: 100%;
        line-height:  24rpx;
      }
      .goods-bottom {
        margin-top: 12rpx;
        line-height:  24rpx;
        overflow: hidden;
        height:  40rpx;

        .goods-price {
          color: #4992e7;
          float: left;
          font-weight: 600;
          height:  40rpx;
          line-height:  40rpx;
		  font-size: 24rpx;
        }
        .goods-link {
          float: right;
          padding-right: 20rpx;
          color: #4992e7;
          font-size: 42rpx;
          vertical-align: middle;
          height:  40rpx;
          line-height:  40rpx;
        }
      }
    }
  }
  .ui-order {
    height: 100%;
    position: relative;
  }
  .top-img {
    margin: 24rpx;
    height:  100rpx;
    margin-bottom: 0;
  }
  .order-list-ctn {
    padding: 24rpx;

    .order-list {
      margin-top:  24rpx;
      .order-item-box {
        margin-bottom:  24rpx;
        background: #fff;
        padding: 0  24rpx;
        border-radius: 10px;

        position: relative;

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
          padding:  24rpx 0  5rpx 0;

          .order-number {
            font-size:  24rpx;
            color: #999;
            float: left;
          }
          .order-status {
            float: right;
			font-size:  24rpx;
          }
        }
        .item-center {
          .order-name {
            font-size:  24rpx;
            color: #303030;
            margin:  10rpx 0;
          }
        }

        .item-bottom {
          overflow: hidden;
          font-size:  22rpx;
          padding-bottom:  10rpx;
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
          padding:  8rpx 0;
          color: #ff6600;
		  font-size:  22rpx;
        }
      }
    }
  }
}
</style>
