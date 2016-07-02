/*
* @desc 图片对象的dao层
*/
var mongoose = require('mongoose');
var Q = require('q');
var db = mongoose.createConnection('127.0.0.1', 'Img');

//
var Schema = mongoose.Schema;


db.on('error', console.error.bind(console, '连接数据库报错!!!'));

db.on('open', function(){
  console.log('打开数据库连接!!!');
});

var ImgSchema = new Schema({
  originalname: String, //上传时的名称
  filename: String, //别名
  size: String, //大小，b为单位
  type: String, //类型，jpg、jpeg、png、gif
  createTime: String //上传时间
});

var ImgModel = db.model('T_Img', ImgSchema);

var ImgDao = function(){};

/**
* @保存图片信息
* @param Object img 图片对象
*/
ImgDao.prototype.save = function(img){
  var imgEntity = new ImgModel(img);
  imgEntity.save();
}

/**
* @desc 查询图片列表
* @param Object option 筛选条件
*/
ImgDao.prototype.getImgList = function(query){
  var deferred = Q.defer();
  var _query = {
  }

  if(query.keyword){
    var keywordStr = '/' + query.keyword + '/i';
    _query = {
        originalname: eval(keywordStr),
        filename: eval(keywordStr)
    };
  }
  ImgModel.find(_query, null, {skip: query.start, limit: query.limit}, function(err, imgs){
    if(err){
      console.log('dao getImgList', err);
      deferred.reject(err);
    }else{
      ImgModel.count(_query, function(err, count){
        if(err){
          console.log('dao getImgList count', err);
          deferred.reject(err);
        }else{
          deferred.resolve({
            count: count,
            imgList: imgs
          });
        }
      });
    }
  });
  return deferred.promise;
};

//根据id获取图片信息
ImgDao.prototype.getImgById = function(id){
  var deferred = Q.defer();

  if(!id){
    deferred.reject({
      success: false,
      errorMsg: 'id不能为空'
    });
    return;
  }
  console.log('dao id: %s', id );
  ImgModel.findById(id, function(err, imgItem){
    if(err){
      console.log('find img by Id:', err);
      deferred.reject(err);
    }else{
      deferred.resolve(imgItem);
    }
  });

  return deferred.promise;
}

//根据id删除图片
ImgDao.prototype.delImgById = function(id){
  var deferred = Q.defer();

  if(!id){
    deferred.reject({
      success: false,
      errorMsg: 'id不能为空'
    });
    return;
  }

  ImgModel.findByIdAndRemove(id, function(err){
    if(err){
      console.log('del img by Id:', err);
      deferred.reject(err);
    }else{
      console.log('dao 删除功能!!');
      deferred.resolve({
        success: true
      });
    }
  });

  return deferred.promise;
}

/**
* @desc 修改图片信息
*/
ImgDao.prototype.editImg = function(img){
  var deferred = Q.defer();

  ImgModel.findByIdAndUpdate(img.id, img, function(err, doc){
    if(err){
      deferred.reject({
        success: false,
        errorMsg: '修改数据看错误',
        error: error
      });
    }else{
      deferred.resolve({
        success: true
      });
    }
  });

  return deferred.promise;
}

module.exports = ImgDao;
