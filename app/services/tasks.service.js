module.exports = {
    getTodoList,
    getTodoTasks,
    createTodoTasks,
    updateTodoTasks,
    deleteTodoTasks
}

let MySQL = require('../databases/mysql');

function getTodoList(order_by = 'id', order_type = 'ASC', limit = 10, offset = 0) {
    let sql = `SELECT * FROM tasks ORDER BY ${order_by} ${order_type} LIMIT ? OFFSET ? ;`
    return new Promise((resolve, reject) => {
        MySQL.query_pool(sql, [limit, offset], (error, result, fields) => {
            if (error) {
                return reject(error);
            } else if (result.length === 0) {
                return resolve(null);
            }
            return resolve(result);
        })
    })
}


function getTodoTasks(id) {
    let sql = `SELECT * FROM tasks WHERE id= ?`;
    return new Promise((resolve, reject) => {
        MySQL.query_pool(sql, [id], (error, result, fields) => {
            if (error) {
                return reject(error);
            } else if (result.length === 0) {
                return resolve(null);
            }
            return resolve(result);
        })
    })
}

function createTodoTasks(todo_obj) {
    if (!todo_obj['status']) {
        todo_obj['status'] = 'pending';
    }
    let sql = `INSERT INTO tasks SET ?`;
    return new Promise((resolve, reject) => {
        MySQL.query_pool(sql, todo_obj, (error, result, fields) => {
            if (error) {
                return reject(error);
            } else if (result.affectedRows === 0) {
                return resolve(null);
            }
            return resolve(result);
        })
    })
}


function updateTodoTasks(id, todo_obj) {
    let sql = `UPDATE tasks SET ? WHERE id=?`;
    return new Promise((resolve, reject) => {
        MySQL.query_pool(sql, [todo_obj, id], (error, result, fields) => {
            if (error) {
                return reject(error);
            } else if (result.affectedRows === 0) {
                return resolve(null);
            }
            return resolve(result);
        })
    })
}

function deleteTodoTasks(id) {
    let sql = `DELETE FROM tasks WHERE id = ?`;
    return new Promise((resolve, reject) => {
        MySQL.query_pool(sql, [id], (error, result, fields) => {
            if (error) {
                return reject(error);
            } else if (result.affectedRows === 0) {
                return resolve(null);
            }
            return resolve(result);
        })
    })
}