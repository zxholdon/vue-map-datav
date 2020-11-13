import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import dataV from '@jiaminghi/data-view';
Vue.use(dataV);

// 按需引入vue-awesome图标
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons/chart-bar.js';
import 'vue-awesome/icons/chart-area.js';
import 'vue-awesome/icons/chart-pie.js';
import 'vue-awesome/icons/chart-line.js';
import 'vue-awesome/icons/align-left.js';
import 'babel-polyfill'
import 'es6-promise/auto'
// 全局注册图标
Vue.component('icon', Icon);

// 适配flex
import '@/utils/flexible.js';

// 引入全局css
import './assets/scss/style.scss';
//引入百度统计插件
import ba from 'vue-ba'
Vue.use(ba, 'b0668f30d62e1597bdb36d05edea8960')
Vue.use(ElementUI)

//引入echart
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
import 'echarts/map/js/china.js'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
