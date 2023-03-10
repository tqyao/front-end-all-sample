const querystring = require('querystring');

/**
 * 路径参数解析中间件
 * @param req
 * @param resp
 * @param next
 */
const bodyParser = (req, resp, next) => {
    const buff = []
    // 监听拼接客户端发送数据
    req.on('data', (chunk) => {
        buff.push(chunk);
    })
    // 服务端接受客户端数据完成
    req.on('end', () => {
        let queryStr = buff.join('')
        // 解析路径参数
        console.log('=====%o',queryStr)
        // queryStr = querystring.parse(queryStr)
        queryStr = JSON.parse(queryStr)
        console.log('=====%o',queryStr)
        // 挂载给req.body，若此中间件注册为全局中间件 ，则所有路由、中间件共享req.body
        req.body = queryStr;
        next()
    })
}

module.exports = bodyParser