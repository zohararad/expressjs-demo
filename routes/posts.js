var Post = require('../models/post');

exports.index = function(req, res){
  Post.find({},function(err, posts){
    if(err){
      res.end(err);
    } else {
      req.flash('info','test');
      res.render('posts/index', { title: 'Express', posts: posts, flash: req.flash('info') });
    }
  });
};

exports.show = function(req, res){
  Post.find({_id:req.params.id},function(err, post){
    console.log(post);
    if(err){
      res.end(err);
    } else {
      res.render('posts/show', { title: 'Express', post: post[0] });
    }
  });
};

exports.add = function(req, res){
  res.render('posts/add', { title: 'Express' })
};

exports.create = function(req, res){
  var post = new Post();
  console.log(req.body);
  post.title = req.body.title;
  post.body = req.body.body;
  post.date = new Date();
  post.save(function(err){
    if(err){
      req.flash('error', err);
      res.render('posts/add', { title: 'Express'});
    } else {
      req.flash('info', 'Post created');
      res.redirect('/posts');
    }
  })
};