module.exports = function(app) {
    app.use('/v1/healthcheck', require('./controllers/healthcheck.controller'));
    app.use('/v1/tasks', require('./controllers/tasks.controller'));
};