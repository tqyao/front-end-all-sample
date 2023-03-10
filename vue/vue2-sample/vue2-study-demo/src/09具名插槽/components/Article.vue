<template>
  <div id="article-container">
    <div class="header-container">
      <slot name="header">默认展示header</slot>
    </div>
    <div class="main-container">
      <slot name="main">默认展示main</slot>
    </div>
    <div class="footer-container">
      <slot name="footer">默认展示footer</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Article"
}
</script>

<style scoped lang="less">
#article-container {
  > div {
    min-height: 120px;
  }
  .header-container{
    background-color: pink;
  }
  .main-container{
    background-color: green;
  }
  .footer-container{
    background-color: gray;
  }

}
</style>