<template>
  <div class="layout">
    <Nav></Nav>
    <div>
      <router-view/>
    </div>
  </div>
</template>

<script>
import Nav from "../../comments/nav";
export default {
  name: "index",
  components: {
    Nav,
  },
};
</script>
<style lang="less" scoped>
@import "../../../src/assets/index.less";

</style>
