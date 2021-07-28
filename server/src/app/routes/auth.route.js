const express = require('express');
const router = express.Router();
const config = require('../../config/app');

const jwt = require('jsonwebtoken');
const passport = require('passport');

module.exports = () => {
    
    router.post('/login', function (req, res, next) {

        passport.authenticate('local', { session: false }, (err, user, info) => {
            if (err || !user) {
                return res.status(400).json({
                    message: info ? info.message : 'Login failed',
                    user: user
                });
            }

            req.login(user, { session: false }, (err) => {
                if (err) {
                    res.send(err);
                }

                const token = jwt.sign(user, config.sekretKey);

                return res.json({ user, token });
            });
        })
            (req, res);

    });

    return router;
}