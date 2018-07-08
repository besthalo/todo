'use strict'
let express = require('express')
let app = express.Router();
let MySQL = require('../databases/mysql');


app.get('/',async function (req, res) {
    let resultMysql = await MySQL.GETConnection();
    let env = process.env.NODE_ENV
    let statusCode = 200;
    let responseObj = {
        code: 200,
        env: env,
        message: 'success',
        mysql: resultMysql
    }

    if (resultMysql.error) {
        statusCode = 500
        responseObj.code = 1523
        responseObj.message = 'MySQL Service Unavaliable'
    }
    res.status(statusCode).send(responseObj);
});



module.exports = app;