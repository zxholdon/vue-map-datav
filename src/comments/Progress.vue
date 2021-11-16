<template>
  <div class="progress">
    <div
      class="bar"
      :style="{
        width: progress+'%',
      }"
    ></div>
  </div>
</template>

<script>
export default {
  name: "Progress",
  props: ["progress"],
};
</script>

<style lang="less" scoped>
.progress {
  padding: 3px 4px  3px 4px;
  background-color: rgba(10, 108, 176, 0.38);
  border: 1px solid #024e5e;
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;
}

.bar {
  height: 6px;
  border-radius: 4px;
  background-image: linear-gradient(90deg, #00a8ff 0%, #00fcff 100%);
  overflow: hidden;
  box-sizing: border-box;
}
.bar:hover {
  background: #00a8ff;
}
</style>
