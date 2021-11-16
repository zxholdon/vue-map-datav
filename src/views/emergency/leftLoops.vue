<template>
  <div id="chartwz"  style="height: 100%;width: 100%" >

  </div>
</template>

<script>

    import {get} from "../../utils/request";
    import {EleResize} from "../../assets/js/esrsize";

    export default {
        data() {
            return {

            };
        },
      mounted() {
        this.mychart();
      },
      methods:{
        mychart(){
          let url = '/bigdata/emergencywz'
          let divs = document.getElementById('chartwz')
          get(url).then(res=>{
          let myChart = this.$echarts.init(document.getElementById('chartwz'));
          let option = {
            legend: {
              top: '80%',
              textStyle: { //图例文字的样式
                color: '#ffffff',

              },
            },
            toolbox: {
              show: true,
              feature: {
                mark: { show: true },
              }
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            series: [
              {
                name: '应急物资',
                type: 'pie',
                radius: [40, 80],
                center: ['50%', '40%'],
                roseType: 'area',
                itemStyle: {
                  borderRadius: 8
                },
                data: res
              }
            ]
          };
            myChart.setOption(option)
            let listener = function (){
              myChart.resize()
            }
            EleResize.on(divs,listener)
        })}
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
