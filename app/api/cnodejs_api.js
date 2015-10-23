/**
 * Created by wudongbo on 2015/10/23.
 */
var async = require('async');
var express = require('express');
var router = express.Router();
var config = require('../../config/config');
var HttpProxy = require('../../lib/proxy/request_proxy');
var CommonUtils = require('../../lib/util/common_utils');

router.post('/accesstoken', function (req, res, next) {
	req.body = {
		"accesstoken" : config.CNODEJS_API_Config.ACCESS_TOKEN
	};

	var options = {
		method : 'POST',
		url : config.CNODEJS_API_Config.baseUrl + config.CNODEJS_API_Config.api.ACCESS_TOKEN
	};

	HttpProxy.callApi(req, options, function (error,result){
		if (error) {
			console.error('error :: ' + error);
		} else {
			res.json(result);
		}
	});
});

router.get('/user', function (req, res, next) {

	var url = CommonUtils.formatString(config.CNODEJS_API_Config.api.GET_USER, req.loginname);

	var options = {
		method : 'GET',
		url : config.CNODEJS_API_Config.baseUrl +  url
	};

	HttpProxy.callApi(req, options, function (error,result){
		if (error) {
			console.error('error :: ' + error);
			res.send(error);
		} else {
			res.send(result);
		}
	});
});



module.exports = router;