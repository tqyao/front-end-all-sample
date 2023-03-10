<template>
  <div class="number-container d-flex justify-content-center align-items-center">
    <!-- 减 1 的按钮 -->
    <button type="button" @click="sub" class="btn btn-light btn-sm">-</button>
    <!-- 购买的数量 -->
    <span class="number-box">{{ num }}</span>
    <!-- 加 1 的按钮 -->
    <button type="button" @click="add" class="btn btn-light btn-sm">+</button>
  </div>
</template>

<script>
import bus from "@/07购物车案例/components/eventBus.js"

export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    num: {
      default: 1,
      type: Number
    }
  },

  methods: {
    add() {
      bus.$emit("share", this.id,this.num+1)
    },
    sub() {
      if (this.num !== 1) {
        bus.$emit("share",  this.id,this.num-1)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.number-box {
  min-width: 30px;
  text-align: center;
  margin: 0 5px;
  font-size: 12px;
}

.btn-sm {
  width: 30px;
}
</style>
