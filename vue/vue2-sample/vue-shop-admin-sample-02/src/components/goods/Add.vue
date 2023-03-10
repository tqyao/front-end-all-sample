<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 白色背景卡片区域    -->
    <el-card>

      <!-- 卡片顶部灰色提示区域      -->
      <el-alert
        title="添加商品信息"
        :closable="false"
        type="info"
        show-icon
        center>
      </el-alert>

      <!-- 进度条区域      -->
      <el-steps :space="200" :active="stepActive - 0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <!-- 1.由于整个tabs中的内容都是通过一个接口提交的内容，所以用 el-form 处理成一个表单。
           2.el-tabs的子标签只能是 el-tab-pane ，所以用 el-form 嵌套在 el-tabs 外-->
      <el-form ref="addFormRef" :rules="addFormRules" :model="addForm" label-position="top">
        <!-- 左侧tab标签页       -->
        <el-tabs v-model="stepActive" tab-position="left" :before-leave="handleBeforeLeave">
          <!-- 商品表单基本信息tab          -->
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addForm.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <!-- 分类参数级联选择组件              -->
              <el-cascader
                v-model="addForm.goods_cat"
                :options="catOptionsList"
                :props="catProps"
                @change="handleChange"
                clearable></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <!-- 商品参数tab页         -->
          <el-tab-pane label="商品参数" name="1">
            <el-form-item :key="idx" :label="item.attr_name" v-for="(item,idx) of  manyParamList">
              <!-- 商品动态参数多选框组件              -->
              <el-checkbox-group v-model="item.attrValsCopy">
                <el-checkbox
                  v-for="(paramName,i) of item.attr_vals"
                  :label="paramName"
                  :key="i"
                  border>
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <!-- 商品属性tab页         -->
          <el-tab-pane label="商品属性" name="2">
            <el-form-item v-for="(onlyItem,idx) of onlyPropList" :label="onlyItem.attr_name" :key="idx">
              <el-input v-model="onlyItem.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload
              :action="uploadServePath"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :headers="requestHeaders"
              :on-success="savePicTeemPath"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <!-- 富文本编辑器            -->
            <quill-editor
              ref="myQuillEditor"
              v-model="addForm.goods_introduce"
              :options="editorOption"
            />
            <el-button type="primary" class="add_goods_btn" @click="addGoods">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>

    <!-- 图片缩略图对话框    -->
    <el-dialog
      title="图片缩略图"
      :visible.sync="picPreviewDialogVisible"
      width="50%">
      <img class="pic_preview" :src="picPreviewPath" alt="">
    </el-dialog>
  </div>
</template>

<script>
import {getToken} from '@/token'
import _ from 'lodash'

