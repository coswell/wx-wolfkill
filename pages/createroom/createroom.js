//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    game: wx.getStorageSync('game') || {
      status: 'open',
      gods: {g_seer: true, g_witch: true, g_hunter: true, g_savior: false, g_knight: false, g_idiot: false},
      wolves: {w_whiteking: false, w_blackking: false ,w_werewolf: 4},
      villagers: {v_villager: 4},
      third:{t_thief: false, t_bomberman: false},
      configs: {
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
    const updateKey = 'game.' + event.currentTarget.id
    that.setData({
      [updateKey]: !that.data.game[group][role]
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
      const udpateKey = 'game.' + event.currentTarget.id
      that.setData({
        [udpateKey]: num
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
    const updateKey = 'game.' + event.currentTarget.id
    that.setData({
      [updateKey]: num
    })
  },
  configPressed: function (event) {
    const that = this
    const config = event.currentTarget.id
    let itemList = []
    let updateKey = ''
    if (config == 'witch_save') {
      itemList = that.data.game.configs.witch_save.options
      updateKey = 'game.configs.witch_save.selected'
    } else if (config == 'doublepills') {
      itemList = that.data.game.configs.doublepills.options
      updateKey = 'game.configs.doublepills.selected'
    } else if (config == 'keepandsave') {
      itemList = that.data.game.configs.keepandsave.options
      updateKey = 'game.configs.keepandsave.selected'
    }
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
    const totalUserCount = that.data.game.gods.g_seer + 
                         that.data.game.gods.g_witch + 
                         that.data.game.gods.g_hunter + 
                         that.data.game.gods.g_savior + 
                         that.data.game.gods.g_knight + 
                         that.data.game.wolves.w_whiteking + 
                         that.data.game.wolves.w_werewolf + 
                         that.data.game.villagers.v_villager
    if (totalUserCount < 6) {
      wx.showToast({
        title: '当前人数少于六人，不能开始游戏',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.showModal({
        title: '确认开始游戏',
        content: `当前游戏总人数为 ${totalUserCount} 人，包含 ${totalUserCount} 名玩家和 1 名法官`,
        success(res) {
          if (res.confirm) {
            that.data.game.status = 'checking'
            wx.setStorageSync('game', that.data.game)
            wx.redirectTo({
              url: '/pages/check/check',
            })
          }
        }
      })
    }
  },
  onLoad: function () {
    const game = wx.getStorageSync('game') || {}
    if (game.status == 'gaming') {
      wx.redirectTo({
        url: '/pages/game/game',
      })
    } else if (game.status == 'checking') {
      wx.redirectTo({
        url: '/pages/check/check',
      })
    } 
    this.setData({
      osheight: wx.getSystemInfoSync().windowHeight,
      oswidth: wx.getSystemInfoSync().windowWidth
    })
  }
})
