const { md5 } = require('./../utils')
const { PWD_SALT } = require('./../utils/constant')
const { add_user, verifyUser, queryUserInfo } = require('./../db/user')
const jwt = require('jsonwebtoken')

//新增管理者
function addAdmin(user) {
    const { password, username } = user
    const md5Pw = md5(`${password} ${PWD_SALT}`)
    const sql = `insert into admin_user (\`username\`,\`password\`) values ('${username}','${md5Pw}')`
    return new Promise(((resolve, reject) => {
        add_user(sql).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    }))
}

//管理者登录
function login(user) {
    const { password, username } = user
    const md5Pw = md5(`${password} ${PWD_SALT}`)
    const sql = `select * from admin_user where \`password\` = '${md5Pw}' and \`username\` = '${username}'`
    return new Promise((resolve, reject) => {
        verifyUser(sql).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

//获取用户信息数据
function getInfo(username) {
    return new Promise((resolve, reject) => {
        const sql = `select * from user_info where \`username\` = '${username}'`
        queryUserInfo(sql).then(result => {
            if (result.length === 0) {
                reject('该用户名没有数据')
            } else {
                resolve(result[0])
            }
        }).catch(err => {
            reject(err)

        })
    })
}

module.exports = {
    addAdmin,
    login,
    getInfo
}