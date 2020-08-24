const express = require('express')
const Result = require('../../models/results')
const { getArticleBlogList, addWatch, getArticle, getArticlePlace, getSort } = require('./../../services/article_blog')

const router = express.Router()

router.get('/list', (req, res) => {
    getArticleBlogList(req.query).then(result => {
        new Result({data: result,msg: '数据请求成功'}).success(res)
    }).catch(err => {
        new Result({msg: '服务器出错！'}).fail(res.status(500))
    })
})

router.get('/watch',(req, res) => {
    addWatch(req.query).then(() => {
        new Result({msg: '数据更新成功'}).success(res)
    }).catch(err => {
        new Result({msg: '服务器出错！'}).fail(res.status(500))
    })
})

router.get('/id',(req, res) => {
    getArticle(req.query).then(result => {
        new Result({data: result,msg: '数据获取成功'}).success(res)
    }).catch(err => {
        new Result({msg: '服务器出错！'}).fail(res.status(500))
    })
})

router.get('/place',(req, res) => {
    getArticlePlace(req.query).then(result => {
        new Result({data: result, msg: '数据获取成功'}).success(res)
    }).catch(err => {
        new Result({msg: '服务器出错！'}).fail(res.status(500))
    })
})

router.get('/sort',(req, res) => {
    getSort().then(result => {
        new Result({data: result, msg: '数据获取成功'}).success(res)
    }).catch(err => {
        new Result({msg: '服务器出错！'}).fail(res.status(500))
    })
})

module.exports = router