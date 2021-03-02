// pages/profile/profile.js
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
    wx.showToast({
      title: '已开始自动刷新房间信息',
      icon: 'none',
      duration: 1500,
      mask: true
    });
    if (self.timer) {
    } else {
      self.timer = setInterval(() => {
        self.getRoomInfo();
      }, 1000);
    }
  },
  //清除定时器
  clearTimer() {
    clearInterval(this.timer);//如果发现这个clearInterval不生效，写法又没问题
    this.timer = null;//自己把timer置为null就好了
    wx.showToast({
      title: '已停止刷新',
      icon: 'none',
      duration: 1500,
      mask: true
    });
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
      fail: ()=>{
        wx.hideLoading()
      },
      complete: ()=>{}
    });
  },
  // 敬请期待
  comingsoon: function () {
    wx.showToast({
      title: '敬请期待',
      icon: 'success',
      duration: 1500
    })
  },
  //入座
  sitDown: function (event) {
    const that = this
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: app.globalData.URL + 'seatact',
      data: { //user,room,pre,to,type
        "user":that.data.actuallyuser,
        "room": that.data.room,
        "pre": that.data.roominfo.playernumber,
        "to": event.currentTarget.id,
        "type": 0,
      },
      header: {'content-type':'application/json'},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result)=>{
        console.log("xxx",result.data)
        that.getRoomInfo()
        if (result.data.errcode==0){
          wx.showToast({
            title: '成功入座',
            icon: 'success',
            duration: 1500
          })
        } else {
          wx.showToast({
            title: result.data.msg,
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail: ()=>{
        wx.hideLoading()
      },
      complete: ()=>{}
    });
  },
  //离座
  sitUp: function () {
    const that = this
    wx.showModal({
      title: '确定离开座位吗？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if(result.confirm){
          wx.showLoading({
            title: '加载中',
            mask: true
          })
          wx.request({
            url: app.globalData.URL + 'seatact',
            data: { //user,room,pre,to,type
              "user":that.data.actuallyuser,
              "room": that.data.room,
              "pre": that.data.roominfo.playernumber,
              "type": 1,
            },
            header: {'content-type':'application/json'},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result)=>{
              that.getRoomInfo()
              wx.showToast({
                title: '已离座',
                icon: 'success',
                duration: 1500
              })
            },
            fail: ()=>{
              wx.hideLoading()
            },
            complete: ()=>{}
          });
        }
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  // 跳转到道具页
  useprop: function () {
    const that = this
    wx.navigateTo({
      url: '../prop/prop?user=' + that.data.actuallyuser + '&room=' + that.data.room,
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
    this.setTimer()
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
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.getRoomInfo()
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