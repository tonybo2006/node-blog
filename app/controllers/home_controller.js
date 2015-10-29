/**
 * Created by wudongbo on 2015/10/22.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');
var path = require('path');
var url = require('url');

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

router.get('/:file(*)',function(req,res,next){

	var file = req.params.file;

	//var filePath = path.resolve(".")+'/uploads/'+file;

	var realPath = req.app.get('root')+'/public/images/'+file;

	res.download(realPath, file, function(err){
		if (err) {
			// Handle error, but keep in mind the response may be partially-sent
			// so check res.headersSent
			next(err);
		} else {
			// decrement a download credit, etc.
			console.log('OK');
		}
	});
});

module.exports = router;