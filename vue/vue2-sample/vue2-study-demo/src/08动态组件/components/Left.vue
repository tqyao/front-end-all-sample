<template>
  <div class="left-container">
    <h3>Left 组件</h3>
    count:{{ count }}
    <button @click="count++">+1</button>
  </div>
</template>

<script>
export default {
  // name: "Left",
  name: "MyLeft",
  data() {
    return {
      count: 0
    }
  },
  created() {
    console.log("Left created...")
  },
  activated() {
    console.log("Left activated...组件被激活")
  },
  deactivated() {
    console.log("Left deactivated...组件被缓存")
  },
  destroyed() {
    console.log("Left destroyed...")
  }

}
</script>

<style lang="less">
.left-container {
  padding: 0 20px 20px;
  background-color: orange;
  min-height: 250px;
  flex: 1;
}
</style>
