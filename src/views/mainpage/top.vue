<template>
    <div class="container">
      <div class="left">
        <div class="common-ves ves-1">
          <div class="ico-lt"></div>
          <div class="ico-lb"></div>
          <div class="ico-rt"></div>
          <div class="ico-rb"></div>
          <img class="sub-bg" src="../../../src/assets/img/submit-bg.png" alt=""/>
          <div class="title">隐患整改数量</div>
          <div class="cont">
            <div id="parent">
              <div class="scroll-box" style="overflow: hidden">
                <div

                  v-for="(item, index) in rectification"
                  :key="'rectification_' + index"
                >
                  <div class="label" style="margin-top: 20px">
                <span>
                  {{ item.name }}
                </span>
                    <span>
                  <span>{{ item.done }}</span>
                  <span>/{{ item.all }}</span>
                </span>
                  </div>
                  <Progress :progress="item.percent"></Progress>
                </div>
              </div>

            </div>

          </div>
        </div>
        <div class="common-ves ves-2">
          <div class="ico-lt"></div>
          <div class="ico-lb"></div>
          <div class="ico-rt"></div>
          <div class="ico-rb"></div>
          <img class="sub-bg" src="../../../src/assets/img/submit-bg.png" alt=""/>

          <div class="title">企业自查情况</div>
          <div class="cont">
            <leftloops></leftloops>
          </div>
        </div>
      </div>
      <div class="map-cont">
        <div class="ico-lt"></div>
        <div class="ico-lb"></div>
        <div class="ico-rt"></div>
        <div class="ico-rb"></div>
        <img class="map-title-bg" src="../../../src/assets/img/map-head.png" alt=""/>
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

        </div>
      </div>
      <div class="right">
        <div class="common-ves ves-3">
          <div class="ico-lt"></div>
          <div class="ico-lb"></div>
          <div class="ico-rt"></div>
          <div class="ico-rb"></div>
          <img class="sub-bg" src="../../../src/assets/img/submit-bg.png" alt=""/>

          <div class="title">风险分级</div>
          <div class="cont">
            <div class="cont-graph">
              <div class="bg">
                <img class="bg-bg1" alt="" src="../../../src/assets/img/bar-bg.png"/>
                <div class="bg-desc">
                  <div>
                    <span class="f16 cf">占比</span>&nbsp;&nbsp;&nbsp;
                    <span class="f18 cb">{{ curFx.percent }}</span>
                    <span class="f16 cb">%</span>
                  </div>
                  <div class="ff f16">
                    {{ curFx.name }}
                  </div>
                </div>
                <img class="bg-bg2" alt="" src="../../../src/assets/img/bar-bg2.png"/>
              </div>
              <div id="yhBar" class="cont-bar"></div>
            </div>

            <div class="cont-desc">
              <div
                class="bar-item"
                v-for="(item, index) in barData"
                :key="'bar-item-' + index"
              >
                <div
                  class="square"
                  :style="{
                    backgroundColor: item.color || '',
                  }"
                ></div>
                <div class="">
                  <div class="bar-item-name">
                    {{ item.name }}
                  </div>
                  <div>
                    <span class="cb f18"
                    >{{ item.value }}个 {{ item.percent }}</span
                    >
                    <span class="cf f14">%</span>
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

import moment from "moment";
import Progress from "../../comments/Progress";
import {get} from "../../utils/request";
import leftloops from "./leftLoops"
import Hls from "hls.js";


moment.locale("zh-cn");

