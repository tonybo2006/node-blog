/**
 * Created by wudongbo on 2015/10/22.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');

router.get('/', function (req, res, next) {

	var options = {

	};
	Blog.listByPage(options,function( err , blogs){
		console.log('blogs: ' + JSON.stringify(blogs));
		if (err) {
			console.error('err::' + err);
		} else {
			res.render('home/index',{title:'Node-Blog',blogs:blogs});
		}
	});
});

module.exports = router;