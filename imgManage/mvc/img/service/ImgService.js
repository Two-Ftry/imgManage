/**
* @desc 图片服务
*/
var fs = require('fs');
var uuid = require('node-uuid');
var Q = require('q');

var ImgService = function(){};

/*
* 变量定义
* ------------------------------------------------------------------------------
*/
var _prePath = '../upload/img/';
/*------------------------------------------------------------------------------*/
/**
* 上传图片
*/
ImgService.prototype.upload = function(file){
  var filename =_generateFilename();
  var _destFilename = _prePath + filename + '.' + this.getImgType(file.originalname);

  fs.readFile(file.path, function(err, data){
    fs.writeFile(_destFilename, data, function(err){
      if(err){
        console.log(err);
        // res.send('上传失败!!!');
      }else{
        // res.send('上传图片成功');
        //TODO 这里去调dao
      }
    });
  });
}

ImgService.prototype.promiseUpload = function(file){
  var deferred = Q.defer();

  var filename =_generateFilename();
  var _destFilename = _prePath + filename + '.' + this.getImgType(file.originalname);
  console.log('filename %s', filename + '.' + this.getImgType(file.originalname));
  debugger;
  fs.readFile(file.path, function(err, data){
    fs.writeFile(_destFilename, data, function(err){
      debugger;
      if(err){
        console.log(err);
        deferred.reject();
      }else{
        //TODO 这里去调dao
        deferred.resolve();
      }
    });
  });

  return deferred.promise;
}

/**
* @desc 获取图片的类型
*/
ImgService.prototype.getImgType = function(filename){
  if(!filename){
    return '';
  }
  var names = filename.split('.');
  return names[names.length-1];
};

/**
* @desc 生成UUID
*/
function _generateFilename(){
  return uuid.v4();
}

module.exports = ImgService;
