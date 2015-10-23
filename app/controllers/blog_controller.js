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
		console.log('task: ' + JSON.stringify(doc));
		if (err) {
			console.error('err::' + err);
		} else {
			res.render('blog/index',{title:'Node-Blog',blogs:blogs});
		}
	})
});

/**
 *
 */
router.get('/:blogId',function (req, res, next){
	var options = {

	};
	Blog.findResource(options,function( err , blog){
		console.log('task: ' + JSON.stringify(doc));
		if (err) {
			console.error('err::' + err);
		} else {
			res.render('blog/detail',{title:'Node-Blog',blog:blog});
		}
	});
});

/**
 * go to new page
 */
router.get('/new',function (req, res, next){
	res.render('blog/new',{title:'Node-Blog'});
});

/**
 * add new blog
 */
router.post('/',function (req, res, next){

	var options = {

	};
	Blog.save(options,function( err , blog){
		console.log('task: ' + JSON.stringify(doc));
		if (err) {
			console.error('err::' + err);
		} else {
			res.redirect('/blogs');
		}
	});
});

module.exports = router;