<template>
  <div class="goods-container">
    <!-- 左侧图片 -->
    <div class="thumb">
      <div class="custom-control custom-checkbox">
        <!-- 复选框 -->
        <input type="checkbox" class="custom-control-input" :id="id" @change="changeSelect" :checked="chose"/>
        <label class="custom-control-label" :for="id">
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
        <Counter :id="id" :num="count"></Counter>
      </div>
    </div>
  </div>
</template>

<script>
import Counter from "@/07购物车案例/components/Counter/Counter"

export default {
  components: {
    Counter
  },
  props: {
    id: {
      type: Number
    },
    count: {
      default: 1,
      type: Number
    },
    title: {
      default: "商品名称",
      type: String
    },
    price: {
      default: 0,
      type: Number
    },
    img: {
      default: "",
      type: String
    },
    chose: {
      default: true,
      type: Boolean
    }
  },
  methods: {
    changeSelect(event) {
      // console.log(event.target)
      this.$emit("change-select", event.target.checked, this.id)
    }
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
