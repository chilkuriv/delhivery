var jwt = require('jwt-simple');

module.exports = {

	secret: 'iVaIsJaRViS',

	encode: function(id) {
		// The supported algorithms for encoding and decoding are HS256, HS384, HS512 and RS256.
		// encode
		// encode using HS512
		// jwt.encode(payload, secret, 'HS512')
		var payload = id;
		var token = jwt.encode(payload, this.secret);
		return token;
	},

	decode: function(token) {
		console.log(token);
		if(token){
			// console.log(token.split('.'));
			try {
				if(token.split('.').length == 3){
					var id = jwt.decode(token, this.secret);
					return id;
				} else {
					return '';
				}
			} catch(err) {
				return '';
			}
		} else {
			return '';
		}
	}

};
