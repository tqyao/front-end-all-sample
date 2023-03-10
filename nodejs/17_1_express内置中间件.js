const express = require('express');
const app = express();

// 注册内置中间件
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.get('/user',(req,resp)=>{
    console.log(req.body);
    resp.send('ok >>> ' + req.body)
})


app.listen(8888, () => {
    console.log("server is running at 127.0.0.1:8888 ...")
})





