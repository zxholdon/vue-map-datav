<template>
              <div style="width: 100%;height: 100%" id="chartrzy">

              </div>


</template>

<script>
    import {EleResize} from '../../assets/js/esrsize'
    import {get} from "../../utils/request";

    export default {
        sl:[],
        name: "leftLevel",
        props: {
            areaData: {
                type: Object,
                default: () => {}
            },
        },
        watch:{
            areaData(val){
                this.areaDataObj = val;
            }
        },
        data() {
            return {
                areaDataObj: {
                    name: "日周月",
                    areaName: "日周月",
                },

            }
        },
        mounted() {
            this.intechart();
        },
        methods: {
          intechart(){
            let url = '/bigdata/rzy'
            get(url).then(res=>{
            let divs = document.getElementById('chartrzy')
            let myChart = this.$echarts.init(document.getElementById('chartrzy'));
            let option = {

              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              legend: {
                data: ['日排查', '周排查', '月排查'],
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
                  name: '日排查',
                  type: 'bar',
                  data: res.rp,

                },
                {
                  name: '周排查',
                  type: 'bar',
                  data: res.zp
                }
                ,
                {
                  name: '月排查',
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

    }
</script>

<style lang="scss" scoped>
    #leftLevel {
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
        #parent::-webkit-scrollbar {
            display: none; /* Chrome Safari */
        }

        #parent {
            scrollbar-width: none; /* firefox */
            -ms-overflow-style: none; /* IE 10+ */
            overflow-x: hidden;
            overflow-y: auto;
        }
    }
</style>
