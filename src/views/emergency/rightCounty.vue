<template>

   <dv-scroll-board class="leftLoop" :config="config" />



</template>


<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
import {get} from "../../utils/request";
    export default {
        name: "rightCounty",
      comments:{
        vueSeamlessScroll,
      },
        data() {
            return {
              config: {

              }
            }
        },
      methods:{
        setData() {

          let url = '/bigdata/emergencypeople'
          get(url).then(res=>{

            this.config = {
              data: res,

              rowNum: 5, //表格行数
              headerHeight: 40,
              headerBGC: "#0f1325", //表头
              oddRowBGC: "#0f1325", //奇数行
              evenRowBGC: "#171c33", //偶数行
              index: true,
              columnWidth: [90],
              align: ["center"],
            }

          }).catch(error=>{
            console.info(error)
          })
        },
      },
      mounted() {

        this.setData();
      },

    }
</script>

<style lang="scss" scoped>
    #rightCounty {
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
