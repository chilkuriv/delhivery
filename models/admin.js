var mongoose     = require('mongoose');
mongoose.Promise = require('q').Promise;
var Schema       = mongoose.Schema;

var adminSchema   = new Schema({
    email: {type: Schema.Types.String, required: true , default:"" },
    password: {type: Schema.Types.String, required: true , default:""},
    name: {type:Schema.Types.String,require:true, default:""},
    phone:{type: Schema.Types.String, required:true, default:""}
}, {
	timestamps: true
});

module.exports = mongoose.model('admin', adminSchema);
