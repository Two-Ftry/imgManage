/**
* @desc js的控制脚本
*/
$(function(){

  //异步加载图片
  // $('.img-box img').each(function(){
  //   var $this = $(this),
  //       srcStr = $this.data('src');
  //   $this.attr('src', '/upload/getImgByFilename?filename=' + srcStr);
  // });

  //初始化图片展示div的内容
  $('.ev-img-outer-box').height($('body').height() - 60);

  //图片获取
  var _query = {
    keyword: '',
    start: 0,
    limit: 20
  },
  _assistQuery = {
    pageIndex: 0,
    isFirst: true,
    isFull: false
  };

  getImgList();

  //获取图片列表
  function getImgList(option){
    if(!option){
      option = {};
    }
    option.isEmpty = option.isEmpty ? true : false;

    $.ajax({
      url: '/upload/getImgList',
      type: 'post',
      data: _query,
      dataType: 'json',
      success: function(data){
        if(data.success){
          var imgList = data.imgList,
              html = '';

          //清空图片列表
          if(option.isEmpty){
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
          if(_assistQuery.isFirst && imgList.length == 0){
            alert('没有任何图片!!!');
            return;
          }

          _assistQuery.isFirst = false;

          //是否已满
          if(imgList.length < _query.limit){
            _assistQuery.isFull = true;
            return;
          }

          //自动加载图片满超过一屏高度的图片，这样才可以启动scroll事件，否则无法翻页
          getEnoughImgs();

        }else{
          alert('查询失败!!!');
        }
      },
      error: function(XMLHttpRequest, textStatus, errorThrown){
        console.log(textStatus);
      }
    })
  }

  //监听滚动事件
  $('.ev-img-outer-box').on('scroll', function(){
    // alert(11);
    if(!_assistQuery.isFull){
      var contentHeight = $('.ev-img-box').height(),
          boxHeight = $(this).height(),
          scrollTop = $(this).scrollTop();
      if(contentHeight - boxHeight - scrollTop < 20){
        getNextPageImgs();
      }
    }
  });

  //自动加载图片满超过一屏高度的图片，这样才可以启动scroll事件，否则无法翻页
  function getEnoughImgs(){
    //已经加载完所有的图片了
    if(_assistQuery.isFull){
      return;
    }

    //是否已经满一屏
    var imgBoxHeight = $('.ev-img-outer-box').height(),
        contentHeight = $('.ev-img-box').height();
    if(imgBoxHeight >= contentHeight){//继续加载
      getNextPageImgs();
    }
  }

  //获取下一页的图片
  function getNextPageImgs(option){
    if(option && option.isEmpty){
      _assistQuery.isFirst = true;
      _assistQuery.pageIndex = 0;
    }else{
      _assistQuery.pageIndex ++;
    }
    _query.start = _assistQuery.pageIndex * _query.limit;
    getImgList(option);
  }

  //查询操作
  $('.ev-search-btn').on('click', function(){
    var keyword = $('.search-text').val();
    _query.keyword = keyword;
    getNextPageImgs({isEmpty: true});
  });
  //回车事件监听
  $(document).keydown(function(e){
      if(e.keyCode == 13 && $('.search-text').is(':focus')){
        $('.ev-search-btn').click();
      }
  });


});
