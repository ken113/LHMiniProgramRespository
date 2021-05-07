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
		<view class="btn-box">
			<button class="btn-invite"><text class="iconfont">&#xe7dd;</text>邀请好友填写</button>
			<button class="btn-add"><text class="iconfont">&#xe7a7;</text>新增常用游客</button>
		</view>
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
  font-size: 20rpx;
  .visitor-list {
    padding: 0 24rpx;

    .visitor-item {
      background: #ffffff;
      border-radius: 10px;
      margin-top: 24rpx;
      padding: 24rpx;
      .top {
        overflow: hidden;
        border-bottom: 1px solid #eeeeee;
        font-size: 0;

        .name-box {
          float: left;
          font-size: 24rpx;
			
          .iconfont {
            font-size: 24rpx;
            padding-right: 10rpx;
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
          line-height: 24rpx;
          .iconfont {
            font-size: 36rpx;
            vertical-align: middle;
          }
        }
      }
      .bottom {
        overflow: hidden;
        padding-top: 20rpx;
        .post {
          float: left;
		  font-size:24rpx;
        }
        .birthday {
          float: right;
		  font-size:24rpx;
        }
      }
    }
  }
  
  .btn-box {
  	margin-top: 20rpx;
  	overflow: hidden;
  	display: flex;
  	//flex-direction: row;
  	align-items: center;
  	justify-content: space-between;
  	padding: 0  24rpx;
  	
  	.iconfont{
  		margin-right: 10rpx;
  	}
  	.btn-invite {
  		width:  195rpx;
  		height:  54rpx;
  		line-height:  54rpx;
  		border: 1px solid #4992e7;
  		border-radius: 0;
  		margin-right:  24rpx;
  		font-size:  24rpx;
  		
  		
  	}
  
  	.btn-add {
  		width:  442rpx;
  		height:  54rpx;
  		line-height:  54rpx;
  		border: 1px solid #4992e7;
  		border-radius: 0;
  		font-size:  24rpx;
  	}
  }
  
  .visitor-bottom {
    position: fixed;
    bottom: 50rpx;
    width: 100%;
    font-size: 20rpx;
    overflow: hidden;

    
  }
}
</style>
