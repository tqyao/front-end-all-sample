/**
 * web api 服务器
 * todo: 1.跨域问题 2. jsonp 报错
 *
 * @type {e | (() => Express)}
 */
const express = require('express')
const app = express()


// jsonp 必须放在 CORS 之前
app.get('/api/jsonp', (req, resp, next) => {
    // 获取拼接路径参数回调函数名称
    const functionName = req.query.callback
    // 返回客户端数据
    const data = {'username': 'zs', 'age': 18}
    // 拼接一个函数调用
    const jsonpFunction = `${functionName}(${JSON.stringify(data)})`
    resp.send(jsonpFunction)
})

// 允许跨域
const cors = require('cors');
app.use(cors());
// 自定义允许跨域请求头
// app.use((req, resp, next) => {
//     resp.header('Access-Control-Allow-Origin', '*')
//     resp.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method')
//     resp.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
//     resp.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
//     next();
// })


// 解析 json 格式请求数据
app.use(express.json())

// 解析 表单提交请求参数
app.use(express.urlencoded({extended: false}))

// 自定义body解析中间件
// const bodyParser = require('./mw/custom-body-parser')
// app.use(bodyParser)


// 挂载路由中间件
const router = require('./router/userRouter')
app.use('/api', router);

// 启动 web 服务监听
app.listen(8888, () => {
    console.log('server running at 127.0.0.1:8888 ...')
})