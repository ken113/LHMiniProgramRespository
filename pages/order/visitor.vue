<template>
  <view class="order-visitor">
    <view class="top">
      <text class="cancel">取消</text>
      <text class="num">已选1人</text>
      <text class="ok">确定</text>
    </view>
    <view class="center">
      <button class="btn-default btn-invite">
        <text class="iconfont lhddprofile_light"></text>请好友填写
      </button>
      <button class="btn-default btn-add">
        <text class="iconfont lhddroundaddlight"></text>新增常用游客
      </button>
    </view>
    <view class="bottom">
      <view class="visitor-item">
        <radio class="left" value="r2" color="#4992E7" style="transform:scale(0.7)" />
        <view class="middle">
          <text class="iconfont lhddmale lefticon1"></text>
          <text class="name">袁丁 YUANDING</text>
          <text class="iconfont lhddyouji lefticon2"></text>
          <text class="iconfont lhddxiugai righticon"></text>
        </view>
      </view>
      <view class="visitor-item">
        <radio class="left" value="r2" color="#4992E7" style="transform:scale(0.7)" />
        <view class="middle error">
          <text class="iconfont lhddmale lefticon1 female"></text>
          <text class="name">全美英 QUANMEIYING</text>
          <text class="iconfont lhddyouji lefticon2"></text>
          <text class="iconfont lhddxiugai righticon"></text>
        </view>
        <view class="error-msg">错误提示</view>
      </view>
      <view class="visitor-item">
        <radio class="left" value="r2" color="#4992E7" style="transform:scale(0.7)" />
        <view class="middle">
          <text class="iconfont lhddmale lefticon1 female"></text>
          <text class="name">袁丁 YUANDING</text>
          <text class="iconfont lhddyouji lefticon2"></text>
          <text class="iconfont lhddxiugai righticon"></text>
        </view>
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
.order-visitor {
  font-size: $rate * 20;
  .top {
    padding: $rate * 24;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: $rate * 70;
    line-height: $rate * 70;
    border-top: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
    background: #ffffff;
    box-sizing: border-box;

    .cancel {
      color: #999;
    }
    .ok {
      color: #4992e7;
    }
  }
  .center {
    overflow: hidden;
    padding: $rate * 24;
    .iconfont {
      margin-right: $rate * 5;
    }
    .btn-invite {
      width: $rate * 190;
      border: 1px solid #4992e7;
      float: left;
      border-radius: 0;
      height: $rate * 54;
      line-height: $rate * 54;
    }
    .btn-add {
      border: 1px solid #4992e7;
      border-radius: 0;
      float: right;
      width: $rate * 369;
      height: $rate * 54;
      line-height: $rate * 54;
    }
  }
  .bottom {
    .visitor-item {
      padding-left: $rate * 24;

      .left {
        float: left;
        width: $rate * 50;
        height: $rate * 66;
        line-height: $rate * 66;
        vertical-align: middle;
      }
      .middle {
        //float: left;
        overflow: hidden;
        border-bottom: 1px solid #cccccc;
        &.error {
          border-bottom: 1px solid #ff0000;
        }
        .iconfont.lefticon1 {
          color: #4992e7;
          font-size: $rate * 30;
          margin-right: $rate * 10;

          &.female {
            color: #ff6600;
          }
        }
        .name {
          display: inline-block;
          height: $rate * 66;
          line-height: $rate * 66;
        }
        .iconfont.lefticon2 {
          margin: 0 $rate * 10;
          font-size: $rate * 30;
        }
        .iconfont.righticon {
          margin-right: $rate * 24;
          float: right;
          height: $rate * 66;
          line-height: $rate * 66;
          font-size: $rate * 30;
        }
      }
      .error-msg {
        color: #ff0000;
        padding-top: $rate * 10;
        padding-left: $rate * 50;
      }
    }
  }
}
</style>
