<template>
  <div id="app">
    <keep-alive>
    <router-view />
    </keep-alive>
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  width: 100%;
  height: 100%;

}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;


}
</style>
