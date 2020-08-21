const express = require('express')
const { pubArticle } = require('./../services/article')
const Result = require('./../models/results')

const router = express.Router()

router.post('/pub', (req, res, next) => {
    pubArticle(req.body).then(result => {
        new Result({msg: result}).success(res)
    }).catch(err => {
        new Result({msg: err}).fail(res.status(500))
    })
})

module.exports = router