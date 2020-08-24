const { pubArt, getSort, getArticle, getSum, getClass, getOne, update, del } = require('./../db/article')

function pubArticle(data) {
    return new Promise((resolve, reject) => {
        const { title, subtitle, content, pub, sort, render } = data
        const pubdate = new Date().valueOf()
        const createdate = pubdate
        const updatedate = pubdate
        const sql = `insert into article (\`title\`, \`subtitle\`,\`content\`,\`pub\`,\`sort\`,\`pubdate\`,\`createdate\`,\`updatedate\`,\`render\`) values ('${title}', '${subtitle}','${content}','${pub}','${sort}','${pubdate}','${createdate}','${updatedate}','${render}')`
        pubArt(sql).then(result => {
            resolve(result)
        }).catch(err => {
            reject(err)
        })
    })
}

function saveArticle(data) {
    return new Promise((resolve, reject) => {
        const { title, subtitle, content, pub, sort, render } = data
        const createdate = new Date().valueOf()
        const updatedate = new Date().valueOf()
        const sql = `insert into article (\`title\`, \`subtitle\`,\`content\`,\`pub\`,\`sort\`,\`createdate\`,\`updatedate\`,\`render\`) values ('${title}', '${subtitle}','${content}','${pub}','${sort}','${createdate}','${updatedate}','${render}')`
        pubArt(sql).then(result => {
            resolve(result)
        }).catch(err => {
            reject(err)
        })
    })
}

function getSortList() {
    return new Promise((resolve, reject) => {
        const sql = `select \`sort\`, \`num\` from sort_list`
        getSort(sql).then(result => {
            resolve(result)
        }).catch(err => {
            reject(err)
        })
    })
}

function getArticleList(query) {
    function makeSql(query) {
        const { title = '', subtitle = '', sort = '', pageSize, page, order = '' } = query
        const baseSql = `select * from article `
        let limitoffset = `limit ${pageSize} offset ${(page - 1) * pageSize}`
        const conditionSql = {
            sql: 'where ',
            used: false
        }
        if(order) {
            const orderkey = order.substring(1)
            const orderSize = order.charAt(0) === '+' ? 'asc' : 'desc'
            let orderSql = `order by ${orderkey} ${orderSize}`
            limitoffset = `${orderSql} ${limitoffset}`
        }

        if (title) {
            if (!conditionSql.used){
                conditionSql.used = true
                conditionSql.sql = `${conditionSql.sql}\`title\` like '%${title}%' `
            } else {
                conditionSql.sql = `${conditionSql.sql}and \`title\` like '%${title}%' `
            }
        }
        if (subtitle) {
            if (!conditionSql.used){
                conditionSql.used = true
                conditionSql.sql = `${conditionSql.sql}\`subtitle\` like '%${subtitle}%' `
            } else {
                conditionSql.sql = `${conditionSql.sql}and \`subtitle\` like '%${subtitle}%' `
            }
        }
        if (sort) {
            if (!conditionSql.used){
                conditionSql.used = true
                conditionSql.sql = `${conditionSql.sql}\`sort\` = '${sort}' `
            } else {
                conditionSql.sql = `${conditionSql.sql}and \`sort\` = '${sort}' `
            }
        }
        const sql = conditionSql.used ? `${baseSql}${conditionSql.sql}${limitoffset}` : `${baseSql}${limitoffset}`
        const sumSql = conditionSql.used ? `select count(0) as count from article ${conditionSql.sql}` : `select count(0) as count from article`
        return {sql,sumSql}
    }
    return new Promise((async (resolve, reject) => {
        try{
            const {sql, sumSql} = makeSql(query)
            const articleList =await getArticle(sql)
            const count = await getSum(sumSql)
            resolve({articleList: articleList,...count[0]})
        }catch (e) {
            reject(e)
        }
    }))
}

function getClassification() {
    return new Promise((resolve, reject) => {
        const sql = `select * from classification`
        getClass(sql).then(result => {
            resolve(result)
        }).catch(err => {
            reject(err)
        })
    })
}

function getOneArticle({id}) {
    return new Promise((resolve, reject) => {
        const sql = `select * from article where \`id\` = '${id}'`
        getOne(sql).then(result => {
            resolve(result)
        }).catch(err => {
            reject(err)
        })
    })
}

function updateArticle(article){
    return new Promise((resolve, reject) => {
        const { id, title, subtitle, content, render, sort } = article
        const sql = `update \`article\` set \`title\` = '${title}',\`subtitle\` = '${subtitle}',\`content\` = '${content}',\`render\` = '${render}',\`updatedate\` = '${new Date().valueOf()}',\`sort\` = '${sort}' where \`id\` = '${id}'`
        update(sql).then(result => {
            resolve(result)
        }).catch(err => {
            reject(err)
        })
    })
}

function delArticle({id}) {
    return new Promise(((resolve, reject) => {
        const sql = `delete from \`article\` where \`id\` = '${id}'`
        del(sql).then(result => {
            resolve(result)
        }).catch(err => {
            reject(err)
        })
    }))
}

function updatePub({id, pub}) {
    return new Promise((resolve, reject) => {
        const sql = `update article set \`pub\` = '${pub}' where \`id\` = '${id}'`
        update(sql).then(result => {
            resolve(result)
        }).catch(err => {
            reject(err)
        })
    })
}

module.exports = {
    pubArticle,
    getSortList,
    getArticleList,
    getClassification,
    saveArticle,
    getOneArticle,
    updateArticle,
    delArticle,
    updatePub
}