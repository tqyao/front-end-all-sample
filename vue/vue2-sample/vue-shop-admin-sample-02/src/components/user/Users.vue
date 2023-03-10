<template>
  <div>
    <!-- 面包屑导航 首页用户管理用户列表    -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图    -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <!-- 搜索框          -->
          <el-input @clear="initUserList" v-model="queryParam.query" placeholder="请输入内容">
            <el-button @click="initUserList" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <!-- 添加用户按钮          -->
          <el-button @click="addDialogVisible = true" type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表      -->
      <el-table
        :data="userList"
        stripe
        border
        style="width: 100%">
        <el-table-column
          type="index"
          label="#">
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="200">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话"
          width="200">
        </el-table-column>
        <el-table-column
          prop="role_name"
          label="角色"
          width="200">
        </el-table-column>
        <!--        <el-table-column-->
        <!--          label="状态"-->
        <!--          width="180">-->
        <!--          <template slot-scope="{row}">-->
        <!--            <el-switch-->
        <!--              @change="changeState(row.id,row.mg_state)"-->
        <!--              v-model="row.mg_state"-->
        <!--              active-color="#13ce66"-->
        <!--              inactive-color="#ff4949">-->
        <!--            </el-switch>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <el-table-column
          label="状态"
          width="180">
          <template slot-scope="{row}">
            <el-switch
              @change="changeState(row)"
              v-model="row.mg_state"
              active-color="#5a9cf8"
              inactive-color="#dddfe5">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="{row}">
            <el-button @click="getUserById(row.id)" size="mini" type="primary" icon="el-icon-edit"
                       circle></el-button>
            <el-button @click="delUserById(row.id)" size="mini" type="danger" icon="el-icon-delete" circle></el-button>
            <el-tooltip :enterable="false" effect="dark" content="角色分配" placement="top">
              <el-button size="mini" type="warning" icon="el-icon-bangzhu" circle></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 用户列表分页      -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParam.pagenum"
        :page-sizes="[1, 5, 10, 15]"
        :page-size="queryParam.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage">
      </el-pagination>
    </el-card>

    <!-- 添加用户对话框    -->
    <el-dialog
      :center="false"
      title="添加用户"
      :visible.sync="addDialogVisible"
      :before-close="addDialogClose"
      width="50%"
      @close="resetAddValidate">
      <!-- 添加用户表单     -->
      <el-form ref="addUserFormRef" :rules="userFormRules" :model="addUserForm" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 添加用户对话框底部区域插槽      -->
      <span slot="footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>


    <!-- 编辑用户对话框    -->
    <el-dialog
      :center="false"
      title="修改用户"
      :visible.sync="updateDialogVisible"
      :before-close="updateDialogClose"
      width="50%"
      @close="resetUpdateValidate">

      <!-- 编辑用户表单     -->
      <el-form ref="updateUserFormRef" :rules="userFormRules" :model="updateUserForm" label-width="100px">
        <el-form-item label="用户名">
          <el-input disabled v-model="updateUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="updateUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="updateUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>

      <!-- 编辑用户对话框底部区域插槽      -->
      <span slot="footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {checkEmail, checkMobile} from '@/common/format'

export default {
  name: "Users",
  data() {
    return {
      queryParam: {
        // 查询参数，可为空
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      totalPage: 1,
      userList: [],
      // 添加用户对话框是否显示
      addDialogVisible: false,
      // 编辑用户对话框是否显示
      updateDialogVisible: false,
      // 添加用户表单数据
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: '',
      },
      // 修改用户表单数据
      updateUserForm: {
        id: 0,
        username: '',
        email: '',
        mobile: ''
      },
      userFormRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {validator: checkEmail, trigger: 'blur'},
        ],
        mobile: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {validator: checkMobile, trigger: 'blur'},
        ]
      }
    }
  },
  methods: {
    /**
     * 初始化用户列表
     * @returns {Promise<void>}
     */
    async initUserList() {
      const res = await this.$http.get('/users', {
        params: this.queryParam
      })
      this.userList = res.data.users
      this.totalPage = res.data.total
      // console.log(this.userList)
      // console.log('res',res)
    },
    // 方式一：传接口具体索要参数
    // async changeState(id, state) {
    //   console.log(id, state)
    //   const res = await this.$http.put(`users/${id}/state/${state}`)
    //   console.log(res)
    //   if (res.meta.status !== 200) {
    //     this.$message.error('更新状态失败');
    //     this.userList.some(item => {
    //       if (item.id === id) {
    //         item.mg_state = !item.mg_state
    //         return true
    //       }
    //     })
    //     return
    //   }
    //   this.$message.success('更新状态成功');
    // }

    // 方式二：直接传递当行数据
    async changeState(row) {
      const res = await this.$http.put(`users/${row.id}/state/${row.mg_state}`)
      if (res.meta.status === 200) {
        this.$message.success('更新状态成功')
        return
      }
      this.$message.error('更新状态失败');
      this.userList.some(item => {
        if (item.id === id) {
          item.mg_state = !item.mg_state
          return true
        }
      })
    },
    /**
     * 关闭添加用户对话框后重置校验规则
     */
    resetAddValidate() {
      this.$refs.addUserFormRef.resetFields()
    },
    addUser() {
      this.$refs.addUserFormRef.validate(async valid => {
        if (valid) {
          const res = await this.$http.post('users', this.addUserForm)
          // console.log(res)
          if (res.meta.status !== 201) {
            this.$message.error(res.meta.msg)
            return
          }
          this.$message.success('添加用户成功')
          this.addDialogVisible = false
          this.initUserList()
        }
      })
    },
    /**
     * 每页条数变动触发回调
     * @param val
     */
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.queryParam.pagesize = val
      this.initUserList()
    },
    /**
     * 当前页变动触发回调
     * @param val
     */
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.queryParam.pagenum = val
      this.initUserList()
    },
    /**
     * 通过id删除用户
     * @param id
     */
    async delUserById(id) {
      // console.log(id)
      const res = await this.$http.delete(`users/${id}`)
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
        return
      }
      this.$message.success(res.meta.msg)
      this.initUserList()
    },
    /**
     * 关闭编辑用户对话框触发回到：重置表单校验
     */
    resetUpdateValidate() {
      this.$refs.updateUserFormRef.resetFields()
    },
    /**
     * 点击添加用户对话框右上角关闭按钮触发回调：关闭对话框
     */
    addDialogClose(done) {
      // console.log(done);
      // done()
      this.addDialogVisible = false
    },
    /**
     * 点击添编辑用户对话框右上角关闭按钮触发回调：关闭对话框
     */
    updateDialogClose() {
      this.updateDialogVisible = false
    },
    /**
     * 通过id查询用户信息，填充编辑用户对话框表单
     * @param id
     * @returns {Promise<void>}
     */
    async getUserById(id) {
      const res = await this.$http.get(`users/${id}`)
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
        return
      }
      this.updateUserForm = res.data
      this.updateDialogVisible = true
    },
    /**
     * 发送修改用户请求
     * @returns {Promise<void>}
     */
    async updateUser() {
      this.$refs.updateUserFormRef.validate(async valid => {
        if (valid) {
          const res = await this.$http.put(`users/${this.updateUserForm.id}`, this.updateUserForm)
          if (res.meta.status !== 200) {
            this.$message.error(res.meta.msg)
            return
          }
          this.$message.success('修改用户信息成功')
          this.updateDialogVisible = false
          this.initUserList()
        }
      })
    }
  },
  created() {
    this.initUserList()
  }
}
</script>

<style scoped>

</style>
