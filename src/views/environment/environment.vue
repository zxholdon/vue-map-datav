<template>
  <div id="index">
    <dv-full-screen-container class="bg">
      <div class="dataweather">
        <div>
          {{dataWeather.city}}
          {{dataWeather.weathertemp}}
          <img :src="dataWeather.icontemp" alt="">
          {{dataWeather.peraturetemp}}
        </div>
      </div>
      <div class="datatime">
                <span>
                    {{dataTime.dateYear}} {{dataTime.dateWeek}} {{dataTime.dateDay}}
                </span>
      </div>
      <!--      <dv-loading v-if="loading">Loading...</dv-loading>-->
      <div  class="host-body">
        <top-header/>
        <div class="body-box">
          <div class="content-box info-four">
            <div>
              <dv-border-box-8 class="bg-color-black" style="height: 1rem;padding: .2rem;">
                <div class="topNumber">
                  <top-number/>
                  <top-numberl/>

                </div>
              </dv-border-box-8>
            </div>
            <div>
              <dv-border-box-10 style="height: 1rem">
                <div class="topNumber">
                  <top-number2/>
                  <top-numberend1/>
                  <top-number2t/>
                  <top-number2o/>
                  <top-numberend2/>
                </div>

              </dv-border-box-10>
            </div>
            <div>
              <dv-border-box-8 :reverse="true" class="bg-color-black"
                               style="height: 1rem;padding: .2rem;">
                <div class="topNumber ">
                  <top-Numberr1/>
                  <top-Numberr2/>
                </div>
              </dv-border-box-8>
            </div>
          </div>

          <div class="content-box">
            <div>
              <!--                          // left-one-->
              <dv-border-box-12>
                <left-level :areaData="areaData"/>
              </dv-border-box-12>
              <!--                          // left-two-->
              <dv-border-box-10>
                <left-loops/>
              </dv-border-box-10>
            </div>
            <div>

              <!--                          // center-->
              <dv-border-box-11 :title="chinaMapTitle">

                <div style="width: 100%;height: 100%" class="amp-demo">
                  <el-amap style="width: 100%;height: 100%" vid="amap" :zoom="zoom" :map-style="mapStyle" :center="center" class="amap-demo" v-if="reFresh">
                    <!-- 点坐标  -->
                    <el-amap-marker :position="marker.position" :visible="marker.visible" :draggable="marker.draggable"  :events="events"  vid="index" :icon="marker.icon" ></el-amap-marker>
                    <el-amap-marker :position="marker2.position" :visible="marker2.visible" :draggable="marker2.draggable" vid="index2" :events="events" :icon="marker2.icon"></el-amap-marker>
                    <!--                                  <el-amap-marker :position="marker3.position" :visible="marker3.visible" :draggable="marker3.draggable" vid="index2" :events="events2" :icon="marker3.icon2"></el-amap-marker>-->
                    <!--                                  <el-amap-marker :position="marker4.position" :visible="marker4.visible" :draggable="marker4.draggable"  vid="index2" :events="events2" :icon="marker3.icon2"></el-amap-marker>-->
                    <el-amap-marker v-for="(marker,index) in markers" :key="index"   :events="marker.events"   :icon="marker.icon2"  :position="marker.position"  />
                    <el-amap-info-window
                      v-if="window"
                      :position="window.position"
                      :visible="window.visible"
                      :content="window.content"
                    ></el-amap-info-window>
                    <!-- 标记文本 -->
                    <!--                                  <el-amap-text v-for="(text,index) in texts" :key="index" :text="text.text" :offset="text.offset" :position="text.position" :events="text.events"></el-amap-text>-->
                    <!-- 折线路径 -->



                  </el-amap>
                  <el-amap-info-window
                    v-for="window in windows"
                    :offset="window.offset"
                    :position="window.position"
                    :content="window.content"
                    :open="window.open"
                    :key="window.index"
                  ></el-amap-info-window>


                </div>
                <div class="frame">
                  <el-dialog   class="custonStyle2" :append-to-body="true" :visible.sync="dialogTableVisible" style="margin-top: 10%;" width="40%">

                    <div style="left:0;">

                      <!--                <dv-charts style="width:3.25rem;height:3.25rem;margin-top: .5rem;" class="ring-charts"-->
                      <!--                           :option="options"/>-->
                      <img  :src="require('../../../public/static/images/jk1.gif')" style="left:0;height: 3rem;width: 6rem">

                      <!--                                    <vi-Dss/>-->
                      <div style="float: right;">

                        <span class="diss"><label-wrap style="font-size: 22px;font-weight: bold;margin-right: 15px">企业名称:</label-wrap>重庆麻柳制药厂</span>
                        <span class="diss"><label-wrap style="font-size: 22px;font-weight: bold;margin-right: 15px">风险等级:</label-wrap>一般风险</span>
                        <span class="diss"><label-wrap style="font-size: 22px;font-weight: bold;margin-right: 15px">安全管理人员:</label-wrap>王晓红</span>
                        <span class="diss"><label-wrap style="font-size: 22px;font-weight: bold;margin-right: 15px">联系电话:</label-wrap>13356875489</span>

                      </div>
                    </div>

                  </el-dialog>
                </div>
              </dv-border-box-11>
            </div>
            <div>
              <!--                          // right-one-->
              <dv-border-box-13>
                <right-province/>
              </dv-border-box-13>
              <!--                          // right-two-->
              <dv-border-box-12>
                <right-county/>
              </dv-border-box-12>
            </div>
          </div>
        </div>
      </div>

    </dv-full-screen-container>
  </div>
