<template>

            <div id="chartpw" style="height: 90%;width: 100%"    >

            </div>

</template>


<script>

    import {EleResize} from "../../assets/js/esrsize";

    export default {
        data() {
            return {

            }

        },
      mounted() {
        this.mychart();
      },
      methods:{
        mychart(){
          let divs = document.getElementById('chartpw')
          var myChart = this.$echarts.init(document.getElementById('chartpw'));
          var option = {
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
                name: '排污统计',
                type: 'pie',
                radius: [40, 80],
                center: ['50%', '40%'],
                roseType: 'area',
                itemStyle: {
                  borderRadius: 8
                },
                data: [
                  { value: 40, name: '总氮' },
                  { value: 38, name: '烟尘折算浓度' },
                  { value: 32, name: 'PH值' },
                  { value: 30, name: '氨氮' },
                  { value: 28, name: 'SO2折算浓度' },
                  { value: 26, name: 'NOX折算浓度' },
                  { value: 22, name: '总磷' },

                ]
              }
            ]
          };
          myChart.setOption(option)
          let listener = function (){
            myChart.resize()
          }
          EleResize.on(divs,listener)
        }
      }
    };
</script>

<style lang="scss" scoped>
    ::v-deep#leftLoops {
        padding: 0.2rem;
        height: 5.4rem;
        border-radius: 0.0625rem;
        width: 5.8rem;

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
