<script>
export default {
  onLaunch: function () {
    //console.log("App Launch");
    // uni.navigateTo({
    //   url: "/pages/index/login",
    // });
  },
  onShow: function () {
    //console.log("App Show");
  },
  onHide: function () {
    //console.log("App Hide");
  },
};
</script>

<style>
/*每个页面公共css */
@import "./common/uni.css";
@import "./common/langhua_icon.css";

page {
  background-color: #f7f9fb;
  height: 100%;
  color: #303030;
}
.uni-picker-container .uni-picker-action.uni-picker-action-confirm {
  color: #4992e7;
}
</style>
