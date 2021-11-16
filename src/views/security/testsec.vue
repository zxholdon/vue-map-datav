<template>
   <div class="container">
     <div class="left">
       <div class="common-ves ves-1" >
         <div class="ico-lt"></div>
         <div class="ico-lb"></div>
         <div class="ico-rt"></div>
         <div class="ico-rb"></div>
         <img class="sub-bg" src="../../../src/assets/img/submit-bg.png" alt="" />
         <div class="title">日周月排查</div>
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

         <div class="title">在建项目</div>
         <div class="cont">
           <div class="cont">
             <div class="cont-head">
               <div class="cont-head-col">
                 <div class="ico-lt"></div>
                 <div>序号</div>
                 <div>企业名称</div>
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
       <div class="common-ves ves-3" >
         <div class="ico-lt"></div>
         <div class="ico-lb"></div>
         <div class="ico-rt"></div>
         <div class="ico-rb"></div>
         <img class="sub-bg" src="../../../src/assets/img/submit-bg.png" alt="" />

         <div class="title">特种设备</div>
         <div class="cont" >
           <RightProvince></RightProvince>
         </div>
       </div>
       <div class="common-ves ves-4" >
         <div class="ico-lt"></div>
         <div class="ico-lb"></div>
         <div class="ico-rt"></div>
         <div class="ico-rb"></div>
         <img class="sub-bg" src="../../../src/assets/img/submit-bg.png" alt="" />
         <div class="title">检查计划</div>
         <div class="cont" >
           <RightCounty></RightCounty>
         </div>
       </div>
     </div>
   </div>

</template>

<script>




