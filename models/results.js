const constant = require('./../utils/constant')

class Results {
    constructor({data, msg, options}) {
        this.data = null
        this.code = constant.CODE_SUCCESS
        this.options = null
        if (!data && !msg && !options) {
            this.msg = '未处理错误'
            this.options = {
                error: 'error not found'
            }
        } else {
            this.msg = msg || ''
            this.data = data || null
            this.options = options || null
        }
    }

    createJson( response ) {
        const { code, data, msg, options } = this
        if (data && options) {
            response.json({
                code,
                msg,
                data,
                options
            })
        } else if (data && !options) {
            response.json({
                code,
                msg,
                data
            })
        } else if (!data && options) {
            response.json({
                code,
                msg,
                options
            })
        } else {
            response.json({
                code,
                msg
            })
        }
    }

    success(res) {
        this.createJson(res)
    }

    fail(res) {
        this.code = constant.CODE_ERROR
        this.createJson(res)
    }
}

module.exports = Results