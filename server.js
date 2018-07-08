'use strict';
const express = require('express');
const app = express();
const port = 3000;


if (!(process.env.DMPENV === 'dev' || process.env.NODE_ENV === 'production')) {
    app.use(function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.header("Access-Control-Allow-Headers", "Origin,Content-Type,Cache-Control, Access-Control-Allow-Headers, Authorization, X-Requested-With,Accept");

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    });
}


const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

require('./app/routes')(app);

app.listen(port, function () {
    console.log('Listening on port:' + port);
});




