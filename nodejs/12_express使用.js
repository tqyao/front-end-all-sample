// 1. 引入
const express = require('express');

//2. 创建web服务器实例
const app = express()

// 3.1.1监听客户端的 get 请求，返回普通字符
app.get('/', (req, resp) => {
    console.log('hello world');
    resp.send("hello world");
})


// 3.1.2监听客户端的 get 请求，返回json
app.get('/get2', (req, resp) => {
    const str = '{"username":"tqyao"}'
    console.log(str)
    resp.send(str)
})

// 3.2 监听客户端 get 且路径为 /users 且路径携带参数
app.get('/users',(req,resp) =>{
    console.log(req.query);
    resp.send(req.query);
})


// 3.3 监听客户端 get 且 接受动态路径参数
app.get('/users/:userId/books/:bookId', function (req, res) {
    console.log(req.params)
    res.send(req.params)
})


// 4. 启动 web 服务器
const port = 5001
app.listen(port, () => {
    console.log("express server listening http:127.0.0.1:5001 ")
})



