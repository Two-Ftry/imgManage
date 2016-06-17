/**
* @desc 图片实体
* @author jianfeng_huang
* @date 20160617
*/
var Img = function(){};

/*
* img = {
      originalname: '', //上传时的名称
      filename: '', //别名
      size: 1024, //大小，b为单位
      type: '', //类型，jpg、jpeg、png、gif
      createTime: '', 上传时间
  }
*/

Img.prototype.setOriginalname = function(originalname){
  this.originalname = originalname;
};
Img.prototype.getOriginalname = function(){
  return this.originalname;
};

Img.prototype.setFilename = function(filename){
  this.filename = filename;
};
Img.prototype.getFilename = function(){
  return this.filename;
};

Img.prototype.setSize = function(size){
  this.size = size;
};
Img.prototype.getSize = function(){
  return this.size;
};

Img.prototype.setType = function(type){
  this.type = type;
};
Img.prototype.getType = function(){
  return this.type;
};

Img.prototype.setCreateTime = function(createTime){
  this.createTime = createTime;
};
Img.prototype.getCreateTime = function(){
  return this.createTime;
};

module.exports = Img;
