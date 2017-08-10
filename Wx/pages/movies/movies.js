// pages/movies/movies.js
var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //不加这些加载的时候会报错，因为xml里面绑定了这些，一步加载的时候找不到
    inTheaters: {},
    comingSoon: {},
    top250: {},
    searchResult: {},
    containerShow: true,
    searchPanelShow: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheatersUrl = app.globalData.doubanBase +"/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase +"/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.globalData.doubanBase +"/v2/movie/top250" + "?start=0&count=3";
    this.getMovieListData(inTheatersUrl, "inTheaters");
    this.getMovieListData(comingSoonUrl, "comingSoon");
    this.getMovieListData(top250Url, "top250");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  //统一request方法
  getMovieListData: function (url, settedKey){
    var that=this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        that.processDoubanData(res.data, settedKey);
      },
      fail: function (error) {
        console.log(error);
      }
    })
  },
  //处理request返回数据
  processDoubanData: function (moviesDouban,settedKey){
    var movies=[];
    for (var i in moviesDouban.subjects){
      var subject = moviesDouban.subjects[i];
      var title=subject.title.length >6 ? subject.title.substring(0,6) : subject.title;
      
      var temp = {
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp);
    }

    var readData = {};
    //readData[settedKey] = movies;
    //这样写只有一个top250的数据，很奇怪
    // this.setData({
    //   readData: readData
    // });
  //这样写就ok，但是模板只能渲染一个数据 inTheaters 或comsoon 或者top250
  //readData[settedKey] = movies;
  // this.setData(readData);
  //   console.log(readData)

    readData[settedKey] ={
      movies:movies
    }
    this.setData(readData)
  },
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})