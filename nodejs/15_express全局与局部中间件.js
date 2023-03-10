const express = require('express');
const {dataFormat} = require('./tqyao-utils/index')
const app = express();




// 注册中间件 第三个参数是回调函数
app.use((req, resp, next) => {
    console.log("第一个中间件");
    // 给每个路由挂载属性
    req.arriveTime = dataFormat(new Date());
    next()
})

// 可以注册多个中间件，按顺序执行
app.use((req, resp, next) => {
    console.log("到达第二个中间件")
    next()
})


const mw1 = (req,resp,next)=>{
    console.log("局部中间件1111111111")
    next()
}

const mw2 = (req,resp,next)=>{
    console.log("局部中间件22222222")
    next()
}


app.get('/user', (req, resp) => {
    resp.send('received get /user, datatime:' + req.arriveTime)
})
app.post('/member', (req, resp) => {
    resp.send('received get /member, datatime:' + req.arriveTime)
})

// 局部中间件
// 方式1
app.get('/scope',mw1,mw2,(req,resp) =>{
    resp.send('scope'+dataFormat(new Date()))
})

// 方式2
app.post('/scope',[mw1,mw2],(req,resp) =>{
    resp.send('scope2'+dataFormat(new Date()))
})

app.listen(8888, () => {
    console.log('server is running at 127.0.0.1:8888 ...')
})
