const mongoose = require('mongoose');
const moment = require('moment');
const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');

const User = mongoose.model('users');
const Errors = require('./errors');

function tryLogin(username, password) {
    return User.findOne({username}).then((user) => {
        if (!user) {
            throw new Errors.NotFound('Username not found');
        }
        return bcrypt.compare(password, user.password).then((res) => {
            if (res) {
                return formatUser(user);
            } else {
                throw new Errors.ValidationError('Incorrect password');
            } 
        });
    });
}

function getUser(userId) {
    return User.findOne({ userId }).then(user => formatUser(user));
}

function createUser(user) {
    return bcrypt.hash(user.password, 10).then((hash) => {

        return User.findOne({ username: user.username}).then(existingUser => {
            if (existingUser) {
                throw new Errors.ValidationError('Username already taken');
            }
            var newUser = {
                userId: uuid(),
                password: hash,
                createdDate: moment(),
                username: user.username,
            };
            return new User(newUser).save().then(() => { 
                return { userId: newUser.userId };
            });
        });
    });
}

function changePassword(username, password, newPassword) {
    return tryLogin(username, password).then(res => {
        return bcrypt.hash(newPassword, 10).then((hash) => {
            return User.updateOne({ username }, { $set: { password: hash} }).then(() => {
                return { success: true };
            });
        });
    });
}

function formatUser(user) {
    return {
        username: user.username,
        userId: user.userId,
    };
}

module.exports = {
    createUser, tryLogin, getUser, changePassword
}
