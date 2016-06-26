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

  // var PersonSchema = new Schema({
  //   name: String
  // });
  // PersonSchema.methods.speak = function(){
  //   console.log('my name is' + this.name);
  // }
  //
  // var PersonModel = db.model('Person', PersonSchema);
  // var personEntity = new PersonModel({name:'黄剑枫'});
  // console.log(personEntity.name);
  // personEntity.speak();
  // personEntity.save();
  //
  // //
  // PersonModel.find(function(err, persons){
  //   for(var i in persons){
  //     var p = persons[i];
  //     console.log(i + ':' + p.name + '\n');
  //   }
  // });
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
ImgDao.prototype.getImgList = function(option){
  var deferred = Q.defer();
  ImgModel.find(option, function(err, imgs){
    if(err){
      deferred.reject(err);
    }else{
      deferred.resolve(imgs);
    }
  });
  return deferred.promise;
};

module.exports = ImgDao;
