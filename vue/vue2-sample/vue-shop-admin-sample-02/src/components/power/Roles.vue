<template>
  <div>
    <!-- 面包屑导航     -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 角色卡片区域    -->
    <el-card>
      <!-- 添加角色按钮行     -->
      <el-row>
        <el-col>
          <el-button @click="addRoleVisible = true" type="primary">添加角色</el-button>
        </el-col>
      </el-row>

      <!-- 渲染角色列表区域      -->
      <el-table
        :data="roleList"
        stripe
        border>
        <!--  展开列        -->
        <el-table-column
          type="expand">
          <template v-slot:="{row:curRowRole}">
            <!-- 一级权限列表            -->
            <el-row :class="['bdbottom',idx1 === 0?'bdtop':'']" v-for="(item1,idx1) in curRowRole.children"
                    :key="item1.id">
              <el-col :span="5">
                <el-tag closable
                        @close="delRoleRight(curRowRole,item1.id)">{{ item1.authName }}
                </el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <!-- 二级权限              -->
                <el-row
                  v-for="(item2,idx2) in item1.children"
                  :class="[idx2===0?'':'bdtop']"
                  :key="item2.id">
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="delRoleRight(curRowRole,item2.id)">{{ item2.authName }}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 三级权限                  -->
                  <el-col :span="18">
                    <el-tag
                      v-for="(item3,idx3) in item2.children"
                      :key="item3.id"
                      type="warning"
                      closable
                      @close="delRoleRight(curRowRole,item3.id)">
                      {{ item3.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!--            <pre>{{ curRowRole }}</pre>-->
          </template>
        </el-table-column>
        <!-- 索引列        -->
        <el-table-column
          type="index"
          label="#">
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="角色名称">
        </el-table-column>
        <el-table-column
          prop="roleDesc"
          label="角色描述">
        </el-table-column>
        <el-table-column
          width="300px"
          label="操作">
          <template v-slot:="{row}">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="openEditRoleDialog(row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="delRoleById(row)">删除
            </el-button>
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-bangzhu"
              @click="openSetRole(row)">分配权限
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加角色对话框    -->
    <el-dialog
      title="添加角色"
      :visible.sync="addRoleVisible"
      width="50%"
      @close="addRoleDialogClose"
    >
      <!-- 添加角色表单      -->
      <el-form
        ref="addRoleFormRef"
        :rules="roleFormRules"
        :model="addRoleForm"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addRoleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addRoleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 添加角色对话框底部区域      -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRoleVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </span>
    </el-dialog>


    <!-- 编辑角色对话框    -->
    <el-dialog
      title="编辑角色"
      :visible.sync="editRoleVisible"
      width="50%"
      @close="editRoleDialogClose"
    >
      <!-- 编辑角色表单      -->
      <el-form
        ref="editRoleFormRef"
        :rules="roleFormRules"
        :model="editRoleForm"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editRoleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editRoleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editRoleVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRole">确 定</el-button>
      </span>
    </el-dialog>

    <!--   给角色分配权限的对话框    -->
    <el-dialog
      title="分配权限"
      :visible.sync="setRoleVisible"
      width="50%"
      @close="setRoleDialogClose"
    >
      <el-tree
        ref="rightTreeRef"
        :data="rightList"
        :props="defaultProps"
        node-key="id"
        show-checkbox
        default-expand-all
        :default-checked-keys="defaultKeyList"
      >
      </el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRoleRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Roles",
  data() {
    return {
      // 角色列表
      roleList: [],
      // 分配权限对话框显示与隐藏
      setRoleVisible: false,
      // 树型权限列表
      rightList: [],
      // 树状组件配置
      defaultProps: {
        //指定节点标签为节点对象的某个属性值
        label: 'authName',
        //指定子树为节点对象的某个属性值
        children: 'children'
      },
      // 树状组件默认选中的权限id数组
      defaultKeyList: [],
      // 保存将要授权的角色id
      curRoleId: '',
      // 编辑角色对话框显示与隐藏
      editRoleVisible: false,
      // 编辑角色表单
      editRoleForm: {
        roleId: '',
        roleName: '',
        roleDesc: ''
      },
      roleFormRules: {
        roleName: [
          {required: true, message: '请输入角色名称', trigger: 'blur'},
        ],
        roleDesc: [
          {required: true, message: '请输入角色描述', trigger: 'blur'},
        ]
      },
      // 添加角色对话框显示与隐藏
      addRoleVisible: false,
      // 添加角色表单
      addRoleForm: {
        roleName: '',
        roleDesc: ''
      }
    }
  },
  methods: {
    /**
     * 获取角色列表
     */
    async getRoleList() {
      const res = await this.$http.get('roles')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.roleList = res.data
      // console.log(this.roleList)
    },
    /**
     * 删除角色指定权限
     * @param role
     * @param rightid
     * @returns {Promise<void>}
     */
    async delRoleRight(role, rightid) {
      // console.log('role',role)
      // console.log('rightid',rightid)
      let confirmResult
      confirmResult = await this.$confirm('此操作将永久删除该角色权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => {
        this.$message.info('取消删除')
      })
      // .catch((cancel)=>console.log(cancel))
      // console.log(confirmResult)

      if (confirmResult) {
        const res = await this.$http.delete(`roles/${role.id}/rights/${rightid}`)
        if (res.meta.status !== 200) {
          return this.$message.error(res.meta.msg)
        }
        this.$message.success('删除角色权限成功')
        // getRoleList() 会导致表格重新渲染，所以这里直接对role.children赋值，（值传递，传递的是role的引用地址）
        role.children = res.data
        // this.getRoleList()
      }
    },
    /**
     * 打开分配权限对话框
     */
    async openSetRole(role) {

      //保存将要授权的角色id
      this.curRoleId = role.id

      // 获取所有权限树状列表
      const res = await this.$http.get(`rights/tree`)
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.rightList = res.data

      // 设置默认选中（不可行）
      // console.log(this.$refs.rightTreeRef.setCurrentKey);
      // this.$refs.rightTreeRef.setCurrentKey([105])
      // 此时 setRoleVisible = false，树状组件还没渲染到页面中所以获取不到dom元素
      // console.log(this.$refs.rightTreeRef)  // undefined
      // console.log(role)
      this.getDefaultKeys(role, this.defaultKeyList)
      // console.log(this.defaultKeyList)
      // 显示对话框
      this.setRoleVisible = true
    },
    /**
     * 递归获取角色的所有三级权限id
     * @param role
     * @param list
     */
    getDefaultKeys(role, list) {
      if (!role.children) return list.push(role.id)
      role.children.forEach(item => this.getDefaultKeys(item, list))
    },
    /**
     * 权限对话框关闭触发回调
     */
    setRoleDialogClose() {
      this.defaultKeyList = []
    },
    /**
     * 发送分配角色权限请求
     */
    async setRoleRights() {
      // debugger
      // 角色原权限未发生变更则不发请求，需要用户手动点击取消
      // 算法1：对比乱序数组元素是否相同
      const isArrEqual = (arr1, arr2) => {
        return arr1.length === arr2.length && arr1.every(elm => arr2.includes(elm))
      }
      // 算法2：先排序，再逐一对比对比

      /*
      getCheckedKeys（bool）：bool=false（默认） 获取所有选中节点id
      ，bool=true 只返回选中叶子节点id
       */
      //this.$refs.rightTreeRef.getCheckedKeys(true)：选中节点的叶子节点id
      if (isArrEqual(this.$refs.rightTreeRef.getCheckedKeys(true), this.defaultKeyList)) {
        return this.$message.info('分配权限失败，角色的权限与原角色的权限相同')
      }
      // 选中节点id数组
      const checkedKeys = this.$refs.rightTreeRef.getCheckedKeys()
      // 半选中和当前选中id的字符串形式
      const allCheckedKeysStr = [
        ...this.$refs.rightTreeRef.getHalfCheckedKeys(),
        ...checkedKeys
      ].join(',')

      console.log(allCheckedKeysStr);

      // rids：权限 ID 列表（字符串）
      // 发送分配角色权限请求
      const res = await this.$http.post(`roles/${this.curRoleId}/rights`, {rids: allCheckedKeysStr})

      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.$message.success('分配角色权限成功！')
      this.getRoleList()
      this.setRoleVisible = false
    },
    /**
     * 编辑角色对话框关闭回调
     */
    editRoleDialogClose() {
      this.$refs.editRoleFormRef.resetFields()
    },
    /**
     * 发送编辑角色请求
     */
    editRole() {
      // 验证表单规则
      this.$refs.editRoleFormRef.validate(async valid => {
        if (valid) {
          const res = await this.$http.put(`roles/${this.editRoleForm.roleId}`, this.editRoleForm)
          if (res.meta.status !== 200) {
            return this.$message.error('修改失败，' + res.meta.msg)
          }
          this.$message.success('修改角色信息成功！')
          this.getRoleList()
          this.editRoleVisible = false
        }
      })
    },
    /**
     * 打开编辑角色对话框
     */
    async openEditRoleDialog(role) {
      // 查询角色信息
      const res = await this.$http.get(`roles/${role.id}`)
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.editRoleForm = res.data
      // 打开编辑角色对话框
      this.editRoleVisible = true
    },
    /**
     * 发送添加角色请求
     */
    addRole() {
      this.$refs.addRoleFormRef.validate(async valid => {
        if (valid) {
          const res = await this.$http.post(`roles`, this.addRoleForm)
          if (res.meta.status !== 201) {
            return this.$message.error('添加角色失败，' + res.meta.msg)
          }
          this.$message.success('添加角色成功！')
          this.getRoleList()
          this.addRoleVisible = false
        }
      })
    },
    /**
     * 关闭添加角色对话框回调
     */
    addRoleDialogClose() {
      this.$refs.addRoleFormRef.resetFields()
    },
    delRoleById(role) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        console.log(role.id)
        const res = await this.$http.delete(`roles/${role.id}`)
        if (res.meta.status !== 200) {
          return this.$message.error('删除角色失败，' + res.meta.msg)
        }
        this.$message.success('删除角色成功')
        this.getRoleList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },
  created() {
    this.getRoleList()
  }
}
</script>

<style scoped>
.el-row {
  display: flex;
  align-items: center;

}

.el-tag {
  margin: 10px 8px;
}

/deep/ .el-table__expanded-cell {
  padding: 20px 50px !important;
}

.bdtop {
  border-top: 1px solid #eee;
}

.bdbottom {
  border-bottom: 1px solid #eee;
}
</style>