</template>
<style>
.frame .textstyle {
  font-size: 20px;
  margin-top: 15px;
  margin-left: 30px;
}



.diss{

  display: block;
  padding-bottom: 30px;
  font-size: 15px;
}

</style>

<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=25d6a2c55d31e2b5e4d47df5bd849426"></script>
<script src="//webapi.amap.com/ui/1.1/main.js?v=1.1.1"></script>
<script>
import {formatTime} from '../../utils'
import cny from '../../assets/cm.png'
import cny2 from '../../assets/cm.svg'
import topHeader from "../mainpage/topHeader";
import topNumber from "../mainpage/topNumber"
import topNumber2 from "../mainpage/topNumber2"
import topNumberl from "../mainpage/topNumberl"
import topNumber2o from "../mainpage/topNumber2o";
import topNumber2t from "../mainpage/topNumber2t"
import topNumberend1 from "../mainpage/topNumberend1";
import topNumberend2 from "../mainpage/topNumberend2";
import topNumberr1 from "../mainpage/topNumberr1";
import topNumberr2 from "../mainpage/topNumberr2";
import centerForm from "./centerForm"
import leftLevel from "./leftLevel"
import leftLoops from "./leftLoops"
import china from "./china"
import chinaGaode from "./chinaGaode"
import rightProvince from "./rightProvince"
import rightCounty from "./rightCounty"
import {weatherOption} from '../../config/weatherOption'
import viDss from "../../comments/centervideos";
import serviceDialog from "../../comments/serviceDialog"

