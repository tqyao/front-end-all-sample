<template>
  <div class="app-container">
    <h1>App 根组件</h1>
    <hr/>

<!--    <Article>-->
<!--      <template v-slot:header>-->
<!--        <h2>this is title</h2>-->
<!--      </template>-->
<!--      <template v-slot:main>-->
<!--        <p>窗前明月光</p>-->
<!--        <p>疑是地上霜</p>-->
<!--        <p>举头望明月</p>-->
<!--        <p>低头思故乡</p>-->
<!--      </template>-->
<!--      <template v-slot:footer>-->
<!--        <p>this is page end</p>-->
<!--      </template>-->
<!--    </Article>-->

<!-- 等价    -->

<!-- v-slot 简写  #  -->
    <Article>
      <template #header>
        <h2>this is title</h2>
      </template>
      <template #main>
        <p>窗前明月光</p>
        <p>疑是地上霜</p>
        <p>举头望明月</p>
        <p>低头思故乡</p>
      </template>
      <template #footer>
        <p>this is page end</p>
      </template>
    </Article>

    <div class="box">
      <!-- 渲染 Left 组件和 Right 组件 -->
    </div>
  </div>
</template>

<script>
import Article from "@/09具名插槽/components/Article"

export default {
  components: {
    Article
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
