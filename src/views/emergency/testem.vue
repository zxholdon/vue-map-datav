<template>

    <div class="container">
      <div class="left">
        <div class="common-ves ves-1" >
          <div class="ico-lt"></div>
          <div class="ico-lb"></div>
          <div class="ico-rt"></div>
          <div class="ico-rb"></div>
          <img class="sub-bg" src="../../../src/assets/img/submit-bg.png" alt="" />
          <div class="title">应急流程图</div>
          <div class="cont">
            <leftLevel></leftLevel>
          </div>
        </div>
        <div class="common-ves ves-2">
          <div class="ico-lt"></div>
          <div class="ico-lb"></div>
          <div class="ico-rt"></div>
          <div class="ico-rb"></div>
          <img class="sub-bg" src="../../../src/assets/img/submit-bg.png" alt="" />

          <div class="title">应急物资</div>
          <div class="cont">
            <leftLoops></leftLoops>
          </div>
        </div>
      </div>

      <div class="map-cont">
        <div class="ico-lt"></div>
        <div class="ico-lb"></div>
        <div class="ico-rt"></div>
        <div class="ico-rb"></div>
        <img class="map-title-bg" src="../../../src/assets/img/map-head.png" alt="" />
        <div class="tool">
          <div class="tool-item wat">
            <div></div>
            <div></div>
            <span>水</span>
          </div>
          <div class="tool-item ele">
            <div></div>
            <div></div>
            <span>电</span>
          </div>
          <div class="tool-item gas">
            <div></div>
            <div></div>
            <span>燃气</span>
          </div>
        </div>
        <div id="mapContainer" class="main-map">
          <el-amap :zoom="zoom" :events="mapEvents" :center="center" class="amap-demo" >

            <!--                                  <el-amap-marker :position="marker3.position" :visible="marker3.visible" :draggable="marker3.draggable" vid="index2" :events="events2" :icon="marker3.icon2"></el-amap-marker>-->
            <!--                                  <el-amap-marker :position="marker4.position" :visible="marker4.visible" :draggable="marker4.draggable"  vid="index2" :events="events2" :icon="marker3.icon2"></el-amap-marker>-->
            <el-amap-marker v-for="(marker,index) in markers" :key="index"   :events="marker.events"   :icon="marker.icon2"  :position="marker.position"  />
            <el-amap-info-window
              v-if="window"
              :position="window.position"
              :visible="window.visible"
              :content="window.content"
            ></el-amap-info-window>

            <el-amap-polygon
              v-for="polygon in polygons"
              :path="polygon.path"
              editable="true"
              strokeStyle="dashed"
              strokeColor="#FF0000"
              strokeWeight="2"
              strokeOpacity="0.8"
              fillOpacity="0.3"
              fillColor="#1791fc"
              :key="polygon.index"
            ></el-amap-polygon>

          </el-amap>

        </div>
      </div>
      <div class="right">
        <div class="common-ves ves-t" >
          <div class="ico-lt"></div>
          <div class="ico-lb"></div>
          <div class="ico-rt"></div>
          <div class="ico-rb"></div>
          <img class="sub-bg" src="../../../src/assets/img/submit-bg.png" alt="" />

          <div class="title">公共资源</div>
          <div class="cont" >
            <RightProvince></RightProvince>
          </div>
        </div>
        <div class="common-ves ves-f"  >
          <div class="ico-lt"></div>
          <div class="ico-lb"></div>
          <div class="ico-rt"></div>
          <div class="ico-rb"></div>
          <img class="sub-bg" src="../../../src/assets/img/submit-bg.png" alt="" />
          <div class="title">应急联系人</div>
          <div class="cont"   >
            <RightCounty></RightCounty>
          </div>
        </div>
      </div>
    </div>

</template>
<!--<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=25d6a2c55d31e2b5e4d47df5bd849426"></script>-->
<script>




