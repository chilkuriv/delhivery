var Q = require('q');
var restaurantData = require('../services/restaurantService');

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
        if(req.authenticated){
            req.body["admin_id"] = "sxaxcsac"
            restaurantData.createRestaurant(req.body)
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

    app.route('/login/restaurant/')
    .all(function(req, res, next) {
        next();
    })
    //get customer by email and pass
    .post(function(req, res) {
        if(req.authenticated){
            var email = req.body['email'];
            var password = req.body['password'];
            restaurantData.findRestaurantByCredentials(email,password)
            .then(function(admin) {
                res.json(admin);
             })
            .catch(function(err) {
                console.log(err);
                res.status(500).json(err);
            });
        }else{
            res.status(401).json({message: 'You are not authorized to access this resource.'});
        }
    });
  
    app.route('/restaurant/admin')
    .all(function(req, res, next) {
        next();
    })
    //get method of the route used to get all todolists
    .get(function(req, res) {
        if(req.authenticated && req.role == "admin"){
            restaurantData.findAllRestaurantByAdmin(req['admin']['_id'])
            .then(function(todolists) {
                res.json(todolists);
            })
            .catch(function(err) {
                console.log(err);
                res.status(500).json(err);
            });
        }else{
            res.status(401).json({message: 'You are not authorized to access this resource.'});
        }
    });

    app.route('/restaurant/location/:lat/:long')
    .all(function(req, res, next) {
        next();
    })
    //get method of the route used to get all todolists
    .get(function(req, res) {
        restaurantData.findRestaurantByLocation(req.params.lat,req.params.long)
        .then(function(todolists) {
            res.json(todolists);
        })
        .catch(function(err) {
            console.log(err);
            res.status(500).json(err);
        });
    })

    //route for updating the todolist with id passed in the url
    app.route('/restaurant/:id')
    .all(function(req, res, next) {
        next();
    })
    //get todolist by id
    .get(function(req, res) {
        if(req.authenticated){
            restaurantData.findRestaurantById(req.params.id)
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
        if(req.authenticated && req.role == "admin"){
            req.body["admin_id"] = req["admin"]["_id"]
            restaurantData.updateRestaurant(req.params.id, req.body)
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
        if(req.authenticated && req.role == "admin"){

            restaurantData.delete(req.params.id, req["admin"]["_id"])
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


    app.route('/restaurant/search/:search')
    .all(function(req, res, next) {
        next();
    })
    //get todolist by id
    .get(function(req, res) {
        if(req.authenticated){
            restaurantData.findRestaurantsByName(req.params.search)
        .then(function(todolist) {
            res.json(todolist);
        })
        .catch(function(err) {
            console.log(err, "here maybe");
            res.status(500).json(err);
        });
        }else{
            res.status(401).json({message: 'You are not authorized to access this resource.'});
        }
        
    });

    app.route('/analytics/restaurant/:id')
    .all(function(req, res, next) {
        next();
    })
    //get todolist by id
    .get(function(req, res) {
        if(req.authenticated){
            restaurantData.getOrderByDayAndRestaurant(req.params.id)
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
    app.route('/analytics/orders/:id')
    .all(function(req, res, next) {
        next();
    })
    //get todolist by id
    .get(function(req, res) {
        if(req.authenticated){
            restaurantData.getOrderByDayAndRestaurant(req.params.id)
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
    app.route('/analytics/revenue/:id')
    .all(function(req, res, next) {
        next();
    })
    //get todolist by id
    .get(function(req, res) {
        if(req.authenticated){
            restaurantData.geRevenueByDayAndRestaurant(req.params.id)
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
    app.route('/analytics/category/:id')
    .all(function(req, res, next) {
        next();
    })
    //get todolist by id
    .get(function(req, res) {
        if(req.authenticated){
            restaurantData.getCategoryStatistics(req.params.id)
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
};
