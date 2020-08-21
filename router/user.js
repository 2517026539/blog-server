const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { body, validationResult} = require('express-validator')
const Boom = require('boom')
const Result = require('./../models/results')
const { addAdmin, login, getInfo } = require('./../services/user')
const constant = require('./../utils/constant')
const { verifyToken } = require('./../utils')

//新增管理者
router.post('/adduser',[
    body('username').isLength({min: 5}).withMessage('用户名长度必须大于4'),
    body('password').isLength({min: 5}).withMessage('密码长度必须大于4')
],(req, res, next) => {
    const err = validationResult(req)
    if (!err.isEmpty()) {
        new Result({msg: '密码或账号名不符合要求',options: err.mapped()}).fail(res)
    } else {
        addAdmin(req.body).then(data => {
            new Result({data, msg: '请求成功'}).success(res)
        }).catch(err => {
            new Result({msg: err}).fail(res)
        })
    }
})

//登录验证
router.post('/login',[
    body('username').isLength({min: 5}).withMessage('用户名长度必须大于4'),
    body('password').isLength({min: 5}).withMessage('密码长度必须大于4')
],(req, res, next) => {
    const err = validationResult(req)
    if (!err.isEmpty()) {
        new Result({msg: '密码或账号名不符合要求',options: err.mapped()}).fail(res)
    } else {
        login(req.body).then(result => {
            if (result.length === 0) {
                new Result({msg: '用户账号或密码错误！'}).success(res)
            } else {
                const token = jwt.sign(
                    {username: req.body.username},
                    constant.secretKey,
                    {
                        expiresIn: constant.JWT_EXPIRED
                    }
                )
                console.log('login')
                new Result({data: {token},msg: '登录成功'}).success(res)
            }
        }).catch(err => {
            new Result({msg: '服务器报错', options: err}).fail(res.status(500))
        })
    }
})

//获取用户信息数据
router.get('/info', (req, res, next) => {
    const authorization = req.headers.authorization
    const { username } = verifyToken(authorization)
    getInfo(username).then(data => {
        console.log('getInfo')
        new Result({data,msg: '请求成功'}).success(res)
    }).catch(err => {
        next(Boom.badImplementation(err))
    })
})

module.exports = router