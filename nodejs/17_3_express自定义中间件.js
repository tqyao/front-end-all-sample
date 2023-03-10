const express = require('express');
const customBodyParser = require('./custom-body-parser')

const app = express();
// 注册全局中间件
app.use(customBodyParser)

app.post('/user', (req, resp) => {
    resp.send(req.body)
})


app.listen(8888, () => {
    console.log("server is running at 127.0.0.1:8888 ...")
})





