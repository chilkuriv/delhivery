var Q 			 = require('q'); // https://www.npmjs.com/package/q
// var mongoose 	 = require('mongoose-q')(require('mongoose')); // https://www.npmjs.com/package/mongoose-q
var mongoose     = require('mongoose');
mongoose.Promise = require('q').Promise;
var Schema       = mongoose.Schema;

var orderSchema   = new Schema({
    items: {type: Schema.Types.Array},
    discount: {type: Schema.Types.Number },
    userId:{type: Schema.Types.String, required: true },
    restaurantId:{type: Schema.Types.String, required: true },
    totalCost: {type: Schema.Types.Number},
    status: {type: Schema.Types.String, required: true },
    paymentId:{type: Schema.Types.String,required:false},
    DeliveredBy:{type: Schema.Types.String,default:null},
    description:{type: Schema.Types.String,default:null}
}, {
	timestamps: true
});

module.exports = mongoose.model('order', orderSchema);