var mongoose = require('mongoose');

module.exports = mongoose.model('Food', {
	food:{
		type:String,
		default:''
	},
	price:{
		type:Number,
		default: 0
	}

});