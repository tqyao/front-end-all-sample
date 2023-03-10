// import Result from '../Result'
// import {Router as router} from 'express'
const Result = require('../Result')
const express = require('express');
const router = express.Router();

router.get('/user', (req, resp) => {
    console.log("1")
    console.log(req.query)
    resp.send(Result.success(req.query))
})

router.post('/user', (req, resp) => {
    console.log("2")
    console.log(req.body)
    resp.send(Result.success(req.body))
})

router.put('/user/:id', (req, resp) => {
    console.log("3")
    resp.send(Result.success(resp.params))
})

router.delete('/user/:id', (req, resp) => {
    console.log("4")
    resp.send(Result.success(resp.params))
})

module.exports = router;