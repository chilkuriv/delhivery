var Q = require('q');
var Orders = require('../models/orderHistory');

module.exports = {

    findOrders: function() {
      var deferred = Q.defer();
      Orders.find()
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
        Orders.find({"restaurant":id,"status":filter})
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
      
      OrderInstance.items=body.items;
      OrderInstance.discount=body.discount;
      OrderInstance.userId=ObjectId(body.userId);
      OrderInstance.status=body.status;
      OrderInstance.paymentId=ObjectId(body.paymentId);
      OrderInstance.description=body.description;

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
              console.log(orderInstance);
              OrderInstance.items=body.items;
                OrderInstance.discount=body.discount;
                OrderInstance.userId=ObjectId(body.userId);
                OrderInstance.status=body.status;
                OrderInstance.paymentId=ObjectId(body.paymentId);
                OrderInstance.description=body.description;
                return OrderInstance.save();
          })
          .then(function() {
              deferred.resolve(OrderInstance);
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