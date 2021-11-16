<template>
    <div id="rightCounty">
        <div class="bg-color-black">
            <div class="d-flex pt-2 pl-2">
                <span style="color:#5cd9e8">
                  <icon name="chart-bar"></icon>
                </span>
                <div class="d-flex">
                    <span class="fs-xl text mx-2">消防安全负责人</span>
                    <dv-decoration-3 style="width:1.25rem;height:.25rem; position:relative;top:-.0375rem;"/>
                </div>
            </div>
          <div class="d-flex jc-center">
            <dv-scroll-board class="leftLoop" :config="config"  style="width: 100%;height:4.1rem"/>
          </div>
        </div>
    </div>
</template>

<style>
 .ringclass div:nth-child(2) div:nth-child(2){
   overflow:inherit;
 }
</style>
<script>
import echarts from 'echarts'
    export default {
        name: "rightCounty",
        data() {
          return {
            config: {
              header: ["联系人姓名", "联系电话"],
              rowNum: 6, //表格行数
              headerHeight: 35,
              headerBGC: "#0f1325", //表头
              oddRowBGC: "#0f1325", //奇数行
              evenRowBGC: "#171c33", //偶数行
              index: true,
              columnWidth: [60],
              align: ["center"],
              data: [],
            }
          }
        },
      methods:{
        setData() {

          var list1 = [
            ['张思', "15678998672"],
            ['王山', "13678228672"],
            ['李飞', "156780098673"],
            ['赵伟', "18873329994"],
            ['沈龙', "15189873365"],
            ['刘芳', "13300099833"],
            ['刘露', "13300099833"],

          ];

          this.$data.config.data = list1
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
        height: 5.5rem;
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
