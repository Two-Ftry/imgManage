/*
* @desc 图片列表
*/
$(function(){

  var pageInstance = new PageTable({
    config: {
      url: '/upload/getImgList',
      callback: function(data){
        renderTable(data);
      }
    },
    query: {
      keyword: '',
      start: 0,
      limit: 10
    }
  });

  //渲染表格
  function renderTable(data){
    if(data.success){
      var imgList = data.imgList,
          html = '';

      $('.img-table tbody').children().remove();

      for(var i in imgList){
        var img = imgList[i];
        html += '<tr data-id="' + img._id + '">\
                  <td>' + (parseInt(i)+1) + '</td>\
                  <td>' + img.originalname + '</td>\
                  <td><img class="img-thumbnail" src="/upload/getImgByFilename?filename=' + img.filename + '" /></td>\
                  <td>' + img.type + '</td>\
                  <td>' + img.size + '</td>\
                  <td>' + new Date(img.createTime) + '</td>\
                  <td>\
                    <a href="javascript:void(0);" class="ev-img-modify">修改</a>\
                    <a href="javascript:void(0);" class="ev-img-del">删除</a>\
                  </td>\
                </tr>';

      }
      $('.img-table tbody').append(html);
      //page
      $('.page-show').text((pageInstance.getCurrentPage()+1) + '/' + pageInstance.getTotalPage());
      $('.img-page a').removeClass('unactive');
      if(pageInstance.isFirstPage()){
        $('.ev-page-first').addClass('unactive');
        $('.ev-page-prev').addClass('unactive');
      }
      if(pageInstance.isLastPage()){
        $('.ev-page-last').addClass('unactive');
        $('.ev-page-next').addClass('unactive');
      }
    }
  }

  //翻页事件绑定
  $('.ev-page-first').click(function(){
    pageInstance.firstPage();
  });
  $('.ev-page-prev').click(function(){
    pageInstance.prevPage();
  });
  $('.ev-page-next').click(function(){
    pageInstance.nextPage();
  });
  $('.ev-page-last').click(function(){
    pageInstance.lastPage();
  });

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

  //删除事件绑定
  $('.img-table').on('click', '.ev-img-del', function(){
    var $this = $(this);
    var imgId = $this.closest('tr').data('id');
    if(!imgId){
      return;
    }
    $.ajax({
      url: '/upload/imgDel',
      type: 'post',
      dataType: 'json',
      data: {
        imgId: imgId
      },
      success: function(data){
        if(data.success == true){
          alert('删除成功');
          $('.img-table tr[data-id="' + imgId + '"]').remove();
        }else{
          alert('删除失败' + data.errorMsg);
        }
      },
      error: function(){
        alert('删除失败!!!');
      }
    });
  });

});
