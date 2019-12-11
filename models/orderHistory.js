var Q 			 = require('q'); // https://www.npmjs.com/package/q
// var mongoose 	 = require('mongoose-q')(require('mongoose')); // https://www.npmjs.com/package/mongoose-q
var mongoose     = require('mongoose');
mongoose.Promise = require('q').Promise;
var Schema       = mongoose.Schema;

var orderSchema   = new Schema({
    items: {type: Schema.Types.String},
    discount: {type: Schema.Types.Number },
    userId:{type: Schema.Types.ObjectId },
    status:{type: Schema.Types.String},
    paymentId:{type: Schema.Types.ObjectId},
    DeliveredBy:{type: Schema.Types.ObjectId},
    description:{type: Schema.Types.String}
}, {
	timestamps: true
});

module.exports = mongoose.model('orderhistory', orderSchema);