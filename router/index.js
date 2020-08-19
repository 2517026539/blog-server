const express = require('express')
const userRouter = require('./user')
const Boom = require('boom')
const Result = require('./../models/results')
const { verifyToken } = require('./../utils/index')
const jwtVerify = require('./jwt')

const router = express.Router()

router.use(jwtVerify)
router.use('/user',userRouter)

router.get('/', (req, res) => {
    let username = verifyToken(req.headers.authorization)
    new Result({data: username, msg: '请求成功'}).success(res)
})

/*
* 集中处理404请求
* */

router.use((req, res, next) => {
    next(Boom.notFound('接口不存在'))
})

/*
* 异常处理
* */
router.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        const { name, message: msg, code, status} = err
        res.status(401).json({
            status,
            code,
            name,
            msg
        })
    } else {
        new Result({data: err.data, msg: err.output.payload.message,options: {
                ...err.output.payload
        }}).fail(res.status(err.output.payload.statusCode))
    }
})

module.exports = router