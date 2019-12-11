var Q 			 = require('q'); // https://www.npmjs.com/package/q
// var mongoose 	 = require('mongoose-q')(require('mongoose')); // https://www.npmjs.com/package/mongoose-q
var mongoose     = require('mongoose');
mongoose.Promise = require('q').Promise;
var Schema       = mongoose.Schema;

var paymentSchema   = new Schema({
    type: {type: Schema.Types.String },
    cardNumber: {type: Schema.Types.String },
    validThr:{type: Schema.Types.String },
    cvv:{type: Schema.Types.Number},
    userId:{type: Schema.Types.String },
    isDefault:{type: Schema.Types.Boolean}

}, {
	timestamps: true
});

module.exports = mongoose.model('payment', paymentSchema);