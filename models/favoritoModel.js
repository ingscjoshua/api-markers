'use strict'
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var favoritoSchema = new schema({
    title:String,
    description:String,
    url:String
});
module.exports = mongoose.model('favoritoMdoel',favoritoSchema);