export default {

  name: "environment",
  components: {
    topHeader,
    topNumber,
    topNumber2,
    topNumber2o,
    topNumber2t,
    topNumberend1,
    topNumberend2,
    topNumberr1,
    topNumberr2,
    // centerForm,
    leftLevel,
    leftLoops,
    china,
    topNumberl,
    // chinaGaode,
    rightProvince,
    rightCounty,
    viDss,
    serviceDialog,
  },
  data() {
    return {
      lonlat: [[106.811063,29.558],[106.821363,29.555611],[106.796214,29.552671],[106.820881,29.558341], [106.821911,29.558164],
        [106.820881,29.558341], [106.821911,29.558164],
        [106.823145,29.557669], [106.825966,29.556829],  [106.842219,29.556875], [106.843201,29.558055],
        [106.844419,29.558881], [106.84539,29.559376],  [106.804937,29.553698], [106.805752,29.554435],
        [106.806557,29.555116], [106.808134,29.555835],], //经纬度
      markers: [[106.811063,29.558],[106.821363,29.555611]], //点
      windows: [], //弹窗
      window: "", //弹窗的显示影藏
      show:false,
      gridData: [{
        date: '麻柳制药厂',
        name: '一般风险',
        address: '王小虎'
      }],
      dialogTableVisible:false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      events: {
        click: a => {
          // console.log(a.target.F.position.O)
          //  console.log(a.target.F.position.P)
          // console.log( a.target.F.extData)

          this.dialogTableVisible = true
          this.form.userName = 'allS.userName'
          this.form.telephone = 'allS.telephone'
          this.form.plateNumber = 'allS.plateNumber'
          this.form.loginTime = 'allS.loginTime'
          this.form.longitude = 'allS.longitude'
          this.form.latitude = 'allS.latitude'
          // userJWFind({
          //   // jing: a.target.F.position.lng,
          //   // wei: a.target.F.position.lat
          //    jing: a.target.F.position.O,
          //   wei: a.target.F.position.P
          // }).then(response => {
          //   if (response.code === 0) {
          //     if (response.data) {
          //       this.form.userName = response.data.userName
          //       this.form.telephone = response.data.telephone
          //       this.form.plateNumber = response.data.plateNumber
          //       this.form.loginTime = response.data.loginTime
          //       this.form.longitude = response.data.longitude
          //       this.form.latitude = response.data.latitude
          //     } else {
          //       this.form.userName = '暂无数据'
          //       this.form.telephone = '暂无数据'
          //       this.form.plateNumber = '暂无数据'
          //       this.form.loginTime = '暂无数据'
          //       this.form.longitude = '暂无数据'
          //       this.form.latitude = '暂无数据'
          //     }
          //   } else {
          //     this.$message.error(response.msg)
          //   }
          // })
        }
      },
      events2:{
        click: a => {

        }
      },

      reFresh:true,
      loading: true,
      dataTime: {
        dateDay: null,
        dateYear: null,
        dateWeek: null,
        weekday: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      },
      dataWeather: {
        city: '重庆市',
        dayweather: '晴',
        nightweather: '多云',
        weathertemp: '晴', // 根据时间判断选白天还是晚上的天气
        nighttemp: '3℃',
        daytemp: '15℃',
        peraturetemp: '3℃~15℃', // 根据时间判断选白天还是晚上的温度
        icontemp: 'https://cdn.heweather.com/cond_icon/100.png',
      },
      areaData: {
        areaCode: "000000",
        areaLevel: "county",
        name: "中国",
        areaName: "生物城",
      },

      slotStyle: {
        padding: '2px 8px',
        background: '#eee',
        color: '#333',
        border: '1px solid #aaa'
      },
      zoom: 15,
      mapStyle:'dark',
      center: [106.816899,29.559867],

      road1:{},

      polyline: {
        path: [[106.796214,29.552671], [106.797684,29.55269],
          [106.798896,29.552456],[106.800441,29.552242],
          [106.801911,29.552326], [106.803317,29.552662],
          [106.804937,29.553698], [106.805752,29.554435],
          [106.806557,29.555116], [106.808134,29.555835],
          [106.8094,29.556227], [106.811847,29.557118],
          [106.814014,29.557874], [106.815806,29.558481],
          [106.817576,29.558723], [106.818832,29.558705],
          [106.818778,29.558723], [106.820065,29.558546],
          [106.820881,29.558341], [106.821911,29.558164],
          [106.820881,29.558341], [106.821911,29.558164],
          [106.823145,29.557669], [106.825966,29.556829],
          [106.827091,29.556445], [106.828583,29.555811],
          [106.829822,29.555143], [106.830814,29.554667],
          [106.832279,29.554061], [106.8337,29.553939],
          [106.835272,29.554205], [106.835991,29.554371],
          [106.836844,29.554397], [106.841077,29.555479],
          [106.842219,29.556875], [106.843201,29.558055],
          [106.844419,29.558881], [106.84539,29.559376],
          [106.847058,29.560617], [106.847879,29.561905],
          [106.848066,29.562203], [106.848388,29.562717],
          [106.848592,29.563029], [106.848705,29.563146],




        ],
        path2: [[106.798809,29.552553],[106.798975,29.55316],
          [106.799093,29.553911],[106.799335,29.554233],
          [106.800043,29.554677], [106.800515,29.55498],
          [106.801175,29.555554], [106.800944,29.556294],
          [106.800155,29.557246], [106.799576,29.557908]],
        path3 :[[106.801256,29.555846],[106.802221,29.555925],
          [106.802355,29.557064],[106.802752,29.558062],[106.803069,29.558678],
          [106.803841,29.559542],[106.804791,29.560354],[106.805317,29.560806],
          [106.805306,29.561319],[106.80449,29.561856],
          [106.80411,29.562225],[106.80449,29.561856],
          [106.805306,29.561319],[106.80449,29.561856],
        ],
        path4 :[[106.812597,29.5636],[106.814303,29.562732],
          [106.81559,29.562228],[106.816781,29.561864],[106.817693,29.561697],
          [106.819249,29.561557],[106.82132,29.561295],[106.822092,29.561137],
          [106.821695,29.560567],[106.821362,29.559867],
          [106.821148,29.559438],[106.820923,29.559018],
          [106.820708,29.558608]
        ],
        path5 :[[106.823068,29.557618],[106.822607,29.556937],
          [106.822178,29.556386],[106.821727,29.55591],[106.82088,29.555182],
          [106.820161,29.554557],[106.819185,29.553876]
          ,[106.818948,29.553624],
          [106.821985,29.553101],[106.823283,29.552373],
          [106.827489,29.55074],[106.828669,29.550563],
          [106.831641,29.550721],[106.835986,29.550815],
        ],
        path6 :[[106.804683,29.551121],[106.805284,29.5503],
          [106.805809,29.549572],[106.806539,29.548382],[106.806968,29.547243],
          [106.806979,29.547215],[106.807295,29.545992]
          ,[106.80744,29.54441],
          [106.807837,29.544294],[106.808685,29.54386],
          [106.809618,29.544317],[106.809945,29.544308],
          [106.810986,29.54413],[106.812569,29.545292],
        ],
        editable: false,
        stockcolor1:'#00FF00',
        stockcolor2:'#00FF00',
        stockcolor3:'#00FF00',
        srockerweight1:'8',
        srockerweight2:'3',
        srockerweight3:'3',
      },

      marker: {
        position:  [106.801879,29.557329],
        visible: true,
        draggable: false,
        content:'2',
        // template: '<span>2</span>',
        icon:require("../../../public/static/images/monitor.png"),
      },
      marker2: {
        position:   [106.832864,29.55591],
        visible: true,
        draggable: false,
        content:'1',
        template: '<span>1</span>',
        icon:require("../../../public/static/images/monitor.png"),
      },

      //   position:  [106.811063,29.558],
      //     visible: true,
      //     draggable: false,
      //     content:'2',
      //     template: '<span>2</span>',
      //   icon2:require("../../public/map/sensor2.png"),
      // },
      // marker4: {
      //   position:   [106.821363,29.555611],
      //     visible: true,
      //     draggable: false,
      //     content:'2',
      //     template: '<span>2</span>',
      //   icon2:require("../../public/map/sensor2.png")
      // },
      texts: [
        // {
        //   position: [106.821363,29.555611],
        //   text: '收货地',
        //   offset: [0, -70],
        // },
        //
      ],
    }

  },
  computed: {
    chinaMapTitle() {
      let areaName = this.areaData.areaName;
      if (areaName === 'china') {
        areaName = '生物城'
      }
      return areaName;
    }
  },
  created() {
    this.getDateTime();
    this.cancelLoading();
    this.requestGetWeather();
  },
  mounted() {

    let markers = [];
    let windows = [];
    let self = this; //this重定向
    for (let i = 0; i < self.lonlat.length; i++) {
      windows.push({
        position: this.lonlat[i],
        content:'',
        visible: false,

      });
      //点
      markers.push({
        position: this.lonlat[i],
        icon2:require("../../../public/static/images/environment.png"),
        events: {
          click() {
            //弹窗信息
            console.info('2222')
            self.windows[i].content =
              `<div>
                  <div><span style="font-size: 18px;color: green">状态：</span><span style="color: green;font-size: 16px">在线</span></div>
                  <div><span style="font-size: 18px;color: black">地址：</span><span style="color: black;font-size: 16px">麻柳制药厂</span></div>
                  <div><span style="font-size: 18px;color: black">报警次数：</span><span style="color: black;font-size: 16px">13</span></div>


                </div>`;
            //给信息窗体里的判断默认传false默认不显示
            self.windows.forEach((window) => {
              window.visible = false;
            });

            //当前点击的圆点对应的信息窗体为true显示
            self.window = self.windows[i];
            self.$nextTick(() => {
              self.window.visible = true;
            });
            console.info(window.visible)
            console.info(self.window.visible)
          },
        },
      });
    }
    this.markers = markers;
    this.windows = windows;

  },
  methods: {


    //tianditu

    // 获取时间
    getDateTime() {
      setInterval(() => {
        this.dataTime.dateYear = formatTime(new Date(), 'yyyy-MM-dd');
        this.dataTime.dateWeek = this.dataTime.weekday[new Date().getDay()];
        this.dataTime.dateDay = formatTime(new Date(), 'HH: mm: ss');
      }, 1000)
    },
    menuTree(){
      this.reFresh= false
      this.$nextTick(()=>{
        this.reFresh = true
      })
    },
    // 获取天气
    requestGetWeather() {
      $.get({
        //这里的url不能写到data对象的外面
        url: 'https://api.asilu.com/weather_v2/',
        dataType: 'jsonp',  // 请求方式为jsonp
        success: (data) => {
          if (data.status === '1') {
            let currTime = new Date().getHours();
            let dailyForecast = data.forecasts[0].casts[0];
            let city = data.forecasts[0].city;
            let daytemp = dailyForecast.daytemp + '℃';
            let nighttemp = dailyForecast.nighttemp + '℃';
            let weathertemp = '';
            let peraturetemp = '';
            if ((currTime >= 6) && (currTime < 18)) {
              weathertemp = dailyForecast.dayweather;
              peraturetemp = dailyForecast.nighttemp + "℃~" + dailyForecast.daytemp + "℃";
            } else {
              weathertemp = dailyForecast.nightweather;
              peraturetemp = dailyForecast.daytemp + "℃~" + dailyForecast.nighttemp + "℃";
            }
            let icontemp = 'https://cdn.heweather.com/cond_icon/' + weatherOption.weatherCode[weathertemp] + '.png';
            this.dataWeather = {city, daytemp, nighttemp, weathertemp, peraturetemp, icontemp}
          }
        }
      })
    },

    cancelLoading() {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    mapClick(data) {
      this.areaData = data;
    },
    backClick(data) {
      this.areaData = data;
    },
  }
  ,
  comments:{
    serviceDialog
  }
};
</script>

<style lang="scss">
@import '../../assets/scss/index';
</style>
<style lang="scss" scoped>

#index {
  .dv-border-box-10, .dv-border-box-12, .dv-border-box-13, {
    height: inherit;
  }

  .dataweather {
    z-index: 999;
    position: absolute;
    top: .2rem;
    left: 1.1rem;
    font-size: .22rem;
    color: #fff;

    img {
      width: .3rem;
      height: .3rem;
      filter: brightness(3);
      vertical-align: bottom;
    }
  }

  .datatime {
    z-index: 999;
    position: absolute;
    top: .2rem;
    right: 1.1rem;
    font-size: .22rem;
    color: #fff;
  }

  .topNumber {
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center
  }



}

</style>
