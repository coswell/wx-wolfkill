//app.js
App({
  globalData:{
    URL: 'http://127.0.0.1:8000/',
    userInfo:null
  },
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  onLoad: function() {
    
  },
  onShow: function(){
    
  },
})