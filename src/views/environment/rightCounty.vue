<template>
  <div id="chartpwcl" style="width: 100%;height: 90%" class="d-flex jc-center">

  </div>
</template>


<script>
import echarts from 'echarts'
import {EleResize} from "../../assets/js/esrsize";
    export default {
        name: "rightCounty",
        data() {
            return {


            }
        },
      mounted() {
        this.intechart();
      },
      methods: {
        intechart(){
          let divs = document.getElementById('chartpwcl')
          var myChart = this.$echarts.init(document.getElementById('chartpwcl'));
          var option = {

            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              data: ['月处理(万吨)'],
              textStyle: {
                color: '#ffffff'
              },
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'value',
              boundaryGap: [0, 0.01],
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#ffffff' //更改坐标轴文字颜色
                }
              },
              axisLine: {
                lineStyle: {
                  color: '#ffffff' //更改坐标轴颜色
                }
              }
            },
            yAxis: {
              type: 'category',
              data: ['3月', '4月', '5月', '6月', '7月', '8月'],
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#ffffff' //更改坐标轴文字颜色
                }
              },
              axisLine: {
                lineStyle: {
                  color: '#ffffff' //更改坐标轴颜色
                }
              }

            },
            series: [
              {
                barWidth: 20,
                name: '月处理(万吨)',
                type: 'bar',
                data: [18203, 23489, 29034, 10100, 1317, 3230],
                itemStyle: {
                  color:'skyblue'
                }
              },

            ]
          };
          myChart.setOption(option)

          let listener = function (){
            myChart.resize()
          }
          EleResize.on(divs,listener)
        }
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
