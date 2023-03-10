<template>
  <div class="app-container">
    <h1>App 根组件</h1>
    <hr/>
    <button @click="comName='Left'">切换Left</button>
    <button @click="comName='Right'">切换Right</button>
    <div class="box">
      <!--   动态组件默认用法   -->
      <!--      <component is="Left"></component>-->

      <!--
          一、component ：
           1. component 创建动态组件，相当于组件占位符
           2. is 可以绑定渲染何种组件
           3. is 绑定必须是已经注册的组件名称
           -->
      <!--      <component :is="comName"></component>-->

      <!--
              二、keep-alive
              1. 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。
              2. include 指定哪些被包裹的组件可以被缓存，逗号分隔
              3. exclude 指定哪些被包裹组件排除缓存，逗号分隔
              4. 当组件在 <keep-alive> 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。
            -->

      <!--      <keep-alive>-->
      <!--      <keep-alive include="Left,Right">-->
      <!--            <keep-alive include="Left">-->
      <!--      <keep-alive exclude="Left,Right">-->
      <!--      <keep-alive exclude="MyLeft,MyRight">-->
      <keep-alive include="MyLeft,MyRight">
        <component :is="comName"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Left from "@/08动态组件/components/Left"
import Right from "@/08动态组件/components/Right"

export default {
  /*
  三、声明组件并命名 与 注册组件名称 区别
    1. 组件的“注册名称”，的主要应用场景是：以标签的形式，把注册好的组件，渲染和使用到页面结构之中
    2. 组件声明时候的“name”名称的主要应用场景：结合<keep-alive>标签实现组件缓存功能；以及在调试工具中看到组件的name名称
  */
  name: "App",
  data() {
    return {
      comName: "Left"
    }
  },
  components: {
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
