module.exports = {
    CODE_ERROR: 0,
    CODE_SUCCESS: 200,
    CODE_TOKEN: -1,
    ENV: 'dev',
    PWD_SALT: 'xiaoxian', //密码加密额外的加密字符
    secretKey: 'xiaoxian', //密钥: 加密token，验证token
    JWT_EXPIRED: 60*60, //token过期时间
}