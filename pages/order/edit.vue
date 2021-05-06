<template>
  <view class="order-edit">
    <view class="lh-title">基本资料</view>

    <view class="uib-item" style="border-bottom:1px solid #eeeeee;">
      <view class="item-left">基本资料</view>
      <view class="item-right">
        <navigator url="/pages/order/base" open-type="navigate">
          <text class="iconright iconfont lhddright"></text>
          <text class="text">袁丁，+86 13826519281</text>
        </navigator>
      </view>
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
  .uib-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: $rate * 66;
    border-top: 1px solid #eeeeee;
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
    }
  }
}
</style>
