<template>
  <view class="user-info">
    <view class="lh-title">基本资料</view>
    <view class="user-info-box lhform">
      <view class="uib-item">
        <view class="item-left">中文姓名</view>
        <view class="item-right">
          <input name="input" placeholder="张三" />
        </view>
      </view>
      <view class="uib-item">
        <view class="item-left">姓名拼音</view>
        <view class="item-right">
          <input name="input" placeholder="ZHANGSAN" />
        </view>
      </view>

      <view class="uib-item">
        <view class="item-left">联系电话</view>
        <view class="item-right">
          <input name="input" placeholder="ZHANGSAN" />
        </view>
      </view>
      <view class="uib-item">
        <view class="item-left">备用联系电话</view>
        <view class="item-right">
          <input name="input" placeholder="ZHANGSAN" />
        </view>
      </view>
      <view class="uib-item">
        <view class="item-left">Email地址</view>
        <view class="item-right">
          <input name="input" value="sean.yuan@qq.com" />
        </view>
      </view>
      <view class="uib-item">
        <view class="item-left">微信号</view>
        <view class="item-right">
          <input name="input" value="seanyuan" />
        </view>
      </view>
    </view>

    <view class="user-info-bottom">
      <button class="btn">保存</button>
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
.user-info {
  font-size: 20rpx;
  .title {
    height:  66rpx;
    line-height: 66rpx;
    font-size: 24rpx;
    color: #999999;
    padding-left: 24rpx;
  }
  .user-info-box {
    background: #ffffff;
  }
  .user-info-bottom {
    margin-top: 90rpx;
    padding: 0 24rpx;
    .btn {
      display: inline-block;
      width: 100%;
      height:  75rpx;
      line-height: 75rpx;
      background: #4992e7;
      color: #ffffff;
      font-size:  24rpx;
      border-radius: 0;
    }
  }
}
</style>
