import {Result} from './18_3_express_Result'

// const {Result} = require('./18_3_express_Result')
const express = require('express');
const router = express.Router();



router.get('/user', (req, resp) => {
    console.log("1")
    const queryData = req.query;
    resp.send(Result.success(queryData));
})

router.post('/user', (req, resp) => {
    console.log("2")
    resp.send(Result.success(resp.params))
})

router.put('/user/:id', (req, resp) => {
    console.log("3")
    resp.send(Result.success(resp.params))
})

router.delete('/user/:id', (req, resp) => {
    console.log("4")
    resp.send(Result.success(resp.params))
})

exports = router;