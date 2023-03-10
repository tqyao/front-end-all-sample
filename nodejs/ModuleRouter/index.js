/**
 * 路由模块化
 * @type {e | (() => Express)}
 */
const express = require('express')
const path = require('path')
const uRouterPath = path.join(__dirname, 'router', 'user.js');
console.log(uRouterPath)
const userRouter = require(uRouterPath)

// 1. 创建 web 服务实例
const app = express();
// 2. use : 加载中间件，并设置路由前缀
app.use('/api', userRouter)

// 3. 启动 web 服务器，监听本机 8888 端口
app.listen(8888, () => {
    console.log("server is running at 127.0.0.1:8888 ...")
})
