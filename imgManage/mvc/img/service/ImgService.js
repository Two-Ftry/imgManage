/**
* @desc 图片服务
*/
var fs = require('fs');
var uuid = require('node-uuid');
var Q = require('q');
var ImgDao = require('../dao/ImgDao');

var imgDao = new ImgDao();

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
  var filename =_generateFilename(),
      imgType = this.getImgType(file.originalname);
  var _destFilename = _prePath + filename + '.' + imgType;

  fs.readFile(file.path, function(err, data){
    fs.writeFile(_destFilename, data, function(err){
      if(err){
        console.log(err);
        // res.send('上传失败!!!');
      }else{
        // res.send('上传图片成功');
        //这里去调dao
        imgDao.save({
          originalname: file.originalname, //上传时的名称
          filename: filename, //别名
          size: data.length, //大小，b为单位
          type: imgType, //类型，jpg、jpeg、png、gif
          createTime: new Date() //上传时间
        });
      }
    });
  });
}

ImgService.prototype.promiseUpload = function(file){
  var deferred = Q.defer();

  var filename =_generateFilename(),
      imgType = this.getImgType(file.originalname);
  var _destFilename = _prePath + filename + '.' + imgType;
  // console.log('filename %s', filename + '.' + this.getImgType(file.originalname));
  debugger;
  fs.readFile(file.path, function(err, data){
    fs.writeFile(_destFilename, data, function(err){
      debugger;
      if(err){
        console.log(err);
        deferred.reject();
      }else{
        //这里去调dao
                imgDao.save({
                  originalname: file.originalname, //上传时的名称
                  filename: filename + '.' + imgType, //别名
                  size: data.length, //大小，b为单位
                  type: imgType, //类型，jpg、jpeg、png、gif
                  createTime: new Date() //上传时间
                });

        deferred.resolve();

      }
    });
  });

  return deferred.promise;
}

/**
* @desc 获取图片列表
* @param Object option 筛选条件
*/
ImgService.prototype.getImgList = function(query){
  var deferred = Q.defer();

    try{
      query.start = parseInt(query.start);
    } catch(e){
      query.start = 0;
    }

    try{
      query.limit = parseInt(query.limit);
    } catch(e){
      query.limit = 20;
    }

  imgDao.getImgList(query)
  .then(function(countAndImgList){
    deferred.resolve(countAndImgList);
  }, function(err){
    deferred.reject(err);
  });
  return deferred.promise;
};

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
