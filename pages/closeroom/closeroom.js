// pages/closeroom/closeroom.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    group:"human",
    winner:[]
  },

  //初始化玩家
  setPlayerData: function (roominfo) {
    let that = this
    let judge = roominfo.creater
    let playerlist=new Array()
    for (let k in roominfo.seats) {
      if (k.substr(0,6) == "player" && roominfo.seats[k]) {
        console.log(roominfo.seats[k])
        playerlist.push(roominfo.seats[k])
      }
    }
    that.setData({
      judge: judge,
      playerlist: playerlist
    })
    console.log(that.data)
  },

  //复选框
  groupChange(e) {
    const group = e.detail.value
    this.setData({
      group:group
    })
    console.log(this.data)
  },
  winnerChange(e) {
    const values = e.detail.value
    this.setData({
      winner:values
    })
    console.log(this.data)
  },
  
  //结算游戏
  endGame(e) {
    let that = this
    let optype = e.target.dataset.optype
    wx.showLoading({
      title: "提交中",
      mask: true,
    })
    wx.request({
      url: app.globalData.URL + 'endgame',
      data: {
        judge: that.data.judge,
        room: that.data.room,
        playerlist: that.data.playerlist,
        group: that.data.group,
        winner: that.data.winner,
        optype: optype
      },
      header: {'content-type':'application/json'},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (result)=>{
        wx.hideLoading()
        if (result.data.errcode == 0) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 1500,
            mask: true
          })
          wx.redirectTo({
            url: '../index/index?user=' + that.data.judge
          })
        } else {
          wx.showToast({
            title: '提交出错了，联系管理员人工计分吧',
            icon: 'none',
            duration: 3000,
            mask: true,
            success:()=>{
              wx.redirectTo({
                url: '../index/index?user=' + that.data.judge
              })
            }
          })
        }
      },
      fail: ()=>{
        wx.hideLoading()
        wx.showToast({
          title: '提交出错了，联系管理员人工计分吧',
          icon: 'none',
          duration: 3000,
          mask: true,
          success:()=>{
            wx.redirectTo({
              url: '../index/index?user=' + that.data.judge
            })
          }
        })
      },
      complete: ()=>{}
    });
  },
  //comingsoon
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
      let that = this
      let user = options.user
      let room = options.room
      console.log(user, room)
      that.setData({
        room:room
      })
      wx.showLoading();
      wx.request({
        url: app.globalData.URL + 'getroom?user=' + user + '&room=' + room,
        data: {},
        header: {'content-type':'application/json'},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: (result)=>{
          console.log(result.data)
          that.setPlayerData(result.data)
          wx.hideLoading()
        },
        fail: ()=>{
          wx.hideLoading()
        },
        complete: ()=>{}
      });
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