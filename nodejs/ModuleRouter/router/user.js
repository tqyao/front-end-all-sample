const express = require("express");

// 获取路由实例
const router = express.Router();

// 挂载路由
router.get('/user', (req, resp) => {
    resp.send("add user success");
})

router.delete('/user', (req, resp) => {
    resp.send("add delete success");
})

module.exports = router