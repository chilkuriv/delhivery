var Q 			 = require('q'); // https://www.npmjs.com/package/q
// var mongoose 	 = require('mongoose-q')(require('mongoose')); // https://www.npmjs.com/package/mongoose-q
var mongoose     = require('mongoose');
mongoose.Promise = require('q').Promise;
var Schema       = mongoose.Schema;

var orderSchema   = new Schema({
    // items array contains list of menu objects with quantity and price
    items: {type: Schema.Types.Mixed},
    // discount if any applied
    discount: {type: Schema.Types.Number },
    // userId of the customer
    userId:{type: Schema.Types.String, required: true },
    // restaurantId of the restaurnat
    restaurantId:{type: Schema.Types.String, required: true },
    // total price
    totalCost: {type: Schema.Types.Number},
    // status
    status: {type: Schema.Types.String },
    paymentId:{type: Schema.Types.String,required:false},
    DeliveredBy:{type: Schema.Types.String,default:null},
    description:{type: Schema.Types.String,default:null}

}, {
	timestamps: true
});

module.exports = mongoose.model('orderhistory', orderSchema);