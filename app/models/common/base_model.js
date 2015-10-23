/**
 * Created by wudongbo on 2015/10/22.
 */
var util = require('util');

var BaseModel = function() {

};

BaseModel.genSchemaJson = function (schema, inputJson) {
	var commonJson = {
		"createDate": { "type": "Date", "default": Date.now },
		"lastUpdateDate": { "type": "Date", "default": Date.now },
		"createUser": { "type": schema.Types.ObjectId, ref: 'Admin' },
		"lastUpdateUser": { "type": schema.Types.ObjectId, ref: 'Admin' },
		"isDelete": { "type": "Boolean", "default": false }
	};

	return util.inherits(commonJson, inputJson);
}

BaseModel.statics = function() {
	Schema.apply(this, arguments);

	var dp = require('mongoose-deep-populate')(mongoose);
	require('mongoose-pagination');
	this.plugin(dp);

	this.add({
		"createDate": { "type": "Date", "default": Date.now },
		"lastUpdateDate": { "type": "Date", "default": Date.now },
		//"createUser": { "type": schema.Types.ObjectId, ref: 'Admin' },
		//"lastUpdateUser": { "type": schema.Types.ObjectId, ref: 'Admin' },
		"isDelete": { "type": "Boolean", "default": false }
	});

	this.statics("createResource",function (callback) {
		this.save(function (err, doc) {
			callback(err, doc);
		});
	});

	this.statics("findResource", function (options, callback) {
		options.select = options.select || '';
		options.population = options.population || '';
		this.findOne(options.criteria)
			.select(options.select)
			.populate(options.population)
			.exec(callback);
	});

	this.statics("updateResourceById", function (options, callback) {
		this.findByIdAndUpdate(options.id, {
			$set: options.updateContent
		}, function (err, doc) {
			callback(err, doc)
		});
	});

	this.statics("deleteResourceById", function (options, callback) {
		this.findByIdAndRemove(options.id, function (err, doc) {
			callback(err, doc);
		});
	});

	this.statics("logicDeleteResourceById", function(options, callback){
		this.findByIdAndUpdate(options.id, {
			$set: {"isDelete": true}
		}, function (err, doc) {
			callback(err, doc);
		});
	});

	this.statics("list", function (options, callback) {
		options.criteria  = options.criteria || {};
		options.select = options.select || '';
		options.deepPopulate = options.deepPopulate || '';
		options.deepSelect = options.deepSelect || {};
		options.sort = options.sort || {'lastUpdateDate': -1};
		this.find(options.criteria)
			.select(options.select)
			.deepPopulate(options.population )
			.sort(options.sort)
			.exec(callback);
	});

	this.statics("listByPage", function (options, callback) {
		options.criteria  = options.criteria || {};
		options.select = options.select || '';
		options.deepPopulate = options.deepPopulate || '';
		options.deepSelect = options.deepSelect || {};
		options.sort = options.sort || {'lastUpdateDate': -1};
		this.find(options.criteria)
			.select(options.select)
			.deepPopulate(options.deepPopulate, options.deepSelect)
			.sort(options.sort)
			.paginate(options.page, options.pageSize, function (err, docs, total) {
				callback(err, docs, total);
			});
	});
};

module.exports = BaseModel;