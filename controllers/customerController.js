var Q = require('q');
var customerData = require('../services/customerService');

module.exports.controller = function(app) {
    //route for /todolist
    app.route('/customer')
    .all(function(req, res, next) {
        next();
    })
    //get method of the route used to get all customers
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
        if(req.authenticated){
            customerData.createCustomer(req.body)
        .then(function(todolist) {
            res.json(todolist);
        })
        .catch(function(err) {
            console.log(err);
            res.status(500).json(err);
        });
        }else{
            res.status(401).json({message: 'You are not authorized to access this resource.'});
        }
        
    });
    // route for login/customer

    app.route('/login/customer/')
    .all(function(req, res, next) {
        next();
    })
    //get customer by email and pass
    .post(function(req, res) {
        if(req.authenticated){
            var email = req.body['email'];
            var password = req.body['password'];
            customerData.findCustomerByCredentials(email,password)
            .then(function(admin) {
                res.json(admin);
            })
            .catch(function(err) {
                console.log(err);
                res.status(500).json(err);
            });
        }
        else{
            res.status(401).json({message: 'You are not authorized to access this resource.'});
        }
        
    });

    //route for updating the todolist with id passed in the url
    app.route('/customer/:id')
    .all(function(req, res, next) {
        next();
    })
    //get todolist by id
    .get(function(req, res) {
        if(req.authenticated && req.role=="customer"){
        customerData.findCustomerById(req.params.id)
        .then(function(todolist) {
            res.json(todolist);
        })
        .catch(function(err) {
            console.log(err);
            res.status(500).json(err);
        });
        }else{
            res.status(401).json({message: 'You are not authorized to access this resource.'});
        }
    })
    //update todolist by id
    .put(function(req, res) {


        if(req.authenticated && req.role=="customer"){
        customerData.updateCustomer(req.params.id, req.body)
        .then(function(obj) {
            res.json(obj);
        })
        .catch(function(err) {
            console.log(err);
            res.json(err);
        });
        }else{
            res.status(401).json({message: 'You are not authorized to access this resource.'});
        }
    })
    //delete todolist by id
    .delete(function(req, res) {
        if(req.authenticated && req.role=="customer"){
        customerData.deleteCustomer(req.params.id)
        .then(function(obj) {
            res.json(obj);
        })
        .catch(function(err) {
            console.log(err);
            res.json(err);
        });
        }else{
            res.status(401).json({message: 'You are not authorized to access this resource.'});
        }
    });

};
