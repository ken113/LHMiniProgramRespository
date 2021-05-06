<template>
  <view class="user-edit-visitor">
    <view class="lh-title">游客信息</view>
    <view class="user-info-box">
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
    <view class="user-info-box">
      <navigator url="/pages/user/means" open-type="navigate">
        <view class="uib-item">
          <view class="item-left">
            <text class="iconfont lhddyouji"></text>
            <text class="label">附加资料</text>
          </view>
          <view class="item-right">
            <navigator url="/pages/user/means" open-type="navigate">
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
  font-size: $rate * 20;
  .title {
    height: $rate * 56;
    line-height: $rate * 56;
    font-size: $rate * 18;
    color: #999999;
    padding-left: $rate * 24;
  }
  .page-tips {
    font-size: $rate * 18;
    color: #999999;
    padding: 10px $rate * 24;
  }
  .user-info-box {
    background: #ffffff;
    border-bottom: 1px solid #eeeeee;
    .uib-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      height: $rate * 66;
      border-top: 1px solid #eeeeee;

      .item-left {
        width: $rate * 160;
        padding-left: $rate * 24;

        .iconfont {
          padding-right: 5px;
          font-size: $rate * 40;
          display: inline-block;
          vertical-align: middle;
        }
        .label {
          display: inline-block;
          height: $rate * 66;
          line-height: $rate * 66;
        }
      }
      .item-right {
        text-align: left;
        flex: 1;
        min-width: 0;

        .ipt {
          display: inline-block;
        }
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
  .page-btm {
    margin: $rate * 24;
    .btn-save {
      margin-bottom: $rate * 24;
    }
    .btn-delete {
      color: #ff0000;
    }
  }
}
</style>
