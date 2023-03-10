<template>
  <div>
    <!-- 面包屑导航 分类参数    -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 分类参数卡片区域    -->
    <el-card>
      <el-alert
        title="注意：只允许为第三级分类设置相关参数！"
        type="warning"
        :closable="false"
        show-icon>
      </el-alert>

      <el-row>
        <el-col>
          <span class="cate_label">选择商品分类：</span>
          <el-cascader
            style="width:25%"
            v-model="selectedCateIdList"
            :options="cateList"
            :props="cascaderOptions"
            @change="selectedCateChange"
            clearable
            filterable>
          </el-cascader>
        </el-col>
      </el-row>

      <!-- 动、静态参数tab栏切换区域     -->
      <el-tabs
        style="margin-top: 10px"
        v-model="activeName"
        @tab-click="handleTabClick">
        <el-tab-pane label="动态参数" name="many">
          <!-- 添加参数按钮          -->
          <el-button
            type="primary"
            size="mini"
            :disabled="selectedCateIdList.length === 0"
            @click="addParamOrPropDialogVisible = true"
          >
            {{ '添加' + subShowText }}
          </el-button>

          <!-- 动态参数列表区域          -->
          <el-table
            v-if="activeName === 'many'"
            :data="manyTableList"
            style="width: 100%"
            border
          >
            <!-- 展开行            -->
            <el-table-column
              type="expand">
              <template v-slot:="{row}">
                <!-- 属性标签                -->
                <div class="tags_list">
                  <el-tag
                    style="margin-right: 10px"
                    v-for="(item,index) in row.attr_vals"
                    :key="index"
                    @close="deleteTag(index,row)"
                    closable
                  >{{ item }}
                  </el-tag>
                  <!-- 添加属性按钮                  -->
                  <el-button
                    size="small"
                    v-if="row.toggleInpOrBtnVisiable"
                    @click="handleClickBtn(row)"
                  >
                    + New Tag
                  </el-button>
                  <el-input
                    v-else
                    ref="saveTagInpRef"
                    class="el_inp_width"
                    v-model="row.inpProp"
                    @blur="addProp(row)"
                    @keyup.enter.native="addProp(row)"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <!-- 索引列            -->
            <el-table-column
              label="#"
              type="index">
            </el-table-column>
            <el-table-column
              :label="subShowText"
              prop="attr_name">
            </el-table-column>
            <!-- 编辑删除按钮列            -->
            <el-table-column
              label="操作">
              <template v-slot:="{row}">
                <el-button @click="openEditDialog(row)" type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
                <el-button @click="deleteParamById(row)" type="danger" size="mini" icon="el-icon-delete">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <!-- 添加参数按钮          -->
          <el-button
            type="primary"
            size="mini"
            :disabled="selectedCateIdList.length === 0"
            @click="addParamOrPropDialogVisible = true"
          >
            {{ '添加' + subShowText }}
          </el-button>

          <!-- 静态属性列表区域          -->
          <el-table
            v-if="activeName === 'only'"
            :data="onlyTableList"
            style="width: 100%"
            border
          >
            <!-- 展开行            -->
            <el-table-column
              type="expand">
              <template v-slot:="{row}">
                <!-- 属性标签                -->
                <div class="tags_list">
                  <el-tag
                    style="margin-right: 10px"
                    v-for="(item,index) in row.attr_vals"
                    :key="index"
                    @close="deleteTag(index,row)"
                    closable
                  >{{ item }}
                  </el-tag>
                  <!-- 添加属性按钮                  -->
                  <el-button
                    size="small"
                    v-if="row.toggleInpOrBtnVisiable"
                    @click="handleClickBtn(row)"
                  >
                    + New Tag
                  </el-button>
                  <el-input
                    v-else
                    ref="saveTagInpRef"
                    class="el_inp_width"
                    v-model="row.inpProp"
                    @blur="addProp(row)"
                    @keyup.enter.native="addProp(row)"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <!-- 索引列            -->
            <el-table-column
              label="#"
              type="index">
            </el-table-column>
            <el-table-column
              :label="subShowText"
              prop="attr_name">
            </el-table-column>
            <!-- 编辑删除按钮列            -->
            <el-table-column
              label="操作">
              <template v-slot:="{row}">
                <el-button @click="openEditDialog(row)" type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
                <el-button @click="deleteParamById(row)" type="danger" size="mini" icon="el-icon-delete">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>

      <!-- 添加参数对话框      -->
      <el-dialog
        :title="'添加' + showText"
        :visible.sync="addParamOrPropDialogVisible"
        width="50%"
        @close="addParamOrPropDialogClose"
      >
        <!-- 添加参数Form表单       -->
        <el-form ref="addParamOrPropFormRef"
                 :rules="paramOrPropFormRule"
                 :model="addParamOrPropForm"
                 label-width="80px">
          <el-form-item :label="showText" prop="attr_name">
            <el-input v-model="addParamOrPropForm.attr_name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button @click="addParamOrPropDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addParamOrProp">确 定</el-button>
        </span>
      </el-dialog>


      <!--      编辑参数对话框-->
      <el-dialog
        :title="'编辑' + showText"
        :visible.sync="editParamOrPropDialogVisible"
        width="50%"
        @close="editParamOrPropDialogClose"
      >
        <!-- 编辑参数表单        -->
        <el-form
          ref="editParamOrPropFormRef"
          :rules="paramOrPropFormRule"
          :model="editParamOrPropForm"
          label-width="80px"
        >
          <el-form-item :label="showText" prop="attr_name">
            <el-input v-model="editParamOrPropForm.attr_name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button @click="editParamOrPropDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editParamOrProp">确 定</el-button>
        </span>
      </el-dialog>

    </el-card>
  </div>
