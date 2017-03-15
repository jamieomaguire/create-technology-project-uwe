'use strict';

// import dependency
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create new instance of the mongoose.Schema
// the schema takes an object that shows the shape of the database entries
const EntriesSchema = new Schema({
  time: String,
  meal: String,
  value: String
});

// export the module to use in server.js
module.exports = mongoose.model('Entry', EntriesSchema)