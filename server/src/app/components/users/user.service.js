const User = require('../shared/models/user');

const getAllUsers = (page, pageSize) => {
    return User.getAll().then(result => {
        try {
            let allUsers = result.map(user => {
                const {id,name, email, password, created_at,updated_at} = user;
                return { id, name, email, password, created_at,updated_at};
            });
            let users = allUsers.slice(pageSize*page, pageSize*(page+1));
            return {
                data: users,
                pagination: {
                    page: page,
                    pageSize: pageSize,
                    rowCount: users.length,
                    pageCount:  Math.ceil(allUsers.length / pageSize),
                }
            };
        } catch (err){
            return Promise.reject(err);
        }
    }); 
};

const userValidation = (newUser) => {
    const {name, email, password} = newUser;
    const user = { name: name, email: email, password: password};
    for(let prop in user) {
        if (user.hasOwnProperty(prop) && user[prop] === undefined){
            return false;
        }
    }
    return true;
};

const getUser = (userId) => {
    return User.getUser(userId);
};

const createUser = (newUser) => {
    const validation = userValidation(newUser);
    if (!validation) {
        return Promise.reject();
    }
    const user = { name: newUser.name, email: newUser.email, password: newUser.password, created_at: new Date, updated_at: new Date };
    return User.createUser(user);
};

const updateUser = (userId,user) => {
    const validation = userValidation(user);
    if (!validation) {
        return Promise.reject();
    }
    const updatedUser = { name: user.name, email: user.email, password: user.password, updated_at: new Date };
    return User.updateUser(userId, updatedUser);
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
