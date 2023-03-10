<template>
  <div>
    <!-- 面包屑导航 商品列表    -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 商品分类卡片区域 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="openAddCateDialog">添加分类</el-button>
        </el-col>
      </el-row>
      
      <!--  树形表格组件区域      -->
      <tree-table
        :columns="columns"
        :data="cateList"
        :expand-type="false"
        :selection-type="false"
        :show-row-hover="false"
        border
        class="tree_table"
        index-text="#"
        show-index
      >
        <!-- 是否有效列        -->
        <template slot="isvalid" scope="{row}">
          <i v-if="!row.cat_deleted" class="el-icon-success"></i>
          <i v-else class="el-icon-error"></i>
        </template>
        <!-- 排序列        -->
        <template slot="order" scope="{row}">
          <el-tag v-if="row.cat_level===0">一级</el-tag>
          <el-tag v-else-if="row.cat_level===1" type="success">二级</el-tag>
          <el-tag v-else type="warning">三级</el-tag>
        </template>
        <!-- 操作列        -->
        <template slot="opt" scope="{row}">
          <el-button icon="el-icon-edit" size="mini" type="primary" @click="openEditCateDialog(row)">编辑</el-button>
          <el-button icon="el-icon-delete" size="mini" type="danger" @click="deleteCateById(row)">删除</el-button>
        </template>
      </tree-table>

      <!-- 分页组件      -->
      <el-pagination
        :current-page="queryParam.pagenum"
        :page-size="queryParam.pagesize"
        :page-sizes="[1, 3, 5, 10,30]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>

      <!--      添加分类对话框-->
      <el-dialog
        :visible.sync="addCateDialogVisible"
        title="添加分类"
        width="50%"
        @close="addCateClose"
      >
        <!--  添加分类表单        -->
        <el-form
          ref="addCateFormRef"
          :model="addCateForm"
          :rules="cateFormRules"
          label-width="100px">
          <el-form-item label="分类名称:" prop="cat_name">
            <el-input v-model="addCateForm.cat_name"></el-input>
          </el-form-item>
          <el-form-item label="父级分类:">
            <!-- 父分类级联选择框            -->
            <el-cascader
              v-model="cateParentIdList"
              :options="cascaderOptions"
              :props="cascaderProps"
              clearable
              filterable
              style="width: 100%"
              @change="cascaderSelectChange"
            ></el-cascader>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addCateDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCate">确 定</el-button>
        </span>
      </el-dialog>

      <!--      编辑分类对话框-->
      <el-dialog
        :visible.sync="editCateDialogVisible"
        title="编辑分类"
        width="50%"
        @close="editCateClose"
      >
        <!-- 编辑分类对话框  -->
        <el-form
          ref="editCateFormRef"
          :model="editCateForm"
          :rules="cateFormRules"
          label-width="100px"
        >
          <el-form-item label="分类名称" prop="cat_name">
            <el-input v-model="editCateForm.cat_name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editCateDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editCate">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Cate",
  data() {
    return {
      // 分类列表
      cateList: [],
      // 查询参数
      queryParam: {
        pagenum: 1,
        pagesize: 5,
      },
      total: 0,
      // 树形表格组件列的配置
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name',
        },
        {
          label: '是否有效',
          type: 'template',
          template: 'isvalid'
        },
        {
          label: '排序',
          type: 'template',
          template: 'order'
        },
        {
          label: '操作',
          type: 'template',
          template: 'opt',
        },
      ],
      // 添加分类对话框的显示与隐藏
      addCateDialogVisible: false,
      // 添加分类表格数据
      addCateForm: {
        cat_name: '',
        // 分类层级（默认值0：添加1级分类）：不能为空，`0`表示一级分类；`1`表示二级分类；`2`表示三级分类
        cat_level: 0,
        // 分类父 ID（默认值0：添加1级分类的父id位0）：不能为空，如果要添加1级分类，则父分类Id应该设置为  `0`
        cat_pid: 0
      },
      // 提交分类表格数据验证规则
      cateFormRules: {
        cat_name: [
          {required: true, message: '请输入分类名称', trigger: 'blur'},
        ]
      },
      // 选择到的分类id数组
      cateParentIdList: [],
      // 级联渲染的选项数组
      cascaderOptions: [],
      // 级联选择组件配置
      cascaderProps: {
        // 次级菜单的展开方式
        expandTrigger: 'hover',
        // // 指定选项的值为选项对象的某个属性值
        value: 'cat_id',
        // 指定选项标签为选项对象的某个属性值
        label: 'cat_name',
        // 指定选项的子选项为选项对象的某个属性值
        children: 'children',
        // 取消选中关联，可选任意一级
        checkStrictly: true
      },
      // 编辑分类对话框的显示与隐藏
      editCateDialogVisible: false,
      editCateForm: {
        cat_name: ''
      }
    }
  },
  methods: {
    async getCateList() {
      const res = await this.$http.get('categories', {params: this.queryParam})
      if (res.meta.status !== 200) {
        return this.$message.error('查询分类列表失败，' + res.meta.msg)
      }
      this.cateList = res.data.result
      this.total = res.data.total
      // console.log(res);
    },
    /**
     * 每页条数改变回调
     */
    handleSizeChange(val) {
      this.queryParam.pagesize = val
      this.getCateList()
    },
    /**
     * 页数发生改变回调
     * @param val
     */
    handleCurrentChange(val) {
      this.queryParam.pagenum = val
      this.getCateList()
    },
    /**
     * 点击添加分类按钮
     */
    openAddCateDialog() {
      this.getParentCateList()
      this.addCateDialogVisible = true
    },
    /**
     * 获取父级分类数据
     * @returns {Promise<ElMessageComponent>}
     */
    async getParentCateList() {
      const res = await this.$http.get('categories', {
        params: {type: 2}
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取父级分类列表数据失败，' + res.meta.msg)
      }
      this.cascaderOptions = res.data
      console.log(res)
    },
    /**
     * 发送添加分类请求
     */
    async addCate() {
      console.log('cat_level', this.addCateForm.cat_level, 'cat_pid', this.addCateForm.cat_pid);
      this.$refs.addCateFormRef.validate(async valid => {
        if (!valid) return
        const res = await this.$http.post('categories', this.addCateForm)
        if (res.meta.status !== 201) {
          return this.$message.error('添加分类失败，请稍后尝试')
        }
        this.$message.success('添加分类成功！')
        this.addCateDialogVisible = false
        this.getCateList()
      })
    },
    /**
     * 级联选择选项发生改变回调
     */
    cascaderSelectChange() {
      // console.log(this.cateParentIdList)
      const len = this.cateParentIdList.length
      if (len === 0) {  // 添加的是一级节点
        this.addCateForm.cat_level = 0
        this.addCateForm.cat_pid = 0
      } else {  // 添加的是二、三级节点
        // 获取选择节点数据的最后一个节点id
        this.addCateForm.cat_pid = this.cateParentIdList[len - 1]
        // 设置请求添加的节点层级
        if (len === 1) {
          this.addCateForm.cat_level = 1
        } else {
          this.addCateForm.cat_level = 2
        }
      }
    },
    /**
     * 添加参数对话框关闭回调
     */
    addCateClose() {
      // 重置表单校验和值绑定
      this.$refs.addCateFormRef.resetFields()
      // 清空级联选择组件选中值
      this.cateParentIdList = []
    },
    /**
     * 编辑分类关闭回调
     */
    editCateClose() {
      this.$refs.editCateFormRef.resetFields()
    },
    /**
     * 发送编辑分类请求
     */
    editCate() {
      this.$refs.editCateFormRef.validate(async valid => {
        if (!valid) return
        const res = await this.$http.put(`categories/${this.editCateForm.cat_id}`, {cat_name: this.editCateForm.cat_name})
        if (res.meta.status !== 200) {
          return this.$message.error('编辑分类失败，' + res.meta.msg)
        }
        this.$message.success('编辑分类成功！')
        this.getCateList()
        this.editCateDialogVisible = false
      })
    },
    /**
     * 打开编辑分类对话框回调
     */
    openEditCateDialog(cateObj) {
      this.editCateForm.cat_id = cateObj.cat_id
      this.editCateForm.cat_name = cateObj.cat_name
      this.editCateDialogVisible = true
    },
    async deleteCateById(cateObj) {
      const res = await this.$http.delete(`categories/${cateObj.cat_id}`)
      if (res.meta.status !== 200) {
        return this.$message.error('删除分类失败!' + res.meta.msg)
      }
      this.$message.success('删除分类成功！')
      this.getCateList()
    }
  },
  created() {
    this.getCateList()
  }

}
</script>

<style scoped>
i[class="el-icon-success"] {
  color: lightgreen;
}

i[class="el-icon-error"] {
  color: lightcoral;
}

.tree_table {
  margin-top: 10px;
}

</style>
