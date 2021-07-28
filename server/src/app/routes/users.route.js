const express = require('express');
const route = express.Router();
const passport = require('passport');

const usersController = require('../components/users/user.controller');

module.exports = () => {
    route.get('/', usersController.getAllUsers);
    route.get('/:id', usersController.getUser);
    route.post('/',passport.authenticate('jwt', { session: false }),usersController.createUser);
    route.put('/:id',passport.authenticate('jwt', { session: false }), usersController.updateUser);
    route.delete('/:id',passport.authenticate('jwt', { session: false }), usersController.removeUser);

    return route;
}