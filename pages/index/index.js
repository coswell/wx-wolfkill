//index.js
//获取应用实例
var app = getApp()
Page({
  data: {

  },
  onLoad: function () {

  },
  comingsoon: function () {
    wx.showToast({
      title: '敬请期待',
      icon: 'success',
      duration: 1500
    })
  },
  //创建一局游戏
  createRoom: function() {
    wx.navigateTo({
      url: '../createroom/createroom'
    })
  },
  //加入一局游戏
  joinRoom:function() {
    wx.navigateTo({
      url: '../joinroom/joinroom',
    })
  },
})
