<template>


   <div class="container">
     <div class="left">
       <div class="common-ves ves-1" >
         <div class="ico-lt"></div>
         <div class="ico-lb"></div>
         <div class="ico-rt"></div>
         <div class="ico-rb"></div>
         <img class="sub-bg" src="../../../src/assets/img/submit-bg.png" alt="" />
         <div class="title">设备状态</div>
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

         <div class="title">消防巡查</div>
         <div class="cont">
           <div class="cont">
              <leftLoops></leftLoops>
           </div>
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
       <div class="common-ves ves-23">
         <div class="ico-lt"></div>
         <div class="ico-lb"></div>
         <div class="ico-rt"></div>
         <div class="ico-rb"></div>
         <img class="sub-bg" src="../../../src/assets/img/submit-bg.png" alt=""/>

         <div class="title">消防安全负责人</div>
         <div class="cont">
           <div class="cont-head">
             <div class="cont-head-col">
               <div class="ico-lt"></div>
               <div>序号</div>
               <div>联系人</div>
               <div>联系电话</div>
             </div>
           </div>
           <div class="cont-body">
             <div class="cont-item"  v-for="(item,index) in entData" :key="'ent_'+index">
               <div class="cont-item-col">
                 <div class="ico-lt"></div>
                 <div class="seq">
                   {{item.seq}}
                 </div>
                 <div class="name">{{item.name}}</div>
                 <div class="yes">
                   {{item.status}}
                 </div>
               </div>
             </div>
           </div>
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
           <video  class="cont-cam" ref="videoRef1"  controls autoplay ></video>
           <video  class="cont-cam" ref="videoRef"  controls autoplay ></video>
         </div>
       </div>
     </div>
   </div>

