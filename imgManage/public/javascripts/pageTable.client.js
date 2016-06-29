/**
* @desc 翻页控件
*/

(function(){
var _default = {
    url: ''
  },
  _query = {
    start: 0,
    limit: 20,
    keyword: '',
    callback: function(){},
  },
  _page = {
    pageIndex: 0,
    totalPage: 0,
    isFull: false,
    count: 0
  };


var PageTable = function(options){
  this.cfg = {};
  $.extend(true, this.cfg, _default);
  $.extend(true, this.cfg, options.config);

  this.query = {};
  $.extend(true, this.query, _query);
  $.extend(true, this.query, options.query);

  this.page = {};
  $.extend(true, this.page, _page);

  this.init();

};

PageTable.prototype = {
  init: function(){
    if(!this.cfg.url){
      console.log('url cannot be empty!!!');
      return;
    }

    this.getAjaxData();
  },
  initEvent: function(){

  },
  getAjaxData: function(){
    var me = this;
    $.ajax({
      url: me.cfg.url,
      type: 'post',
      data: this.query,
      dataType: 'json',
      success: function(data){
        me.page.count = data.count ? data.count : 0;
        var totalPage = Math.floor(me.page.count/ me.query.limit);
        me.page.totalPage = me.page.count % me.query.limit ?  totalPage+ 1 : totalPage;

        //回调
        me.cfg.callback && me.cfg.callback(data);

      },
      error: function(XMLHttpRequest, textStatus, errorThrown){
        console.log(textStatus);
      }
    });
  },
  //获取数据
  getData: function(query){
    $.extend(true, this.query, query);
    this.firstPage();
  },
  //第一页
  firstPage: function(){
    this.page.pageIndex = 0;
    this.query.start = this.page.pageIndex * this.query.limit;
    this.getAjaxData();
  },
  //尾页
  lastPage: function(){
    this.page.pageIndex = this.page.totalPage - 1;
    this.query.start = this.page.pageIndex * this.query.limit;
    this.getAjaxData();
  },
  //上一页
  prevPage: function(){
    if(this.page.pageIndex == 0){
      return;
    }
    this.page.pageIndex --;
    this.query.start = this.page.pageIndex * this.query.limit;
    this.getAjaxData();
  },
  //下一页
  nextPage: function(){
    if(this.page.pageIndex >= this.page.totalPage-1){
      return;
    }
    this.page.pageIndex ++;
    this.query.start = this.page.pageIndex * this.query.limit;
    this.getAjaxData();
  },
  isFull: function(){
    return this.page.pageIndex >= this.page.totalPage-1 ? true : false;
  },
  isLastPage: function(){
    return this.isFull();
  },
  isFirstPage: function(){
    return this.page.pageIndex == 0 ? true : false;
  },
  getCurrentPage: function(){
    return this.page.pageIndex;
  },
  getTotalPage: function(){
    return this.page.totalPage;
  }
}

  window.PageTable = PageTable;

})();
