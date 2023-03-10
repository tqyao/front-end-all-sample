
const express = require('express');
const app = express();
const path = require('path');

// 指定挂载静态资源根路径
app.use('/public',express.static(path.resolve("public")))
app.use('/file',express.static(path.resolve('file')))

/*
1. 访问默认是挂载优先原则，比如地址栏：http://127.0.0.1:8888/index.js 返回的是tqyao-utils下的index.js。
2. 默认的，如果访问 http://127.0.0.1:8888/ ，优先返回被挂在目录中 index.html
 */
app.use(express.static(path.resolve("tqyao-utils")))
app.use(express.static( path.resolve('clock')))

app.listen(8888,()=>{
    console.log("server listening at 127.0.0.1:8888 ...");
})