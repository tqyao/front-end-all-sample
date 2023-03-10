<template>
  <div class="left-container">
    <h3>Left 组件</h3>
    <button @click="rightAdd">点击让right加2</button>
    <div>
      left count >>> {{ count }}
    </div>
    <hr>
  </div>
</template>

<script>
import eventBus from "@/04兄弟组件传值/components/eventBus";

export default {
  created() {
    eventBus.$on("addLeft", (val) => {
      console.log("Left 组件监听到 share 触发，val >> %d", val)
      this.count+=val
    })
  },
  data() {
    return {
      count: 0
    }
  },
  methods: {
    rightAdd() {
      console.log(111)
      eventBus.$emit("addRight", 2)
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
