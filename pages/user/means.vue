<template>
  <view class="user-means">
    <view class="lh-title">张三附加资料</view>

    <view class="user-means-box lhform">
      <view class="uib-item">
        <view class="item-left">身高</view>
        <view class="item-right">
          <input class="ipt" name="input" placeholder="如：175" />
          <text class="txt">CM</text>
        </view>
      </view>
      <view class="uib-item">
        <view class="item-left">体重</view>
        <view class="item-right">
          <input class="ipt" name="input" placeholder="如：65" />
          <text class="txt">KG</text>
        </view>
      </view>
      <view class="uib-item">
        <view class="item-left">鞋子码数</view>
        <view class="item-right">
          <input name="input" placeholder="如：43" />
        </view>
      </view>
      <view class="uib-item">
        <view class="item-left">衣服码数</view>
        <view class="item-right">
          <input name="input" placeholder="如：XL" />
        </view>
      </view>
      <view class="uib-item">
        <view class="item-left">近视度数</view>
        <view class="item-right">
          <input name="input" placeholder="如：200" />
        </view>
      </view>
    </view>

    <view class="user-means-tips">
      <text class="text">参加深潜后18小时不能乘坐飞机，否则会对身体造成伤害，请检查您的航班时间在深潜之后至少18小时！</text>
      <br />
      <text
        class="text"
      >如您点击保存按钮并填写了深潜需要的附加资料后，代表您已经知晓以上提示。浪花朵朵已尽到告知义务，对因此带来的无法参加深潜，航班改签，以及造成的身体伤害等全部后果不承担任何责任！</text>
    </view>
    <view class="user-means-bottom">
      <button class="btn-primary">保存</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.user-means {
  font-size:  20rpx;
  .title {
    height:  56rpx;
    line-height:  56rpx;
    font-size:  20rpx;
    color: #999999;
    padding-left: 24rpx;
  }
  .user-means-tips {
    padding:  24rpx;
    font-size:  20rpx;
    color: #ccc;

    .text {
      padding-left:  34rpx;
    }
  }
  .user-means-box {
    background: #ffffff;
    border-bottom: 1px solid #eeeeee;

    .uib-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      height:  80rpx;
      border-top: 1px solid #eeeeee;
      position: relative;

     
      .item-right {
      

        .txt {
          position: absolute;
          top: 0;
          right:  24rpx;
          height: 80rpx;
          line-height:  80rpx;
        }
      }
    }
  }

  .user-means-bottom {
    margin-top:  15rpx;
    padding: 0  24rpx;
  }
}
</style>
