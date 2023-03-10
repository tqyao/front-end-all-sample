<template>
  <div class="right-container">
    <h3>Right 组件</h3>
    <button @click="addLeft">点击让left加1</button>
    <div>
      right count >>> {{ count }}
    </div>
    <hr>
  </div>
</template>

<script>
import eventBus from "@/04兄弟组件传值/components/eventBus";

export default {
  methods:{
    addLeft(){
      eventBus.$emit('addLeft',1);
    }
  },
  data() {
    return {
      count: 0
    }
  },
  created() {
    eventBus.$on("addRight", (val) => {
      console.log("Right 组件监听到 share 触发，val >> %d", val)
      this.count+=val
    })
  }
}
</script>

<style lang="less">
.right-container {
  padding: 0 20px 20px;
  background-color: lightskyblue;
  min-height: 250px;
  flex: 1;
}
</style>
