<template>

            <div style="height: 100%;width: 100%" id="chartplan" class="d-flex jc-center">

            </div>

</template>

<style>
 .ringclass div:nth-child(2) div:nth-child(2){
   overflow:inherit;
 }
</style>
<script>
import echarts from 'echarts'
import {EleResize} from '../../assets/js/esrsize'
import {get} from "../../utils/request";
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
          let url = '/bigdata/plandata'
          get(url).then(res=>{
            let divs = document.getElementById('chartplan')
            var myChart = this.$echarts.init(document.getElementById('chartplan'));
            var option = {

              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              legend: {
                data: ['计划检查', '实际检查', '发现隐患','整改隐患'],
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
                data: res.list2,
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
                  name: '计划检查',
                  type: 'bar',
                  data: res.plan,

                },
                {
                  name: '实际检查',
                  type: 'bar',
                  data: res.actu
                }
                ,
                {
                  name: '发现隐患',
                  type: 'bar',
                  data: res.find
                },
                {
                  name: '整改隐患',
                  type: 'bar',
                  data: res.filish
                }
              ]
            };
            let listener = function (){
              myChart.resize()
            }
            myChart.setOption(option)
            EleResize.on(divs,listener)
          })}
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
