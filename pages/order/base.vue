<template>
  <view class="order-edit">
    <view class="lh-title">基本资料</view>

    <view class="uib-item" style="border-top:1px solid #eeeeee;">
      <view class="item-left">中文姓名</view>
      <view class="item-right">
        <input name="input" value="袁丁" />
      </view>
    </view>
    <view class="uib-item">
      <view class="item-left">姓名拼音</view>
      <view class="item-right">
        <input name="input" value="YUANDING" />
      </view>
    </view>
    <view class="uib-item">
      <view class="item-left">联系电话</view>
      <view class="item-right">
        <text class="region">+86</text>
        <text class="iconleft iconfont lhddunfold"></text>
        <input name="input" class="ipt" value="13826519281" />
      </view>
    </view>
    <view class="uib-item">
      <view class="item-left">备用联系电话</view>
      <view class="item-right">
        <text class="region">+826</text>
        <text class="iconleft iconfont lhddunfold"></text>
        <input name="input" class="ipt" value="13826519281" />
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

    <view class="btn-save">
      <button class="btn-primary">保存并返回</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello",
    };
  },
  onLoad() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.order-edit {
  font-size: $rate * 20;
  .uib-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: $rate * 66;
    border-bottom: 1px solid #eeeeee;
    background: #ffffff;
    .item-left {
      width: $rate * 160;
      padding-left: $rate * 24;
    }
    .item-right {
      text-align: left;
      flex: 1;
      min-width: 0;

      .iconright {
        float: right;
        margin-right: $rate * 24;
        width: $rate * 24;
      }
      .text {
        float: right;
      }
      .region {
        display: inline-block;
        width: $rate * 70;
        height: $rate * 66;
        line-height: $rate * 66;
        text-align: right;
      }
      .iconleft {
        margin-left: $rate * 5;
        margin-right: $rate * 15;
      }
      .ipt {
        width: $rate * 280;
        display: inline-block;
        height: $rate * 66;
        line-height: $rate * 66;
        vertical-align: top;
      }
    }
  }
  .btn-save {
    padding: $rate * 24;
  }
}
</style>
