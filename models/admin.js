var mongoose     = require('mongoose');
mongoose.Promise = require('q').Promise;
var Schema       = mongoose.Schema;

var adminSchema   = new Schema({
    //email of the admin
    email: {type: Schema.Types.String, required: true , default:"" },
    //password of the admin minimum of 6 characters
    password: {type: Schema.Types.String, required: true , default:""},
    //name of the admin
    name: {type:Schema.Types.String,require:true, default:""},
    //phone of the admin
    phone:{type: Schema.Types.String, required:true, default:""}
}, {
	timestamps: true
});

module.exports = mongoose.model('admin', adminSchema);
