<template>
  <div class="app-container">
    <Header></Header>
    <Goods v-for="item in cartList"
           :key="item.id"
           :id="item.id"
           :title="item.goods_name"
           :img="item.goods_img"
           :price="item.goods_price"
           :state="item.goods_state"
           :count="item.goods_count"
           @change-state="changeState"
           @change-count="changeCount"
    ></Goods>
    <Footer
        :count="count"
        :amount="totalAmount"
        :select="checkAllChoose"
        @change-full-state="changeFullState"
    ></Footer>
  </div>
</template>

<script>
import Header from "@/07购物车案例02/components/Header/Header"
import Footer from "@/07购物车案例02/components/Footer/Footer"
import Goods from "@/07购物车案例02/components/Goods/Goods"
import axios from "axios";

export default {
  data() {
    return {
      /*
goods_count:1
goods_img:"https://www.escook.cn/vuebase/pics/1.png"
goods_name:"班俏BANQIAO超火ins潮卫衣女士2020秋季新款韩版宽松慵懒风薄款外套带帽上衣"
goods_price:108
goods_state:true
id:1*/
      cartList: []
    }
  },
  components: {
    Header,
    Footer,
    Goods
  },
  methods: {

    /**
     * 监听 Footer 组件出发时间，改变全选状态
     * @param fullState
     */
    changeFullState(fullState) {
      this.cartList.forEach(item => {
        item.goods_state = fullState
      })
    },
    /**
     * 从服务端获取购物车商品列表
     * @returns {Promise<void>}
     */
    async initCart() {
      const {data: res} = await axios.get("http://127.0.0.1:4523/m1/2133760-0-default/api/cart");
      console.log(res)
      this.cartList = res;
    },
    /**
     * 监听 Goods 组件触发的 change-state 事件调用此处理函数，更新购物车商品列表状态
     * @param bodyParam
     */
    changeState(bodyParam = {id: 0, state: false}) {
      // console.log(bodyParam.id, bodyParam.state)
      const {id, state} = bodyParam
      console.log(id, state)
      this.cartList.filter(item => item.id === id)[0].goods_state = state
    },
    changeCount(body = {id: 0, num: 1}) {
      const {id, num} = body
      this.cartList.filter(item => item.id === id)[0].goods_count = num
    }
  },
  created() {
    this.initCart()
    // this.changeState({id:1,state:true})
  },
  computed: {
    /**
     * 检查全选状态
     * @returns {this is *[]}
     */
    checkAllChoose() {
      return this.cartList.every(item => item.goods_state)
    },

    /**
     * 计算勾选商品总金额
     * @returns {*}
     */
    totalAmount() {
      return this.cartList.filter(item => item.goods_state).reduce((previous, current) => {
        return previous + current.goods_count * current.goods_price
      }, 0)
    },
    /**
     * 计算勾选商品数量
     * @returns {*}
     */
    count() {
      return this.cartList.filter(item => item.goods_state).reduce((previous, current) => {
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
