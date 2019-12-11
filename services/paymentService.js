var Q = require('q');
var {ObjectId} = require('mongodb');
var Payments = require('../models/payment');

module.exports = {

    findPayments: function() {
      var deferred = Q.defer();
      Payments.find()
          .then(function(payments) {
              console.log(payments);
              deferred.resolve(payments);
          })
          .catch(function(err) {
              console.log("Error:",err);
              deferred.reject({message: "Internal Server Error", error: err});
          });
      return deferred.promise;
    },

    findPaymentById: function(id) {
      var deferred = Q.defer();
      
      Payments.findById(id)
        .then(function(payment) {
          deferred.resolve(payment);
        })
        .catch(function(err) {
          deferred.reject({message: "Internal Server Error", error: err});
        });
      return deferred.promise;
    },

    createPayment: function(body) {
      console.log(body);
      var deferred = Q.defer();
      var PaymentInstance  = new Payments();
      console.log(1234567);
      PaymentInstance.type=body.type;
      PaymentInstance.cardNumber=body.cardNumber
      PaymentInstance.validThr=body.validThr
      PaymentInstance.cvv=body.cvv;
      PaymentInstance.userId=body.userId;
      PaymentInstance.isDefault=body.isDefault;

    PaymentInstance.save()
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

    updatePayment: function(id, body) {
      var deferred = Q.defer();
      Payments.findById(id)
          .then(function(paymentIstance) {
              console.log(paymentIstance);
              PaymentInstance.type=body.type;
                PaymentInstance.cardNumber=body.cardNumber
                PaymentInstance.validThr=body.validThr
                PaymentInstance.cvv=body.cvv;
                PaymentInstance.userId=body.userId;
                PaymentInstance.isDefault=body.isDefault;
              return PaymentInstance.save();
          })
          .then(function() {
              deferred.resolve(paymentIstance);
          })
          .catch(function(err) {
              console.log("came here err", err);
              deferred.reject({message: "Internal Server Error", error: err});
          });
      return deferred.promise;
    },

    deletePayment: function(id) {
      var deferred = Q.defer();
      Payments.remove({ _id: id })
          .then(function(payment) {
              deferred.resolve({message: 'Successfully deleted', object: payment});
          })
          .catch(function(err) {
              console.log("came here err", err);
              deferred.reject({message: "Internal Server Error", error: err});
          });
      return deferred.promise;
    }
};