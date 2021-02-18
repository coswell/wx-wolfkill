//createroom.js
//获取应用实例
const app = getApp()

Page({
  data: {
    game: {
      gods: {g_seer: true, g_witch: true, g_hunter: true, g_savior: true, g_idiot: false, 
        g_knight: false, g_silence: false, g_tombKeeper:false, total: 4},
      wolves: {w_whiteking: false, w_blackking: false, w_gargoyle: false, w_wolfbeauty: false, w_werewolf: 4, total: 4},
      villagers: {v_rogue: false, v_villager: 4, total: 4},
      third:{t_thief: false, t_bomberman: false, t_Cupid: false,total: 0},
      configs: {
        sheriff: {
          selected: 0,
          options: ['有警长竞选环节', '没有警长竞选']
        },
        witch_save: {
          selected: 0,
          options: ['不可自救', '首夜可自救', '全程可自救']
        }, 
        doublepills: {
          selected: 0,
          options: ['每晚仅可使用一瓶药', '每晚可使用两瓶药']
        }, 
        keepandsave: {
          selected: 0,
          options: ['同守同救算死亡', '同守同救算存活']
        }}
    },
  },
  //事件处理函数
  //将形如gods.g_seer的字符串分割为[gods][g_seer]
  SplitDemo: function (str){
    let ss;
    // 在每个空格字符处进行分解。
    ss = str.split(".");
    return ss;
  },
  //布尔类型按钮处理
  boolPressed: function (event) {
    const that = this
    const group = that.SplitDemo(event.currentTarget.id)[0]
    const role = that.SplitDemo(event.currentTarget.id)[1]
    const updateKey1 = 'game.' + event.currentTarget.id
    const updateKey2 = 'game.' + group + '.total'
    let add = 0
    if (that.data.game[group][role]) {
      add = -1
    }else{
      add = 1
    }
    that.setData({
      [updateKey1]: !that.data.game[group][role],
      [updateKey2]: that.data.game[group].total + add
    })
  },
  //加减类型按钮处理
  subPressed: function (event) {
    const that = this
    const group = that.SplitDemo(event.currentTarget.id)[0]
    const role = that.SplitDemo(event.currentTarget.id)[1]
    // console.log(group,role)
    let num = that.data.game[group][role]
    // console.log(num)
    if (num > 0) {
      num--
      const udpateKey1 = 'game.' + event.currentTarget.id
      const updateKey2 = 'game.' + group + '.total'
      that.setData({
        [udpateKey1]: num,
        [updateKey2]: that.data.game[group].total - 1
      })
    }
  },
  addPressed: function (event) {
    const that = this
    const group = that.SplitDemo(event.currentTarget.id)[0]
    const role = that.SplitDemo(event.currentTarget.id)[1]
    // console.log(group,role)
    let num = that.data.game[group][role]
    // console.log(num)
    num++
    const updateKey1 = 'game.' + event.currentTarget.id
    const updateKey2 = 'game.' + group + '.total'
    that.setData({
      [updateKey1]: num,
      [updateKey2]: that.data.game[group].total + 1
    })
  },
  configPressed: function (event) {
    const that = this
    const config = event.currentTarget.id
    let itemList = that.data.game.configs[config].options
    let updateKey = 'game.configs.' + config + '.selected'
    wx.showActionSheet({
      itemList: itemList,
      success (res) {
        that.setData({
          [updateKey]: res.tapIndex
        })
      }
    })
  },
  startGame: function () {
    const that = this
    const godscount = that.data.game.gods.total
    const villagerscount = that.data.game.villagers.total
    const wolvescount = that.data.game.wolves.total
    const thirdcount = that.data.game.third.total
    const totalUserCount = godscount + villagerscount + wolvescount + thirdcount
    if (totalUserCount < 6) {
      wx.showToast({
        title: '当前人数少于六人，不能开始游戏',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.showModal({
        title: '确认开始游戏',
        content: `当前游戏总人数为 ${totalUserCount} 人\r\n包含${godscount}神、${villagerscount}民、${wolvescount}狼和${thirdcount}名第三方`,
        success(res) {
          if (res.confirm) {
            that.setData({
              ["game.user"]: that.data.actuallyuser
            })
            wx.request({
              url: app.globalData.URL + 'createroom',
              data: that.data.game,
              header: {'content-type':'application/json'},
              method: 'POST',
              dataType: 'json',
              responseType: 'text',
              success: (result)=>{
                let roomid = result.data.roomid
                wx.redirectTo({
                  url: '/pages/waitroom/waitroom?roomid=' + roomid,
                })
              },
              fail: ()=>{},
              complete: ()=>{}
            });
          }
        }
      })
    }
  },
  onLoad: function () {
    this.setData({
      osheight: wx.getSystemInfoSync().windowHeight,
      oswidth: wx.getSystemInfoSync().windowWidth
    })
  },
  onShow: function () {
    // 获取当前小程序的页面栈
    let pages = getCurrentPages();
    // 数组中索引最大的页面--当前页面
    let currentPage = pages[pages.length-1];
    // 获取当前页面中的 options
    let option = currentPage.options
    this.setData({
      actuallyuser: option.user,
    })
    console.log(this.data)
  },
  comingsoon: function () {
    wx.showToast({
      title: '敬请期待',
      icon: 'success',
      duration: 1500
    })
  }
})
