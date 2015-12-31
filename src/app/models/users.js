'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	
	provider:String,
	id: { type: String, index: true } ,
	displayName: String,
	picUrl:String,
	isAdmin:{type:Boolean,default: false}
});

module.exports = mongoose.model('User', User);
