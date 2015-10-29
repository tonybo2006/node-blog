/**
 * Created by wudongbo on 2015/10/22.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');


/**
 * blog index
 */
router.get('/',function (req, res, next){
	var options = {

	};
	Blog.listByPage(options,function( err , blogs){
		console.log('blogs: ' + JSON.stringify(blogs));
		if (err) {
			console.error('err::' + err);
		} else {
			res.render('blog/index',{title:'Node-Blog',blogs:blogs});
		}
	})
});

/**
 * go to new page
 */
router.get('/new',function (req, res, next){
	res.render('blog/new',{title:'Node-Blog'});
});

/**
 *
 */
router.get('/:id',function (req, res, next){
	var options = {
		"criteria": {
			"_id": req.params.id
		}
	};

	Blog.findResource(options,function( err , blog){
		console.log('blog: ' + JSON.stringify(blog));
		if (err) {
			console.error('err::' + err);
		} else {
			res.render('blog/detail',{title:'Node-Blog',blog:blog});
		}
	});
});

/**
 * add new blog
 */
router.post('/',function (req, res, next){

	var blog = new Blog(req.body);

	blog.save(function( err , result){
		console.log('result: ' + JSON.stringify(result));
		if (err) {
			console.error('err::' + err);
		} else {
			res.redirect('/blogs');
		}
	});
});



module.exports = router;