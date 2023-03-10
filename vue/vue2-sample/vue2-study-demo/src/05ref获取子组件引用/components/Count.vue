<template>
  <div>
    <p>count组件：{{ count }}</p>
    <div>
      <button @click="countAdd">点击count +1</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Count",
  data() {
    return {
      count: 0
    }
  },
  methods: {
    countAdd() {
      this.count++;
    }
  }
}
</script>

<style scoped>

</style>