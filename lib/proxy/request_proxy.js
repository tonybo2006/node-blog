/**
 * Created by wudongbo on 2015/10/23.
 */
'use strict';
var request = require('request');

var RequestProxy = function () {

};

RequestProxy.callApi = function (req, options,callback) {
	// 接收客户端的JSON数据
	if(req && req.body){
		options.body = JSON.stringify(req.body);
	}

	options.headers = {
		'Content-Type': 'application/json; charset=utf-8'
	};

	//  call API
	request(options, function (error, response ,body) {

		if ( error ) {
			callback(error);
		} else {
			if ( response.statusCode == 200){
				callback(error,body);
			} else {
				callback(new Error (body));
			}

		}
	});
};

module.exports = RequestProxy;