<template>


          <div>
          <dv-scroll-board class="leftLoop" :config="config" style="width: 100%;height:6rem" />


          </div>
</template>

<script>

    import {get} from "../../utils/request";

    export default {
        data() {
          return {
            config: {
              header: ["项目名称", "联系电话"],
              rowNum: 6, //表格行数
              headerHeight: 35,
              headerBGC: "#0f1325", //表头
              oddRowBGC: "#0f1325", //奇数行
              evenRowBGC: "#171c33", //偶数行
              index: true,
              columnWidth: [70],
              align: ["center"],
              data: [],
            }
          }
        },
      mounted() {
       this.setData()
      },
      methods:{
        setData() {
          let url = '/bigdata/buildings'
          get(url).then(res=>{

            this.config = {
              data: res,
              header: ["项目名称", "联系电话"],
              rowNum: 6, //表格行数
              headerHeight: 35,
              headerBGC: "#0f1325", //表头
              oddRowBGC: "#0f1325", //奇数行
              evenRowBGC: "#171c33", //偶数行
              index: true,
              columnWidth: [70],
              align: ["center"],
            }

          }).catch(error=>{
            console.info(error)
          })
        },
      }
    };
</script>

<style lang="scss" scoped>
    ::v-deep#leftLoops {
        padding: 0.2rem;
        height: 5rem;
        border-radius: 0.0625rem;

        .bg-color-black {
            height: 4.2rem;
            border-radius: 0.125rem;
        }

        .text {
            color: #c3cbde;
        }

        .color0 {
            color: #15b415;
        }

        .color1 {
            color: #fb3628;
        }
    }

</style>
