const Validator = require('validatorjs');

exports.validate = function (data, rules, customMessage = {}) {
    data = trimAllStringData(data);
    // library validate
    const validation = new Validator(data, rules, customMessage);

    if (validation.fails()) {
        let errors = validation.errors.all();
        for (var key in errors) {
            if (errors.hasOwnProperty(key)) {
                return validation.errors.first(key);
            }
        }
    }

    return null;
}

function trimAllStringData(data) {
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            if (typeof data[key] === 'string') {
                data[key] = data[key].trim();
            }
            else if (typeof data[key] === 'object') {
                data[key] = trimAllStringData(data[key]);
            }
        }
    }
    return data;
}