export default {
  name: "Add",
  data() {
    return {
      // 进度条进度
      stepActive: '0',
      // 添加商品表单数据
      addForm: {
        goods_name: '',
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        goods_introduce: '',
        // 选中分类的id数组
        goods_cat: [],
        // 上传的图片临时路径（对象）
        pics: [],
        // 商品的参数（数组）
        attrs: [],
      },
      // 添加商品表单字段验证规则
      addFormRules: {
        goods_name: [
          {required: true, message: '请输入商品名称', trigger: 'blur'}
        ],
        goods_price: [
          {required: true, message: '请输入商品价格', trigger: 'blur'}
        ],
        goods_number: [
          {required: true, message: '请输入商品数量', trigger: 'blur'}
        ],
        goods_weight: [
          {required: true, message: '请输入商品重量', trigger: 'blur'}
        ],
        goods_cat: [
          {required: true, message: '请选择商品分类', trigger: 'blur'}
        ]
      },
      // 选中分类id数组
      // selectedCatList: [],
      // 级联选择器渲染数据
      catOptionsList: [],
      // 级联选择器配置
      catProps: {
        expandTrigger: 'hover',
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      // 动态参数列表
      manyParamList: [],
      // 静态属性列表
      onlyPropList: [],
      // 上传图片服务器地址
      uploadServePath: 'http://127.0.0.1:8888/api/private/v1/upload',
      // 设置图片上传请求头
      requestHeaders: {
        Authorization: getToken()
      },
      // 图片缩略图对话框的显示与隐藏
      picPreviewDialogVisible: false,
      // 服务器返回的图片地址
      picPreviewPath: '',
      editorOption: {}
    }
  },
  methods: {
    /**
     * 级联选择器选项发生改变回调
     */
    handleChange() {
      if (!this.get3LevelCateId) {
        this.addForm.goods_cat = []
      }
    },
    /**
     * 获取分类列表
     * @returns {Promise<ElMessageComponent>}
     */
    async getCatList() {
      const res = await this.$http.get('categories')
      if (res.meta.status !== 200) {
        return this.$message.error('获取分类列表失败')
      }
      this.catOptionsList = res.data
    },

    /**
     * 切换 tab 时回调
     * @param activeName
     * @param oldActiveName
     */
    handleBeforeLeave(activeName, oldActiveName) {
      if (oldActiveName === '0' && !this.get3LevelCateId) {
        // 从基本信息切换时，必须选择商品分类
        this.$message.error('请选择商品分类')
        return false
      } else if (activeName === '1') {
        this.getParamsByType()
      } else if (activeName === '2') {
        this.getParamsByType('only')
      }
    },

    /**
     * 获取商品参数列表
     * @returns {Promise<ElMessageComponent>}
     */
    async getParamsByType(type = 'many') {
      const res = await this.$http.get(
        `categories/${this.get3LevelCateId}/attributes`,
        {
          params: {sel: type}
        })
      if (res.meta.status !== 200) {
        let tip = type === 'many' ? '动态参数' : '静态属性'
        return this.$message.error('获取' + tip + '列表失败')
      }


      if (type === 'many') {
        // 转换 attr_vals 成数组形式以便页面循环渲染
        res.data.forEach(item => {
          item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
          item['attrValsCopy'] = item.attr_vals
        })
        this.manyParamList = res.data
      } else {
        this.onlyPropList = res.data
      }
    },
    /**
     * 点击文件列表中已上传的文件时的钩子
     * @param file
     */
    handlePreview(file) {
      // 展示缩略图对话框
      this.picPreviewPath = file.response.data.url
      this.picPreviewDialogVisible = true
    },
    /**
     * 文件列表移除文件时的钩子
     * @param file
     */
    handleRemove(file) {
      // 找到删除图片在数组中索引
      const index = this.addForm.pics.findIndex(item => {
        return item.pic.includes(file.response.data.tmp_path)
      })
      // 删除上传图片
      this.addForm.pics.splice(index, 1)
    },
    /**
     * 上传图片成功回调
     * 保存上传成功后服务器返回的图片临时路径，供后续添加商品接口使用
     * @param response
     */
    savePicTeemPath(response) {
      let tmpPath = response.data.tmp_path
      tmpPath = tmpPath[0] === '/' ? tmpPath : '/' + tmpPath
      const picObj = {pic: tmpPath}
      this.addForm.pics.push(picObj)
    },
    /**
     * 点击添加商品按钮回调
     */
    addGoods() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) {
          return this.$message.error('请按要求填写必填项')
        }
        // 深拷贝请求表单参数，以防影响页面数据渲染双向绑定
        const form = _.cloneDeep(this.addForm)
        form.goods_cat = form.goods_cat.join(',')

        // 处理动态参数
        this.manyParamList.forEach(item => {
          const attr = {
            attr_id: item.attr_id,
            attr_value: item.attrValsCopy.join(',')
          }
          form.attrs.push(attr)
        })

        // 处理静态属性
        this.onlyPropList.forEach(item => {
          const prop = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals
          }
          form.attrs.push(prop)
        })

        const res = await this.$http.post('goods', form)

        if (res.meta.status !== 201) {
          return this.$message.error('添加商品失败，' + res.meta.msg)
        }
        this.$message.success('添加商品成功')
        this.$router.push('/goods')
      })
    },


  },
  created() {
    this.getCatList()
  },
  computed: {
    /**
     * 获取已选择分类的三级分类id
     * @returns {*|null}
     */
    get3LevelCateId() {
      return this.addForm.goods_cat.length === 3 ?
        this.addForm.goods_cat[2] : null
    }
  }

}
</script>

<style scoped>
.el-checkbox {
  margin: 0 10px 0 0 !important;
}

.pic_preview {
  width: 100%;
}

.add_goods_btn {
  margin-top: 10px;
}
</style>
