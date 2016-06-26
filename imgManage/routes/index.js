var express = require('express');
var router = express.Router();

var ImgService = require('../mvc/img/service/ImgService');
var imgService = new ImgService();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });

  imgService.getImgList('')
  .then(function(imgList){
    for(var i in imgList){
      var img = imgList[i];
      console.log(i + ':' + img.originalname + '-' + img.filename + '\n');
    }
    res.render('index', {
      title: '图片管理',
      imgList: imgList
    });
    // res.send('查询成功^_^');
  }, function(){
      // res.send('查询失败!!!');
      console.err('查询失败!!!');
      res.render('index', {
        title: '图片管理',
        imgList: []
      });
  });

});

module.exports = router;
