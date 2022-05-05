
const path = require('path')
const webpack = require('webpack')
const resolve = dir => {
  return path.join(__dirname, dir)
}
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
module.exports = {

  publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : "/", // 默认'/'，部署应用包时的基本 URL
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  parallel: require("os").cpus().length > 1,
  chainWebpack: config => {

    // config.resolve.alias
    //   .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
  },
  configureWebpack: {
    externals: {
      'AMap': 'AMap', // 高德地图配置
      'AMapUI': 'AMapUI'
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      })
    ]
  },

  transpileDependencies: process.env.NODE_ENV === "development" ? ["*"] : [],
  // devServer: {
  //     overlay: { // 让浏览器 overlay 同时显示警告和错误
  //       warnings: true,
  //       errors: true
  //     },
  //     open: false, // 是否打开浏览器
  //     host: "http://192.168.31.5",
  //     port: "8002", // 代理端口
  //     https: false,
  //     hotOnly: false, // 热更新
  //     proxy: {
  //         "/": {
  //             // target: "http://127.0.0.1:8080", // 目标代理接口地址
  //             // target: "http://106.13.104.101:8089", // 目标代理接口地址
  //             target: "http://192.168.31.5:8002", // 目标代理接口地址
  //             // target: "http://192.168.0.110:9082", // 目标代理接口地址
  //             // target: "http://192.168.0.240:8081", // 目标代理接口地址
  //             secure: false,
  //             changeOrigin: false, // 开启代理，在本地创建一个虚拟服务端
  //             // ws: true, // 是否启用websockets
  //             pathRewrite: {
  //                 "^/": "/"
  //             }
  //         }
  //     }
  // }
}
