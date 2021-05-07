<template>
  <view class="user-edit-visitor">
    <view class="lh-title">游客信息</view>
    <view class="user-info-box lhform">
      <view class="uib-item">
        <view class="item-left">中文姓名</view>
        <view class="item-right">
          <input name="input" placeholder="张三" />
        </view>
      </view>
      <view class="uib-item">
        <view class="item-left">姓名拼音</view>
        <view class="item-right">
          <input name="input" placeholder="ZHANGSAN" />
        </view>
      </view>
      <view class="uib-item">
        <view class="item-left">证件号码</view>
        <view class="item-right">
          <input name="input" placeholder="出国游请优先填写护照号" />
        </view>
      </view>
      <view class="uib-item">
        <view class="item-left">出生日期</view>
        <view class="item-right">
          <picker
            mode="date"
            :value="date"
            :start="startDate"
            :end="endDate"
            @change="bindDateChange"
          >
            {{date}}
            <text class="iconright iconfont lhddright"></text>
          </picker>
        </view>
      </view>
      <view class="uib-item">
        <view class="item-left">性别</view>
        <view class="item-right">
          <label class="radio">
            <radio value="r1" name="radio" color="#4992E7" style="transform:scale(0.7)" />男
          </label>
          <label class="radio" style="margin-left:30px;">
            <radio value="r2" name="radio" color="#4992E7" style="transform:scale(0.7)" />女
          </label>
        </view>
      </view>
    </view>

    <view class="lh-title">附加资料</view>
    <view class="user-info-box lhform">
      <navigator url="/pages/user/means" open-type="navigate">
        <view class="uib-item">
          <view class="item-left">
            <text class="iconfont lhddyouji"></text>
            <text class="label">附加资料</text>
          </view>
          <view class="item-right">
            <navigator url="/pages/user/means" open-type="navigate" style="width: 100%;">
              <text class="iconright iconfont lhddright"></text>
              <text class="text">未填写</text>
            </navigator>
          </view>
        </view>
      </navigator>
    </view>
    <view class="page-tips">附加资料是潜水等项目需要的身高、体重、鞋码等信息，以便提前准备装备。</view>

    <view class="page-btm">
      <button class="btn-primary btn-save">保存</button>
      <button class="btn-default btn-delete" @click="open">删除</button>
    </view>

    <uni-calendar ref="calendar" :insert="false" @confirm="confirm"></uni-calendar>

    <uni-popup ref="popup" type="dialog">
      <uni-popup-dialog
        type="input"
        title="您确定要删除吗？"
        :duration="2000"
        :before-close="true"
        @close="close"
        @confirm="confirm"
      ></uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script>
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import uniPopupMessage from "@/components/uni-popup/uni-popup-message.vue";
import uniPopupDialog from "@/components/uni-popup/uni-popup-dialog.vue";

export default {
  components: {
    uniPopup,
    uniPopupMessage,
    uniPopupDialog,
  },
  data() {
    const currentDate = this.getDate({
      format: true,
    });

    return { date: currentDate };
  },
  computed: {
    startDate() {
      return this.getDate("start");
    },
    endDate() {
      return this.getDate("end");
    },
  },
  methods: {
    open() {
      //this.$refs.calendar.open();
      this.$refs.popup.open();
    },
    bindDateChange: function (e) {
      this.date = e.target.value;
    },
    getDate(type) {
      const date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      if (type === "start") {
        year = year - 60;
      } else if (type === "end") {
        year = year + 2;
      }
      month = month > 9 ? month : "0" + month;
      day = day > 9 ? day : "0" + day;
      return `${year}-${month}-${day}`;
    },
    close(done) {
      this.$refs.popup.close();
    },

    confirm(done, value) {
      this.$refs.popup.close();
    },
  },
};
</script>

<style lang="scss" scoped>
.user-edit-visitor {
  font-size: 20rpx;
  .title {
    height: 56rpx;
    line-height: 56rpx;
    font-size: 18rpx;
    color: #999999;
    padding-left: 24rpx;
  }
  .page-tips {
    font-size: 18rpx;
    color: #999999;
    padding: 10px 24rpx;
  }
  .user-info-box {
   
    
  }
  .page-btm {
    margin: 24rpx;
    .btn-save {
      margin-bottom: 24rpx;
    }
    .btn-delete {
      color: #ff0000;
    }
  }
}
</style>
