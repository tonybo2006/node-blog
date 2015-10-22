/**
 * Created by wudongbo on 2015/10/22.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {

	var blogs = [];
	var blog = {id: '001', title:'blog001',content:'test content'};
	blogs.push(blog);
	res.render('home/index',{title:'Node-Blog',blogs:blogs});
});

module.exports = router;