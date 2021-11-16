<template>


<div style="width: 100%;height: 100%">

  <img @click="dialogVisible = true" :src="imgurl" style="height: 100%;width: 100%">
  <el-dialog class="custonStyle " :visible.sync="dialogVisible" :append-to-body="true" width="30%" style=" text-align: center;" >
    <!-- <repassword></repassword> -->


    <img :src="imgurl" style="height: 100%;width: 100%">


  </el-dialog>
</div>



</template>

<script>
    import {get} from "../../utils/request";

    export default {
        sl:[],
        name: "leftLevel",
        props: {

        },
        watch:{

        },
        data() {
            return {
              dialogVisible: false,
              imgurl:''

            }
        },
        mounted() {
        this.getdata()


        },
        methods: {
          getdata(){
            let url = '/bigdata/emergencyimg'
            get(url).then(res=>{
              this.imgurl = 'http://127.0.0.1:8000'+res
            })
          }

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
