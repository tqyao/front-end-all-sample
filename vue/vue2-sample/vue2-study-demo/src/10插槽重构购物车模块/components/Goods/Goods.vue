<template>
  <div class="goods-container">
    <!-- 左侧图片 -->
    <div class="thumb">
      <div class="custom-control custom-checkbox">
        <!-- 复选框 -->
        <input type="checkbox" class="custom-control-input" :id="'cb' + id" :checked="state" @change="changeState"/>
        <label class="custom-control-label" :for="'cb' + id">
          <!-- 商品的缩略图 -->
          <img :src="img" alt=""/>
        </label>
      </div>
    </div>
    <!-- 右侧信息区域 -->
    <div class="goods-info">
      <!-- 商品标题 -->
      <h6 class="goods-title">{{ title }}</h6>
      <div class="goods-info-bottom">
        <!-- 商品价格 -->
        <span class="goods-price">￥{{ price }}</span>
        <!-- 商品的数量 -->
        <!--        <Counter-->
        <!--            :id="id"-->
        <!--            :num="count"-->
        <!--            @change-num="changeNum"-->
        <!--        ></Counter>-->
        <slot name="default"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Counter from "@/10插槽重构购物车模块/components/Counter/Counter";

export default {
  props: {
    /*商品id*/
    id: {
      default: "",
      type: Number
    },
    /*商品名称*/
    title: {
      default: "商品名称商品名称商品名称商品名称",
      type: String
    },
    /*商品价格*/
    price: {
      default: 0,
      type: Number
    },
    /* 商品图片 src */
    img: {
      default: "",
      type: String
    },
    /*商品勾选状态*/
    state: {
      default: true,
      type: Boolean
    },
    // count: {
    //   default: 1,
    //   type: Number
    // }
  },
  methods: {
    /**
     * 勾选状态改变触发 change-state 事件通知父组件
     * @param event
     */
    changeState(event) {
      // console.log(event)
      this.$emit("change-state", {id: this.id, state: event.target.checked})
    },
    // /**
    //  * 监听商品数量发生改变时的处理函数
    //  * @param body
    //  */
    // changeNum(body){
    //   console.log(body)
    //   this.$emit("change-count",body)
    // }
  },
  components: {
    // Counter
  }

}
</script>

<style lang="less" scoped>
.goods-container {
  + .goods-container {
    border-top: 1px solid #efefef;
  }

  padding: 10px;
  display: flex;

  .thumb {
    display: flex;
    align-items: center;

    img {
      width: 100px;
      height: 100px;
      margin: 0 10px;
    }
  }

  .goods-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;

    .goods-title {
      font-weight: bold;
      font-size: 12px;
    }

    .goods-info-bottom {
      display: flex;
      justify-content: space-between;

      .goods-price {
        font-weight: bold;
        color: red;
        font-size: 13px;
      }
    }
  }
}
</style>
