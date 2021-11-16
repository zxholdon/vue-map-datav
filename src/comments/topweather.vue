<template>
  <div class="header-wea">
    <div class="header-wea-before">
      <div class="header-wea-wd"> {{dataWeather.city}}</div>
      <div class="header-wea-tq">
        <img class="header-wea-ico"  :src="dataWeather.icontemp" alt="" />
        <span>{{dataWeather.weathertemp}}</span>
      </div>
    </div>
    <div class="header-wea-mid"></div>
    <div class="header-wea-pre">
      <div class="header-wea-kq"> {{dataWeather.peraturetemp}}</div>
      <div class="header-wea-kqzl"></div>
    </div>
  </div>



</template>
<script>
import {formatTime} from "../utils";
import {weatherOption} from "../config/weatherOption";

export default {
  name: "topdate",
  data(){
    return{
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
    }
  },
  created() {
    this.requestGetWeather()
  },
  methods:{
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
  }

}
</script>
