import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import dataV from '@jiaminghi/data-view';
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import highcharts from 'highcharts'
import highcharts3d from 'highcharts/highcharts-3d'
highcharts3d(highcharts)
import 'amfe-flexible'
import 'animate.css'
Vue.use(dataV);
import VueAMap from 'vue-amap'; //引入高德地图
// 高德地图
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '874966306feecf8d307173b0f0e33dd8',
  plugin: [                // 这里根据自己项目按需引入插件
    'Autocomplete',
    'PlaceSearch',
    'Scale',
    'OverView',
    'ToolBar',
    'MapType',
    'PolyEditor',
    'AMap.CircleEditor'
  ],
});
Vue.use(VueAMap);
// 按需引入vue-awesome图标
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons/chart-bar.js';
import 'vue-awesome/icons/chart-area.js';
import 'vue-awesome/icons/chart-pie.js';
import 'vue-awesome/icons/chart-line.js';
import 'vue-awesome/icons/align-left.js';
// 全局注册图标
Vue.component('icon', Icon);

import '../src/utils/ezuikit.js';
import '../src/utils/hls.min.js';
// import '@/utils/pie.3d.min.js';
// 适配flex
import '@/utils/flexible.js';
import './assets/index.less'
// 引入全局css
import './assets/scss/style.scss';

Vue.use(ElementUI);

//引入echart
import echarts from 'echarts'
import 'echarts-liquidfill'
Vue.prototype.$echarts = echarts;
import 'echarts/map/js/china.js'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
