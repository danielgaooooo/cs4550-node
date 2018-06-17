module.exports = function (app) {
    app.get('/api/user', findAllUsers);
    app.get('/api/login/active', checkIfLoggedIn);
    app.get('/api/user/:userId', findUserById);
    app.post('/api/user', createUser);
    app.get('/api/profile', profile);
    app.post('/api/logout', logout);
    app.post('/api/login', login);
    app.put('/api/user/:userId', updateUser);


    var userModel = require('../models/user/user.model.server');

    function login(req, res) {
        var credentials = req.body;
        userModel
            .findUserByCredentials(credentials)
            .then(function (user) {
                if (user !== null) {
                    req.session['currentUser'] = user;
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            })
    }

    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params['userId'];
        userModel.updateUser(user, userId)
            .then(function (response) {
                if (response.ok === 1) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            })
    }

    function logout(req, res) {
        req.session.destroy();
        res.sendStatus(200);
    }

    function findUserById(req, res) {
        var id = req.params['userId'];
        userModel.findUserById(id)
            .then(function (user) {
                res.json(user);
            })
    }

    function profile(req, res) {
        res.send(req.session['currentUser']);
    }

    function createUser(req, res) {
        var user = req.body;
        var success;
        userModel.findUserByUsername(user.username)
            .then(function (response) {
                success = response === null;
            })
            .then(function () {
                if (success) {
                    userModel.createUser(user)
                        .then(function (user) {
                            req.session['currentUser'] = user;
                            res.send(user);
                        })
                } else {
                    res.sendStatus(404);
                }
            })
    }

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(function (users) {
                res.send(users);
            })
    }

    function checkIfLoggedIn(req, res) {
        var user = req.session['currentUser'];
        if (user === undefined) {
            res.sendStatus(404);
        } else {
            res.sendStatus(200);
        }
    }
};
