<template>
  <view class="lh-indexedList" ref="mylist">
    <view class="city-box" v-for="(item,index) in citydata" :key="index">
      <view class="title" :id=" 'title'+ index ">{{ item.letter }}</view>
      <view
        class="city-list"
        v-for="city in item.city"
        :key="city.region"
        :ref="'city'+ city.region"
        :class="{'active':add_class==city.region}"
        @click="handlerSelect(city.region)"
      >
        <view class="city-name">{{ city.chineseName }}</view>
        <view class="city-code">{{ city.region.replace(/\+/g,'') }}</view>
        <view class="city-iconflag iconfont lhddbiaodankongjiandanxuan"></view>
      </view>
    </view>

    <view class="city-letter" @click="toLetter($event)">
      <view
        class="letter-item"
        v-for="(item,index) in countryLetter"
        :key="index"
        :id=" 'letter-item'+ index "
      >{{item}}</view>
    </view>
  </view>
</template>

<script>
import cityData from "./../common/coutry_code.json";

export default {
  data() {
    return {
      citydata: [],
      countryLetter: [],
      add_class: 0,
    };
  },
  onLoad() {
    let countryData = [],
      that = this;
    cityData.forEach((country) => {
      country.region = country.region.replace("+", "");
      let startShortName = country.country.substring(0, 1);

      if (that.countryLetter.indexOf(startShortName) === -1) {
        countryData.push({
          letter: startShortName,
          city: [country],
        });
        that.countryLetter.push(startShortName);
      } else {
        let letterIndex = countryData.findIndex((item) => {
          return item.letter === startShortName;
        });
        countryData[letterIndex].city.push(country);
      }
    });

    countryData.sort((a, b) => {
      return a.letter < b.letter;
    });
    countryData.unshift({
      letter: "常用",
      city: [
        { chineseName: "中国", region: "86" },
        { chineseName: "泰国", region: "66" },
      ],
    });
    that.countryLetter.unshift("常用");
    that.citydata = [...countryData];
  },
  methods: {
    handlerSelect(code, ev) {
      this.add_class = code;
    },
    toLetter(ev) {
      const index = ev.target.id.replace("letter-item", ""),
        selector = "#title" + index;
      uni.pageScrollTo({
        //scrollTop: 0,
        selector: selector,
        duration: 0,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.lh-indexedList {
  font-size: $rate * 20;

  .city-box {
    .title {
      height: $rate * 70;
      line-height: $rate * 70;
      font-size: $rate * 20;
      color: #999999;
      padding-left: $rate * 24;
      background: #f7f9fb;
      border-bottom: 1px solid #eeeeee;
    }
    .city-list {
      overflow: hidden;

      border-bottom: 1px solid #eeeeee;
      margin-left: $rate * 24;
      text-align: left;

      &.active {
        color: #4992e7;

        .city-iconflag {
          visibility: visible;
        }
      }
      .city-name {
        float: left;
        width: $rate * 260;
        height: $rate * 66;
        line-height: $rate * 66;
      }
      .city-code {
        float: left;
        width: $rate * 200;
        height: $rate * 66;
        line-height: $rate * 66;
      }
      .city-iconflag {
        visibility: hidden;
        width: 100%;
        margin-left: $rate * 460;
        height: $rate * 66;
        line-height: $rate * 66;
        font-size: $rate * 30;
      }
    }
  }
  .city-letter {
    position: fixed;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
    .letter-item {
      font-size: $rate * 14;
      height: $rate * 30;
      width: $rate * 42;
      line-height: $rate * 30;
      color: #4992e7;
      text-align: center;
    }
  }
}
</style>>
