var mongoose     = require('mongoose');
mongoose.Promise = require('q').Promise;
var Schema       = mongoose.Schema;

var menuSchema   = new Schema({
    // restaurant_id foreign key
    restaurant_id: {type: Schema.Types.String, required: true , default: ""},
    // restaurant name
    name: {type: Schema.Types.String, required: true , default: ""},
    // description of the restaurant to be displayed on restaurant layout
    description: {type: Schema.Types.String, required: true , default: ""},
    // menu background
    img: {type: Schema.Types.String, required: true , default: ""},
    // category of the menu type
    category: {type:Schema.Types.String,require:true, default: ""},
    // price the menu item in integer
    price:{type: Schema.Types.Number, required:true, default: 0.0},
    // isavailable is used to enable or disable the item
    isavailable:{type: Schema.Types.Boolean, required:true, default:true},
}, {
	timestamps: true
});

module.exports = mongoose.model('menu', menuSchema);
