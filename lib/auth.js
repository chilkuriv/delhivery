// Include jwt to create and parse Json Web Tokens.
var jwt = require('./jwt.js');

// Include required Models of User Roles that need to be checked for Authentication.
var Admin 	  = require('../services/adminService');
// var Client    = require('../controllers/client');

// For Promises
var Q = require('q');

module.exports = {

	getRole: function(token) {
		var tokenData = jwt.decode(token);
		console.log(tokenData, "Get Role");
		if(tokenData != '') {
			return tokenData.role;
		} else {
			return null;
		}
	},

	validateUser: function(token) {
		var deferred = Q.defer();

		if(!token) {
			deferred.reject({message: 'Invalid token', status: 401});
		} else {
			var userData = jwt.decode(token);
			if(userData) {
				var userId   = userData.id;
				var userRole = userData.role;

				if(userRole == 'user') {
					if(userId) {
						// This means the token was for user account and the token was decoded correctly.
						// Now use this Id to retrieve user data and return that.
						User.findUserById(userId)
				            .then(function(user) {
				            	// TODO: Check if this logic works also when userId is not present in the database.
				            	// TODO: If it does not work then explicitly throw the error in case user is null.
				            	deferred.resolve(user);
				            })
				            .catch(function(err) {
				            	deferred.reject({message: err, status: 500});
				            })
				            .done();
					} else {
						deferred.reject({message: 'User id is null', status: 401});
					}
				} else {
					deferred.reject({message: 'Role is not the same as the requested resource', status: 401});
				}
			} else {
				deferred.reject({message: 'Invalid Token', status: 401});
			}

			return deferred.promise;
		}
	},

	validateAdmin: function(token) {
		var deferred = Q.defer();

		if(!token) {
			deferred.reject({message: 'Invalid token', status: 401});
		} else {
			var adminData = jwt.decode(token);
			if(adminData) {
				var adminId   = adminData.id;
				var adminRole = adminData.role;

				if(adminRole == 'admin') {
					if(adminId) {
						// This means the token was for user account and the token was decoded correctly.
						// Now use this Id to retrieve user data and return that.
						Admin.findAdminById(adminId)
				            .then(function(admin) {
				            	// TODO: Check if this logic works also when userId is not present in the database.
				            	// TODO: If it does not work then explicitly throw the error in case user is null.
				            	deferred.resolve(admin);
				            })
				            .catch(function(err) {
				            	deferred.reject({message: err, status: 500});
				            })
				            .done();
					} else {
						deferred.reject({message: 'Admin id is null', status: 401});
					}
				} else {
					deferred.reject({message: 'Role is not the same as the requested resource', status: 401});
				}
			} else {
				deferred.reject({message: 'Invalid Token', status: 401});
			}
			return deferred.promise;
		}
	}

};
