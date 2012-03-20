var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var Post = new Schema({
      title     : String
    , body      : String
    , date      : Date
});

module.exports = mongoose.model('Post', Post);