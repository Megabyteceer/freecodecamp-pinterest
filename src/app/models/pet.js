'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Pet = new Schema({
       userId: {ref: 'User', type: String, index: true },
       likes: Number,
       title: String,
       imgUrl: String
});

module.exports = mongoose.model('Pet', Pet);