//map实例
let mapInstance = {};
const typeColorMapping = {
  water: "#00d8e7",
  electric: "#ff7647",
  gas: "#fff90f",
  zq: "#00f90f",
};
export default {
  name: "index",
  components: {
    Progress,
    leftloops
  },
  data() {
    return {

      //   init(o) {
      //     o.setMapStyle('amap://styles/cfc694d2bc6db8a67addb398437c91f3')
      //   }
      // },
      // center: [106.82315,29.557708],
      //type 1数字 2字符
      ply:null,
      entData: [],
      markerPointList: [],
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
      player1Url: '',
      player2Url: '',
      title:
        '<div style="padding: 15px;background:rgba(37,36,41,1);width:220px;height:40px;border:1px solid rgba(204,204,204,1); border-radius:6px;">' +
        '<ul style="list-style: none;color: #FFFFFF;font-size: 13px;text-align:left;font-weight:400;font-family:Microsoft YaHei; padding-inline-start: 0px;">' +
        '<li style="text-align:left;margin-top:5px line-height:24px;">' +
        '<span>xxxx：</span><span style="background:rgba(240,142,25,1); border-radius:2px; width:70px; padding:0 5px 0 5px">xxxxxx' +
        '</span> </li>' + '</ul>' + '</div>',

    };
  },

  mounted() {
    this.testProgress();

    this.sliderScroll();
      this.initMap();
    this.testLine();
    this.testVideo();
    this.loadmaker()
    this.alarm()
    this.beginTime();
    this.initBar();

  },
  methods: {
    sliderScroll() {
      let scroll = document.getElementsByClassName("scroll-box");
      let parent = document.getElementById('parent');
      let time = setInterval(function () {
        // console.log(parent.scrollTop)
        parent.scrollTop++;
      }, 100);
      scroll[0].addEventListener("mouseover", function () {
        clearInterval(time);
      });
      scroll[0].addEventListener("mouseout", function () {
        time = setInterval(function () {
          parent.scrollTop++;
        }, 100);
      })
    },
    //初始化地图
    initMap() {
      // 获取到作为地图容器的DOM元素
      const container = document.getElementById("mapContainer");
      //创建地图实例
      const map = new AMap.Map(container, {
        center: [106.82315, 29.557708],
        zoom: 15,
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
                 type,
                 strokeWeight,
                 strokeColor,
                 paths,
                 lineJoin = "miter",
               }) {
      let curColor = typeColorMapping[type];
      //折线的api地址 https://lbs.amap.com/api/jsapi-v2/documentation#polyline
      // 创建折线实例
      const polyline = new AMap.Polyline({
        path: paths,
        strokeWeight, // 线条宽度，默认为 1
        strokeStyle: "solid", //线条样式
        strokeColor: strokeColor, // 线条颜色
        lineJoin, // 折线拐点连接处样式，默认值为'miter'尖角，其他可选值：'round'圆角、'bevel'斜角
      });
      // 将折线添加至地图实例
      this.ply = polyline
      mapInstance.add(polyline);
    },
    //测试折线创建
    testLine() {
      // 折线的节点坐标数组，每个元素为 AMap.LngLat 对象
      let url = '/bigdata/masterpipe'
      let url2 = '/bigdata/branchpipe'
      // 主管网
      get(url).then(res => {
        console.info(res)
        for (let i = 0; i < res.length; i++) {
          console.info(res)
          this.addMapPath({
            paths: res[i].position,
            strokeWeight: res[i].diameter,
            strokeColor: res[i].types,
          })
          // this.ply.on('click',function (event){
          //   console.info(event.lnglat)
          // })
        }
      })
      // 支管网
      get(url2).then(res => {
        console.info(res)
        for (let i = 0; i < res.length; i++) {
          console.info(res)
          this.addMapPath({
            paths: res[i].position,
            strokeWeight: res[i].diameter,
            strokeColor: res[i].types,
          })

          // this.ply.on('click',function (event){
          //   console.info(event.lnglat)
          // })

        }
      })

    },

    loadmaker() {
      let url = '/bigdata/enterprisemaker'
      get(url).then(res => {
        let riskcontent = ''
        for (let i = 0; i < res.dataout.length; i++) {


          if (res.result[i].riskgrade == '低风险') {
            riskcontent = `<div><span style="font-size: 14px">风险等级:</span><span style="color: green;font-size: 14px">` + res.result[i].riskgrade + `</span></div>`
          } else if (res.result[i].riskgrade == '一般风险') {
            riskcontent = `<div><span style="font-size: 14px">风险等级:</span><span style="color: yellowgreen;font-size: 14px">` + res.result[i].riskgrade + `</span></div>`
          } else if (res.result[i].riskgrade == '较大风险') {
            riskcontent = `<div><span style="font-size: 14px">风险等级:</span><span style="color: red;font-size: 14px">` + res.result[i].riskgrade + `</span></div>`
          } else {
            riskcontent = `<div><span style="font-size: 14px">风险等级:</span><span style="color: darkred;font-size: 14px">` + res.result[i].riskgrade + `</span></div>`
          }
          //点

          var mm = new AMap.Marker({
            map: mapInstance,
            icon: require("../../../public/static/images/enterprise.png"),
            position: res.dataout[i],
          });
          mapInstance.add(mm)
          mm.content =
            `<div style="color: black ">
                  <div><span style="font-size: 14px;color: black">企业名称:</span><span style="color: green;font-size: 14px"></span>` + res.result[i].organizationName + `</div>
                  <div><span style="font-size: 14px;color: black">联系电话:</span><span style="color: black;font-size: 14px"></span>` + res.result[i].phone + `</div>` + riskcontent + `
                </div>`
          mm.on('click', this.markerClick);
          mm.emit('click', {target: mm});
        }

      })
    },
    markerClick(e) {
      var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
      infoWindow.setContent(e.target.content);
      infoWindow.open(mapInstance, e.target.getPosition());
    },
    alarm(){
      let deviceList = [
        {
          longitude:106.820834,
          latitude:29.566288,
          statusType:'alarmDevice'
        },
        {
          longitude:106.817351,
          latitude:29.557728,
          statusType:'alarmDevice'
        },
        {
          longitude:106.585914,
          latitude:29.481886,
          statusType:'alarmDevice'
        }
      ]
      if (this.markerPointList.length !== 0) { // 定时获取点数据，更新前需先清掉原来点
        this.map.remove(this.markerPointList)
        this.markerPointList = []
      }
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
          markerDiv.className = value.statusType
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
          this.markerPointList.push(markerPoint)
          // 将标记点绘制到地图
          this.map.add(markerPoint)
        }
      })

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
      let url = '/bigdata/hiddenlsit'
      get(url).then(res => {

        this.rectification = res.map((item) => ({
          ...item,
          percent: Math.floor((item.done / item.all) * 10000) / 100,
        }));
      })

    },
    testVideo() {


      let url1 = '/bigdata/cmera1'
      let url2 = '/bigdata/cmera2'
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
        console.info('r2222222es')
        console.info(res[0].url)
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
  computed: {},
  watch: {},

  created() {
    document.title = "重庆国际生物城应急指挥平台";
    this.testBar();
  },
};
</script>
<style>
#parent {
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: auto;
  overflow-y: hidden;
}
</style>


<style lang="less" scoped>
@import "../../../src/assets/index.less";

</style>
