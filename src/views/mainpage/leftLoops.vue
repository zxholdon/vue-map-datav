<template>
  <div>
  <div class="cont-head">
    <div class="cont-head-col">
      <div class="ico-lt"></div>
      <div>序号</div>
      <div>企业名称</div>
      <div>自查状态</div>
    </div>
  </div>
  <div class="cont-body">
    <div class="cont-item" v-for="(item,index) in entData" :key="'ent_'+index">
      <div class="cont-item-col">
        <div class="ico-lt"></div>
        <div class="seq">
          {{ item.seq }}
        </div>
        <div class="name">{{ item.name }}</div>
        <div :class="`${item.status === 1?'yes':'no'}`">
          {{ item.status === 1 ? '已自查' : '未自查' }}
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import {get} from '../../utils/request'
    export default {
        data() {
            return {
              entData: [],

            };
        },
        mounted() {

          this.setData();
        },


        methods: {
            setData() {

              let url = '/bigdata/selfcheck'
              get(url).then(res=>{
                  console.info(res)
                  console.info(res.clist)
                  this.entData = res.clist

              }).catch(error=>{
                console.info(error)
              })
            },

            onCountyRowClick(row){
                console.log(row);
            }
        }
    };
</script>

<style lang="scss" scoped>
    ::v-deep#leftLoops {
        padding: 0.2rem;
        height: 5rem;
        border-radius: 0.0625rem;

        .bg-color-black {
            height: 4.2rem;
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
