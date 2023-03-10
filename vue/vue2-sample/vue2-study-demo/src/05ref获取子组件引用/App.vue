<template>
  <div class="app-container">
    <h1>App 根组件</h1>
    <button @click="resetLeftCount">点击重置count</button>
    <button @click="printThis">点击打印this</button>
    <hr/>

    <div class="box">
      <!-- 渲染 Left 组件和 Right 组件 -->
      <Left ref="leftRef"></Left>
    </div>
  </div>
</template>

<script>
import Left from '@/05ref获取子组件引用/components/Left'

export default {
  components: {
    Left,
  },
  methods:{
    resetLeftCount(){
      this.$refs.leftRef.resetCount()
    },
    printThis(){
      console.log(this)
    }
  }
}
</script>

<style lang="less">
.app-container {
  padding: 1px 20px 20px;
  background-color: #efefef;
}

.box {
  display: flex;
}
</style>
