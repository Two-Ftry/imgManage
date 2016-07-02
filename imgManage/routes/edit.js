/**
* @desc 编辑图片信息模块
* @author jianfeng_huang
* @date 20160701 23:18
*/
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var ImgService = require('../mvc/img/service/ImgService');
var imgService = new ImgService();

var urlencodedParser = bodyParser.urlencoded({extended: false});

var url = require('url');
//路由到edit页面
router.get('/', function(req, res){
  var imgId = url.parse(req.url, true).query.imgId;
  res.render('edit', {title: '修改图片信息', imgId: imgId});
});

//编辑图片信息
router.post('/editImg', urlencodedParser, function(req, res){
  var imgId = req.body.imgId,
      originalname = req.body.originalname;
  console.log('imgId: %s, originalname: %s', imgId, originalname);
  console.log(req.body);
  var img = {
    id: imgId,
    originalname: originalname
  };
  imgService.editImg(img)
  .then(function(data){
    res.send({
      success: true
    });
  },function(err){
    res.send({
      success: false,
      errorMsg: err.errorMsg
    });
  });
});

module.exports = router;
