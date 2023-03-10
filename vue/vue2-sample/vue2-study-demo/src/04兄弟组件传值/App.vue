<template>
  <div class="app-container">
    <h1>App 根组件</h1>
    <hr />

    <div class="box">
      <!-- 渲染 Left 组件和 Right 组件 -->
      <Left></Left>
      <Right></Right>
    </div>
  </div>
</template>

<script>
import Left from '@/04兄弟组件传值/components/Left'
import Right from '@/04兄弟组件传值/components/Right'
export default {
  components:{
    Left,
    Right
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
