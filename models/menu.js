var mongoose     = require('mongoose');
mongoose.Promise = require('q').Promise;
var Schema       = mongoose.Schema;

var menuSchema   = new Schema({
    restaurant_id: {type: Schema.Types.String, required: true , default: ""},
    name: {type: Schema.Types.String, required: true , default: ""},
    description: {type: Schema.Types.String, required: true , default: ""},
    img: {type: Schema.Types.String, required: true , default: ""},
    category: {type:Schema.Types.String,require:true, default: ""},
    price:{type: Schema.Types.Float, required:true, default: 0.0},
    isavailable:{type: Schema.Types.Boolean, required:true, default:true},
}, {
	timestamps: true
});

module.exports = mongoose.model('menu', menuSchema);
