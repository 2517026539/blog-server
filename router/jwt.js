const expressJwt = require('express-jwt')
const constant = require('./../utils/constant')

const whiteList = ['/user/adduser','/user/login','/article_blog/list','/article_blog/watch','/article_blog/id','/article_blog/place','/article_blog/sort', '/user/get']

const jwtVerify = expressJwt({
    secret: constant.secretKey,
    algorithms: ['HS256'], //加密算法
    credentialsRequired: true //设置false就不进行校验，游客访问
}).unless({
    path: whiteList  //指定路径不经过token解析
})

module.exports = jwtVerify