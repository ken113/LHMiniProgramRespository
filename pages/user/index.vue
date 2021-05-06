<template>
  <view class="page-user">
    <view
      class="user-top"
      :style="{backgroundImage:`url(${indexBackgroundImage})`,backgroundSize: 'cover'}"
    >
      <view class="user-box">
        <view class="user-box-top">
          <view class="user-img">
            <img src="@/static/head.png" />
          </view>
          <view class="user-name">seanyuan</view>
        </view>
        <view class="user-box-bottom">
          <view class="ubb-left">
            <view class="text1">订单</view>
            <view class="text2">3</view>
          </view>
          <view class="ubb-right">
            <view class="text1">最近登录</view>
            <view class="text2">2020-07-25 22:35:26</view>
          </view>
        </view>
      </view>
    </view>

    <view class="user-menu">
      <navigator url="/pages/user/info" open-type="navigate">
        <view class="langhua-menu-list">
          <view class="iconleft iconfont lhddwode"></view>
          <view class="menu-name">个人资料</view>
          <view class="iconright iconfont lhddright"></view>
        </view>
      </navigator>
      <view class="lml-btm-line"></view>
      <navigator url="/pages/user/visitor" open-type="navigate">
        <view class="langhua-menu-list">
          <view class="iconleft iconfont lhddchangyongxinxi"></view>
          <view class="menu-name">常用游客</view>
          <view class="iconright iconfont lhddright"></view>
        </view>
      </navigator>
    </view>

    <view class="user-logout">退出登录</view>
  </view>
</template>

<script>
import indexBackgroundImage from "@/static/mybg.png";

export default {
  data() {
    return { indexBackgroundImage: indexBackgroundImage };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.page-user {
  font-size: $rate * 20;
  .user-top {
    height: $rate * 280;
    overflow: hidden;

    .user-box {
      height: $rate * 246;
      width: $rate * 583;
      background: #ffffff;
      border-radius: 10px;
      margin: 0 auto;
      margin-top: $rate * 80;

      .user-box-top {
        overflow: hidden;

        .user-img {
          float: left;
          margin-left: $rate * 70;
          img {
            height: $rate * 100;
            width: $rate * 100;
          }
        }
        .user-name {
          float: left;
          padding-left: 10px;
          font-size: $rate * 28;
          height: $rate * 100;
          line-height: $rate * 100;
        }
      }
      .user-box-bottom {
        overflow: hidden;

        .text1 {
          color: #999999;
          font-size: $rate * 20;
        }
        .text2 {
          color: #303030;
          font-size: $rate * 20;
        }
        .ubb-left {
          width: 50%;
          float: left;
          padding-left: $rate * 70;
          box-sizing: border-box;
          border-right: 1px solid #eeeeee;
        }
        .ubb-right {
          width: 50%;
          float: left;
          padding-left: $rate * 30;
          box-sizing: border-box;
        }
      }
    }
  }
  .user-menu {
    width: $rate * 583;
    margin: 0 auto;
    background: #ffffff;
    margin-top: $rate * 70;
    border-radius: 10px;

    .lml-btm-line {
      margin-left: $rate * 24;
      border-bottom: 1px solid #eeeeee;
    }
  }
  .user-logout {
    width: $rate * 583;
    height: $rate * 66;
    margin: 0 auto;
    background: #ffffff;
    margin-top: $rate * 70;
    border-radius: 10px;

    text-align: center;

    color: #ff0000;
    font-size: $rate * 20;
    line-height: $rate * 66;
  }
}

.langhua-menu-list {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: $rate * 66;
}
.langhua-menu-list .iconleft {
  padding-left: $rate * 24;
  width: $rate * 32;
  font-size: $rate * 32;
}
.langhua-menu-list .menu-name {
  text-align: left;
  padding-left: 20rpx;
  width: 100%;
}
.langhua-menu-list .iconright {
  width: $rate * 28;
  font-size: $rate * 28;
  padding-right: $rate * 30;
}
</style>
