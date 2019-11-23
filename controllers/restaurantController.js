var Q = require('q');
var restaurantData = require('../services/restaurantServices');

module.exports.controller = function(app) {
    //route for /todolist
    app.route('/restaurant')
    .all(function(req, res, next) {
        next();
    })
    //get method of the route used to get all todolists
    .get(function(req, res) {
        restaurantData.findAllRestaurant()
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
        restaurantData.createRestaurant(req.body)
        .then(function(todolist) {
            res.json(todolist);
        })
        .catch(function(err) {
            console.log(err);
            res.status(500).json(err);
        });
    });

    //route for updating the todolist with id passed in the url
    app.route('/restaurant/:id')
    .all(function(req, res, next) {
        next();
    })
    //get todolist by id
    .get(function(req, res) {
        restaurantData.findRestaurantById(req.params.id)
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
        restaurantData.updateRestaurant(req.params.id, req.body)
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
        restaurantData.deleteRestaurant(req.params.id)
        .then(function(obj) {
            res.json(obj);
        })
        .catch(function(err) {
            console.log(err);
            res.json(err);
        });
    });

};
