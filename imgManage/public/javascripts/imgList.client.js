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
      limit: 20
    }
  });

  //渲染表格
  function renderTable(data){
    
  }

});
