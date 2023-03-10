<template>
  <div class="app-container">
    <Header title="购物车"></Header>
    <Goods v-for="item in buyCart"
           :key="item.id"
           :id="item.id"
           :title="item.goods_name"
           :img="item.goods_img"
           :price="item.goods_price"
           :chose="item.goods_state"
           :count="item.goods_count"
           @change-select="changeSelect"
    ></Goods>
    <Footer :amount="totalAmount"
            :all-choose="allChoose"
            :total-goods="totalGoods"
            @change-all-select="changeAllSelect"
    ></Footer>
  </div>
</template>

<script>
import Header from "@/07购物车案例/components/Header/Header.vue"
import Footer from "@/07购物车案例/components/Footer/Footer.vue"
import Goods from "@/07购物车案例/components/Goods/Goods.vue"
import bus from "@/07购物车案例/components/eventBus"


import axios from "axios";

export default {
  components: {
    Header,
    Footer,
    Goods
  },
  data() {
    return {
      buyCart: [],
      allChoose: false
    }
  },
  methods: {
    async initCart() {
      const {data: res} = await axios.get('http://127.0.0.1:4523/m1/2133760-0-default/api/cart');
      console.log(res)
      this.buyCart = res;
    },
    /**
     * 判断是否全选
     */
    judgeAllChoose() {
      this.allChoose = this.buyCart.every(item => item.goods_state);
    },
    /**
     * 子组件勾选状态发生变化，当前组件（父组件）监听到变化，调用当前处理函数更改data中的数据
     * @param checked
     * @param id
     */
    changeSelect(checked, id) {
      this.buyCart.some(item => {
        if (item.id === id) {
          item.goods_state = checked;
          return true
        }
      })
      // 检查是否勾选全选按钮
      this.judgeAllChoose()
    },
    /**
     * 全选与反全选
     * @param checked
     */
    changeAllSelect(checked) {
      // console.log("changeAllSelect")
      this.buyCart.forEach(item => item.goods_state = checked)
    }
  },
  created() {
    this.initCart()
    // 初次判断是否全选
    this.judgeAllChoose()
    bus.$on("share", (id, count) => {
      this.buyCart.filter(item => item.id === id)[0].goods_count = count
    })
  },
  computed: {
    totalAmount() {
      return this.buyCart.filter(item => item.goods_state).reduce((previous, current) => {
        return previous + current.goods_count * current.goods_price
      }, 0)
    },
    totalGoods() {
      return this.buyCart.filter(item => item.goods_state).reduce((previous, current) => {
        return previous + current.goods_count
      }, 0)
    }
  }
}
</script>

<style lang="less" scoped>
.app-container {
  padding-top: 45px;
  padding-bottom: 50px;
}
</style>
