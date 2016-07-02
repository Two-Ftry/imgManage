
/**
* @desc 编辑js
*/
$(function(){
  var imgId = $('.ev-edit-box').data('id');
  // alert(imgId);
  var img = null;
  $.ajax({
    type: 'post',
    url: '/upload/getImgById',
    dataType: 'json',
    data:{
      imgId: imgId
    },
    success: function(data){
      img = data.data;
      $('.ev-img-name').val(img.originalname);
    },
    error: function(err){
      console.log(err);
    }
  });

  //提交修改
  $('.ev-edit-submit').click(function(){
    var originalname = $('.ev-img-name').val();
    if(!originalname){
      alert('名称不能为空')
      return;
    }
    $.ajax({
      type: 'post',
      url: '/edit/editImg',
      dataType: 'json',
      data: {
        imgId: imgId,
        originalname: originalname
      },
      success: function(data){
        if(data.success){
          // alert('修改成功');
          window.location.href= '/upload';
        }else{
          alert('修改失败');
        }
      },
      error: function(error){
        alert('修改失败');
      }
    });
  });
});
