const http = require("http");
const fs = require("fs");
const path = require("path");
const server = http.createServer();
server.on("request", (req, res) => {
    // res.setHeader("content-type", "text/html; charset=utf-8")
    const url = req.url;
    let fpath;
    console.log(url)
    if (url === "/" || url === "/index.html" || url === "/clock/index.html")
        // fpath = path.resolve(__dirname, "clock", "index.html");
        fpath = path.join(__dirname, './clock/index.html')
    else
        fpath = path.join(__dirname, '/clock', url)

    fs.readFile(fpath,"utf-8", ((err, datas) => {
        if (err) return res.end("404 NOT FOUND","utf-8")
        return res.end(datas,"utf-8");
    }))
})

server.listen(8080, () => {
    console.log("server running at http://127.0.0.1:8080");
})
//
// // 1.1 导入 http 模块
// const http = require('http')
// // 1.2 导入 fs 模块
// const fs = require('fs')
// // 1.3 导入 path 模块
// const path = require('path')
//
// // 2.1 创建 web 服务器
// const server = http.createServer()
// // 2.2 监听 web 服务器的 request 事件
// server.on('request', (req, res) => {
//     // 3.1 获取到客户端请求的 URL 地址
//     //     /clock/index.html
//     //     /clock/split_index.css
//     //     /clock/split_index.js
//     const url = req.url
//     // 3.2 把请求的 URL 地址映射为具体文件的存放路径
//     // const fpath = path.join(__dirname, url)
//     // 5.1 预定义一个空白的文件存放路径
//     let fpath = ''
//     if (url === '/') {
//         fpath = path.join(__dirname, './clock/index.html')
//     } else {
//         //     /index.html
//         //     /split_index.css
//         //     /split_index.js
//         fpath = path.join(__dirname, '/clock', url)
//     }
//
//     // 4.1 根据“映射”过来的文件路径读取文件的内容
//     fs.readFile(fpath, 'utf8', (err, dataStr) => {
//         // 4.2 读取失败，向客户端响应固定的“错误消息”
//         if (err) return res.end('404 Not found.')
//         // 4.3 读取成功，将读取成功的内容，响应给客户端
//         res.end(dataStr)
//     })
// })
// // 2.3 启动服务器
// server.listen(8080, () => {
//     console.log('server running at http://127.0.0.1')
// })
