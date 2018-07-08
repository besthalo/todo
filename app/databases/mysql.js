const mysql = require('mysql');
const { constants } = require('../constants/constants');

module.exports = {
    query_pool,
    getConnection,
    createConnection,
    connect,
    query,
    queryArr,
    close,
    startTransaction,
    commit,
    rollback,
    GETConnection
}

const connectConfig = {
    host: constants.MYSQL.HOST,
    user: constants.MYSQL.USERNAME,
    password: constants.MYSQL.PASSWORD,
    port: constants.MYSQL.PORT,
    database: constants.MYSQL.NAME,
    stringifyObjects: false,
    supportBigNumbers: true
}
const connectConfigPool = {
    connectionLimit: constants.MYSQL.DB_CONNECTIONLIMIT,
    host: constants.MYSQL.HOST,
    user: constants.MYSQL.USERNAME,
    password: constants.MYSQL.PASSWORD,
    port: constants.MYSQL.PORT,
    database: constants.MYSQL.NAME,
    stringifyObjects: false,
    multipleStatements: true,
    charset: 'utf8mb4'
}

let pool = mysql.createPool(connectConfigPool);

function createConnection() {
    return mysql.createConnection(connectConfig);
};


async function GETConnection() {
    return new Promise(resolve => {
        pool.getConnection((err, conn) => {
            if (err) {
                return resolve({ error: err, message: "error" })
            }
            conn.release();
            return resolve({ error: null, message: "success" })
        });
    })

}

function getConnection(callback) {
    pool.getConnection((err, conn) => {
        return callback(err, conn);
    });
}

function query_pool(sql, params = {}, callback) {
    pool.getConnection(function (err, conn) {
        if (err) {
            return callback(err, null, null);
        }
        conn.query(sql, params, (err, result, fields) => {
            conn.release();
            return callback(err, result, fields);

        })
    })

}

async function connect(connection, callback) {
    await connection.connect(function (err) {
        if (err) {
            callback(err)
            return;
        } else {
            return callback(null);
        }
    });
}

function close(connection, force = false) {
    if (force) {
        connection.destroy();
    } else {
        connection.end();
    }
}

function startTransaction() {
    return new Promise((resolve, reject) => {
        getConnection((error, connection) => {
            if (error) {
                return reject(error);
            }
            connection.beginTransaction((error) => {
                if (error) {
                    return reject(error);
                }
                return resolve(connection);
            });
        });
    });
}

function commit(connection) {
    return new Promise((resolve, reject) => {
        connection.commit((error) => {
            if (error) {
                return reject(error);
            }
            connection.release();
            return resolve();
        });
    });
}

function rollback(connection) {
    return new Promise((resolve) => {
        return connection.rollback(function () {
            connection.release();
            return resolve();
        });
    });
}

function query(connection, sql, params = {}) {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (err, results) => {
            if (err) {
                console.log(err);
                return reject(err);
            }

            return resolve(results);
        });
    });
}

function queryArr(connection, sql, params = []) {
    return query(connection, sql, [params]);
}

