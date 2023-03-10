<template>
  <div class="app-container">
    <h1>App 根组件</h1>
    <hr/>
    <div>
      <button v-if="!inpVisible" @click="toggleDisplay">点击显示输入框</button>
      <input type="text" v-else ref="inpRef" @blur="inpVisible=!inpVisible">
    </div>

    <div class="box">
      <!-- 渲染 Left 组件和 Right 组件 -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inpVisible: false
    }
  },
  updated() {
    // 如果 nextTick 中的回调放到这里会报错，因为失去焦点的时候数据改变了，再次调用时页面不存在 inpRef
    // this.$refs.inpRef.focus()
  },
  methods:{
    toggleDisplay(){
      this.inpVisible = !this.inpVisible;
      // 等待页面重新渲染完毕时调用回调函数
      this.$nextTick(()=>{
        this.$refs.inpRef.focus()
      })
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
