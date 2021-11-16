<template>

   <div class="container">
     <div class="left">
       <div class="common-ves ves-11">
         <div class="ico-lt"></div>
         <div class="ico-lb"></div>
         <div class="ico-rt"></div>
         <div class="ico-rb"></div>
         <img class="sub-bg" src="../../../src/assets/img/submit-bg.png" alt=""/>

         <div class="title">排污统计</div>
         <div class="cont" >
          <leftLoops></leftLoops>
         </div>
       </div>
       <div class="common-ves ves-84" style="margin-top: 20px">
         <div class="ico-lt"></div>
         <div class="ico-lb"></div>
         <div class="ico-rt"></div>
         <div class="ico-rb"></div>
         <img class="sub-bg" src="../../../src/assets/img/submit-bg.png" alt=""/>
         <div class="title">实时监控</div>
         <div class="cont">
         <video  class="cont-cam" ref="videoRef1"  controls autoplay ></video>
         <video  class="cont-cam" ref="videoRef2"  controls autoplay ></video>
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
       <div id="mapContainer" class="main-map"></div>
     </div>
     <div class="right">
       <div class="common-ves ves-3">
         <div class="ico-lt"></div>
         <div class="ico-lb"></div>
         <div class="ico-rt"></div>
         <div class="ico-rb"></div>
         <img class="sub-bg" src="../../../src/assets/img/submit-bg.png" alt=""/>

         <div class="title">污水处理</div>
         <div class="cont" style="margin-top: -20px">
          <rightCounty></rightCounty>
         </div>
       </div>
       <div class="common-ves ves-4">
         <div class="ico-lt"></div>
         <div class="ico-lb"></div>
         <div class="ico-rt"></div>
         <div class="ico-rb"></div>
         <img class="sub-bg" src="../../../src/assets/img/submit-bg.png" alt=""/>
         <div class="title">实时监控</div>
         <div class="cont">
           <video  class="cont-cam" ref="videoRef3"  controls autoplay ></video>
           <video  class="cont-cam" ref="videoRef4"  controls autoplay ></video>
         </div>
       </div>
     </div>
   </div>

</template>

<script>





import leftLoops from "../environment/leftLoops";
import rightCounty from "../environment/rightCounty";
import {get} from "../../utils/request";
import moment from "moment";
import Hls from "hls.js";
let mapInstance = {};
export default {
  name: "china",
  components: {

    leftLoops,
    rightCounty
  },
  data() {
    return{
      entData:[
        {
          seq:1,
          name:'橡胶集团',
          status:123123123123
        },
        {
          seq:2,
          name:'广泽医药园',
          status:123123123123
        },
        {
          seq:3,
          name:'智飞生物',
          status:123123123123
        },
        {
          seq:4,
          name:'马克物料',
          status:123123123123
        },],
      windows: [], //弹窗
      markers: [], //弹窗
      window: "", //弹窗的显示影藏
      barData: [],
      rectification: [],
      curFx: {
        name: "",
        value: 0,
        color: "#42a0fe",
        percent: 0,
      },
      dateStrs: {
        time: "",
        weekDay: "",
        date: "",
      },
      player1Url:'',
      player2Url:''
    };
  },

  mounted() {
    this.initMap();
    this.testProgress();
    this.loadmaker()

    this.beginTime();

    this.testVideo();
  },
  methods: {
    //初始化地图
    initMap() {
      // 获取到作为地图容器的DOM元素
      const container = document.getElementById("mapContainer");
      //创建地图实例
      const map = new AMap.Map(container, {
        center: [106.82315,29.557708],
        zoom: 14,
        mapStyle: "amap://styles/cfc694d2bc6db8a67addb398437c91f3", //设置地图的显示样式
      });

      mapInstance = map;
    },
    //右侧时间
    beginTime() {
      const func = () => {
        this.initCurDate();
        setTimeout(() => {
          func();
        }, 1000);
      };
      func();
    },
    //初始化饼图



    //测试折线创建

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

    testProgress() {
      console.info('testProgress')
      this.rectification = [
        {
          name: "马克物料",
          current: 2,
          total: 2,
        },
        {
          name: "零食批发有限公司",
          current: 1,
          total: 2,
        },
        {
          name: "橡胶集团",
          current: 0,
          total: 1,
        },
        {
          name: "广泽医药园",
          current: 2,
          total: 3,
        },
        {
          name: "智飞生物",
          current: 1,
          total: 1,
        },
        {
          name: "其它",
          current: 1,
          total: 3,
        },
      ].map((item) => ({
        ...item,
        percent: Math.floor((item.current / item.total) * 10000) / 100,
      }));
    },
    testVideo(){
      let url1 = '/bigdata/encmera1'
      let url2 = '/bigdata/encmera2'
      let url3 = '/bigdata/encmera3'
      let url4 = '/bigdata/encmera4'
      let that = this
      get(url1).then(res => {
        let hls = new Hls();
        hls.loadSource(res[0].url);//需要播放的视频地址
        hls.attachMedia(this.$refs.videoRef1);
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
          that.$refs.videoRef1.play();
        });

      })
      get(url2).then(res => {
        let hls = new Hls();
        hls.loadSource(res[0].url);//需要播放的视频地址
        hls.attachMedia(this.$refs.videoRef2);
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
          that.$refs.videoRef2.play();
        });

      })
      get(url3).then(res => {
        let hls = new Hls();
        hls.loadSource(res[0].url);//需要播放的视频地址
        hls.attachMedia(this.$refs.videoRef3);
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
          that.$refs.videoRef3.play();
        });

      })
      get(url4).then(res => {
        let hls = new Hls();
        hls.loadSource(res[0].url);//需要播放的视频地址
        hls.attachMedia(this.$refs.videoRef4);
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
          that.$refs.videoRef4.play();
        });

      })
    },
    //初始化时间
    initCurDate() {
      const momentVal = moment(new Date());
      this.$set(this, "dateStrs", {
        time: momentVal.format("HH:mm:SS"),
        weekDay: momentVal.format("dddd"),
        date: momentVal.format("YYYY.MM.DD"),
      });
    },
  },
  computed: {},
  watch: {},
}
</script>