</template>
<script>
import leftLevel from "../firecontrol/leftLevel";
import leftLoops from "../firecontrol/leftLoops";
import {get} from "../../utils/request";
import moment from "moment";
import Hls from "hls.js";
let mapInstance = {};
export default {
  name: "china",
  components: {
    leftLevel,
    leftLoops
  },
  data() {
    return{
      websock: null,
      entData:[
        {
          seq:1,
          name:'张建',
          status:123123123123
        },
        {
          seq:2,
          name:'王广',
          status:123123123123
        },
        {
          seq:3,
          name:'李彤',
          status:123123123123
        },
        {
          seq:4,
          name:'唐国',
          status:123123123123
        },],
      markerPointList: [],
      windows: [], //弹窗
      markers: [], //弹窗
      window: "", //弹窗的显示影藏
      barData: [],
      resdatas:[],
      timer: null,
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

    this.loadmaker()
    // this.alarm()
    this.testVideo();
    this.beginTime();
  },
  methods: {
    initWebSocket(){ //初始化weosocket
      const wsuri = "ws://127.0.0.1:8000/wx/";
      this.websock = new WebSocket(wsuri);
      this.websock.onopen = this.websocketonopen;
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen(){ //连接建立之后执行send方法发送数据
      if (this.timer) {
        clearInterval(this.timer)
      } else {
        this.timer = setInterval(() => {
          let actions = 'get';
          this.websocketsend(JSON.stringify(actions));
        }, 3000)
      }
    },
    websocketonerror(){//连接建立失败重连
      this.initWebSocket();
      console.log('失败重连')
    },
    websocketonmessage(e){ //数据接收
      // const redata = JSON.parse(e.data);
      console.log(' is redata')
      console.log(e)
      let redata = JSON.parse(e.data)
      this.resdatas = redata
      this.loadmaker()


    },
    websocketsend(Data){//数据发送
      this.websock.send(Data);
    },
    websocketclose(e){  //关闭
      console.log('断开连接',e);
    },
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
    alarm(){
      let deviceList = [
        {
          longitude:106.820834,
          latitude:29.566288,

        },
        {
          longitude:106.817351,
          latitude:29.557728,

        },
        {
          longitude:106.815914,
          latitude:29.571886,

        }
      ]
      // if (this.markerPointList.length !== 0) { // 定时获取点数据，更新前需先清掉原来点
      //   this.map.remove(this.markerPointList)
      //   this.markerPointList = []
      // }
      // 绘制标记点
      deviceList.forEach(value => {
        if (value.longitude !== null && value.latitude !== null) {
          var markerPoint = new AMap.Marker({
            position: [value.longitude, value.latitude],
            map:mapInstance,
            offset: new AMap.Pixel(-15.1, -15.9) //点偏移量
          })
          // 创建标记点的div
          var markerDiv = document.createElement('div')
          // 设置标记点className,用于设置点的样式（动画）
          if(value.longitude=='106.815914'){
            markerDiv.className = 'alarmDevicegreen'
          }else{
            markerDiv.className = 'alarmDevice'
          }
          // 点内部文字:找到相同经纬度点列表:sameLonLatPoint，列表长度即为该点显示个数
          var sameLonLatPoint = deviceList.filter((val) => {
            return val.longitude === value.longitude && val.latitude === value.latitude
          })
          // 创建标记点内容span
          var markerSpan = document.createElement('span')
          // 某位置点不唯一时展示个数
          markerSpan.innerText = sameLonLatPoint.length !== 1 ? sameLonLatPoint.length : ''
          // 将内容span放到标记点div
          markerDiv.appendChild(markerSpan)
          // 将标记点div，设置为标记点内容
          markerPoint.setContent(markerDiv)
          // 标记点的list，清空点时用
          // this.markerPointList.push(markerPoint)
          // 将标记点绘制到地图
          mapInstance.add(markerPoint)




        }
      })

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
    loadmaker(){
      if (this.timer) {
        clearInterval(this.timer)
      } else {
        this.timer = setInterval(() => {
      let url = '/bigdata/firesensoralarm'


        // let res = this.resdatas
          get(url).then(res=> {

            for (let i = 0; i < res.length; i++) {
              if (res[i].longitude !== null && res[i].latitude !== null) {
                let contentcclass = ''
                if (res[i].alarm == '0') {
                  contentcclass = '<div class="markerClass"></div>'
                } else {
                  contentcclass = '<div class="markerClassgreen"></div>'
                }
                var markerPoint = new AMap.Marker({
                  position: [res[i].longitude, res[i].latitude],
                  map: mapInstance,
                  content: contentcclass,
                  offset: new AMap.Pixel(-13, -30)
                })

                markerPoint.content =
                  `<div style="color: black ">
                  <div><span style="font-size: 13px;color: black">企业名称:</span><span style="color: black;font-size: 13px"></span>` + res[i].organizationName + `</div>
                  <div><span style="font-size: 13px;color: black">传感器类型:</span><span style="color: black;font-size: 13px"></span>` + res[i].category + `</div>
                  <div><span style="font-size: 13px;color: black">安装地址:</span><span style="color: black;font-size: 13px"></span>` + res[i].address + `</div>
                </div>`
                markerPoint.on('click', this.markerClick);

                mapInstance.add(markerPoint)
              }

            }
          })

    }, 3000);
}
    },
    markerClick(e){
      var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
      infoWindow.setContent(e.target.content);
      infoWindow.open(mapInstance, e.target.getPosition());
    },
    testVideo() {
      let url1 = '/bigdata/firecmera1'
      let url2 = '/bigdata/firecmera2'
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
        hls.attachMedia(this.$refs.videoRef);
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
          that.$refs.videoRef.play();
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
  created() {
    // this.initWebSocket();

  },
  destroyed() {
    this.websock.close() //离开路由之后断开websocket连接
  },
}
</script>
<style>
.markerClassgreen{
  /*margin-left: 100px;*/
  /*margin-top: 100px;*/
  width: 18px;
  height: 18px;
  /*transform: translate3d(0px, 0px, 0px);*/
  position: relative;
  outline: none;
  background-color: #5cea10;
  box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.75);
  border-radius: 100%;
  transform-origin: 0 0;
  display: block;
  opacity: 0.7;
  animation-play-state: paused;
}




.markerClass{
  /*margin-left: 100px;*/
  /*margin-top: 100px;*/
  width: 18px;
  height: 18px;
  /*transform: translate3d(0px, 0px, 0px);*/
  position: relative;
  outline: none;
  background-color: #dd524d;
  box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.75);
  border-radius: 100%;
  transform-origin: 0 0;
  display: block;
  opacity: 0.7;
}

/*.markerClass::after {*/
/*  content: "";*/
/*  -webkit-border-radius: 100%;*/
/*  border-radius: 100%;*/
/*  height: 300%;*/
/*  width: 300%;*/
/*  position: absolute;*/
/*  margin: -100% 0 0 -100%;*/
/*  box-shadow: 0 0 6px 2px #dd524d;*/
/*  animation: pulsate 1s ease-out;*/
/*  animation-iteration-count: infinite; !*无穷反复*!*/
/*  animation-delay: 1.1s;*/

/*}*/




/*@keyframes pulsate {*/
/*  0% {*/
/*    transform: scale(0.1, 0.1);*/
/*    opacity: 0;*/
/*    filter: alpha(opacity=0);*/
/*  }*/
/*  50% {*/
/*    opacity: 1;*/
/*    filter: none;*/
/*  }*/
/*  100% {*/
/*    transform: scale(1.2, 1.2);*/
/*    opacity: 0;*/
/*    filter: alpha(opacity=0);*/
/*  }*/
/*}*/

</style>



