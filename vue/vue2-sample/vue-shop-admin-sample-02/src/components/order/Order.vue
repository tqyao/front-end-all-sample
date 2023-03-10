<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--    卡片容器区域-->
    <el-card>
      <el-row>
        <el-col :span="6">
          <!-- 搜索框          -->
          <el-input placeholder="请输入内容" v-model="queryParam.query" class="input-with-select">
            <el-button @click="getOrderList" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!-- 订单表格区域      -->
      <el-table
        :data="orderList"
        style="width: 100%"
        border
        stripe
      >
        <el-table-column
          type="index"
          label="#"></el-table-column>
        <el-table-column
          prop="order_number"
          label="订单编号"></el-table-column>
        <el-table-column
          prop="order_price"
          label="订单价格"></el-table-column>
        <el-table-column
          label="是否付款">
          <template v-slot="{row}">
            <el-tag
              v-if="row.order_pay === '0'"
              type="danger"
              size="mini">未付款
            </el-tag>
            <el-tag
              type="success"
              size="mini"
              v-else>已付款
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="is_send"
          label="是否发货"></el-table-column>
        <el-table-column
          label="下单时间">
          <template v-slot:="{row}">
            {{ row.create_time | dataFormat }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template v-slot:="{row}">
            <el-button @click="openEditOrderDialog" size="mini" type="primary" icon="el-icon-edit"></el-button>
            <el-button @click="openOrderProgressDialog" size="mini" type="success" icon="el-icon-location"></el-button>
          </template>
        </el-table-column>
      </el-table>


      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParam.pagenum"
        :page-sizes="[1, 5, 10, 30]"
        :page-size="queryParam.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>

    </el-card>

    <el-dialog
      title="修改地址"
      :visible.sync="editOrderDialogVisible"
      width="50%"
      @close="editOrderDialogClosed">
      <el-form :rules="editOrderFormRules" ref="editOrderFormRef" :model="editOrderForm" label-width="120px">
        <el-form-item label="省市区/县" prop="province">
          <el-cascader
            v-model="selectedpProvinces"
            :options="citydata"
            :props="{ expandTrigger: 'hover',}"
            @change="handleChangeOfProvinces"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="addrDetail">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editOrderDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editAddrDetail">确 定</el-button>
  </span>
    </el-dialog>


    <el-dialog
      title="查看物流进度"
      :visible.sync="orderStepDialogVisible"
      width="50%">
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in orderProgressList"
          :key="index"
          :timestamp="activity.time">
          {{ activity.context }}
        </el-timeline-item>
      </el-timeline>
      <span slot="footer" class="dialog-footer">
    <el-button @click="orderStepDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="orderStepDialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import citydata from '@/components/order/citydata'

export default {
  name: "Order",
  data() {
    return {
      queryParam: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      orderList: [],
      editOrderDialogVisible: false,
      editOrderForm: {
        province: '',
        addrDetail: ''
      },
      editOrderFormRules: {
        province: [
          {required: true, message: '请选择省市区/县', trigger: 'blur'}
        ],
        addrDetail: [
          {required: true, message: '请填写详细地址', trigger: 'blur'}
        ]
      },
      citydata,
      selectedpProvinces: [],
      provincesProps: {
        expandTrigger: 'hover',
      },
      total: 0,
      orderStepDialogVisible: false,
      orderId: '',
      orderProgressList: []
    }
  },
  methods: {
    async getOrderList() {
      const res = await this.$http.get('orders', {
        params: this.queryParam
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取订单列表失败')
      }
      // console.log(res);
      this.orderList = res.data.goods
      this.total = res.data.total
    },
    handleChangeOfProvinces() {
      // console.log('handleChangeOfProvinces >> ' + this.selectedpProvinces)
    },
    openEditOrderDialog() {
      this.editOrderDialogVisible = true
    },
    editOrderDialogClosed() {
      this.$refs.editOrderFormRef.resetFields()
    },
    editAddrDetail() {
      this.$refs.editOrderFormRef.validate(valid => {
        if (!valid) return
        this.editOrderDialogVisible = false;
      })
    },
    handleSizeChange(newSize) {
      this.queryParam.pagesize = newSize
      this.getOrderList()
    },
    handleCurrentChange(newCurrent) {
      this.queryParam.pagenum = newCurrent
      this.getOrderList()
    },
    async getOrderProgress() {
      // const res = await this.$http.get(`/kuaidi/${this.orderId}`)
      // if (res.meta.status !== 200) {
      //   return this.$message.error('查询物流记录失败')
      // }
      // this.orderProgressList = res.data
      // console.log(res)
      this.orderProgressList = [{
        "time": "2018-05-10 09:39:00",
        "ftime": "2018-05-10 09:39:00",
        "context": "已签收,感谢使用顺丰,期待再次为您服务",
        "location": ""
      },
        {
          "time": "2018-05-10 08:23:00",
          "ftime": "2018-05-10 08:23:00",
          "context": "[北京市]北京海淀育新小区营业点派件员 顺丰速运 95338正在为您派件",
          "location": ""
        },
        {
          "time": "2018-05-10 07:32:00",
          "ftime": "2018-05-10 07:32:00",
          "context": "快件到达 [北京海淀育新小区营业点]",
          "location": ""
        },
        {
          "time": "2018-05-10 02:03:00",
          "ftime": "2018-05-10 02:03:00",
          "context": "快件在[北京顺义集散中心]已装车,准备发往 [北京海淀育新小区营业点]",
          "location": ""
        },
        {
          "time": "2018-05-09 23:05:00",
          "ftime": "2018-05-09 23:05:00",
          "context": "快件到达 [北京顺义集散中心]",
          "location": ""
        },
        {
          "time": "2018-05-09 21:21:00",
          "ftime": "2018-05-09 21:21:00",
          "context": "快件在[北京宝胜营业点]已装车,准备发往 [北京顺义集散中心]",
          "location": ""
        },
        {
          "time": "2018-05-09 13:07:00",
          "ftime": "2018-05-09 13:07:00",
          "context": "顺丰速运 已收取快件",
          "location": ""
        },
        {
          "time": "2018-05-09 12:25:03",
          "ftime": "2018-05-09 12:25:03",
          "context": "卖家发货",
          "location": ""
        },
        {
          "time": "2018-05-09 12:22:24",
          "ftime": "2018-05-09 12:22:24",
          "context": "您的订单将由HLA（北京海淀区清河中街店）门店安排发货。",
          "location": ""
        },
        {
          "time": "2018-05-08 21:36:04",
          "ftime": "2018-05-08 21:36:04",
          "context": "商品已经下单",
          "location": ""
        }]

    },

    openOrderProgressDialog(row) {
      //供测试的物流单号：1106975712662
      this.orderId = '1106975712662'
      this.getOrderProgress()
      this.orderStepDialogVisible = true

    }
  },
  created() {
    this.getOrderList()
  }
}
</script>

<style scoped>
.el-cascader {
  width: 100%;
}
</style>
