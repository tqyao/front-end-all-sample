const express = require('express')
const router = require('./router/userRouter')
// 创建实例
const app = express()

// 挂载解析json请求参数中间件
app.use(express.json())
// 挂载解析application/x-www-form-urlencoded中间件
app.use(express.urlencoded({extended: false}))

// jsonp 需要放在设置跨域请求头前
app.get('/api/user/jsonp', (req, resp) => {
    // 获取回调函数方法名称
    let funcName = req.query.callback
    // 构造一个返回参数
    const data = {'pic': 'file://user/photo'}
    // 拼接回调函数调用字符串
    const funcCall = `${funcName}(${JSON.stringify(data)})`
    // 拼接好的函数调用字符串给客户端
    resp.send(funcCall)
})


// 在挂载路由前设置跨域请求头
app.use((req, resp, next) => {
    resp.header('Access-Control-Allow-Origin', '*')
    // resp.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method')
    resp.header('Access-Control-Allow-Headers', '*')
    resp.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
    // resp.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
    // 允许获取自定义请求头
    resp.header('Access-Control-Expose-Headers','Self-auth-name')
    next();
})


// 挂载路由
app.use('/api', router)


// 启动 web 服务器监听客户端请求
app.listen(8888, () => {
    console.log('express serve running at http://127.0.0.0:8888')
})