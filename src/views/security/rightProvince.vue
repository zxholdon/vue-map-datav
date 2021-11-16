<template>

          <div style="width: 100%;height: 80%" id="chartsb">

          </div>

</template>

<style>
  .custonStyle div:nth-child(1){
    background-color: black;

  }
</style>
<script>
    import {get} from "../../utils/request";
    import {EleResize} from "../../assets/js/esrsize";

    export default {
        name: "rightProvince",
        data() {
            return {

            }
        },
      mounted() {
        this.mychart();
      },
      methods:{
        mychart(){
          let url = '/bigdata/specialequipment'
          get(url).then(res=>{

          var myChart = this.$echarts.init(document.getElementById('chartsb'));
          var option = {
            legend: {
              top: 'bottom',
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
                name:'特种设备',
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
            let divs = document.getElementById('chartsb')
            myChart.setOption(option)
            let listener = function (){
              myChart.resize()
            }
            myChart.setOption(option)
            EleResize.on(divs,listener)
        })}
      }
    }
</script>

<style lang="scss" scoped>
    #rightProvince {
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
