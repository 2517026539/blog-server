const express = require('express')
const multer = require('multer')
const Image = require('./../models/image')
const Result = require('./../models/results')
const constant = require('./../utils/constant')

const upload = multer({dest: constant.IMAGEPATH})
const router = express.Router()

router.post('/upload',upload.single('image'), (req, res, next) => {
    const image = new Image(req.file)
    image.modImage()
    new Result({data: image, msg: '上传成功'}).success(res)
})

router.post('/del',(req, res, next) => {
    console.log(req.body)
    const image = new Image(req.body)
    const isDel = image.delImage()
    console.log(isDel)
    if (isDel) {
        new Result({msg: '图片删除成功'}).success(res)
    } else {
        new Result({msg: '图片删除失败'}).fail(res)
    }
})

module.exports = router