<template>
  <view class="lhform order-edit">
    <view class="lh-title">基本资料</view>

    <view class="uib-item" style="border-top:1px solid #eeeeee;">
      <view class="item-left">中文姓名</view>
      <view class="item-right">
        <input class="input" name="input" value="袁丁" />
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
	
  .btn-save {
    padding: 24rpx;
  }
}
</style>
