<template>
    <div id="rightProvince">
        <div class="bg-color-black">
            <div class="d-flex pt-2 pl-2">
                <span style="color:#5cd9e8">
                  <icon name="chart-pie"></icon>
                </span>
                <div class="d-flex">
                    <span class="fs-xl text mx-2">实时监控</span>
                    <dv-decoration-3 style="width:1.25rem;height:.25rem; position:relative;top:-.0375rem;"/>
                </div>
            </div>
          <div  class="d-flex jc-center">
            <img  :src="require('../../../public/static/images/f3.jpg')" style="height: 2.7rem;width: 100%">
          </div>
          <span class="fs-xl text mx-2"></span>
          <div class="d-flex jc-center">
            <img :src="require('../../../public/static/images/f4.png')" style="height: 2.5rem;width: 100%">
          </div>

        </div>
    </div>
</template>

<style>
  .custonStyle div:nth-child(1){
    background-color: black;

  }
</style>
<script>
    export default {
        name: "rightProvince",
        data() {
            return {
              dialogVisible: false,
                options: {
                    series: [
                        {
                            type: 'gauge',
                            startAngle: -Math.PI / 2,
                            endAngle: Math.PI * 1.5,
                            arcLineWidth: 5,
                            radius: '90%',
                            data: [
                                {name: '省级提交率', value: 80, gradient: ['#03c2fd', '#1ed3e5', '#2fded6']}
                            ],
                            axisLabel: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            pointer: {
                                show: false
                            },
                            dataItemStyle: {
                                lineCap: 'round'
                            },
                            details: {
                                show: true,
                                formatter: '{value}%',
                                style: {
                                    fill: '#1ed3e5',

                                }
                            }
                        }
                    ],
                    color: ['#03d3ec']
                },
            }
        },
      methods:{
        // handleClose(done) {
        //   this.$confirm('确认关闭？')
        //     .then(_ => {
        //       done();
        //     })
        //     .catch(_ => {});
        // },
      }
    }
</script>

<style lang="scss" scoped>
    #rightProvince {
        padding: 0.2rem;
        height: 6.125rem;
        min-width: 3.75rem;
        border-radius: 0.0625rem;
      width: 5.5rem;

        .bg-color-black {
            height: 4.8125rem;
            border-radius: 0.125rem;
        }

        .text {
            color: #c3cbde;
        }
    }
</style>
