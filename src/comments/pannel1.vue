<template>

</template>

<script>
import VueDigitalFlop from "vue-digital-flop";
import {get} from "../utils/request";
export default {
name: "pannel",
  components: {
    VueDigitalFlop,
  },
  data(){
  return{
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
    }
  },
  mounted() {
  this.getcount()
  }

}
</script>

<style scoped>

</style>
