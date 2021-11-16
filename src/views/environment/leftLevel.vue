<template>
    <div id="leftLevel">
        <div class="bg-color-black">
            <div class="d-flex pt-2 pl-2">
                <span style="color:#5cd9e8">
                  <icon name="chart-bar"></icon>
                </span>
                <div class="d-flex">
                    <template v-if="areaDataObj.areaLevel === 'province'">
                        <span class="fs-xl text mx-2">{{areaDataObj.areaName}}</span>
                    </template>
                    <template v-else>
                        <span class="fs-xl text mx-2">实时监控</span>
                    </template>
                    <dv-decoration-1 style="width:1.25rem;height:.25rem; position:relative;top:-.0375rem;"/>
                </div>
            </div>
          <div  class="d-flex jc-center">
            <img  :src="require('../../../public/static/images/pw1.png')" style="height: 2.2rem;width: 100%">
          </div>
          <span class="fs-xl text mx-2"></span>
          <div class="d-flex jc-center">
            <img :src="require('../../../public/static/images/pw4.png')" style="height: 2.4rem;width: 100%">
          </div>

        </div>
    </div>
</template>

<script>
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
              vaue:[20,40,30,25,27,47,20,33,88,36],
                areaDataObj: {

                    name: "隐患整改情况",
                    areaName: "隐患整改情况",
                },
                config: {
                    name: ['麻柳制药厂','马克物料','零食批发城','麻柳服装厂','智飞通讯','盾安环境','麻柳制药厂','小商品批发','麻柳制药厂','零食批发城'],
                    value: Math.floor(Math.random() * 100),
                    lineDash: [1, 0],
                    borderWidth: 2,
                    borderGap: -1,
                    borderRadius: 2,
                    colors:['#01c4f9', '#c135ff'],
                    done: [20,40,30,25,27,47,20,33,88,36],
                    all: [100],
                    formatter: '',//{value}%
                },
            }
        },
        mounted() {
            this.sliderScroll();


        },
        methods: {
            sliderScroll() {
                let scroll = document.getElementsByClassName("scroll-box");
                let parent = document.getElementById('parent');
                let time = setInterval(function () {
                    // console.log(parent.scrollTop)
                    parent.scrollTop++;
                }, 100);
                scroll[0].addEventListener("mouseover", function () {
                    clearInterval(time);
                });
                scroll[0].addEventListener("mouseout", function () {
                    time = setInterval(function () {
                        parent.scrollTop++;
                    }, 100);
                })
            },
        },

    }
</script>

<style lang="scss" scoped>
    #leftLevel {
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
