/**
 * Created by wudongbo on 2015/10/23.
 */
'use strict';

var config = require('../../config/config');
var RequestProxy = require('../proxy/request_proxy');

var CnodejsAuth = function (req,next){
	req.body = {
		"accesstoken" : config.CNODEJS_API_Config.ACCESS_TOKEN
	};
	var options = {
		method : 'POST',
		url : config.CNODEJS_API_Config.baseUrl + config.CNODEJS_API_Config.api.ACCESS_TOKEN
	};

	RequestProxy.callApi(req, options, function (error,result){
		if (error) {
			console.error('error :: ' + error);
		} else {
			req.loginname = JSON.parse(result).loginname;
			next();
		}
	});
};

module.exports = CnodejsAuth;