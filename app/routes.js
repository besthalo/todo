module.exports = function(app) {
    app.use('/v1/healthcheck', require('./controllers/healthcheck.controller'));
};