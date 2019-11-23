var Q = require('q');
var restaurantData = require('../models/restaurant');

module.exports = {
    //find all restaurant in the collection

    findAllRestaurant: function() {
        var deferred = Q.defer();
        restaurantData.find()
            .then(function(restaurantData) {
                deferred.resolve(restaurantData);
            })
            .catch(function(err) {
                deferred.reject({message: "Internal Server Error", error: err});
            });
        return deferred.promise;
      },

    // find restaurant by id

    findRestaurantById: function(id){
        var deferred = Q.defer();
        restaurantData.findById(id)
            .then(function(restaurantData){
                deferred.resolve(restaurantData);
            })
            .catch(function(err){
                deferred.reject({message: "Internal Server Error", error: err});
            });
            return deferred.promise;
    },

    // create restaurant with all data

    createRestaurant: function(body){
        var deferred = Q.defer();
        var restaurant =  new restaurantData();
        restaurant.name = body.name;
        restaurant.admin_id = body.admin_id;
        restaurant.email = body.email;
        restaurant.address = body.phone;
        restaurant.price = body.price;
        restaurant.rating = body.rating;
        restaurant.loc = body.loc;
        restaurant.phone = body.phone;


        restaurant.save()
            .then(function(obj){
                obj = obj.toObject();
                deferred.resolve(obj);
            })
            .catch(function(err){
                deferred.reject({message: "Internal Server Error", error: err});
            })

            return deferred.promise;
    },

    updateRestaurant: function(id, body) {
        var deferred = Q.defer();
        restaurantData.findById(id)
            .then(function(restaurantData) {
                if('name' in body){
                    restaurantData.name = body.name;
                }
                if("address" in body){
                    restaurantData.address = body.address;
                }
                if("price" in body){
                    restaurantData.price = body.price;
                }
                if("email" in body){
                    restaurantData.email = body.email;
                }
                if("phone" in body){
                    restaurantData.phone = body.phone;
                }
                if("rating" in body){
                    restaurantData.rating = body.rating;
                }
                if("loc" in body){
                    restaurantData.loc = body.loc;
                }
                return restaurantData.save();
            })
            .then(function(todolist) {
                deferred.resolve(todolist);
            })
            .catch(function(err) {
                deferred.reject({message: "Internal Server Error", error: err});
            });
        return deferred.promise;
      },

      delete: function(id, adminId) {
          var deferred = Q.defer();
          restaurantData.findOneAndRemove({_id: id, admin_id: adminId})
            .then(function(restaurant){
                // add more logic
                deferred.resolve({message: 'Successfully deleted', object: restaurant})
            })
            .catch(function(err){
                deferred.reject({message: "Internal Server Error", error: err});
            });
            return deferred.promise;
      },
      findRestaurantByLocation: function(lat,long){
        restaurantData.aggregate(
            [
                { "$geoNear": {
                    "near": {
                        "type": "Point",
                        "coordinates": [long,lat]
                    },
                    "distanceField": "distance",
                    "spherical": true,
                    "maxDistance": 10000
                }}
            ],
            function(err,results) {
        
            }
        )
    },
  

};