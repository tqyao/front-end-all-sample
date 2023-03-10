<template>
  <div>
    <!-- 面包屑导航 商品列表    -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--    商品列表卡片区域-->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <!-- 搜索框          -->
          <el-input @clear="getGoodsList" v-model="queryParam.query" placeholder="请输入内容" clearable>
            <el-button @click="getGoodsList" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <!-- 添加商品          -->
          <el-button type="primary" @click="routerToAddPage">添加商品</el-button>
        </el-col>
      </el-row>

      <!-- 渲染商品列表表格区域      -->
      <el-table :data="goodsList" border stripe>
        <el-table-column
          type="index"
          label="#">
        </el-table-column>
        <el-table-column
          width="480"
          label="商品名称"
          prop="goods_name">
        </el-table-column>
        <el-table-column
          label="商品价格（元）"
          prop="goods_price">
        </el-table-column>
        <el-table-column
          label="商品重量"
          prop="goods_weight">
        </el-table-column>
        <el-table-column
          label="商品数量"
          prop="goods_number">
        </el-table-column>
        <el-table-column
          label="创建时间">
          <template v-slot:="{row}">
            {{ row.add_time | dataFormat }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template v-slot:="{row}">
            <el-tooltip :enterable="false" effect="dark" content="编辑" placement="top">
              <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
            </el-tooltip>
            <el-tooltip :enterable="false" effect="dark" content="删除" placement="top">
              <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件      -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParam.pagenum"
        :page-sizes="[1, 3, 5, 10]"
        :page-size="queryParam.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      // 商品查询参数
      queryParam: {
        query: '',
        pagenum: 1,
        pagesize: 5,
      },
      total:0,
      // 商品列表
      goodsList: []
    }
  },
  methods: {
    /**
     * 获取商品列表
     */
    async getGoodsList() {
      const res = await this.$http.get('goods', {params: this.queryParam})
      if (res.meta.status !== 200) {
        return this.$message.error('查询商品列表失败' + res.meta.msg)
      }
      console.log(res);
      this.goodsList = res.data.goods
      this.total = res.data.total
    },
    handleSizeChange(val) {
      this.queryParam.pagesize = val
      this.getGoodsList()
    },
    handleCurrentChange(val) {
      this.queryParam.pagenum = val
      this.getGoodsList()
    },
    /**
     * 点击添加商品按钮回调
     */
    routerToAddPage(){
      this.$router.push('/goods/add')
    }
  },
  // filters: {
  //   // 时间格式化
  //   dataFormat(timestamp) {
  //     let datetime = parseInt(timestamp)
  //     if (isNaN(datetime)) {
  //       return timestamp
  //     }
  //     datetime = new Date(datetime)
  //     let yy, mm, dd, h, m, s
  //     yy = datetime.getFullYear()
  //     mm = datetime.getMonth() + 1
  //     mm = mm < 10 ? '0' + mm : mm
  //     dd = datetime.getDate()
  //     dd = dd < 10 ? '0' + dd : dd
  //     h = datetime.getHours()
  //     h = h < 10 ? '0' + h : h
  //     m = datetime.getMinutes()
  //     m = m < 10 ? '0' + m : m
  //     s = datetime.getSeconds()
  //     s = s < 10 ? '0' + s : s
  //     return yy + '-' + mm + '-' + dd + ' ' + h + ':' + m + ':' + s
  //   }
  // },
  created() {
    this.getGoodsList()
  }
}
</script>

<style scoped>

</style>
