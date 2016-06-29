/**
* @desc js的控制脚本
*/
$(function(){

  //初始化图片展示div的内容
  $('.ev-img-outer-box').height($('body').height() - 60);

  var pageInstance = new PageTable({
    config: {
      url: '/upload/getImgList',
      callback: function(data){
        renderImgs(data);
      }
    },
    query: {
      keyword: '',
      start: 0,
      limit: 5
    }
  });
  // getImgList();

  function renderImgs(data){
    if(data.success){
      var imgList = data.imgList,
          html = '';

      //清空图片列表
      if(pageInstance.isFirstPage()){
        $('.ev-img-box').children().remove();
      }

      for(var i in imgList){
        var item = imgList[i];
        html += '<img src="/upload/getImgByFilename?filename=' + item.filename + '" />';
      }
      if(html){
        $('.ev-img-box').append(html);
      }
      //是否为空
      if(pageInstance.isFirstPage() && imgList.length == 0){
        alert('没有任何图片!!!');
        return;
      }

      //自动加载图片满超过一屏高度的图片，这样才可以启动scroll事件，否则无法翻页
      getEnoughImgs();

    }else{
      alert('查询失败!!!');
    }
  }

  //监听滚动事件
  $('.ev-img-outer-box').on('scroll', function(){
    // alert(11);
    if(!pageInstance.isFull()){
      var contentHeight = $('.ev-img-box').height(),
          boxHeight = $(this).height(),
          scrollTop = $(this).scrollTop();
      if(contentHeight - boxHeight - scrollTop < 20){
        // getNextPageImgs();
        pageInstance.nextPage();
      }
    }
  });

  //自动加载图片满超过一屏高度的图片，这样才可以启动scroll事件，否则无法翻页
  function getEnoughImgs(){
    //已经加载完所有的图片了
    if(pageInstance.isFull()){
      return;
    }

    //是否已经满一屏
    var imgBoxHeight = $('.ev-img-outer-box').height(),
        contentHeight = $('.ev-img-box').height();
    if(imgBoxHeight >= contentHeight){//继续加载
      pageInstance.nextPage();
    }
  }

  //查询操作
  $('.ev-search-btn').on('click', function(){
    var keyword = $('.search-text').val();
    pageInstance.getData({
      keyword: keyword
    });
  });
  //回车事件监听
  $(document).keydown(function(e){
      if(e.keyCode == 13 && $('.search-text').is(':focus')){
        $('.ev-search-btn').click();
      }
  });


});
