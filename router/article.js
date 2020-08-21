const express = require('express')
const { pubArticle, getSortList, getArticleList, getClassification, saveArticle, getOneArticle, updateArticle } = require('./../services/article')
const Result = require('./../models/results')

const router = express.Router()

router.post('/pub', (req, res, next) => {
    pubArticle(req.body).then(result => {
        new Result({msg: result}).success(res)
    }).catch(err => {
        new Result({msg: err}).fail(res.status(500))
    })
})

router.post('/save', (req, res, next) => {
    saveArticle(req.body).then(result => {
        new Result({msg: result}).success(res)
    }).catch(err => {
        new Result({msg: err}).fail(res.status(500))
    })
})



router.get('/sort',(req, res, next) => {
    getSortList().then(result => {
        new Result({ msg: '文章分类获取成功', data: result }).success(res)
    }).catch(err => {
        new Result({msg: err}).fail(res.status(500))
    })
})

router.get('/list', (req, res, next) => {
    getArticleList(req.query).then(result => {
        console.log(result)
        new Result({msg: '文章列表获取成功', data: result}).success(res)
    }).catch(err => {
        new Result({msg: '服务器出错'}).fail(res.status(500))
    })
})

router.get('/classification', (req, res, next) => {
    getClassification().then(result => {
        new Result({msg: '文章类型获取成功', data: result}).success(res)
    }).catch(err => {
        new Result({msg: '服务器出错'}).fail(res.status(500))
    })
})

router.get('/id', (req, res ) => {
    getOneArticle(req.query).then(result => {
        if (result.length) {
            new Result({msg: '文章获取成功', data: result[0]}).success(res)
        } else {
            new Result({ msg: '没有找到该id的文章'}).success(res)
        }
    }).catch(err => {
        new Result({msg: '服务器出错'}).fail(res.status(500))
    })
})

router.post('/update', (req, res ) => {
    updateArticle(req.body).then(result => {
        new Result({msg: '文章更新成功'}).success(res)
    }).catch(err => {
        new Result({msg: '服务器出错'}).fail(res.status(500))
    })
})

module.exports = router