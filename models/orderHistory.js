var Q 			 = require('q'); // https://www.npmjs.com/package/q
// var mongoose 	 = require('mongoose-q')(require('mongoose')); // https://www.npmjs.com/package/mongoose-q
var mongoose     = require('mongoose');
mongoose.Promise = require('q').Promise;
var Schema       = mongoose.Schema;

var orderSchema   = new Schema({
    items: {type: Schema.Types.DocumentArray},
    discount: {type: Schema.Types.Integer },
    userId:{type: Schema.Types.ObjectId, required: true },
    status:{type: Schema.Types.String, required: true },
    paymentId:{type: Schema.Types.ObjectId,required:false},
    DeliveredBy:{type: Schema.Types.ObjectId,default:null},
    description:{type: Schema.Types.String,default:null}
}, {
	timestamps: true
});

module.exports = mongoose.model('order', orderSchema);