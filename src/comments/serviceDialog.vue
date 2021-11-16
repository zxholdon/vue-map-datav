<template>
  <div>
    <el-dialog :append-to-body="true"
               title="传感器"
      :visible.sync="visible"
      @close="$emit('update:show', false)"
      :show="show">


      <span>这是一段信息</span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: this.show
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show () {
      this.visible = this.show;
    }
  }
};
</script>
