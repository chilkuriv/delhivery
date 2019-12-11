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
    //email id of the restaurant owner
    email: {type: Schema.Types.String, required: true },
    //phone number
    phone: {type: Schema.Types.String, required: true },
    // coordiantes
    loc: {
        type: { type: String },
        coordinates: [Number]
    },
    // background image 
    bgimg: {type: Schema.Types.String, required:true},
    // price
    price: {type: Schema.Types.String, required:true},
    // rating of the restaurant
    rating: {type: Schema.Types.Number, required:true},
    no_rating: {type: Schema.Types.Number, required:true},
    // category
    type_of_food: {type: Schema.Types.String, required:true}
}, {
	timestamps: true
});

restaurantSchema.index({"loc": "2dsphere"})

module.exports = mongoose.model('restaurant', restaurantSchema);