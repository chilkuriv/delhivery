var Q = require('q');
var Menu = require('../services/menuService');

module.exports.controller = function(app) {
    //route for /menu
    app.route('/menu')
    .all(function(req, res, next) {
        next();
    })
    //get method of the route used to get all menus
    .get(function(req, res) {
        Menu.findMenus()
        .then(function(menus) {
            res.json(menus);
        })
        .catch(function(err) {
            console.log(err);
            res.status(500).json(err);
        });
    })
    //post method of the route used to create all menu
    .post(function(req, res) {
        Menu.createMenu(req.body)
        .then(function(menu) {
            res.json(menu);
        })
        .catch(function(err) {
            console.log(err);
            res.status(500).json(err);
        });
    });

    //route for updating the menu with id passed in the url
    app.route('/menu/restaurant/:id')
    .all(function(req, res, next) {
        next();
    })
    .get(function(req, res) {
        Menu.findMenuByRestaurantId(req.params.id)
        .then(function(menu) {
            res.json(menu);
        })
        .catch(function(err) {
            console.log(err);
            res.status(500).json(err);
        });
    })
    //route for updating the menu with id passed in the url
    app.route('/menu/:id')
    .all(function(req, res, next) {
        next();
    })
    //get menu by id
    .get(function(req, res) {
        Menu.findMenuById(req.params.id)
        .then(function(menu) {
            res.json(menu);
        })
        .catch(function(err) {
            console.log(err);
            res.status(500).json(err);
        });
    })
    //update menu by id
    .put(function(req, res) {
        Menu.updateMenu(req.params.id, req.body)
        .then(function(obj) {
            res.json(obj);
        })
        .catch(function(err) {
            console.log(err);
            res.json(err);
        });
    })
    //delete menu by id
    .delete(function(req, res) {
        Menu.deleteMenu(req.params.id)
        .then(function(obj) {
            res.json(obj);
        })
        .catch(function(err) {
            console.log(err);
            res.json(err);
        });
    });

};
