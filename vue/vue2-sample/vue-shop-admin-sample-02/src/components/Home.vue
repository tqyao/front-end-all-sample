<template>
  <div class="home_container">
    <el-container>
      <!-- 头部区域      -->
      <el-header>
        <div>
          <img alt="logo" src="@/assets/logo.png">
          <h3>电商后台管理系统</h3>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <!-- 左侧菜单列表          -->
        <el-aside :width="isCollapse?'64px':'200px'">
          <!-- router：是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转          -->
          <!-- collapse：是否水平折叠收起菜单         -->
          <!-- collapse-transition：是否开启折叠动画          -->
          <!--  unique-opened：是否只保持一个子菜单的展开          -->
          <!-- active-text-color：当前激活菜单的文字颜色（仅支持 hex 格式）          -->
          <!-- 一级菜单          -->
          <el-menu
            ref="menuRef"
            :collapse="isCollapse"
            :collapse-transition="false"
            :default-active="activePath"
            active-text-color="#5b9df8"
            background-color="#2b2d37"
            router
            text-color="#fff"
            unique-opened
            @select="changeNavPath"
          >
            <!-- 左侧菜单收起与展开按钮            -->
            <div class="collapse" @click="toggleCollapse">|||</div>
            <!-- 一级菜单            -->
            <el-submenu v-for="item in menuList" :key="item.id" :index="'/' + item.path">
              <!-- 一级菜单模版              -->
              <template slot="title">
                <i :class="menuIconObj[item.id]"></i>
                <span>{{ item.authName }}</span>
              </template>
              <!-- 二级菜单              -->
              <el-menu-item v-for="childMenu in item.children" :key="childMenu.id" :index="'/'+childMenu.path">
                <i class="el-icon-menu"></i>
                {{ childMenu.authName }}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
import {removeToken} from "@/token";

export default {
  name: "Home",
  data() {
    return {
      menuList: [],
      // 是否折叠菜单列表
      isCollapse: false,
      // 当前激活菜单
      activePath: '',
      // 一级菜单列表图标
      menuIconObj: {
        //users
        '125': 'iconfont2 icon-yonghu',
        //rights
        '103': 'iconfont2 icon-authority',
        //goods
        '101': 'iconfont2 icon-shangpin-xianxing',
        //orders
        '102': 'iconfont2 icon-dingdan',
        //"reports"
        '145': 'iconfont2 icon-tongjijisuan'
      }
    }
  },
  methods: {
    /**
     * 菜单激活保存激活路径
     * @param index
     */
    changeNavPath(index) {
      // console.log(index)
      window.sessionStorage.setItem('activePath', index)
    },
    /**
     * 登出
     */
    logout() {
      removeToken()
      this.$message.success("退出登录成功")
      window.sessionStorage.removeItem('activePath')
      this.$router.push('/login')
    },
    /**
     * 获取菜单列表
     * @returns {Promise<void>}
     */
    async getMenuList() {
      const res = await this.$http.get('menus')
      console.log(res)
      if (res.meta.status !== 200) {
        this.$message.error('获取菜单列表失败')
      } else {
        this.menuList = res.data;
      }
    },
    /**
     * 左侧菜单栏显示与隐藏
     */
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    }
  },
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },

}
</script>

<style lang="less" scoped>
.home_container, .el-container {
  height: 100%;
}

.el-header {
  padding: 0 20px 0 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #393f41;
  align-items: center;

  div {
    img {
      width: 40px;
      height: 40px;
      vertical-align: middle;
    }

    h3 {
      margin-left: 10px;
      display: inline;
      color: #fff;
      font-weight: 500;
    }
  }
}

.el-aside {
  background-color: #343743;
}

.collapse {
  letter-spacing: 3px;
  background-color: #4b5062;
  text-align: center;
  color: #fff;
  cursor: pointer;
}

.el-submenu {
  text-align: left;
}

.iconfont2 {
  margin-right: 10px;
}

</style>
