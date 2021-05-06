<template>
  <view class="user-visitor">
    <view class="visitor-list">
      <view class="visitor-item">
        <view class="top">
          <view class="name-box">
            <text class="iconfont lhddfemale"></text>
            <text class="name">袁丁 YUANDING</text>
          </view>
          <view class="edit">
            <navigator url="/pages/user/edit_visitor" open-type="navigate">
              <text class="iconfont lhddyouji"></text>
            </navigator>
          </view>
        </view>
        <view class="bottom">
          <view class="post">护照：EH8750978</view>
          <view class="birthday">生日：1978-10-30</view>
        </view>
      </view>
      <view class="visitor-item">
        <view class="top">
          <view class="name-box">
            <text class="iconfont lhddmale"></text>
            <text class="name">袁丁 YUANDING</text>
          </view>
          <view class="edit">
            <text class="iconfont lhddyouji"></text>
          </view>
        </view>
        <view class="bottom">
          <view class="post">护照：EH8750978</view>
          <view class="birthday">生日：1978-10-30</view>
        </view>
      </view>
    </view>

    <view class="visitor-bottom">
      <button class="btn-invite">请好友填写</button>
      <button class="btn-add">新增常用游客</button>
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
.user-visitor {
  font-size: $rate * 20;
  .visitor-list {
    padding: 0 $rate * 24;

    .visitor-item {
      background: #ffffff;
      border-radius: 10px;
      margin-top: $rate * 24;
      padding: $rate * 24;
      .top {
        overflow: hidden;
        border-bottom: 1px solid #eeeeee;
        font-size: 0;

        .name-box {
          float: left;
          font-size: $rate * 24;

          .iconfont {
            font-size: $rate * 24;
            padding-right: $rate * 10;
          }
          .lhddmale {
            color: #4992e7;
          }
          .lhddfemale {
            color: #ff6600;
          }
        }
        .edit {
          float: right;
          line-height: $rate * 24;
          .iconfont {
            font-size: $rate * 36;
            vertical-align: middle;
          }
        }
      }
      .bottom {
        overflow: hidden;
        padding-top: $rate * 20;
        .post {
          float: left;
        }
        .birthday {
          float: right;
        }
      }
    }
  }
  .visitor-bottom {
    position: fixed;
    bottom: $rate * 50;
    width: 100%;
    font-size: $rate * 20;
    overflow: hidden;

    .btn-invite {
      width: $rate * 195;
      height: $rate * 75;
      line-height: $rate * 75;
      border: 1px solid #4992e7;
      float: left;
      border-radius: 0;
      margin-right: $rate * 24;
    }
    .btn-add {
      height: $rate * 75;
      line-height: $rate * 75;
      background: #4992e7;
      color: #ffffff;
      border-radius: 0;
    }
  }
}
</style>
