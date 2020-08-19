const constant = require('./../utils/constant')

if (constant.ENV === 'dev') {
    module.exports = {
        host: 'localhost',
        user: 'root',
        port: '3306',
        password: '19971103hzs',
        database: 'blog'
    }
} else {
    module.exports = {
        host: '39.103.143.209',
        port: '3306',
        user: 'root',
        password: '19971103hzs',
        database: 'blog'
    }
}