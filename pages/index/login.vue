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
  font-size: $rate * 20;
  .top-image {
    width: 100%;
    height: $rate * 414;
  }
  .ctn {
    padding: $rate * 24;
    text-align: center;

    .cmd-box {
      width: 100%;
      height: $rate * 240;
      position: relative;

      .textarea {
        border: 1px solid #797979;
        display: inline-block;
        width: 100%;
        height: $rate * 240;
      }
      .text {
        position: absolute;
        width: 100%;
        text-align: center;
        top: $rate * 75;
        left: 0;
        color: #ccc;
      }
      .btn-paste {
        position: absolute;
        width: $rate * 120;
        height: $rate * 36;
        line-height: $rate * 36;
        top: $rate * 115;
        left: 50%;
        margin-left: -$rate * 60;
        border: 1px solid #797979;
        border-radius: 5px;
      }
    }
    .btn-login {
      margin: $rate * 24 0;
    }
    .text {
      text-align: right;
      line-height: $rate * 28;
      color: #797979;
    }
    .logo {
      height: 44 * $rate;
      width: 135 * $rate;
      display: inline-block;
      margin-top: $rate * 50;
    }
  }
}
</style>
