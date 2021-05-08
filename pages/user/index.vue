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
  font-size:  20rpx;
  .user-top {
    height:  336rpx;
    overflow: hidden;

    .user-box {
      height:  295rpx;
      width:  700rpx;
      background: #ffffff;
      border-radius: 10px;
      margin: 0 auto;
      margin-top:  80rpx;

      .user-box-top {
        overflow: hidden;

        .user-img {
          float: left;
          margin-left:  70rpx;
          img {
            height:  120rpx;
            width:  120rpx;
          }
        }
        .user-name {
          float: left;
          padding-left: 10px;
          font-size:  28rpx;
          height:  100rpx;
          line-height:  100rpx;
        }
      }
      .user-box-bottom {
        overflow: hidden;

        .text1 {
          color: #999999;
          font-size:  24rpx;
        }
        .text2 {
          color: #303030;
          font-size:  24rpx;
        }
        .ubb-left {
          width: 50%;
          float: left;
          padding-left:  70rpx;
          box-sizing: border-box;
          border-right: 1px solid #eeeeee;
        }
        .ubb-right {
          width: 50%;
          float: left;
          padding-left:  30rpx;
          box-sizing: border-box;
        }
      }
    }
  }
  .user-menu {
    width:  700rpx;
    margin: 0 auto;
    background: #ffffff;
    margin-top:  70rpx;
    border-radius: 10px;

    .lml-btm-line {
      margin-left:  24rpx;
      border-bottom: 1px solid #eeeeee;
    }
  }
  .user-logout {
    width:  700rpx;
    height:  80rpx;
    margin: 0 auto;
    background: #ffffff;
    margin-top:  70rpx;
    border-radius: 10px;
    text-align: center;
    color: #ff0000;
    font-size:  24rpx;
    line-height:  80rpx;
  }
}

.langhua-menu-list {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height:  80rpx;
}
.langhua-menu-list .iconleft {
  padding-left:  24rpx;
  width:  32rpx;
  font-size:  32rpx;
}
.langhua-menu-list .menu-name {
  text-align: left;
  padding-left: 20rpx;
  width: 100%;
  font-size:  24rpx;
}
.langhua-menu-list .iconright {
  width:  28rpx;
  font-size:  28rpx;
  padding-right:  30rpx;
}
</style>
