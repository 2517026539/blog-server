const fs = require('fs')
const constant = require('./../utils/constant')

class Image{
    constructor(file) {
        const { fieldname, originalname, encoding, mimetype, destination, filename, path, size} = file
        this.fieldname = fieldname //字段名
        this.originalname = originalname //源文件名
        this.encoding = encoding //解码方式
        this.mimetype = mimetype //文件类型
        this.destination = destination //存储文件夹路径（不包括文件名）
        this.filename = filename //存储后文件名
        this.path = path //文件绝对路径
        this.size = size //文件大小
    }

    init() {
        this.fieldname = '' //字段名
        this.originalname = '' //源文件名
        this.encoding = '' //解码方式
        this.mimetype = '' //文件类型
        this.destination = '' //存储文件夹路径（不包括文件名）
        this.filename = '' //存储后文件名
        this.path = '' //文件绝对路径
        this.size = '' //文件大小
        this.urlpath = '' //url路径
        this.imagePath = '' //图片相对路径
    }

    modImage(){
        const type = this.mimetype.split('/')[1]
        if (this.filename.indexOf(type) === -1 && fs.existsSync(this.path)) {
            fs.renameSync(this.path, this.path+'.'+type)
        }
        this.filename = `${this.filename}.${type}`
        this.urlpath = `${constant.URLPATH}/image/${this.filename}` //下载url路径
        this.path = `${this.path}.${type}`
        this.imagePath = `/image/${this.filename}` //图片文件相对路径
    }

    delImage(){
        if (fs.existsSync(this.path)) {
            fs.unlinkSync(this.path);
            this.init()
        }
        return true
    }
}

module.exports = Image