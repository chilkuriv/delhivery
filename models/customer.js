var Q 			 = require('q');
var mongoose     = require('mongoose');
mongoose.Promise = require('q').Promise;
var Schema       = mongoose.Schema;

// customer mongodb model
var customerSchema   = new Schema({
    //username field with type string
    username: {type: Schema.Types.String, required: true },
    //password field with type string
    password: {type: Schema.Types.String, required: true },
    //Name
    name: {type: Schema.Types.String, required:true},
    //email
    email: {type: Schema.Types.String, required:true},
    //phone
    phone: {type: Schema.Types.String, required:true},

}, {
	timestamps: true
});

module.exports = mongoose.model('customer', customerSchema);
