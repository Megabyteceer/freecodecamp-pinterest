'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Pet = new Schema({
       userId: {ref: 'User', type: String, index: true },
       petId: {ref: 'Pet', type: Schema.Types.ObjectId, index: true },
       
});

module.exports = mongoose.model('Like', Pet);
