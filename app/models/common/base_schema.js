/**
 * Created by wudongbo on 2015/10/22.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function BaseSchema( add ) {
	var schema = new Schema({
		"createDate": { "type": "Date", "default": Date.now },
		"lastUpdateDate": { "type": "Date", "default": Date.now },
		//"createUser": { "type": schema.Types.ObjectId, ref: 'Admin' },
		//"lastUpdateUser": { "type": schema.Types.ObjectId, ref: 'Admin' },
		"isDelete": { "type": "Boolean", "default": false }
	});

	if(add){
		schema.add(add);
	}

	schema.set('toObject', { virtuals: true });
	schema.virtual('id')
		.set(function (id) {
			schema._id = id;
		})
		.get(function () { return this._id });

	schema.set('toObject', {
		transform: function (doc, ret, options) {
			// remove the _id of every document before returning the result
			ret.id = ret._id;
			delete ret._id;
			delete ret.__v;
		}
	});

	schema.set('toJSON', {
		transform: function (doc, ret, options) {
			// remove the _id of every document before returning the result
			ret.id = ret._id;
			delete ret._id;
			delete ret.__v;
		}
	});

	var dp = require('mongoose-deep-populate')(mongoose);
	require('mongoose-pagination');
	schema.plugin(dp);

	schema.statics = {
		"findResource": function (options, callback) {
			options.select = options.select || ' -__v';
			options.population = options.population || '';
			this.findOne(options.criteria)
				.select(options.select)
				.populate(options.population)
				.exec(callback);
		},
		"updateResourceById" : function (options, callback) {
			this.findByIdAndUpdate(options.id, {
				$set: options.updateContent
			}, function (err, doc) {
				callback(err, doc)
			});
		},
		"deleteResourceById" : function (options, callback) {
			this.findByIdAndRemove(options.id, function (err, doc) {
				callback(err, doc);
			});
		},
		"logicDeleteResourceById" : function(options, callback){
			schema.findByIdAndUpdate(options.id, {
				$set: {"isDelete": true}
			}, function (err, doc) {
				callback(err, doc);
			});
		},
		"list" : function (options, callback) {
			options.criteria  = options.criteria || {};
			options.select = options.select || '';
			options.deepPopulate = options.deepPopulate || '';
			options.deepSelect = options.deepSelect || {};
			options.sort = options.sort || {'lastUpdateDate': -1};
			schema.find(options.criteria)
				.select(options.select)
				.deepPopulate(options.deepPopulate, options.deepSelect)
				.sort(options.sort)
				.exec(callback);
		},
		"listByPage" : function (options, callback) {
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
		}
	};
	return schema;
}

module.exports = BaseSchema;