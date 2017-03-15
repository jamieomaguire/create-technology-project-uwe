'use strict';

// import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create new instance of the mongoose.Schema
// the schema takes an object that shows the shape of the database entries
var EntriesSchema = new Schema({
  time: String,
  meal: String
});

// export the module to use in server.js
module.exports = mongoose.model('Entry', EntriesSchema)