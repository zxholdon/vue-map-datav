<template>
  <div id="chartpc" style="width: 100%;height: 100%" class="d-flex jc-center">

  </div>
</template>

<script>

    import {EleResize} from "../../assets/js/esrsize";
    import {get} from "../../utils/request";

    export default {
        data() {
            return {

            };
        },
      mounted() {
        this.intechart();
      },
      methods: {
        intechart(){
          let url = '/bigdata/firecheck'
          get(url).then(res=>{
            console.log('ressss')
            console.log(res)
            let divs = document.getElementById('chartpc')
            let myChart = this.$echarts.init(document.getElementById('chartpc'));
            let option = {
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              legend: {
                data: ['日巡查', '周巡查', '月巡查'],
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
                  name: '日巡查',
                  type: 'bar',
                  data: res.rp,

                },
                {
                  name: '周巡查',
                  type: 'bar',
                  data: res.zp
                }
                ,
                {
                  name: '月巡查',
                  type: 'bar',
                  data: res.yp
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
    };
</script>

<style lang="scss" scoped>
    ::v-deep#leftLoops {
        padding: 0.2rem;
        height: 5.5rem;
        border-radius: 0.0625rem;
        width: 5.8rem;

        .bg-color-black {
            height: 5.2rem;
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
