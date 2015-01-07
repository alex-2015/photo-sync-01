// app/models/album.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var AlbumSchema   = new Schema({
  name: String,
  photos: [
    {
      filename: String,
      path: String
    }
  ]
});

module.exports = mongoose.model('Album', AlbumSchema);
