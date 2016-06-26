/**
* @desc js的控制脚本
*/
$(function(){

  //ajax异步加载图片
  $('.img-box img').each(function(){
    var $this = $(this),
        srcStr = $this.data('src');

    $this.attr('src', '/upload/getImgByFilename?filename=' + srcStr);

    // $.ajax({
    //   url: '/upload/getImgByFilename',
    //   dataType: 'j'
    // });

  });

});
