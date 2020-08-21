const { pubArt } = require('./../db/article')

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

module.exports = {
    pubArticle
}