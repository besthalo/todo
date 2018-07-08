'use strict'
let express = require('express')
let app = express.Router();
let Validator = require('../services/validator.service');
let TasksService = require('../services/tasks.service');

const rulesGetSingleTasks = {
    id: 'integer',
    limit: 'integer|min:1'
}
const rulesPostTasks = {
    detail: 'required|string',
    status: 'in:pending,done'
}
const rulesPutTasks = {
    id: 'required|integer',
    detail: 'required_if:status|string',
    status: 'required_if:detail|string|in:pending,done'
}
const rulesGetTasks = {
    order_by: 'in:id,status',
    order_type: 'in:asc,desc,ASC,DESC',
    limit: 'integer|min:1',
    page: 'integer|min:1'
}

const rulesDeleteTasks = {
    id: 'required|integer'
}

const customMsg = {
    "required": "Attribute :attribute is required",
    "in": "Attribute :attribute is invalid",
    "integer": "Attribute :attribute is invalid"
};


app.get('/', async function (req, res) {
    if (req.query) {
        if (Validator.validate(req.query, rulesGetTasks, customMsg)) {
            return res.status(400).send({ code: 400, message: 'Bad Request' });
        }
    }
    try {
        if (req.query.limit) {
            req.query.limit = parseInt(req.query.limit);
        }
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
        }
        let result = await TasksService.getTodoList(
            req.query.order_by ? req.query.order_by : 'id',
            req.query.order_type ? req.query.order_type : 'ASC',
            req.query.limit ? req.query.limit : 10,
            (req.query.page ? req.query.limit * (req.query.page - 1) : 0)
        );
        if (result) {
            return res.status(200).send({ code: 200, message: 'success', data: result });

        } else {
            return res.status(404).send({ code: 404, message: 'Not Found' })
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: 'Internal Server Error' });
    }
});


app.get('/:id', async function (req, res) {
    let params = req.params
    params = Object.assign(params, req.query);
    let error = Validator.validate(params, rulesGetSingleTasks, customMsg);
    if (error) {
        return res.status(400).send({ code: 400, message: 'Bad Request', error: error });
    }
    try {
        let result = await TasksService.getTodoTasks(params.id);
        if (result) {
            return res.status(200).send({ code: 200, message: 'success', data: result[0] });
        } else {
            return res.status(404).send({ code: 404, message: 'Not Found' })
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: 'Internal Server Error' });
    }
});

app.post('/', async function (req, res) {
    let params = req.body;
    let error = Validator.validate(params, rulesPostTasks, customMsg);
    if (error) {
        return res.status(400).send({ code: 400, message: 'Bad Request', error: error });
    }
    try {
        let result = await TasksService.createTodoTasks(params);
        return res.status(201).send({ code: 201, message: 'success', data: { id: result.insertId } });
    } catch (error) {
        return res.status(500).send({ code: 500, message: 'Internal Server Error' });
    }
});

app.put('/', async function (req, res) {
    let params = req.body;
    let error = Validator.validate(params, rulesPutTasks, customMsg);
    if (error) {
        return res.status(400).send({ code: 400, message: 'Bad Request', error: error });
    }

    try {
        let updateObj = {}
        if (params.detail) {
            updateObj['detail'] = params.detail;
        }

        if (params.status) {
            updateObj['status'] = params.status;
        }
        let result = await TasksService.updateTodoTasks(params.id, updateObj);
        if (result) {
            return res.status(204).send();
        } else {
            return res.status(404).send({ code: 404, message: 'Not Found' })
        }

    } catch (error) {
        return res.status(500).send({ code: 500, message: 'Internal Server Error' });
    }
})

app.delete('/', async function (req, res) {
    let params = req.body;
    let error = Validator.validate(params, rulesDeleteTasks, customMsg);
    if (error) {
        return res.status(400).send({ code: 400, message: 'Bad Request', error: error });
    }

    try {
        let result = await TasksService.deleteTodoTasks(params.id);
        if (result) {
            return res.status(204).send();
        } else {
            return res.status(404).send({ code: 404, message: 'Not Found' })
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: 'Internal Server Error' });
    }
});



module.exports = app;