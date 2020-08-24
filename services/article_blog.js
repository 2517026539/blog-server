const { select, update } = require('./../db/article_blog')

const getArticleBlogList = ({pageSize, page}) => {
    return new Promise((resolve, reject) => {
        const offset = (Number(page) - 1)*Number(pageSize)
        const limit = pageSize
        const sql =  `select * from home_list limit ${limit} offset ${offset}`
        select(sql).then(result => {
            resolve(result)
        }).catch(err => {
            reject(err)
        })
    })
}

const addWatch = ({ id }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const getWatchSql = `select \`watch_num\` from home_list where \`id\` = '${id}'`
            const getWatch = await select(getWatchSql)
            const num = Number(getWatch[0].watch_num) + 1
            const addWatchSql = `update home_list set \`watch_num\` = '${num}' where \`id\` = '${id}'`
            await update(addWatchSql)
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

const getArticle = ({id}) => {
    return new Promise((resolve, reject) => {
        const sql =  `select * from article where \`id\` = '${id}'`
        select(sql).then(result => {
            resolve(result[0])
        }).catch(err => {
            reject(err)
        })
    })
}

const getArticlePlace = (query) => {
    return new Promise(async (resolve, reject) => {
        let sql = `select * from home_list`
        if (query.sort) {
            sql = sql + ` where \`sort\` = ${query.sort}`
        }
        let getNameSql = `select name from admin_user`
        try{
            const name = await select(getNameSql)
            const articleList = await select(sql)
            resolve({articleList, name: name[0].name})
        }catch (e) {
            reject(e)
        }

    })
}

const getSort = () => {
    return new Promise(async (resolve, reject) => {
        let sql = `select * from sort_list`
        let getCountSql = `select count(0) as count from sort_list`
        try{
            const count = await select(getCountSql)
            const sortList = await select(sql)
            resolve({sortList, count: count[0].count})
        }catch (e) {
            reject(e)
        }

    })
}
module.exports = {
    getArticleBlogList,
    addWatch,
    getArticle,
    getArticlePlace,
    getSort
}