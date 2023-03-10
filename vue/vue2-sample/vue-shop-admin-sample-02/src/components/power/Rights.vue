<template>
  <div>
    <!-- 面包屑导航 首页用户管理用户列表    -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 权限卡片区域    -->
    <el-card>
      <el-table
        :data="rightList"
        stripe
        border>
        <el-table-column
          type="index"
          label="#">
        </el-table-column>
        <el-table-column
          prop="id"
          label="id">
        </el-table-column>
        <el-table-column
          prop="authName"
          label="权限名称">
        </el-table-column>
        <el-table-column
          prop="path"
          label="路径">
        </el-table-column>
        <el-table-column
          label="权限等级">
          <template v-slot:="slotProps">
            <el-tag v-if="slotProps.row.level==='0'">一级</el-tag>
            <el-tag v-else-if="slotProps.row.level==='1'" type="success">二级</el-tag>
            <el-tag v-else type="danger">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Rights",
  data() {
    return {
      rightList: []
    }
  },
  methods: {
    async getRightList() {
      const res = await this.$http.get('rights/list')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.rightList = res.data
      // console.log(this.rightList);
    }
  },
  created() {
    this.getRightList()
  }
}
</script>

<style scoped>

</style>
