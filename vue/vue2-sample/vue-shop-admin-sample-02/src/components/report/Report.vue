<template>
  <div>
    <!-- 面包屑导航 商品列表    -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
      <div id="main" style="width: 800px;height:400px;"></div>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
import _ from 'lodash'

export default {
  name: "Report",
  data() {
    return {
      reportOptions: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  methods: {
    async getReportData() {

    }
  },
  async mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));

    const res = await this.$http.get('reports/type/1')
    if (res.meta.status !== 200) {
      return this.$message.error('获取报表失败')
    }
    const result = _.merge(res.data,this.reportOptions)
    // this.getReportData()
    // 指定图表的配置项和数据
    // var option = {
    //   title: {
    //     text: 'ECharts 入门示例'
    //   },
    //   tooltip: {},
    //   legend: {
    //     data: ['销量']
    //   },
    //   xAxis: {
    //     data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    //   },
    //   yAxis: {},
    //   series: [
    //     {
    //       name: '销量',
    //       type: 'bar',
    //       data: [5, 20, 36, 10, 10, 20]
    //     }
    //   ]
    // };
    // 使用刚指定的配置项和数据显示图表。
    // myChart.setOption(option);
    myChart.setOption(result);
  }
  // async mounted() {
  //   // 3.基于准备好的dom，初始化echarts实例
  //   var myChart = echarts.init(document.getElementById('main'))
  //   const res = await this.$http.get('reports/type/1')
  //   if (res.meta.status !== 200) return this.$message('获取折线图数据失败!')
  //   // 4.准备数据项和配置项
  //   // 指定图表的配置项和数据
  //   // var option = {
  //   //   title: {
  //   //     text: 'ECharts 入门示例'
  //   //   },
  //   //   tooltip: {},
  //   //   legend: {
  //   //     data: ['销量']
  //   //   },
  //   //   xAxis: {
  //   //     data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  //   //   },
  //   //   yAxis: {},
  //   //   series: [{
  //   //     name: '销量',
  //   //     type: 'bar',
  //   //     data: [5, 20, 36, 10, 10, 20]
  //   //   }]
  //   // }
  //   // 数据合并
  //   const result = _.merge(res.data, this.options)
  //   // 5.展示数据
  //   myChart.setOption(result)
  // }
}
</script>

<style scoped>

</style>
