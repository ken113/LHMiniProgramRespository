<template>
  <view class="user-info">
    <view class="lh-title">基本资料</view>
    <view class="user-info-box">
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
  font-size: $rate * 20;
  .title {
    height: $rate * 66;
    line-height: $rate * 66;
    font-size: $rate * 18;
    color: #999999;
    padding-left: $rate * 24;
  }
  .user-info-box {
    background: #ffffff;

    .uib-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      height: $rate * 66;
      border-top: 1px solid #eeeeee;

      .item-left {
        width: $rate * 160;
        padding-left: $rate * 24;
      }
      .item-right {
        text-align: left;
        flex: 1;
        min-width: 0;
      }
    }
  }
  .user-info-bottom {
    margin-top: $rate * 90;
    padding: 0 $rate * 24;
    .btn {
      display: inline-block;
      width: 100%;
      height: $rate * 75;
      line-height: $rate * 75;
      background: #4992e7;
      color: #ffffff;
      font-size: $rate * 20;

      border-radius: 0;
    }
  }
}
</style>
