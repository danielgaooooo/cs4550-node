var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

function findUserByCredentials(credentials) {
    var response = userModel.findOne(credentials);
    return response;
}

function findUserByUsername(username) {
    var response = userModel.findOne({username: username});
    return response;
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function createUser(user) {
    return userModel.create(user);
}

function findAllUsers() {
    return userModel.find();
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function updateUser(user, userId) {
    return userModel.update({_id: userId}, {$set: user});
}

var api = {
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserById: findUserById,
    findUserByCredentials: findUserByCredentials,
    findUserByUsername: findUserByUsername,
    updateUser: updateUser,
    deleteUser: deleteUser
};

module.exports = api;