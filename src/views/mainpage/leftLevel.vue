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
                        <span class="fs-xl text mx-2">隐患整改情况</span>
                    </template>
                    <dv-decoration-1 style="width:1.25rem;height:.25rem; position:relative;top:-.0375rem;"/>
                </div>
            </div>
            <div id="parent" style="height:4.28rem;overflow: scroll;">
                <div class="scroll-box">
                    <template v-for="(item,index) in te">
                        <div style="padding:.1rem;" :key="index">
                            <div style="margin-bottom: .05rem;">{{item.name}}</div>
                            <div class="d-flex">
                                <dv-percent-pond :config="item.config" style="flex-grow:1;height:.15rem;font-size:.1rem;"/>
                                <div style="margin-left: .1rem;">{{item.done + '/' + item.all}}</div>
                            </div>
                        </div>
                    </template>

                </div>
            </div>

        </div>
    </div>
</template>

<script>
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
                    name: "隐患整改情况",
                    areaName: "隐患整改情况",
                },
              te:[],

            }
        },
        mounted() {
          this.tes()
          this.sliderScroll();
        },
        methods: {
          tes(){
            let url = '/bigdata/hiddenlsit'
            get(url).then(res=>{
              this.te = res
            }).catch( error=>{
                console.info(error)
            }
            )
          },
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
