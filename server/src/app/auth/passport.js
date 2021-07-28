const passport = require('passport');
const passportJWT = require("passport-jwt");
const User = require('../components/shared/models/user');
const config = require('../../config/app');

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async function (login, password, done) {
        try {
            let users = await User.getAll();
            for (let element of users){
                if (login == element.email && password == element.password) {
                    const {
                        id,
                        name,
                        email,
                        password,
                        created_at,
                        updated_at,
                        is_admin,
                    } = element;
                    let user = {
                        id,
                        name,
                        email,
                        password,
                        created_at,
                        updated_at,
                        is_admin,
                    };
                    return done(null, user, {
                        message: 'Logged In Successfully'
                    });
                }
            }
            return done(null, false, {
                message: 'Incorrect email or password.'
            });
        } catch (err) {
            return done(err);
        }
    }));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.sekretKey
    },
    async function (jwt_payload, done) {
        try {
            let users = await User.getAll();
            for(let element of users){
                if (jwt_payload.id == element.id) {
                    const {
                        id,
                        name,
                        email,
                        password,
                        created_at,
                        updated_at,
                        is_admin,
                    } = element;
                    let user = {
                        id,
                        name,
                        email,
                        password,
                        created_at,
                        updated_at,
                        is_admin,
                    };
                    return done(null, user);
                }
            }
            return done(null, false);
        } catch (err) {
            return done(err);
        }
    }
));