</template>

<script>
export default {
  name: "Param",
  data() {
    return {
      // 分类列表
      cateList: [],
      // 级联组件选择到的分类id数组
      selectedCateIdList: [],
      // 级联组件配置
      cascaderOptions: {
        expandTrigger: 'hover',
        //在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组
        // ，若设置 false，则只返回该节点的值
        emitPath: true,
        //指定选项的值为选项对象的某个属性值
        value: 'cat_id',
        //指定选项标签为选项对象的某个属性值
        label: 'cat_name',
        //指定选项的子选项为选项对象的某个属性值
        children: 'children'
      },
      // 当前选中的标签页，默认是 only（通过 only 或 many 来获取分类静态参数还是动态参数）
      activeName: 'many',
      // 动态参数数据列表
      manyTableList: [],
      // 静态属性数据列表
      onlyTableList: [],
      // 添加参数对话框的显示与隐藏
      addParamOrPropDialogVisible: false,
      // 添加参数/属性的表单绑定数据
      addParamOrPropForm: {
        attr_name: ''
      },
      // 添加参数/属性的表单校验规则
      paramOrPropFormRule: {
        attr_name: [
          {required: true, message: '参数/属性不能为空', trigger: 'blur'}
        ]
      },
      // 切换显示按钮还是输入框(true:显示按钮)
      toggleInpOrBtnVisiable: true,
      // 输入属性值
      inpProp: '',
      // 编辑参数对话框的显示与隐藏
      editParamOrPropDialogVisible: false,
      editParamOrPropForm: {
        attr_name: ''
      }
    }
  },
  methods: {
    /**
     * 获取分类列表
     */
    async getCateList() {
      const res = await this.$http.get('categories')
      if (res.meta.status !== 200) {
        return this.$message.error('获取分类列表失败，' + res.meta.msg)
      }
      this.cateList = res.data
      // console.log(this.cateList)
    },
    /**
     * 点击切换tab栏触发回调
     */
    handleTabClick(tab, event) {
      if (this.activeName === 'many' && this.manyTableList.length === 0) {
        return this.getParamOrPropList()
      }
      if (this.activeName === 'only' && this.onlyTableList.length === 0) {
        return this.getParamOrPropList()
      }
    },
    /**
     * 级联选择器选项改变回调
     */
    selectedCateChange() {
      this.manyTableList = []
      this.onlyTableList = []
      this.getParamOrPropList()
    },
    /**
     * 获取动态参数列表
     * @returns {Promise<void>}
     */
    async getParamOrPropList() {
      if (!this.isThreeLevel) {
        // 如果不是三级分类就置空选项
        this.selectedCateIdList = []
        // 清空表格数据
        this.manyTableList = []
        this.onlyTableList = []
        return
      }

      // 根据激活tab发起获取静态属性/动态参数请求
      const res = await this.$http.get(`categories/${this.get3LevelCateId}/attributes`, {
        params: {sel: this.activeName}
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类的动态参数失败，' + res.meta.msg)
      }

      console.log(res.data)
      res.data.forEach(item => {
        // 把属性/参数的选项值从字符串转成数组，以便在页面渲染
        item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
        // 设置每行输入框的数据绑定，和按钮与输入框的显示与隐藏
        item.inpProp = ''
        item.toggleInpOrBtnVisiable = true
      })

      // 根据激活tab展示表格数据
      if (this.activeName === 'many') {
        this.manyTableList = res.data
      } else {
        this.onlyTableList = res.data
      }
    },
    async addParamOrProp() {
      this.$refs.addParamOrPropFormRef.validate(async valid => {
        if (!valid) return
        const res = await this.$http.post(`categories/${this.get3LevelCateId}/attributes`, {
          attr_name: this.addParamOrPropForm.attr_name,
          attr_sel: this.activeName
        })
        if (res.meta.status !== 201) {
          return this.$message.error('添加' + this.subShowText + '失败，' + res.meta.msg)
        }
        // 刷新态参数列表
        this.getParamOrPropList()
        this.$message.success('添加' + this.subShowText + '成功！')
        this.addParamOrPropDialogVisible = false
      })
    },
    /**
     * 添加参数/属性对话框关闭回调
     */
    addParamOrPropDialogClose() {
      this.$refs.addParamOrPropFormRef.resetFields()
    },

    /**
     * 发送添加分类属性的参数请求
     * @param row
     * @returns {Promise<ElMessageComponent>}
     */
    async addProp(row) {
      if (row.inpProp.trim()) {
        // console.log(row)
        // 复制attr_vals数组 向 attrVals 数组中加入新的参数
        const attrVals = [...row.attr_vals]
        attrVals.push(row.inpProp.trim())

        const rowCopy = {...row}
        rowCopy.attr_vals = attrVals
        // 发送请求
        const res = await this.sendPutParamsRequest(rowCopy)
        // const res = await this.$http.put(
        //   `categories/${this.get3LevelCateId}/attributes/${row.attr_id}`, {
        //     attr_sel: this.activeName,
        //     attr_name: row.attr_name,
        //     attr_vals: attrVals.join(' ')
        //   })

        if (res.meta.status !== 200) {
          return this.$message.error('添加分类参数失败，' + res.meta.msg)
        }
        // 如果添加成功则加入到绑定的table表中供展开行展示
        row.attr_vals = attrVals
        // 清空input残留数据
        row.inpProp = ''
        this.$message.success('添加分类参数成功！')
      }
      // 切换显示按钮
      row.toggleInpOrBtnVisiable = true
    },

    sendPutParamsRequest(variable) {
      return this.$http.put(
        `categories/${this.get3LevelCateId}/attributes/${variable.attr_id}`, {
          attr_sel: this.activeName,
          attr_name: variable.attr_name,
          attr_vals: variable.attr_vals.join(' ')
        })
    },

    /**
     * 点击 newTag 按钮
     */
    handleClickBtn(row) {
      // 显示输入框并聚焦
      row.toggleInpOrBtnVisiable = false
      //$nextTick ：将回调延迟到下次 DOM 更新循环之后执行。
      this.$nextTick(function () {
        this.$refs.saveTagInpRef.focus()
      })
    },
    /**
     * 编辑对话框关闭回调
     */
    editParamOrPropDialogClose() {
      this.$refs.editParamOrPropFormRef.resetFields()
    },
    /**
     * 点击确定发起编辑参数请求
     */
    editParamOrProp() {
      this.$refs.editParamOrPropFormRef.validate(async valid => {
        if (!valid) return
        const res = await this.$http.put(
          `categories/${this.get3LevelCateId}/attributes/${this.editParamOrPropForm.attr_id}`,
          {
            attr_name: this.editParamOrPropForm.attr_name,
            attr_vals: this.editParamOrPropForm.attr_vals,
            attr_sel: this.activeName
          })
        if (res.meta.status !== 200) {
          return this.$message.error('修改参数名称失败', +res.meta.msg)
        }
        this.$message.success('修改参数名称成功')
        this.getParamOrPropList()
        this.editParamOrPropDialogVisible = false
      })
    },
    /**
     * 打开编辑对话框
     */
    async openEditDialog(row) {
      const res = await this.$http.get(
        `categories/${this.get3LevelCateId}/attributes/${row.attr_id}`,
        {
          params: {attr_sel: this.activeName}
        })
      if (res.meta.status !== 200) {
        return this.$message.error('获取分类参数失败')
      }
      this.editParamOrPropForm = res.data
      this.editParamOrPropDialogVisible = true
    },
    /**
     * 点击删除参数
     * @param row
     */
    async deleteParamById(row) {
      const confirmResult = await this.$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(_ => {
      })
      if (confirmResult !== 'confirm') {
        return this.$message({
          type: 'info',
          message: '已取消删除'
        });
      }
      const res = await this.$http.delete(`categories/${this.get3LevelCateId}/attributes/${row.attr_id}`)
      if (res.meta.status !== 200) {
        return this.$message.error('删除参数失败')
      }
      this.$message.success('删除参数成功')
      this.getParamOrPropList()
    },
    async deleteTag(index, row) {
      const confirmResult = await this.$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(_ => {})
      if (confirmResult !== 'confirm') {
        return this.$message({
          type: 'info',
          message: '已取消删除'
        });
      }

      const attrVals = [...row.attr_vals]
      attrVals.splice(index, 1)
      const copyRow = {...row}
      copyRow.attr_vals = attrVals
      const res = await this.sendPutParamsRequest(copyRow)

      if (res.meta.status !== 200) {
        return this.$message.error('删除参数属性失败')
      }

      row.attr_vals = attrVals
      this.$message.success('删除参数属性成功')
    }
  },
  watch: {
    'selectedCateIdList': {
      handler(newValue, oldValue) {
        // 侦听如果级联选择器清空了则置空动态参数列表数据
        if (newValue.length === 0) {
          this.manyTableList = []
          this.onlyTableList = []
        }
      }
    }
  },
  computed: {
    /**
     * 判断是否是选择到三级分类
     * @returns {boolean}
     */
    isThreeLevel() {
      return this.selectedCateIdList.length === 3
    },
    /**
     * 根据激活tab显示文本
     * @returns {string}
     */
    showText() {
      return this.activeName === 'many' ? '动态参数' : '静态属性'
    },
    /**
     * 返回选中的三级分类id
     * @returns {*|null}
     */
    get3LevelCateId() {
      return this.isThreeLevel ? this.selectedCateIdList[2] : null
    },
    subShowText() {
      return this.showText.substring(2)
    },

  },
  created() {
    this.getCateList()
  }
}
</script>

<style scoped>
.el-alert {
  margin-bottom: 15px;
}

.cate_label {
  font-weight: 400;
}

.tags_list {
  padding: 20px 50px;
}

.el_inp_width {
  width: 90px;
}
</style>
