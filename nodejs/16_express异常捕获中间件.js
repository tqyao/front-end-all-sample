const express = require('express');
const app = express();


app.get('/', (req, resp) => {
    throw new Error("服务器内错误")
    console.log("home page");
})

// (err,req,resp,next)=>{} 异常捕获中间件
app.use((err, req, resp, next) => {
    console.log("发生内部错误" + err.message);
    next();
})


app.listen(8888, () => {
    console.log("server is running at 127.0.0.1:8888 ...")
})





