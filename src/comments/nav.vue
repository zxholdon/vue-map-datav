<template>
  <div>
    <div class="header">
      <Topweather></Topweather>
      <a href="/"><img src="../../src/assets/img/main-title.png"  class="header-title" alt=""/></a>
      <Topdate></Topdate>
    </div>
    <div class="nav">
      <div class="nav-left">
        <div @click="judge1()"  :class="[active===0?'nav-item active':'nav-item']">
          <img :src="[active===0?require('../../src/assets/img/page-active.png'):require('../../public/static/images/page.png')]" alt="" />
          <span>安全管理</span>
        </div>

        <div @click="judge2()"  :class="[active===1?'nav-item active':'nav-item']">
          <img  :src="[active===1?require('../../src/assets/img/page-active.png'):require('../../public/static/images/page.png')]" alt="" />
          <span>应急管理</span>
        </div>
      </div>
      <div class="nav-right">
        <div @click="judge3()" :class="[active===2?'nav-item active':'nav-item']">
          <img :src="[active===2?require('../../src/assets/img/page-active.png'):require('../../public/static/images/page.png')]" alt="" />
          <span>环保管理</span>
        </div>

        <div @click="judge4()" :class="[active===3?'nav-item active':'nav-item']">
          <img :src="[active===3?require('../../src/assets/img/page-active.png'):require('../../public/static/images/page.png')]" alt="" />
          <span>消防管理</span>
        </div>
      </div>
    </div>
    <div class="info-pannel">
      <div
        class="info-item"
        v-for="(item, index) of infoData"
        :key="'info-item-' + index"
      >
        <!-- <img class="bg" alt="" src="@/assets/img/page.png" /> -->
        <img class="bg" alt="" src="../../src/assets/img/info-bg1.png" />
        <img class="bg-2" alt="" src="../../src/assets/img/info-bg2.png" />
        <img
          class="icon"
          alt=""
          :src="require('../../src/assets/img/ico-' + (index + 1) + '.png')"
        />
        <div class="info-cont">
          <div class="info-name">{{ item.name }}</div>
          <div class="info-value">
            <span
              v-if="item.type === 2 && item.label === '正常' "
              :class="`info-value-label color-nav-7`"
            >
              {{ item.label }}
            </span>
            <span
              v-else
              :class="`info-value-label color-nav-8`"
            >
              {{ item.label }}
            </span>
            <vue-digital-flop
              :class="`info-value-num color-nav-${index + 1}`"
              v-if="item.type === 1"
              :startVal="0"
              :endVal="item.value"
              :duration="3000"
            />
            <span class="info-value-unit">
              {{ item.unit }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import VueDigitalFlop from "vue-digital-flop";
import Topweather from "./topweather"
import Topdate from "./topdate"
import {get} from "../utils/request";
export default {
  components: {
    VueDigitalFlop,
    Topweather,
    Topdate
  },
  data(){
    return{
      active:5,
      timer: null,
      infoData: [
        {
          name: "入驻企业数量",
          value: 0,
          unit: "家",
          type: 1,
        },
        {
          name: "应急人员数量",
          value: 0,
          unit: "人",
          type: 1,
        },
        {
          name: "传感器数量",
          value: 0,
          unit: "个",
          type: 1,
        },
        {
          name: "摄像头数量",
          value: 0,
          unit: "个",
          type: 1,
        },
        {
          name: "本月排查隐患",
          value: 0,
          unit: "条",
          type: 1,
        },
        {
          name: "本月企业自查",
          value: 0,
          unit: "家",
          type: 1,
        },
        {
          name: "环保状态",
          label: "",
          type: 2,
        },
        {
          name: "消防状态",
          label: "",
          type: 2,
        },
        {
          name: "在岗人数",
          value: 0,
          unit: "人",
          type: 1,
        },
      ],

    }
  },
  methods:{

    getcount(){
      let url1 = '/bigdata/companycount' //入驻企业数
      let url2 = '/bigdata/peoplecount'   //应急人员数
      let url3 = '/bigdata/sensorcount'    //传感器数量
      let url4 = '/bigdata/cameracount'    //摄像头数量
      let url5 = '/bigdata/checkcount'    //本月排查隐患数量
      let url6= '/bigdata/selfcheckcount'   //本月企业自查总次数
      let url7= '/bigdata/environmentstatus'   //环保状态
      let url8= '/bigdata/firestatus'   //消防状态
      let url9= '/bigdata/todaypc'   //在岗人数
      if (this.timer) {
        clearInterval(this.timer)
      } else {
        this.timer = setInterval(() => {

          get(url1).then(res=>{
            this.infoData[0].value = res
          })
          get(url2).then(res=>{
            this.infoData[1].value = res
          })
          get(url3).then(res=>{
            this.infoData[2].value = res
          })
          get(url4).then(res=>{
            this.infoData[3].value = res
          })
          get(url5).then(res=>{
            this.infoData[4].value = res
          })
          get(url6).then(res=>{
            this.infoData[5].value = res
          })
          get(url7).then(res=>{
            this.infoData[6].label = res
          })
          get(url8).then(res=>{
            this.infoData[7].label = res
          })
          get(url9).then(res=>{
            this.infoData[8].value = res
          })
        }, 15000);
      }
    },
    judge1(){
      this.active = 0
      this.$router.push('security')
    },
    judge2(){
      this.active = 1
      this.$router.push('emergency')
    },
    judge3(){
      this.active = 2
      this.$router.push('environment')
    },
    judge4(){
      this.active = 3
      this.$router.push('firecontrol')

    },
    judge5(){
      this.active = 0
      this.$router.push('/')

    },
  },
  mounted() {
    this.getcount()
  },

  created() {

  }


}

</script>
<style lang="less" scoped>
@import "../../src/assets/index.less";
</style>
