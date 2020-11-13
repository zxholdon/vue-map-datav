import * as request from '../utils/request'

let api = '';

// 获取全国JSON
export const getChinaJson = (params) => request.get(api+`/map/china.json`, params);

// 获取省JSON
export const getProvinceJSON = (path,params) => request.get(api+`/map/province/${path}.json`, params);

// 获取市JSON
export const getCityJSON = (path,params) => request.get(api+`/map/city/${path}.json`, params);

// 获取天气
export const getWeather = (params) => request.get(`https://api.asilu.com/weather_v2/`, params);

