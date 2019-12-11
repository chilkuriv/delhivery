var Q 			 = require('q');
var mongoose     = require('mongoose');
mongoose.Promise = require('q').Promise;
var Schema       = mongoose.Schema;

// restaurant mongodb model
var restaurantSchema   = new Schema({
    //name field with type string
    name: {type: Schema.Types.String, required: true },
    //address field with type string
    address: {type: Schema.Types.String, required: true },

    admin_id: {type: Schema.Types.String, required: true},

    email: {type: Schema.Types.String, required: true },
    //address field with type string
    phone: {type: Schema.Types.String, required: true },
    // coordiantes
    loc: {
        type: { type: String },
        coordinates: [Number]
    },
    price: {type: Schema.Types.String, required:true},
    rating: {type: Schema.Types.Number, required:true},
    no_rating: {type: Schema.Types.Number, required:true},
    type_of_food: {type: Schema.Types.String, required:true}
}, {
	timestamps: true
});

restaurantSchema.index({"loc": "2dsphere"})

module.exports = mongoose.model('restaurant', restaurantSchema);