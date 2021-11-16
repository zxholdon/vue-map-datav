<template>
    <div id="rightProvince">
        <div class="bg-color-black">
            <div class="d-flex pt-2 pl-2">
                <span style="color:#5cd9e8">
                  <icon name="chart-pie"></icon>
                </span>
                <div class="d-flex">
                    <span class="fs-xl text mx-2">实时监控</span>
                    <dv-decoration-3 style="width:1.25rem;height:.25rem; position:relative;top:-.0375rem;"/>
                </div>
            </div>
            <div  class="d-flex jc-center">

              <video ref="videoRef" style="height: 100%;width: 100%" controls ></video>

<!--              <img @click="dialogVisible = true" :src="require('../../../public/static/images/jk3.gif')" style="height: 2.2rem;width: 4.5rem">-->
            </div>

          <span class="fs-xl text mx-2"></span>
          <div class="d-flex jc-center">
<!--            <video ref="videoRef" style="height: 100%;width: 100%" controls ></video>-->
          </div>

        </div>
    </div>
</template>

<style>
  .custonStyle div:nth-child(1){
    background-color: black;

  }
</style>
<script>

import Hls from "hls.js";
    export default {
        name: "rightProvince",
        data() {
            return {
              dialogVisible: false,

            };


        },
      mounted() {
        var hls = new Hls();
        hls.loadSource("https://open.ys7.com/v3/openlive/G02528497_1_1.m3u8?expire=1678677077&id=424887513376583680&t=68b3fafe86afc1c70961a67269f49d7e8153a316c62c45eec67263288edbc2f7&ev=100");//需要播放的视频地址
        hls.attachMedia(this.$refs.videoRef);
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
          this.$refs.videoRef.play();
        });

      },
      methods:{
        // handleClose(done) {
        //   this.$confirm('确认关闭？')
        //     .then(_ => {
        //       done();
        //     })
        //     .catch(_ => {});
        // },
      }
    }
</script>

<style lang="scss" scoped>
    #rightProvince {
        padding: 0.2rem;
        height: 5.125rem;
        min-width: 3.75rem;
        border-radius: 0.0625rem;

        .bg-color-black {
            height: 4.8125rem;
            border-radius: 0.125rem;
        }

        .text {
            color: #c3cbde;
        }
    }
</style>
