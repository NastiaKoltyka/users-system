const Router = require('express').Router;

const users = require('./users.route');

module.exports = () => {
    const routing = Router();

    routing.use('/users', users());

    return routing;
}