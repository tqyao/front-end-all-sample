<template>
  <div class="left-container">
    <h3>Left 组件</h3>
    <div>
      count >>> {{count}}
      <button @click="countAdd">点击count +1</button>
      <button @click="resetCount">点击重置</button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      count: 1
    }
  },
  methods: {
    countAdd() {
      this.count++;
    },
    resetCount(){
      this.count = 0;
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