import Nav from "../../comments/nav";
import Pannel from "../../comments/pannel";
import leftLevel from "../emergency/leftLevel";
import Topdate from "../../comments/topdate";
import Topweather from "../../comments/topweather";
import leftLoops from "../emergency/leftLoops";
import RightCounty from "../emergency/rightCounty";
import RightProvince from "../emergency/rightProvince";
import {get} from "../../utils/request";
import moment from "moment";
import {formatTime} from "../../utils";
let mapInstance = {};
export default {
  name: "china",
  components: {
    RightProvince,
    RightCounty,

    leftLoops,
    leftLevel,

  },
  data() {
    return{
      mapEvents: {
        init(o) {
          o.setMapStyle('amap://styles/cfc694d2bc6db8a67addb398437c91f3')
        }
      },
      windows: [], //弹窗
      markers: [], //弹窗
      window: "", //弹窗的显示影藏
      barData: [],
      zoom: 12,
      // mapStyle:'dark',
      center: [106.826025,29.636074],
      rectification: [],
    };
  },

  mounted() {
    this.pline()
    this.loadmaker()
    this.beginTime();
  },
  methods: {
    pline(){

      let url = '/bigdata/emergencypeoplearea'
      get(url).then(res=> {

        let markers = [];
        let windows = [];
        let polygons = [];
        let self = this; //this重定向

        for (let i = 0; i < res.length; i++) {
          console.info(res[i].center)
          windows.push({
            position:  res[i].center,
            content: '',
            visible: false,

          });
          //点
          markers.push({
            position:  res[i].center,
            icon2: require("../../../public/static/images/people.png"),
            events: {
              click() {
                //弹窗信息
                console.info('2222')
                self.windows[i].content =
                  `<div>
                  <div><span style="font-size: 18px;color: green">应急负责人</span><span style="color: green;font-size: 16px"></span></div>
                  <div><span style="font-size: 14px;color: black">姓名:</span><span style="color: black;font-size: 14px">`+res[i].people+`</span></div>
                  <div><span style="font-size: 14px;color: black">联系电话:</span><span style="color: black;font-size: 14px">`+res[i].phone+`</span></div>


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
        for (let i = 0; i < res.length; i++) {
          polygons.push({
            path:  res[i].area,
            // events: {
            //   click() {
            //     console.info('click')
            //   },
            //   mouseover(){
            //     console.info('mouseover')
            //   },
            //   mouseout(){
            //     console.info('mouseout')
            //   }
            //
            // }


          });
        }
        this.markers = markers;
        this.windows = windows;
        this.polygons = polygons;
      })
    },
    beginTime() {
      const func = () => {
        this.initCurDate();
        setTimeout(() => {
          func();
        }, 1000);
      };
      func();
    },
    loadmaker(){
      let url = '/bigdata/enterprisemaker'
      get(url).then(res=>{
        let riskcontent =''
        for (let i = 0; i < res.dataout.length; i++) {
          console.info(res.dataout)
          if (res.result[i].riskgrade=='低风险'){
            riskcontent = `<div><span style="font-size: 14px">风险等级:</span><span style="color: green;font-size: 14px">`+res.result[i].riskgrade+`</span></div>`
          }else if(res.result[i].riskgrade=='一般风险'){
            riskcontent = `<div><span style="font-size: 14px">风险等级:</span><span style="color: yellowgreen;font-size: 14px">`+res.result[i].riskgrade+`</span></div>`
          }else if(res.result[i].riskgrade=='较大风险'){
            riskcontent = `<div><span style="font-size: 14px">风险等级:</span><span style="color: red;font-size: 14px">`+res.result[i].riskgrade+`</span></div>`
          }else{
            riskcontent = `<div><span style="font-size: 14px">风险等级:</span><span style="color: darkred;font-size: 14px">`+res.result[i].riskgrade+`</span></div>`
          }
          //点
          var mm = new AMap.Marker({
            map: mapInstance,
            icon: require("../../../public/static/images/enterprise.png"),
            position:  res.dataout[i],
          });
          mapInstance.add(mm)
          mm.content =
            `<div style="color: black ">
                  <div><span style="font-size: 14px;color: black">企业名称:</span><span style="color: green;font-size: 14px"></span>`+res.result[i].organizationName+`</div>
                  <div><span style="font-size: 14px;color: black">联系电话:</span><span style="color: black;font-size: 14px"></span>`+res.result[i].phone+`</div>`+riskcontent+`
                </div>`
          mm.on('click', this.markerClick);
          mm.emit('click', {target: mm});
        }
      })
    },
    markerClick(e){
      var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
      infoWindow.setContent(e.target.content);
      infoWindow.open(mapInstance, e.target.getPosition());
    },


  },
  computed: {},
  watch: {},
}
</script>



