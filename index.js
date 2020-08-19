const express = require('express');
const bodyParse = require('body-parser')
const fs = require('fs')
const https = require('https')
const cors = require('cors')
const router = require('./router')

const app = express();
const port = 3000;

const options = {
    key: fs.readFileSync('./https/4285447_www.lijiaxian.com.key','utf-8'),
    cert: fs.readFileSync('./https/4285447_www.lijiaxian.com.pem','utf-8')
}

app.use(cors())
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));
app.use('/',router)

const httpsServer = https.createServer(options, app);

app.listen(port, () => {
    console.log('server is running on http://localhost:%s',port)
})

httpsServer.listen(18082, () => {
    console.log('https server is running on https://localhost:18082')
})
