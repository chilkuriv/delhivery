var Q = require('q');
var Admin = require('../models/admin');
var jwt = require('../lib/jwt');

module.exports = {
    //find all admin in the collection
    findAdmins: function() {
      var deferred = Q.defer();
      Admin.find()
          .then(function(admins) {
              deferred.resolve(admins);
          })
          .catch(function(err) {
              deferred.reject({message: "Internal Server Error", error: err});
          });
      return deferred.promise;
    },

    //find admin by id in the collection
    findAdminById: function(id) {
      var deferred = Q.defer();
      Admin.findById(id)
        .then(function(admin) {
          deferred.resolve(admin);
        })
        .catch(function(err) {
          deferred.reject({message: "Internal Server Error", error: err});
        });
      return deferred.promise;
    },

    findAdminByCredentials: function(email, password) {
        var deferred = Q.defer();
  
        Admin.findOne({email: email, password: password})
              .then(function(admin) {
                  if(admin) {
                      obj = admin.toObject(); // swap for a plain javascript object instance
                      obj.token = jwt.encode({id: obj._id, role: 'admin'});
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

    //create admin with username and text
    createAdmin: function(body) {
      var deferred = Q.defer();
      var admin            = new Admin();
      admin.email          = body.email;
      admin.password       = body.password;
      admin.name           = body.name;
      admin.phone          = body.phone;

      admin.save()
          .then(function(obj) {
              obj = obj.toObject(); // swap for a plain javascript object instance
              deferred.resolve(obj);
          })
          .catch(function(err) {
              deferred.reject({message: "Internal Server Error", error: err});
          });

      return deferred.promise;
    },

    //update admin
    updateAdmin: function(id, body) {
      var deferred = Q.defer();
      Admin.findById(id)
          .then(function(admin) {
              if('email' in body){
                admin.email = body.email;
              }
              if("password" in body){
                admin.password = body.password;
              }
              if("name" in body){
                admin.name = body.name;
              }
              if("phone" in body){
                  admin.phone = body.phone;
              }
              return admin.save();
          })
          .then(function(admin) {
              deferred.resolve(admin);
          })
          .catch(function(err) {
              deferred.reject({message: "Internal Server Error", error: err});
          });
      return deferred.promise;
    },

    //delete admin from database
    deleteAdmin: function(id) {
      var deferred = Q.defer();
      Admin.remove({ _id: id })
          .then(function(admin) {
              deferred.resolve({message: 'Successfully deleted', object: admin});
          })
          .catch(function(err) {
              deferred.reject({message: "Internal Server Error", error: err});
          });
      return deferred.promise;
    }
};
