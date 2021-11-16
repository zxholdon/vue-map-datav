<template>
    <div id="rightCounty">
        <div class="bg-color-black">
            <div class="d-flex pt-2 pl-2">
                <span style="color:#5cd9e8">
                  <icon name="chart-bar"></icon>
                </span>
                <div class="d-flex">
                    <span class="fs-xl text mx-2">分级分类</span>
                    <dv-decoration-3 style="width:1.25rem;height:.25rem; position:relative;top:-.0375rem;"/>
                </div>
            </div>
            <div class="d-flex jc-center">
              <div id="chartPie" style="width:100%;height:3.5rem;"></div>
<!--              <dv-active-ring-chart class="ringclass" :config="config" style="width:4rem;height:3.5rem" />-->
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
import {get} from "../../utils/request";
import HighCharts from 'highcharts'
import  HighchartsChartTem  from 'highcharts/themes/dark-unica'
HighchartsChartTem(HighCharts)
    export default {
        name: "rightCounty",
        data() {
            return {

            }
        },
      methods:{
        getPie () {
          HighCharts.chart('chartPie', {	chart: {
              type: 'pie',
              options3d: {
                enabled: true,
                alpha: 45
              }
            },
            title: {
              text: ''
            },
            subtitle: {
              text: ''
            },
            plotOptions: {
              pie: {
                innerSize: 100,
                depth: 45
              }
            },
            series: [{
              name: '货物金额',
              data: [
                ['香蕉', 8],
                ['猕猴桃', 3],
                ['桃子', 1],
                ['橘子', 6],
                ['苹果', 8],
                ['梨', 4],
                ['柑橘', 4],
                ['橙子', 1],
                ['葡萄 (串)', 1]
              ]
            }]
          })
        },
        drawPieChart() {
          let url = '/bigdata/enterprisegrade'
          get(url).then(res=>{
            this.chartPie = echarts.init(document.getElementById('chartPie'));
            this.chartPie.setOption({

              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)",
                position:function(p){   //其中p为当前鼠标的位置
                  return [p[0] + 10, p[1] - 10];
                }
              },
              legend: {

                top:'2%',
                itemWidth: 10,
                itemHeight: 10,
                data:['低风险','一般风险','较大风险','重大风险'],
                textStyle: {
                  color: 'rgba(255,255,255,.5)',
                  fontSize:'12',
                },

              },
              series: [
                {
                  name:'分级分类',
                  type:'pie',
                  radius: ['40%', '55%'],
                  // radius: ['40%', '60%'],
                  color: ['#B4EEB4', '#4F94CD', '#F0B97D','#CD8C95'],
                  // label: {show:true},
                  labelLine: {show:true},
                  label : {
                    normal : {
                      formatter: '{b}:{c}: ({d}%)',
                      textStyle : {
                        fontWeight : 'normal',

                      }
                    }
                  },
                  data:[
                    {value:res.g1, name:'低风险'},
                    {value:res.g2, name:'一般风险'},
                    {value:res.g3, name:'较大风险'},
                    {value:res.g4, name:'重大风险'},
                  ]
                },

              ]
            });
          })

        },
        drawCharts() {
          this.drawPieChart()
        },

      },
      mounted: function () {
        //this.getPie()
        this.drawCharts()
      }

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
