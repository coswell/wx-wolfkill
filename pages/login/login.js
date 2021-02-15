// pages/login/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: ''
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.msg == "fail"){
      wx.showToast({

        title: '该账号不存在，请联系管理员添加',
   
        icon: 'none',
   
        duration: 3000//持续的时间
   
      })
    }
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

  },

  // 获取输入账号 
  usernameInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
 
  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
 
  // 登录处理
  login: function () {
    var that = this;
    // if (this.data.username.length == 0 || this.data.password.length == 0) {
    if (this.data.username.length == 0) {
      wx.showToast({
        title: '账号或密码不能为空',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.request({
        url: app.globalData.URL + 'login?user=' + this.data.username,
        data: {},
        header: {'content-type':'application/json'},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: (result)=>{
          if (result.statusCode == 200){
            wx.navigateTo({
              url: '../index/index?user=' + this.data.username
            })
          } else {
            wx.showToast({
              title: '该账号不存在，请联系管理员添加',
              icon: 'none',
              duration: 3000//持续的时间
            })
          }
        },
        fail: ()=>{},
        complete: ()=>{}
      });
      
    //   wx.request({
    //     url: app.globalData.globalReqUrl +'/login/login', // 仅为示例，并非真实的接口地址
    //     method: 'post',
    //     data: {
    //       username: that.data.username,
    //       password: that.data.password
    //     },
    //     header: {
    //       'content-type': 'application/x-www-form-urlencoded' // 默认值
    //     },
    //     success(res) {
    //       if (res.data.code == "OK") {
    //         var unitName = res.data.data.User.unitName;
    //         var unitId = res.data.data.User.unitId;
    //         wx.setStorageSync('unitId', unitId);
    //         wx.setStorageSync('unitName', unitName);
    //         wx.switchTab({
    //           url: '../overviewData/realTimeData'
    //         })
    //       } else {
    //         wx.showToast({
    //           title: res.data.message,
    //           icon: 'none',
    //           duration: 2000
    //         })
    //       }
    //     }
    //   })
    }
  }

})