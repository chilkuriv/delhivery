var Q = require('q');
var OrderService = require('../services/orderService');
// supports simple crud on orders collection
// Additional operations like orders filtering using restaurantid and user id etc
module.exports.controller = function(app) {
    app.route('/orders')
    .all(function(req, res, next) {
        next();
    })
    .get(function(req, res) {
        OrderService.findOrders()
        .then(function(orders) {
            res.json(orders);
        })
        .catch(function(err) {
            console.log(err);
            res.status(500).json(err);
        });
    })
    .post(function(req, res) {
        OrderService.createOrder(req.body)
        .then(function(order) {
            res.json(order);
        })
        .catch(function(err) {
            console.log(err);
            res.status(500).json(err);
        });
    });

    app.route('/orders/:id/:filter')
    .all(function(req, res, next) {
        next();
    })
    .get(function(req, res) {
        
        OrderService.findOrdersByRestaurant(req.params.id,req.params.filter)
        .then(function(orders) {
            res.json(orders);
        })
        .catch(function(err) {
            console.log(err);
            res.status(500).json(err);
        });
    });
    app.route('/orders/:id')
    .all(function(req, res, next) {
        next();
    })
    .get(function(req, res) {
        OrderService.findOrderById(req.params.id)
        .then(function(order) {
            res.json(order);
        })
        .catch(function(err) {
            console.log(err);
            res.status(500).json(err);
        });
    })
    .put(function(req, res) {
        OrderService.updateOrder(req.params.id, req.body)
        .then(function(obj) {
            res.json(obj);
        })
        .catch(function(err) {
            console.log(err);
            res.json(err);
        });
    })
    .delete(function(req, res) {
        OrderService.deleteOrder(req.params.id)
        .then(function(obj) {
            res.json(obj);
        })
        .catch(function(err) {
            console.log(err);
            res.json(err);
        });
    });
    app.route('/userorders/:id')
    .all(function(req, res, next) {
        console.log("9999");
        next();
    })
    .get(function(req, res) {
        console.log(1234345);
        OrderService.findOrdersByUserId(req.params.id)
        .then(function(orders) {
            res.json(orders);
        })
        .catch(function(err) {
            console.log(err);
            res.status(500).json(err);
        });
    });
    

};