import Nav from "../../comments/nav";
import Pannel from "../../comments/pannel";
import Topdate from "../../comments/topdate";
import Topweather from "../../comments/topweather";
import leftLevel from "../security/leftLevel";
import leftLoops from "../security/leftLoops";
import RightCounty from "../security/rightCounty";
import RightProvince from "../security/rightProvince";
import {get} from "../../utils/request";
import moment from "moment";
let mapInstance = {};
export default {
  name: "china",
  components: {
    RightProvince,
    RightCounty,
    leftLevel,

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
    this.testLine();
    this.beginTime();
    this.initBar();
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
    initBar() {
      let _self = this;
      // 初始化饼图
      let pie3D = new Pie3D({
        el: document.getElementById("yhBar"),
        // 位置配置
        perspective: {
          // 相机位置 xyz
          camera: [0, -60, 24],
          // 查看目标点位置 xyz
          target: [0, 0, 0],
        },
        // 控制器 是否开启
        control: {
          enabled: false,
        },
        // 事件
        on: {
          // 鼠标悬浮至pie元素
          hoverPiePattern: function (
            targetPiePatternData,
            targetPiePatternIndex
          ) {
            _self.curFx = targetPiePatternData;
            console.info(
              "鼠标悬浮至pie元素: ",
              targetPiePatternData,
              targetPiePatternIndex
            );
          },
          // 鼠标离开悬浮道德至pie元素
          leavePiePattern: function (
            targetPiePatternData,
            targetPiePatternIndex
          ) {
            // _self.curFx = targetPiePatternData;
            console.info(
              "鼠标离开悬浮道德至pie元素: ",
              targetPiePatternData,
              targetPiePatternIndex
            );
          },
          // 饼图变化
          sceneChange: function (pie3D, rings) {
            console.info(pie3D, rings);
          },
        },
      });
      let pieData = this.barData;
      // 根据饼图数据渲染饼图  配置中涉及到角度的均为弧度制
      pie3D.render(
        pieData,
        {
          // 半径
          radius: [12, 20],
          // 其实角度
          startAngle: 0,
          // 单个pie元素
          piePattern: {
            // 分段曲度
            curveSegments: 80,
            // 几何元素
            extrude: {
              // 棱角曲度
              curveSegments: 2,
              // 分段数
              steps: 20,
              // 深度
              depth: 1.5,
              // 对挤出的形状应用是否斜角
              bevelEnabled: true,
              // 设置原始形状上斜角的厚度
              bevelThickness: 1,
              // 斜角与原始形状轮廓之间的延伸距离
              bevelSize: 0.3,
              // 与斜角开始的形状轮廓的距离‎
              bevelOffset: 0,
              // 与斜角开始的形状轮廓的距离‎
              bevelSegments: 5,
            },
            // 整体旋转 x y z
            rotation: [0, 0, 0],
            // 整体偏移量 x y z
            offset: [0, 0, 0],
            // 鼠标交互pie元素配置
            hover: {
              extrude: {
                // 高度
                depth: 1.5,
              },
            },
          },
        },
        function () {
          // 此处渲染完成回调
          // 激活某个柱子
          pie3D.activePiePatternByIndex(1);
          //todo
          setTimeout(pie3D.unActivePiePatternByIndex.bind(pie3D, 1), 2000);

          // 获取pie元素的屏幕坐标
          console.info(
            "pie元素所在屏幕位置信息:",
            pie3D.getRings().map((ring) => ring.screenCoords)
          );
        }
      );
      // 尺寸变化适配
      window.addEventListener("resize", pie3D.resize.bind(pie3D));
    },
    /**
     * 创建线段
     * @param {String} type water 水 electric 电 gas 气
     * @param {Number} barWidth 线宽
     * @param {Array} paths 路径数组
     * @param {String} lineJoin 拐角类型
     *
     */
    addMapPath({
                 type = "water",
                 strokeWeight = 4,
                 paths,
                 lineJoin = "miter",
               })
    {
      let curColor = typeColorMapping[type];
      //折线的api地址 https://lbs.amap.com/api/jsapi-v2/documentation#polyline
      // 创建折线实例
      const polyline = new AMap.Polyline({
        path: paths,
        strokeWeight, // 线条宽度，默认为 1
        strokeStyle: "dashed", //线条样式
        strokeColor: curColor, // 线条颜色
        lineJoin, // 折线拐点连接处样式，默认值为'miter'尖角，其他可选值：'round'圆角、'bevel'斜角
      });
      // 将折线添加至地图实例

      mapInstance.add(polyline);
    },
    //测试折线创建
    testLine() {
      // 折线的节点坐标数组，每个元素为 AMap.LngLat 对象
      let waterPath = [
        [106.54973, 29.56429],
        [106.54943, 29.56429],
        [106.54922, 29.56411],
        [106.54933, 29.56459],
        [106.54891, 29.56429],
      ];
      let elePath = [
        [106.549553, 29.566348],
        [106.549515, 29.565741],
        [106.54943, 29.56485],
        [106.549118, 29.563795],
        [106.548872, 29.562825],
        [106.547563, 29.562428],
      ];
      let gasPath = [
        [106.547032, 29.565326],
        [106.548346, 29.565242],
        [106.549644, 29.564957],
        [106.549762, 29.564421],
        [106.550079, 29.56359],
        [106.549923, 29.563175],
        [106.549108, 29.562867],
        [106.54819, 29.562862],
      ];
      let gasBranchPath = [
        [106.549644, 29.564957],
        [106.548842, 29.563125],

        [106.549456, 29.563889],
      ];

      waterPath = waterPath.map((item) => new AMap.LngLat(item[0], item[1]));
      waterPath.
        elePath = elePath.map((item) => new AMap.LngLat(item[0], item[1]));
      gasPath = gasPath.map((item) => new AMap.LngLat(item[0], item[1]));
      gasBranchPath = gasBranchPath.map(
        (item) => new AMap.LngLat(item[0], item[1])
      );

      this.addMapPath({
        paths: waterPath,
      });
      this.addMapPath({
        type: "electric",
        paths: elePath,
      });
      this.addMapPath({
        type: "gas",
        paths: gasPath,
      });
      this.addMapPath({
        type: "gas",
        strokeWeight: 2,
        paths: gasBranchPath,
      });
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
    testBar() {
      let barData = [
        {
          name: "低风险",
          value: 3,
          color: "#0bffab",
        },
        {
          name: "一般风险",
          value: 5,
          color: "#42a0fe",
        },
        {
          name: "较大风险",
          value: 1,
          color: "#ffaf50",
        },
        {
          name: "重大风险",
          value: 2,
          color: "#ff7979",
        },
      ];
      let total = barData.reduce((sum, item) => sum + item.value, 0);
      console.log(total);
      this.barData = barData.map((item) => {
        const percent = Math.floor((item.value / total) * 10000) / 100;
        return {
          ...item,
          percent,
        };
      });
      this.curFx = this.barData[0];
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
      //这里填入直播地址就行
      this.player1Url = '';
      this.player2Url = '';
      document.getElementById('player1').setAttribute('src', this.player1Url || '');
      document.getElementById('player2').setAttribute('src', this.player2Url || '');

      let player1 = new EZUIKit.EZUIPlayer('player1');
      let player2 = new EZUIKit.EZUIPlayer('player2');

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



