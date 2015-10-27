/**
 * Created by wudongbo on 2015/10/22.
 */
var mongoose = require('mongoose');
var BaseSchema = require('./common/base_schema');
var _ = require('underscore');

var CategorySchema = new BaseSchema({
	"name": {"type": "String", "default": '', "trim": true},
	"description": {"type": "String", "default": '', "trim": true}
});

var staticMethods = {

};
CategorySchema.statics =_.extend(CategorySchema.statics, staticMethods);

mongoose.model('Category', CategorySchema,'Category');