const express = require('express')
const app = express()

// 解析 json 格式请求数据
app.use(express.json())
// 解析 表单提交请求参数
app.use(express.urlencoded({extended: true}))

// 挂载路由中间件
const router = require('./18_2_express_Router')
app.use('/api',router);

// 启动 web 服务监听
app.listen(8888, () => {
    console.log('server running at 127.0.0.1:8888 ...')
})