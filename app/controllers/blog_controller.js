/**
 * Created by wudongbo on 2015/10/22.
 */
var express = require('express');
var router = express.Router();

/**
 *
 */
router.get('/:blogId',function (req, res, next){
	var blog = {id: '001', title:'blog001',content:'test content',createDate: new Date(),type:'技术'};
	res.render('blog/detail',{title:'Node-Blog',blog:blog});
});

module.exports = router;