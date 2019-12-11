var Q = require('q');
var restaurantData = require('../models/restaurant');
var Orders = require('../models/orderHistory');
function dateFromDay(year, day){
    var date = new Date(year, 0); // initialize a date in `year-01-01`
    return new Date(date.setDate(day)); // add the number of days
}
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
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

    findAllRestaurantByAdmin: function(id) {
    var deferred = Q.defer();
    restaurantData.find({"admin_id":id})
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
    

    findRestaurantsByName: function(name){
        var deferred = Q.defer();
        
        restaurantData.find(
            { 
                name: { 
                    $regex: ".*"+name+".*",
                    $options: 'i'
                } 
            }
        ).then(function(restaurantData){
            deferred.resolve(restaurantData);
        }).catch(function(err){
            deferred.reject({message: "Internal Server Error", error: err});
        })

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
        restaurant.rating = 0;
        restaurant.loc = body.loc;
        restaurant.phone = body.phone;
        restaurant.bgimg = body.bgimg;
        restaurant.description = body.description;
        restaurant.no_rating =0;
        restaurant.type_of_food = body.type_of_food;


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
                if("totalreviews" in body){
                    restaurantData.totalreviews = body.totalreviews;
                } 
                if("bgimg" in body){
                    restaurantData.bgimg = body.bgimg;
                }
                if("description" in body){
                    restaurantData.description = body.description;
                }
                if("no_rating" in body){
                    restaurantData.no_rating = body.no_rating;
                }
                if("type_of_food" in body){
                    restaurantData.type_of_food = body.type_of_food;
                }
                return restaurantData.save()
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
            ])
            .then(function(restaurant){
                // add more logic
                deferred.resolve({message: 'Successfully deleted', object: restaurant})
            })
            .catch(function(err){
                deferred.reject({message: "Internal Server Error", error: err});
            });
            return deferred.promise;
    },

    
    
    getOrderByDayAndRestaurant(restaurant_id){
        
        var deferred = Q.defer();
        Orders.aggregate([{"$match":{"restaurantId":restaurant_id}},{$group:{_id:{"$dayOfYear":"$createdAt"},orders: { "$sum": 1 }}}])
          .then(function(menu) {
            for(let i of menu){
                var dd = dateFromDay(2019,i["_id"])
                i["y"] = i["orders"]
                i["label"] = monthNames[dd.getMonth()]+"-"+dd.getDate()
            }
            deferred.resolve(menu);
          })
          .catch(function(err) {
            deferred.reject({message: "Internal Server Error", error: err});
          });
        return deferred.promise;
    },

    geRevenueByDayAndRestaurant(restaurant_id){
        
        var deferred = Q.defer();
        Orders.aggregate([{"$match":{"restaurantId":restaurant_id}},{$group:{_id:{"$dayOfYear":"$createdAt"},revenue: { "$sum": "$totalCost" }}}])
          .then(function(menu) {
            for(let i of menu){
                var dd = dateFromDay(2019,i["_id"])
                i["y"] = i["revenue"]
                i["label"] = monthNames[dd.getMonth()]+"-"+dd.getDate()
            }
            deferred.resolve(menu);
          })
          .catch(function(err) {
            deferred.reject({message: "Internal Server Error", error: err});
          });
        return deferred.promise;
    },

    getCategoryStatistics(restaurant_id){
        var deferred = Q.defer();
        Orders.aggregate([{"$match":{"restaurantId":restaurant_id}},{$unwind:"$items"},{$group: { _id: "$items.category" ,"count":{"$sum":1 }}}])
          .then(function(menu) {
              for(let i of menu){
                  i["name"] = i["_id"][0]
                  i["y"] = i["count"]
              }
            deferred.resolve(menu);
          })
          .catch(function(err) {
            deferred.reject({message: "Internal Server Error", error: err});
          });
        return deferred.promise;
    },
    findRestaurantByCredentials: function(email, password){
        var deferred = Q.defer();
  
        restaurantData.findOne({email: email, password: password})
              .then(function(admin) {
                  if(admin) {
                      obj = admin.toObject(); // swap for a plain javascript object instance
                      obj.token = jwt.encode({id: obj._id, role: 'restaurant'});
                      delete obj["_id"];
                      delete obj["password"];
                      deferred.resolve(obj);
                  } else {
                      deferred.reject({message: "Wrong email or password"});
                  }
              })
              .catch(function(err) {
                  console.log(err.toString());
                  deferred.reject({message: "Internal Server Error", error: err.toString()});
              });
  
          return deferred.promise;
      },


};