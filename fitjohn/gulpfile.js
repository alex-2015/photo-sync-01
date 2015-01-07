var gulp = require('gulp'),
  responsive = require('gulp-responsive'),
  imagemin = require('gulp-imagemin'),
  growl = require('notify-send'),
  notify = require('gulp-notify'),
  cache = require('gulp-cache'),
  data = require('gulp-data'),
  del = require('del'),
  path = require('path'),
  mongoose = require('mongoose'),
  config = require('./config');

var Album = require('./app/models/album');

gulp.task('images', function() {
  return gulp.src('public/img/albums/engagement/*.jpg')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(responsive([{
      name: 'e*.jpg',
      width: 800
    }]))
    .pipe(gulp.dest('public/img/albums/engagement'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('album', function() {
  return gulp.src('public/img/albums/**/*')
    .pipe(cache(data(function(file) {
      mongoose.connect(config.database.uri);
      var fullPath = path.dirname(file.path);
      var filename = path.basename(file.path);
      var filenameSansExt = path.basename(file.path, ['.jpg']);
      var albumName = fullPath.slice(fullPath.indexOf('albums/') + 7);
      var publicPath = path.join(fullPath.slice(fullPath.indexOf('img')), filename);
      Album.findOne({name: albumName}, function(err, query) {
        if(query) {
          Album.findById(query._id, function(err, album) {
            if (err)
              res.send(err);
            // album.name = albumName;
            if(album.photos.filename.indexOf(filenameSansExt) == -1) {
              album.photos.push({filename: filenameSansExt, path: publicPath});
              console.log('Photo "' + publicPath + '" added to "' + albumName + '".');
            }
            album.save(function(err) {
              if (err)
                res.send(err);
              console.log('Album "' + albumName + '" is now up to date.');
            });
          });
          mongoose.connection.close();
          return;
        } else {
          var album = new Album();
          album.name = albumName;
          album.photos.push({filename: filenameSansExt, path: publicPath});
          album.save(function(err) {
            if (err)
              res.send(err);
            console.log('Album "' + albumName + '" created.');
            console.log('Photo "' + publicPath + '" added to "' + albumName + '".');
          });
          mongoose.connection.close();
          return;
        }
      });
    })));
});

gulp.task('cleanDatabase', function() {
  console.log('huzzah!');
});

gulp.task('clean', function(cb) {
    del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], cb)
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('images');
});

gulp.task('watch', function() {
  // Watch image files
  gulp.watch('public/img/photos/*', ['images']);
});

// post
// var album = new Album();
// album.name = req.body.name;
// album.save(function(err) {
//   if (err)
//     res.send(err);
// });

// get
// Album.find(function(err, albums) {
//   if (err)
//     res.send(err);
//   res.json(albums);
// });

// delete
// Album.remove({
//   _id: req.params.album_id
// }, function(err, album) {
//   if (err)
//     res.send(err);
//   res.json({ message: 'Successfully deleted' });
// });