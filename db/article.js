const pool = require('./index')

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
                })
            }
        })
    })
}

module.exports = {
    pubArt
}