/**
 * Created by wudongbo on 2015/10/22.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BaseModel = require('./common/base_model');
var util = require('util');

var BlogSchema = new Schema(BaseModel.genSchemaJson(Schema, {
	"title": {"type": "String", "default": '', "trim": true},
	"content": {"type": "String", "default": '', "trim": true}
}));

var staticMethods = {

};
BlogSchema.statics =util.inherits(BaseModel.statics, staticMethods);

mongoose.model('Blog', BlogSchema);