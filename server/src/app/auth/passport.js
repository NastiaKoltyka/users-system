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
            let user = await User.getUserByCredentials(login, password);
            if(!user){
                return done(null, false, {
                    message: 'Incorrect email or password.'
                });
            }

            return done(null, user, {
                message: 'Logged In Successfully'
            });
            
        } catch (err) {
            console.log(err);
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
                        phone, 
                        date_of_birth,
                        about_me,
                        created_at,
                        updated_at,
                        is_admin,
                        roles,
                    } = element;
                    let user = {
                        id,
                        name,
                        email,
                        password,
                        phone, 
                        date_of_birth,
                        about_me,
                        created_at,
                        updated_at,
                        is_admin,
                        roles,
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