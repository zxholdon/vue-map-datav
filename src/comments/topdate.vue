<template>
  <div class="header-date">
    <div class="header-date-time">{{dataTime.dateDay}} </div>
    <div class="header-date-cont">
      <div class="header-date-weekday">{{dataTime.dateWeek}}</div>
      <div class="header-date-date">   {{dataTime.dateYear}} </div>
    </div>
  </div>
</template>

<script>
import {formatTime} from "../utils";

export default {
  name: "topdate",
  data(){
    return{
      dataTime: {
        dateDay: null,
        dateYear: null,
        dateWeek: null,
        weekday: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      },
    }
  },
  mounted() {
    this.getDateTime()
  },
  methods:{
    getDateTime() {
      setInterval(() => {
        this.dataTime.dateYear = formatTime(new Date(), 'yyyy-MM-dd');
        this.dataTime.dateWeek = this.dataTime.weekday[new Date().getDay()];
        this.dataTime.dateDay = formatTime(new Date(), 'HH: mm: ss');
      }, 1000)
    },
  }

}
</script>

<style lang="less" scoped>
@import "../../src/assets/index.less";
</style>
