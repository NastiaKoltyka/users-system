const userService = require('./user.service');

const getAllUsers = (req, res) => {
    return userService.getAllUsers(req.query.page, req.query.pageSize)
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(error => res.status(500).json({
            code: '500',
            description: error.message
        }));
};
const getUser = (req, res) => {
    return userService.getUser(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    code: '404',
                    description: 'There is no such user!'
                });
            } else {
                return res.status(200).json(user);
            }
        })
        .catch(error => res.status(500).json({
            code: '500',
            description: error.message
        }));
};

const createUser = (req, res) => {
    return userService.createUser(req.body)
        .then(() => {
            return res.status(200).json();
        }, () => {
            return res.status(400).json({
                code: '400',
                description: 'Please, fill all required fields!'
            })
        })
        .catch(error => res.status(500).json({
            code: '500',
            description: error.message
        }));
};

const updateUser = (req, res) => {
    return userService.updateUser(req.params.id, req.body)
        .then(() => {
            return res.status(200).json();
        }, () => {
            return res.status(404).json({
                code: '404',
                description: 'There is no such user!'
            });
        })
        .catch(error => res.status(500).json({
            code: '500',
            description: error.message
        }));
};

const removeUser = (req, res) => {
    return userService.removeUser(req.params.id)
        .then(isDeleted => {
            if (isDeleted) {
                return res.status(200).json({
                    code: '200',
                    description: 'User successfully removed'
                });
            } else {
                return res.status(404).json({
                    code: '404',
                    description: 'There is no such user!'
                });
            }
        })
        .catch(error => res.status(500).json({
            code: '500',
            description: error.message
        }));
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    removeUser,
    getUser
};