//index.js
//获取应用实例
const app = getApp()
Page({
  data: {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
