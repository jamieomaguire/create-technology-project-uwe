'use strict'

// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Entry = require('./model/entries');
const PastEntry = require('./model/past-entries');

// Create instances of the dependencies
const app = express();
const router = express.Router();

// Set the port to 3001
const port = 3001;

// Database configuration
mongoose.connect('mongodb://uniAccess:0qww294e@ds025439.mlab.com:25439/nom-noms');

// Configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Prevent Cross Origin Resource Sharing errors by setting headers to allow CORS with middleware
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
 
 // Remove cacheing to get the most recent entries
 res.setHeader('Cache-Control', 'no-cache');
 next();
});

// Set the route path and initialise the API
router.get('/', function(req, res) {
  res.json({ message: 'API Initialised!' });
});

// adding the /entries route to the /api router
router.route('/entries')
  // retrieve all entries from the database 
  .get(function(req, res) {
    // looks at the Entry Schema
    Entry.find(function(err, entries) {
      if (err)
      res.send(err);
      // responds with a json object of database entries
      res.json(entries)
    });
  })
  // post new entry to the database
  .post(function(req, res) {
    var entry = new Entry();
    // body parser lets us use the req.body
    entry.time = req.body.time;
    entry.meal = req.body.meal;
    entry.value = req.body.value;
    console.log(req.body);
    entry.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Entry succesfully added!' });
    });
  });

// Adding a route to a specific entry based in the database ID 
router.route('/entries/:entry_id')
  // the put method allows us to update our entry based on the ID passed to the route
  .put(function(req, res) {
    Entry.findById(req.params.entry_id, function(err, entry) {
      if (err)
        res.send(err);
      // setting the new time, meal and value to whatever was changed. if nothing changed, don't alter the field
      (req.body.time) ? entry.time = req.body.time : null;
      (req.body.meal) ? entry.meal = req.body.meal : null;
      (req.body.value) ? entry.value = req.body.value : null;
      // save entry
      entry.save(function(err) {
        if (err)
          res.send(err);
        res.json({ message: 'Entry has been updated' });
      });
    });
  })
  .delete(function(req, res) {
    // selects the entry by its ID, then removes it 
    Entry.remove({ _id: req.params.entry_id }, function(err, entry) {
      if (err)
        res.send(err);
      res.json({ message: 'Entry has been deleted!' })
    })
  });

// TEST API STUFF FOR PAST ENTRIES 
// adding the /past-entries route to the /api router
router.route('/past-entries')
  // retrieve all entries from the database 
  .get(function(req, res) {
    // looks at the PastEntry Schema
    PastEntry.find(function(err, entries) {
      if (err)
      res.send(err);
      // responds with a json object of database entries
      res.json(entries)
    });
  })
  // post new past entry to the database
  .post(function(req, res) {
    var pastEntry = new PastEntry();
    // body parser lets us use the req.body
    pastEntry.date = req.body.date;
    pastEntry.value = req.body.value;
    console.log(req.body);
    pastEntry.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Entry succesfully added!' });
    });
  });

// Use router configuration when the API is called
app.use('/api', router);

// Starts the server and listens for requests
app.listen(port, function() {
  console.log(`api is running on port ${port}`);
});