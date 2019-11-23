var Q = require('q');
var Admin = require('../services/adminService');

module.exports.controller = function(app) {
    //route for /admin
    app.route('/admin')
    .all(function(req, res, next) {
        next();
    })
    //get method of the route used to get all admins
    .get(function(req, res) {
        Admin.findAdmins()
        .then(function(admins) {
            res.json(admins);
        })
        .catch(function(err) {
            console.log(err);
            res.status(500).json(err);
        });
    })
    //post method of the route used to create all admin
    .post(function(req, res) {
        Admin.createAdmin(req.body)
        .then(function(admin) {
            res.json(admin);
        })
        .catch(function(err) {
            console.log(err);
            res.status(500).json(err);
        });
    });

    app.route('/login/admin')
    .all(function(req, res, next) {
        next();
    })
    //get admin by id
    .post(function(req, res) {
        var email = req.body['email'];
        var password = req.body['password'];
        Admin.findAdminByCredentials(email,password)
        .then(function(admin) {
            res.json(admin);
        })
        .catch(function(err) {
            console.log(err);
            res.status(500).json(err);
        });
    });
    
    //route for updating the admin with id passed in the url
    app.route('/admin/:id')
    .all(function(req, res, next) {
        next();
    })
    //get admin by id
    .get(function(req, res) {
        Admin.findAdminById(req.params.id)
        .then(function(admin) {
            res.json(admin);
        })
        .catch(function(err) {
            console.log(err);
            res.status(500).json(err);
        });
    })
    //update admin by id
    .put(function(req, res) {
        Admin.updateAdmin(req.params.id, req.body)
        .then(function(obj) {
            res.json(obj);
        })
        .catch(function(err) {
            console.log(err);
            res.json(err);
        });
    })
    //delete admin by id
    .delete(function(req, res) {
        Admin.deleteAdmin(req.params.id)
        .then(function(obj) {
            res.json(obj);
        })
        .catch(function(err) {
            console.log(err);
            res.json(err);
        });
    });

};
