// pages/prop/prop.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHide:true
  },
  showRule: function () {
    this.setData({
      isHide: false
    })
  },
  hideRule: function () {
    this.setData({
      isHide: true
    })
  },
  // 获取个人信息以及当前房间可用道具
  getCanProps: function () {
    const that = this
    wx.request({
      url: app.globalData.URL + 'getselfinfoandroomroles?user=' + that.data.user + '&room=' + that.data.room,
      data: {},
      header: {'content-type':'application/json'},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result)=>{
        that.setData({
          "roominfo": result.data
        })
        wx.hideLoading();
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  //预选角色
  preSelected: function (event) {
    const that = this
    let role = event.currentTarget.id
    let point = event.currentTarget.dataset.point
    wx.showModal({
      title: '消费提醒',
      content: '该角色需要' + point + '分，确认消费？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if(result.confirm){
          if ( point > that.data.roominfo.selfpoint){
            return wx.showToast({
              title: '积分不够，再攒攒吧',
              icon: 'none',
              duration: 1000,
              mask: true,
            });
          }
          wx.showLoading({
            mask:true
          })
          wx.request({
            url: app.globalData.URL + 'preselected?user=' + that.data.user + '&room=' + that.data.room + '&role=' + role,
            data: {},
            header: {'content-type':'application/json'},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result)=>{
              console.log(result)
              wx.hideLoading();
              if (result.data.errcode == 0){
                wx.showToast({
                  title: '预选成功',
                  duration: 1500,
                  success: (result)=>{
                    setTimeout(function(){
                      wx.navigateBack({
                        delta: 1
                      });
                    },500)
                  }
                });
              } else {
                wx.showToast({
                  title: '游戏已开始',
                  icon: 'error',
                  duration: 1500,
                  success: (result)=>{
                    setTimeout(function(){
                      wx.navigateBack({
                        delta: 1
                      });
                    },500)
                  }
                });
              }
            },
            fail: ()=>{},
            complete: ()=>{}
          });
        }
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      "user": options.user,
      "room": options.room
    })
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
      mask:true
    });
    this.getCanProps()
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