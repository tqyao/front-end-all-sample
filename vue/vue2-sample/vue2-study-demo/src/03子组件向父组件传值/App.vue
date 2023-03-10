<template>
  <div class="app-container">
    <h1>App 根组件</h1>
    <ul>
      <li v-for="item in fruits" :key="item.id">{{ item.name }}</li>
    </ul>
    <hr/>
    <div class="box">
      <!-- 渲染 Left 组件和 Right 组件 -->
      <Left @add-fruit="add($event)"></Left>
    </div>
  </div>
</template>

<script>
import Left from '@/03子组件向父组件传值/components/Left'

export default {

  /*
  子组件向父组件传值
  1. 子组件通过 vm.$emit('触发事件名称','参数') 向父组件传值，多个参数必须用数组
  2. 父组件通过 @事件名称 来监听子组件触发的事件
  3. 父组件通过 $event 接受子组件传递参数
   */
  methods: {
    add(val) {
      this.fruits.push({id: this.fruits.length + 1, name: val})
    }
  },
  data() {
    return {
      fruits: [
        {id: 1, name: 'apple'},
        {id: 2, name: 'banana'},
        {id: 3, name: 'orange'},
      ]
    }
  },
  components: {
    Left
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
