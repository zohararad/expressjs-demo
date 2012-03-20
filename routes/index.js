
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

/**
 * Posts-related routes
 */
exports.posts = require('./posts')