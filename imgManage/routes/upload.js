/**
* @desc 上传图片模块
* @author jianfeng_huang
* @date 20160616 17:00
*/
var express = require('express');
var router = express.Router();

var ImgService = require('../mvc/img/service/ImgService');
var imgService = new ImgService();

var fs = require('fs');

router.get('/', function(req, res, next){
  res.render('upload', {title: '上传图片'});
});


var prePath = '../upload/img/';

//上传图片
router.post('/img', function(req, res, next){
  //
  var file = req.files[0];
  // imgService.upload(file);
  imgService.promiseUpload(file)
  .then(function(){
      res.send('上传成功^_^');
  }, function(){
    res.send('上传失败!!!');
  });



  // var _destFilename = prePath + file.originalname;
  // console.log('dest %s, __dirname: %s', _destFilename, __dirname);
  // fs.readFile(file.path, function(err, data){
  //   fs.writeFile(_destFilename, data, function(err){
  //     if(err){
  //       console.log(err);
  //       res.send('上传失败!!!');
  //     }else{
  //       res.send('上传图片成功');
  //     }
  //   });
  // });
});




module.exports = router;
