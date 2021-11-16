<template>
  <div class="box">
    <div id="container" style="width:100%; height:100%"></div>
  </div>
</template>

<script>
import AMap from 'AMap' // 引入高德地图
export default {
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let map = new AMap.Map('container', {
        center: [116.397428, 39.90923],
        resizeEnable: true,
        zoom: 10
      })
    }
  }
}
</script>
