'use strict';

// import dependency
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create new instance of the mongoose.Schema
// the schema takes an object that shows the shape of the database entries
const PastEntriesSchema = new Schema({
  date: String,
  value: String
});

// export the module to use in server.js
module.exports = mongoose.model('PastEntry', PastEntriesSchema)