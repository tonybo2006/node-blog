/**
 * Created by wudongbo on 2015/10/27.
 */
'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Category = mongoose.model('Category');

router.get('/',function(req,res,next){

});

router.post('/',function(req,res,next){

});

router.patch('/:id',function(req,res,next){
	var id = req.params.id;
});

router.put('/:id',function(req,res,next){
	var id = req.params.id;
});

router.delete('/:id',function(req,res,next){
	var id = req.params.id;
});