const User = require('../shared/models/user');

const getAllUsers = (page, pageSize) => {
    return User.getAll().then(result => {
        try {
            let allUsers = result.map(user => {
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
                    roles
                } = user;
                return {
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
                    roles
                };
            });
            let users = allUsers.sort(function (a, b) {
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            }).slice(pageSize * (page - 1), pageSize * page);
            return {
                data: users,
                pagination: {
                    page: page,
                    pageSize: pageSize,
                    rowCount: allUsers.length,
                    pageCount: Math.ceil(allUsers.length / pageSize),
                }
            };
        } catch (err) {
            throw new Error({code: 500, description: `Error getting all users. ${err.message}`});
        }
    });
};

const userValidation = (newUser) => {
    const {
        name,
        email,
        password
    } = newUser;
    const user = {
        name: name,
        email: email,
        password: password
    };

    for (let prop in user) {
        if (user.hasOwnProperty(prop) && (user[prop] === undefined || user[prop] == '')) {
            return false;
        }
    }
    return true;
};

const getUser = (userId) => {
    return User.getUser(userId);
};

const createUser = (newUser) => {
    try {
        const validation = userValidation(newUser);
        if (!validation) {
            return Promise.reject({code: 400, description: 'Please, fill the required user fields'});
        }
        const user = {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            created_at: new Date,
            updated_at: new Date,
            roles: ['can_view_users']
        };
        return User.createUser(user);

    } catch (err) {
        throw new Error({code: 500, description: `Error creating user. ${err.message}`});
    }
};

const updateUser = (userId, user) => {
    try {
        const validation = userValidation(user);
        if (!validation) {
            return Promise.reject({code: 400, description: 'Please, fill the required user fields'});
        }
        const updatedUser = {
            name: user.name,
            email: user.email,
            password: user.password,
            phone: user.phone, 
            date_of_birth: user.date_of_birth,
            about_me: user.about_me,
            roles: user.roles,
            updated_at: new Date
        };
        return User.updateUser(userId, updatedUser);
    } catch (err) {
        throw new Error({code: 500, description: `Error updating user. ${err.message}`});
    }
};

const removeUser = (userId) => {
    return User.deleteUser(userId)
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    removeUser,
    getUser
};