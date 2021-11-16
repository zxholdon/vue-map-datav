<template>


  <dv-scroll-board  :config="config"   />





</template>


<script>
    import {get} from "../../utils/request";

    export default {
        name: "rightProvince",
        data() {
          return {
            config: {

              // rowNum: 3, //表格行数
              // headerHeight: 20,
              // headerBGC: "#0f1325", //表头
              // oddRowBGC: "#0f1325", //奇数行
              // evenRowBGC: "#171c33", //偶数行
              // index: true,
              // columnWidth: [70],
              // align: ["center"],
              // data: [],
            }
          }
        },
      methods:{
        setData() {
          let url = '/bigdata/commonsource'
          get(url).then(res=>{

            this.config = {
              data: res,

              rowNum:5, //表格行数
              headerHeight: 20,
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
          this.setData()
      }
    }
</script>


