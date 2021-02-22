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
    this.setData({
      actuallyuser: options.user,
    })
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
    const that = this
    wx.navigateTo({
      url: '../createroom/createroom?user=' + that.data.actuallyuser
    })
  },
  //加入一局游戏
  joinRoom:function() {
    const that = this
    wx.request({
      url: app.globalData.URL + 'findroom',
      data: {},
      header: {'content-type':'application/json'},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result)=>{
        let errcode = result.data.errcode
        let roomid = result.data.roomid
        let judge = result.data.judge
        if (errcode != 0){
          wx.showModal({
            title: '加入失败',
            content: creater + '暂无可加入的游戏，是否创建？',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
              if(result.confirm){
                wx.redirectTo({
                  url: '/pages/createroom/createroom?user=' + that.data.actuallyuser,
                })
              }
            },
            fail: ()=>{},
            complete: ()=>{}
          });
        } else {
          if (that.data.actuallyuser == judge){
            wx.redirectTo({
              url: '/pages/godpage/godpage?user=' + that.data.actuallyuser + '&room=' + roomid,
            })
          } else {
            wx.redirectTo({
              url: '/pages/profile/profile?user=' + that.data.actuallyuser + '&room=' + roomid,
            })
          }
        }
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
})
