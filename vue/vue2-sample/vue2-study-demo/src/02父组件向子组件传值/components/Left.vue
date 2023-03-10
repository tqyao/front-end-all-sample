<template>
  <div class="left-container">
    <h3>Left 组件</h3>
    strData>>>{{ strData }}
    <hr>
    boolData>>>{{ boolData }}
    <hr>
    objData>>>{{ objData }}
    <hr>
    <button @click="updateProA">点击修改proA</button>
    propA>>>{{ propA }} typeof proA >>> {{typeof propA}}
    <hr>
  </div>
</template>

<script>
export default {
  props: {
    //必填项
    strData: {
      required: true,
      type: String,
    },
    //必填项
    boolData: {
      required: true,
      type: Boolean,
      /* 即使有默认值，设置required后也必须从父组件传值*/
      default: false
    },
    objData: {
      type: Object,
    },
    // 多个可能的类型
    propA: [Number, String]
  },
  methods:{
    updateProA(){
      console.log(this.propA)
      // 禁止直接修改父组传递过来的参数
      // this.propA++
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
