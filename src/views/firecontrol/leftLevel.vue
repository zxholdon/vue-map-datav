<template>
    <div id="leftLevel">
        <div class="bg-color-black">

          <div  style="width: 100%;height: 10%" class="d-flex jc-center">

            <div  style="width: 100%;height: 40%; font-weight: bold;font-size: .2rem;" class="d-flex jc-center">
              <div class="d-flex jc-center" style="width: 100%;height: 100%;color: yellow" >
                故障
              </div>
              <div  style="width: 100%;height: 100%;color: red" class="d-flex jc-center">
                报警
              </div>
              <div  style="width: 100%;height: 100%;color: green" class="d-flex jc-center">
                正常
              </div>
            </div>


          </div>

          <div  style="width: 100%;height: 10%;font-weight: bold;font-size: .28rem;" class="d-flex jc-center">
            <div class="d-flex jc-center" style="width: 100%;height: 100%;color: yellow" >
              20
            </div>
            <div  style="width: 100%;height: 100%;color: red" class="d-flex jc-center">
              5
            </div>
            <div  style="width: 100%;height: 100%;color: green" class="d-flex jc-center">
              150
            </div>
          </div>

          <div  style="width: 100%;height: 60%" class="d-flex jc-center">

            <div  style="width: 100%;height: 100%" class="d-flex jc-center">
              <dv-water-level-pond :config="config1" style="width:1.6rem;height:2.5rem" />
            </div>
            <div  style="width: 100%;height: 100%" class="d-flex jc-center">
              <dv-water-level-pond :config="config2" style="width:1.5rem;height:2.5rem" />
            </div>
            <div  style="width: 100%;height: 100%" class="d-flex jc-center">
              <dv-water-level-pond :config="config3" style="width:1.5rem;height:2.5rem" />
            </div>

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
              config1:{
                data: [15],
                shape: 'round'
              },
              config2:{
                data: [5],
                shape: 'round'
              },
              config3:{
                data: [80],
                shape: 'round'
              }

            }
        },
      mounted() {

      },
      methods: {

      },

    }
</script>

<style lang="scss" scoped>
    #leftLevel {
        padding: 0.2rem;
        //height: 6.125rem;
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
