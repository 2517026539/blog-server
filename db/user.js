const pool = require('./index')
const { getQuery } = require('./../utils')

//新增管理员用户
function add_user(sql) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, con) => {
            con.query(sql,(err, res) => {
                if(err) {
                    reject(err)
                } else {
                  resolve(res)
                }
                con.release() //释放连接
            })
        })
    })
}

//验证用户数据是否准确
function verifyUser(sql) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, con) => {
            if (err) {
                reject(err)
            } else {
                con.query(sql,(err, res) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(JSON.parse(JSON.stringify(res)))
                    }
                    con.release()
                })
            }
        })
    })
}

//获取用户信息
function queryUserInfo(sql) {
    return new Promise((resolve, reject) => {
        getQuery(pool,reject,resolve,sql)
    })
}

module.exports = {
    add_user,
    verifyUser,
    queryUserInfo
}