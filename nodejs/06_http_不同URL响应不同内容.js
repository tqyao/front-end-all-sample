const http = require("http");

// 1. 创建server实例
const server = http.createServer();
// 2. 监听处理客户端请求
server.on("request", (req, res) => {
    const url = req.url;
    let resContent = "404 NOT FOUND";
    if (url === "/" || url === "/index")
        resContent = `current url is ${url},this is index page`;
    else if (url === "/about")
        resContent = `current url is ${url},this is about page`;
    // 设置返回类型以及响应字符编码
    res.setHeader("content-type", "text/html; charset=utf-8")
    res.end(resContent);
})
// 3. 启动服务端监听端口
server.listen(8080,()=>{
    console.log("server running at http://127.0.0.1");
})