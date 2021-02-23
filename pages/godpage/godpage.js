// pages/godpage/godpage.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHide:true
  },

  showCard: function () {
    this.setData({
      isHide: false
    })
  },
  hideCard: function () {
    this.setData({
      isHide: true
    })
  },
  //定义定时器
  setTimer() {
    let self = this;
    self.timer = setInterval(() => {
      self.getRoomInfo();
    }, 1000);
  },
  //清除定时器
  clearTimer() {
    clearInterval(this.timer);//如果发现这个clearInterval不生效，写法又没问题
    this.timer = null;//自己把timer置为null就好了
  },
  //定时器的具体事件
  getRoomInfo() {
    let that = this
    let user = that.data.actuallyuser
    let room = that.data.room
    console.log(user, room)
    wx.request({
      url: app.globalData.URL + 'getroom?user=' + user + '&room=' + room,
      data: {},
      header: {'content-type':'application/json'},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result)=>{
        console.log(result.data)
        that.setData({
          roominfo: result.data
        })
        wx.hideLoading()
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  //发牌
  divCard: function () {
    let that = this
    let user = that.data.actuallyuser
    let room = that.data.room
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: app.globalData.URL + 'divcard',
      data: {
        "user": user,
        "room": room,
      },
      header: {'content-type':'application/json'},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result)=>{
        console.log(result.data)
        that.getRoomInfo()
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  comingsoon: function () {
    wx.showToast({
      title: '敬请期待',
      icon: 'success',
      duration: 1500
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      actuallyuser: options.user,
      room: options.room,
      osheight: wx.getSystemInfoSync().windowHeight,
      oswidth: wx.getSystemInfoSync().windowWidth
    })
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.getRoomInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.setTimer()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.clearTimer()
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