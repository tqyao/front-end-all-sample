<template>
  <div class="left-container">
    <h3>Left 组件</h3>
    <button @click="addFruit">点击添加水果</button>
    <hr>
  </div>
</template>

<script>
export default {
  methods: {
    addFruit(){
      console.log("addFruit...")
      this.$emit('add-fruit','grape')
    }
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
