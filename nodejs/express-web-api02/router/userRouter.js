/**
 * restful 接口测试
 * @type {e | (() => Express)}
 */
const express = require('express')
const Result = require('../Result')
const router = express.Router()

router.get('/user', (req, resp) => {
    resp.send(Result.success(req.query))
})

router.post('/user', (req, resp) => {
    resp.send(Result.success(req.body))
})

router.put('/user/:id', (req, resp) => {
    console.log(req.body)
    resp.send(Result.success({
        ...req.params,
        ...req.body
    }))
})

router.delete('/user/:id', (req, resp) => {
    resp.send(Result.success({
        ...req.params,
        ...req.body
    }))
})




module.exports = router;
