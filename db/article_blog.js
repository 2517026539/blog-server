const pool = require('./index')

const select = (sql) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, con) => {
            if (err) {
                reject(err)
            } else {
                con.query(sql, (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        const value = JSON.parse(JSON.stringify(result))
                        resolve(value)
                    }
                    con.release()
                })
            }
        })
    })
}

const update = (sql) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, con) => {
            if (err) {
                reject(err)
            } else {
                con.query(sql, err => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve('更新成功！')
                    }
                })
            }
        })
    })
}

module.exports = {
    select,
    update
}