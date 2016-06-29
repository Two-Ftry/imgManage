/**
* @desc 上传图片模块
* @author jianfeng_huang
* @date 20160616 17:00
*/
var express = require('express');
var router = express.Router();
var fs = require('fs');
var logger = require('morgan');
var Q = require('q');
var bodyParser = require('body-parser');

var ImgService = require('../mvc/img/service/ImgService');
var imgService = new ImgService();

var fs = require('fs');

router.get('/', function(req, res, next){
  res.render('upload', {title: '图片后台管理'});
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
});

var urlencodedParser = bodyParser.urlencoded({extended: false});
router.post('/getImgList', urlencodedParser, function(req, res){
  // var query = {
  //   param: req.body.param,
  //   start: req.body.start,
  //   limit: req.body.limit
  // }
  // console.log('req', req.body.param);
  var query = req.body;
  // console.log('query %s - %s - %s', query.keyword, query.start, query.limit);
  imgService.getImgList(query)
  .then(function(countAndImgList){
    res.send({
      success: true,
      count: countAndImgList.count,
      imgList: countAndImgList.imgList
    });
  }, function(){
      res.send({
        success: false,
        errorMsg: '查询失败!!!'
      });
  });

});

var url = require('url');
/**
* @desc 根据图片名称获取图片
*
*/
router.get('/getImgByFilename', function(req, res){
  var urlParam = url.parse(req.url, true).query;
  var filename = urlParam.filename;
  if(!filename){
    console.log('filename is empty!!!');
    res.send('filename is empty!!!');
    return;
  }
  var path = '../upload/img/' + filename;
  _readFile(path)
  .then(function(data){
    res.writeHead(200, {'Content-Type':'image/png'});
    // res.send(data);
    res.end(data);
  }, function(err){
    console.log(err);
    res.send('error');
  });

});


function _readFile(path){
  var deferred = Q.defer();
  fs.readFile(path, function(err, data){
    if(err){
      console.log('fs.readFile error', err);
      deferred.reject(err);
    }else{
      deferred.resolve(data);
    }
  });
  return deferred.promise;
}

//删除图片
router.post('/imgDel', urlencodedParser, function(req, res){
  var imgId = req.body.imgId;
  console.log('router id %s', imgId);
  console.log('body: ', req.body);
  if(!imgId || imgId == 'undefined'){
    res.send({
      success: false,
      errorMsg: 'id不能为空'
    })
    return;
  }
  imgService.imgDel(imgId)
  .then(function(data){
    //
    res.send({
      success: true,
      errorMsg: ''
    });
  }, function(err){
    //
    res.send({
      success: false,
      error: err,
      errorMsg: err.errorMsg
    });
  });
});

module.exports = router;
