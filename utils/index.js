const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const constant = require('./constant')

function md5(password) {
    return crypto.createHash('md5').update(String(password)).digest('hex')
}

function verifyToken(authorization) {
    let token = authorization
    if (token.split(' ')[0] === 'Bearer'){
        token = token.split(' ')[1]
    }
    return jwt.verify(token, constant.secretKey)
}

function getQuery(pool, reject, resolve, sql) {
    pool.getConnection((err, con) => {
        if (err) {
            reject(err)
        } else {
            con.query(sql, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    const result = JSON.parse(JSON.stringify(data))
                    resolve(result)
                }
                con.release()
            })
        }
    })
}

module.exports = {
    md5,
    verifyToken,
    getQuery
}