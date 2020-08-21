const pool = require('./index')
const { getQuery } = require('./../utils')

function pubArt(sql) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, con) => {
            if (err) {
                reject(err)
            } else {
                con.query(sql, err => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve('文章发布成功！')
                    }
                    con.release()
                })
            }
        })
    })
}

function getSort(sql) {
    return new Promise((resolve, reject) => {
        getQuery(pool, reject, resolve, sql)
    })
}

function getArticle(sql) {
    return new Promise((resolve, reject) => {
        getQuery(pool,reject,resolve,sql)
    })
}

function getSum(sql) {
    return new Promise(((resolve, reject) => {
        getQuery(pool,reject,resolve,sql)
    }))
}

function getClass(sql) {
    return new Promise((resolve, reject) => {
        getQuery(pool, reject, resolve, sql)
    })
}

function getOne(sql){
    return new Promise((resolve, reject) => {
        getQuery(pool, reject, resolve, sql)
    })
}

function update(sql) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, con) => {
            if (err) {
                reject(err)
            } else {
                con.query(sql, err => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve('文章更新成功！')
                    }
                    con.release()
                })
            }
        })
    })
}

module.exports = {
    pubArt,
    getSort,
    getArticle,
    getSum,
    getClass,
    getOne,
    update
}