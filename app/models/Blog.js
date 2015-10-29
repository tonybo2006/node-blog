/**
 * Created by wudongbo on 2015/10/22.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BaseSchema = require('./common/base_schema');
var _ = require('underscore');

var BlogSchema = new BaseSchema({
	"title": {"type": "String", "default": '', "trim": true},
	"content": {"type": "String", "default": '', "trim": true},
	"category": {"type": Schema.Types.ObjectId, ref: "category"}
});

var staticMethods = {

};
BlogSchema.statics =_.extend(BlogSchema.statics, staticMethods);

mongoose.model('Blog', BlogSchema,'Blog');