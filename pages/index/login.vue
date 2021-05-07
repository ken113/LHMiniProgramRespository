<template>
  <view class="page-login">
    <view class="top-image" style="background:url('./../../static/u6.jpg');background-size: cover"></view>
    <view class="ctn">
      <view class="cmd-box">
        <textarea class="textarea" />
        <text class="text">请粘贴浪口令到此登录</text>
        <button class="btn-default btn-paste">粘贴</button>
      </view>

      <button class="btn-primary btn-login" @click="login">登录</button>

      <view class="text">
        浪口令是浪花朵朵专属口令
        <br />请联系客服提供
      </view>
      <view class="logo" style="background:url('./../../static/u55.png');background-size: cover"></view>
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
  methods: {
    login() {
      console.log(1);
      uni.switchTab({
        url: "/pages/order/index",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.page-login {
  height: 100%;
  font-size: 22rpx;
  .top-image {
    width: 100%;
    height: 414rpx;
  }
  .ctn {
    padding: 24rpx;
    text-align: center;

    .cmd-box {
      width: 100%;
      height: 240rpx;
      position: relative;

      .textarea {
        border: 1px solid #797979;
        display: inline-block;
        width: 100%;
        height: 240rpx;
      }
      .text {
        position: absolute;
        width: 100%;
        text-align: center;
        top: 75rpx;
        left: 0;
        color: #ccc;
      }
      .btn-paste {
        position: absolute;
        width: 120rpx;
        height:  36rpx;
        line-height:36rpx;
        top: 115rpx;
        left: 50%;
        margin-left: 60rpx;
        border: 1px solid #797979;
        border-radius: 5px;
      }
    }
    .btn-login {
      margin:  24rpx 0;
    }
    .text {
      text-align: right;
      line-height:  28rpx;
      color: #797979;
    }
    .logo {
      height: 44rpx ;
      width: 135rpx ;
      display: inline-block;
      margin-top:  50rpx;
    }
  }
}
</style>
