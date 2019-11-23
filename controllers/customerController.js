var Q = require('q');
var customerData = require('../services/customerServices');

module.exports.controller = function(app) {
    //route for /todolist
    app.route('/customer')
    .all(function(req, res, next) {
        next();
    })
    //get method of the route used to get all todolists
    .get(function(req, res) {
        customerData.findAllCustomers()
        .then(function(todolists) {
            res.json(todolists);
        })
        .catch(function(err) {
            console.log(err);
            res.status(500).json(err);
        });
    })
    //post method of the route used to create all todolist
    .post(function(req, res) {
        customerData.createCustomer(req.body)
        .then(function(todolist) {
            res.json(todolist);
        })
        .catch(function(err) {
            console.log(err);
            res.status(500).json(err);
        });
    });

    //route for updating the todolist with id passed in the url
    app.route('/customer/:id')
    .all(function(req, res, next) {
        next();
    })
    //get todolist by id
    .get(function(req, res) {
        customerData.findCustomerById(req.params.id)
        .then(function(todolist) {
            res.json(todolist);
        })
        .catch(function(err) {
            console.log(err);
            res.status(500).json(err);
        });
    })
    //update todolist by id
    .put(function(req, res) {
        customerData.updateCustomer(req.params.id, req.body)
        .then(function(obj) {
            res.json(obj);
        })
        .catch(function(err) {
            console.log(err);
            res.json(err);
        });
    })
    //delete todolist by id
    .delete(function(req, res) {
        customerData.deleteCustomer(req.params.id)
        .then(function(obj) {
            res.json(obj);
        })
        .catch(function(err) {
            console.log(err);
            res.json(err);
        });
    });

};
