var Q = require('q');
var Menu = require('../models/menu');

module.exports = {
    //find all menu in the collection
    findMenus: function() {
      var deferred = Q.defer();
      Menu.find()
          .then(function(menus) {
              deferred.resolve(menus);
          })
          .catch(function(err) {
              deferred.reject({message: "Internal Server Error", error: err});
          });
      return deferred.promise;
    },

    //find menu by id in the collection
    findMenuById: function(id) {
      var deferred = Q.defer();
      Menu.findById(id)
        .then(function(menu) {
          deferred.resolve(menu);
        })
        .catch(function(err) {
          deferred.reject({message: "Internal Server Error", error: err});
        });
      return deferred.promise;
    },

    findMenuByRestaurantId: function(id) {
        var deferred = Q.defer();
        Menu.aggregate([{$group:{_id:"$category",menu: { "$push": "$$ROOT" }}}])
          .then(function(menu) {
            deferred.resolve(menu);
          })
          .catch(function(err) {
            deferred.reject({message: "Internal Server Error", error: err});
          });
        return deferred.promise;
      },

    //create menu with username and text
    createMenu: function(body) {
      var deferred = Q.defer();
      var menu            = new Menu();
      menu.restaurant_id  = body.restaurant_id;
      menu.description    = body.description;
      menu.img            = body.img;
      menu.category       = body.category;
      menu.name           = body.name;
      menu.price          = body.price;

      menu.save()
          .then(function(obj) {
              obj = obj.toObject(); // swap for a plain javascript object instance
              deferred.resolve(obj);
          })
          .catch(function(err) {
              deferred.reject({message: "Internal Server Error", error: err});
          });

      return deferred.promise;
    },

    //update menu
    updateMenu: function(id, body) {
      var deferred = Q.defer();
      Menu.findById(id)
          .then(function(menu) {
              if('price' in body){
                menu.price = body.price;
              }
              if("category" in body){
                menu.category = body.category;
              }
              if("name" in body){
                menu.name = body.name;
              }
              if("img" in body){
                  menu.img = body.img;
              }
              if("description" in body){
                  menu.description = body.description;
              }
              if("isavailable" in body){
                menu.isavailable = body.isavailable;
            }
              return menu.save();
          })
          .then(function(menu) {
              deferred.resolve(menu);
          })
          .catch(function(err) {
              deferred.reject({message: "Internal Server Error", error: err});
          });
      return deferred.promise;
    },

    //delete menu from database
    deleteMenu: function(id) {
      var deferred = Q.defer();
      Menu.remove({ _id: id })
          .then(function(menu) {
              deferred.resolve({message: 'Successfully deleted', object: menu});
          })
          .catch(function(err) {
              deferred.reject({message: "Internal Server Error", error: err});
          });
      return deferred.promise;
    }
};
