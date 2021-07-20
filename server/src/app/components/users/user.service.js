const User = require('../shared/models/user');

const getAllUsers = () => {
    return User.getAll();
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
