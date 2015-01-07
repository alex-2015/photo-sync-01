module.exports = function(app, express, passport) {

  // Define a middleware function to be used for every secured routes
  var auth = function(req, res, next){
    if (!req.isAuthenticated()) 
      res.send(401);
    else
      next();
  };

  var api = express.Router(); // create our router

  api.use(function(req, res, next) { // middleware to use for all requests
    next(); // make sure we go to the next routes and don't stop here
  });

  var Bear = require('../models/bear');

  // on routes that end in /bears
  api.route('/bears')
    .post(function(req, res) { // create a bear (accessed at POST http://localhost:8080/bears)
      if(req.isAuthenticated()){
        var bear = new Bear(); // create a new instance of the Bear model
        bear.name = req.body.name; // set the bears name (comes from the request)
        bear.save(function(err) {
          if (err)
            res.send(err);
          res.redirect(api.mountpath + '/admin'); // *** If support for angular in subdirectories becomes better, api.mountpath is necessary.  Otherwise not needed. ***
        });
      } else {
        res.send(403);
      }
    })
    .get(function(req, res) { // get all the bears (accessed at GET http://localhost:8080/api/bears)
      Bear.find(function(err, bears) {
        if (err)
          res.send(err);
        res.json(bears);
      });
    });

  // on routes that end in /bears/:bear_id
  api.route('/bears/:bear_id')
    .get(function(req, res) { // get the bear with that id
      Bear.findById(req.params.bear_id, function(err, bear) {
        if (err)
          res.send(err);
        res.json(bear);
      });
    })
    .put(function(req, res) { // update the bear with this id
      if(req.isAuthenticated()){
        Bear.findById(req.params.bear_id, function(err, bear) {
          if (err)
            res.send(err);
          bear.name = req.body.name;
          bear.save(function(err) {
            if (err)
              res.send(err);
            res.redirect(api.mountpath + '/admin'); // *** If support for angular in subdirectories becomes better, api.mountpath is necessary.  Otherwise not needed. ***
          });
        });
      } else {
        res.send(403);
      }
    })
    .delete(function(req, res) { // delete the bear with this id
      if(req.isAuthenticated()){
        Bear.remove({
          _id: req.params.bear_id
        }, function(err, bear) {
          if (err)
            res.send(err);

          res.json({ message: 'Successfully deleted' });
        });
      } else {
        res.send(403);
      }
    });

  var Album = require('../models/album');

  api.route('/albums')
    .get(function(req, res) {
      Album.find(function(err, albums) {
        if (err)
          res.send(err);
        res.json(albums);
      });
    });

  api.route('/albums/:album_id')
    .delete(function(req, res) {
      if(req.isAuthenticated()){
        Album.remove({
          _id: req.params.album_id
        }, function(err, album) {
          if (err)
            res.send(err);
          res.json({ message: 'Deleted album!' });
        });
      } else {
        res.send(403);
      }
    });

  api.route('/albums/:album_name/:photo_path')
    .put(function(req, res) {
      if(req.isAuthenticated()){
        Album.findOne({name: req.params.album_name}, function(err, query) {
          if(query) {
            Album.findById(query._id, function(err, album) {
              if(err)
                res.send(err);
              if(album.photos.indexOf(req.body.photo_path) > -1)
                album.photos.splice(album.photos.indexOf(req.body.photo_path), 1);
              album.save(function(err) {
                if(err)
                  res.send(err);
              });
            });
          }
        });
      } else {
        res.send(403);
      }
    });

   app.use('/api', api); // register our routes

}