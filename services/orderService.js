var Q = require('q');
var Orders = require('../models/orderHistory');
console.log(456);
module.exports = {

    findOrders: function() {
      var deferred = Q.defer();
      Orders.find()
          .then(function(orders) {
              console.log(orders,"sdfknsjdfkjasdfjkas");
              deferred.resolve(orders);
          })
          .catch(function(err) {
              console.log("Error:",err);
              deferred.reject({message: "Internal Server Error", error: err});
          });
      return deferred.promise;
    },

    findOrdersByUserId: function(id) {
      console.log(12343215);
        var deferred = Q.defer();
        Orders.find({"userId":id})
            .then(function(orders) {
                console.log(orders);
                deferred.resolve(orders);
            })
            .catch(function(err) {
                console.log("Error:",err);
                deferred.reject({message: "Internal Server Error", error: err});
            });
        return deferred.promise;
      },
      findOrdersByRestaurant: function(id,filter) {
        var deferred = Q.defer();
        Orders.find({"restaurantId":id,"status":filter})
            .then(function(orders) {
                console.log(orders);
                deferred.resolve(orders);
            })
            .catch(function(err) {
                console.log("Error:",err);
                deferred.reject({message: "Internal Server Error", error: err});
            });
        return deferred.promise;
      },

      
    findOrderById: function(id) {
      var deferred = Q.defer();
      
      Payments.findById(id)
        .then(function(order) {
          deferred.resolve(order);
        })
        .catch(function(err) {
          deferred.reject({message: "Internal Server Error", error: err});
        });
      return deferred.promise;
    },

    createOrder: function(body) {
      var deferred = Q.defer();
      var OrderInstance  = new Orders();
      if(body.items){
        OrderInstance.items=body.items;
      }
      if(body.discount){
        OrderInstance.discount=body.discount;
      }
      if(body.userId){
        OrderInstance.userId=body.userId;
      }
      if(body.restaurantId){
        OrderInstance.restaurantId = body.restaurantId;
      }
    OrderInstance.status="Pending";
      if(body.paymentId){
        OrderInstance.paymentId=body.paymentId;
      }
      if(body.description){
        OrderInstance.description=body.description;
      }
      if(body.totalCost){
        OrderInstance.totalCost = body.totalCost;
      }
      

      OrderInstance.save()
          .then(function(obj) {
              obj = obj.toObject(); // swap for a plain javascript object instance
              deferred.resolve(obj);
          })
          .catch(function(err) {
              if(err.code == 11000) {
                  err = 'Email address already exists';
              }
              deferred.reject({message: "Internal Server Error", error: err});
          });

      return deferred.promise;
    },

    updateOrder: function(id, body) {
      var deferred = Q.defer();
      Orders.findById(id)
          .then(function(orderInstance) {

                orderInstance.status = body.status;
                return orderInstance.save();
          })
          .then(function(obj) {
              deferred.resolve(obj);
          })
          .catch(function(err) {
              console.log("came here err", err);
              deferred.reject({message: "Internal Server Error", error: err});
          });
      return deferred.promise;
    },

    deleteOrder: function(id) {
      var deferred = Q.defer();
      Orders.remove({ _id: id })
          .then(function(order) {
              deferred.resolve({message: 'Successfully deleted', object: order});
          })
          .catch(function(err) {
              console.log("came here err", err);
              deferred.reject({message: "Internal Server Error", error: err});
          });
      return deferred.promise;
    }
};