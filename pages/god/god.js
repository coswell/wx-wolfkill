//index.js
//获取应用实例
const app = getApp()
import {deepCopy} from '../../utils/util.js'
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    curUserIndex: -1,
    curDayIndex: -1,
    curVoteIndex: -1,
    // 投票类型 uppre up day
    voteState: '',
    // 投票类型 from to
    voteType: '',
    curLabels: [],
    curUserChoose: [],
    curUsers: [],
    users: [],
    days: [],
    dayNum: 1,
    marks: [],
    // 角色
    roles: [
      { name: '未知', value: '?' },
      { name: '平民', value: '民' },
      { name: '预言家', value: '预' },
      { name: '狼人', value: '狼' },
      { name: '女巫', value: '巫' },
      { name: '守卫', value: '守' },
      { name: '白痴', value: '痴' },
      { name: '猎人', value: '猎' },
      { name: '混血儿', value: '混' },
      { name: '摄梦人', value: '摄' },
      { name: '骑士', value: '骑' },
      { name: '潜行者', value: '潜' },
      { name: '猎魔人', value: '魔' },
      { name: '禁言长老', value: '禁' },
      { name: '白狼王', value: '白' },
      { name: '狼王', value: '王' },
      { name: '噩梦之影', value: '噩' },
      { name: '狼美人', value: '美' },
      { name: '丘比特', value: '丘' },
    ],
    // 标签
    labels: [
      { label: '金水', value: '金水'},
      { label: '银水', value: '银水'},
      { label: '刀口', value: '刀口'},
      { label: '查杀', value: '查杀'},
      // {label: '金水', value: '银水'},
    ],
    userNum: 12,
    userNumModalShow: false,
    userRoleModalShow: false,
    userLabelModalShow: false,
    userNumShow: false,
    userNumSingleShow: false,
    userRoleShow: false,
    baseUser: {
      role: '?',
      labels: [],
      msg: ''
    },
    baseDay: {
      upUsers: {}, // 上警玩家
      upVotes: [{
        type: '',
        msg: '',
        from: [],
        to: 0
      }], // 经商投票
      nights: {}, // 夜晚信息
      events: [], // 警下信息
    },
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    let userNum = wx.getStorageSync("userNum")
    if (userNum) {
      this.setData({
        userNum
      })
    }
    this.resetData()
  },
  onUnload: function () {
    wx.setStorage({
      key: "userNum",
      data: this.data.userNum
    })
  },
  resetData () {
    let users = []
    for (let i = 0; i < this.data.userNum; i++) {
      let u = deepCopy(this.data.baseUser)
      u.name = i + 1
      users.push(u)
    }
    let days = []
    for (let i = 0; i < this.data.dayNum; i++) {
      days.push(deepCopy(this.data.baseDay))
    }
    this.setData({
      users,
      days
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 展示选项
  showBtns: function () {
    let page = this
    wx.showActionSheet({
      itemList: ['设置人数', '新的一天', '重置'],
      success(res) {
        console.log(res)
        if (res.tapIndex == 0) {
          page.setData({
            userNumModalShow: true
          })
          return
        }
        if (res.tapIndex == 1) {
          let days = page.data.days
          days.push(deepCopy(page.data.baseDay))
          page.setData({
            days
          })
          return
        }
        if (res.tapIndex == 2) {
          page.resetData()
          return
        }
      },
      fail(res) {
      }
    })
  },
  hiddenAll () {
    this.setData({
      userNumModalShow: false,
      userRoleModalShow: false,
      userLabelModalShow: false,
      userNumShow: false,
      userNumSingleShow: false,
      userRoleShow: false
    })
  },
  deleteItem (e) {
    let t = e.currentTarget.dataset.type
    let dayIndex = e.currentTarget.dataset.index
    let voteIndex = e.currentTarget.dataset.vi
    let days = this.data.days
    console.log('deleteItem', t)
    if (t == 'upVotes') {
      // 上警投票
      days[dayIndex].upVotes.splice(voteIndex, 1)
      this.setData({
        days
      })
      return
    }
    if (t == 'events') {
      // 上警投票
      days[dayIndex].events.splice(voteIndex, 1)
      this.setData({
        days
      })
      return
    }
  },
  // 输入人数
  bindUserNumInput (e) {
    this.setData({
      userNum: e.detail.value
    })
  },
  onUserMsgChange (e) {
    let users = this.data.users
    let index = e.currentTarget.dataset.index
    users[index].msg = e.detail
    this.setData({
      users
    })
  },
  comfirmUserNum () {
    let users = this.data.users
    if (users.length > this.data.userNum) {
      users = users.slice(0, this.data.userNum)
    } else {
      for (let i = users.length; i < this.data.userNum; i++) {
        let u = deepCopy(this.data.baseUser)
        u.name = i + 1
        users.push(u)
      }
    }
    console.log(users)
    this.setData({
      userNumModalShow: false,
      users
    })
  },
  cancelUserNum () {
    this.setData({
      userNumModalShow: false
    })
  },
  // 用户角色编辑
  toggleUserRoleModal (e) {
    let rs = []
    let roles = this.data.roles
    for (let r of roles) {
      rs.push(r.label)
    }
    this.setData({
      curUserIndex: e.currentTarget.dataset.index,
      userRoleShow: true
    })
  },
  comfirmUserRole (e) {
    console.log('comfirmUserRole')
    let t = e.currentTarget.dataset.item
    let users = this.data.users
    users[this.data.curUserIndex].role = t.value
    this.setData({
      users,
      userRoleShow: false
    })
  },
  // 用户角色编辑
  toggleUserLabelModal (e) {
    // 判断目前标签的选择情况
    console.log('toggleUserLabelModal', this.data.userLabelModalShow)
    let user = e.currentTarget.dataset.item
    let index = e.currentTarget.dataset.index
    let curLabels = []
    let arr = []
    if (user && user.labels) {
      arr = user.labels
    }
    let labels = this.data.labels
    for(let l of labels) {
      let choose = false
      for (let a of arr) {
        if (a == l.value) {
          choose = true
          break
        }
      }
      l.icon = choose ? 'passed' : 'close'
      curLabels.push(deepCopy(l))
    }
    this.setData({
      labels: curLabels,
      curUserIndex: index,
      userLabelModalShow: !this.data.userLabelModalShow
    })
  },
  toggleUserLabelChoose (e) {
    let index = e.currentTarget.dataset.index
    console.log(index)
    let labels = this.data.labels
    labels[index].icon = labels[index].icon != 'passed' ? 'passed' : 'close'
    this.setData({
      labels
    })
  },
  comfirmUserLabel() {
    let users = this.data.users
    let labels = this.data.labels
    let curLabels = []
    for (let l of labels) {
      if (l.icon == 'passed') {
        curLabels.push(l.value)
      }
    }
    users[this.data.curUserIndex].labels = curLabels
    this.setData({
      userLabelModalShow: false,
      users
    })
  },
  // 用户编号编辑
  toggleDayUpUserModal(e) {
    // 判断目前标签的选择情况
    let day = e.currentTarget.dataset.item
    let index = e.currentTarget.dataset.index
    let arr = []
    if (day && day.upUsers) {
      arr = day.upUsers.list || []
    }
    this.setData({
      voteState: 'uppre',
      curDayIndex: index,
      curUserChoose: arr
    })
    this.commonShowUserChoose()
  },
  // 夜晚信息
  changeNight(e) {
    // 判断目前标签的选择情况
    let day = e.currentTarget.dataset.item
    let index = e.currentTarget.dataset.index
    let arr = []
    if (day && day.upUsers) {
      arr = day.nights.list || []
    }
    this.setData({
      voteState: 'night',
      curDayIndex: index,
      curUserChoose: arr
    })
    this.commonShowUserChoose()
  },
  commonShowUserChoose () {
    let curUsers = []
    let arr = this.data.curUserChoose
    let users = this.data.users
    for (let i = 0; i < users.length; i++) {
      let l = users[i]
      let choose = false
      for (let a of arr) {
        if (a == i) {
          choose = true
          break
        }
      }
      l.icon = choose ? 'passed' : 'close'
      curUsers.push(deepCopy(l))
    }
    this.setData({
      curUsers: curUsers,
      userNumShow: true
    })
  },
  toggleUserNumChoose(e) {
    let index = e.currentTarget.dataset.index
    console.log(index)
    let curUsers = this.data.curUsers
    curUsers[index].icon = curUsers[index].icon != 'passed' ? 'passed' : 'close'
    this.setData({
      curUsers
    })
  },
  comfirmUserNums() {
    let days = this.data.days
    let curUsers = this.data.curUsers
    // 已选择
    let us = []
    // 未选择
    let us2 = []
    for (let i = 0; i < curUsers.length; i++) {
      let l = curUsers[i]
      if (l.icon == 'passed') {
        us.push(i)
      } else {
        us2.push(i)
      }
    }
    if (this.data.voteState == 'uppre') {
      // 谁上警
      days[this.data.curDayIndex].upUsers = {
        list: us,
        msg: this.getJoins(us) + ' 上警',
        msg2: this.getJoins(us2) + ' 警下'
      }
      this.setData({
        userNumShow: false,
        days
      })
      return
    }
    if (this.data.voteState == 'night') {
      // 晚上
      days[this.data.curDayIndex].nights = {
        list: us,
        msg: us.length == 0 ? '平安夜' : this.getJoins(us) + ' 死亡'
      }
      this.setData({
        userNumShow: false,
        days
      })
      return
    }
    let day = days[this.data.curDayIndex]
    if (this.data.voteState == 'up' && this.data.voteType == 'from') {
      // 上警
      if (this.data.curVoteIndex == -1) {
        // 新增
        this.data.curVoteIndex = day.upVotes.length
        day.upVotes.push({
          type: 'vote',
          from: us,
          to: [],
          msg: ''
        })
      } else {
        // 已有
        day.upVotes[this.data.curVoteIndex].from = us
      }
    } else if (this.data.voteState == 'day' && this.data.voteType == 'from') {
      if (this.data.curVoteIndex == -1) {
        // 新增
        this.data.curVoteIndex = day.events.length
        day.events.push({
          type: 'vote',
          from: us,
          to: [],
          msg: ''
        })
      } else {
        // 已有
        day.events[this.data.curVoteIndex].from = us
      }
    }
    this.setData({
      userNumSingleShow: true,
      voteType: 'to',
      userNumShow: false,
      days
    })
  },
  comfirmUserNumSingle(e) {
    let days = this.data.days
    let u = e.currentTarget.dataset.item.name
    let day = days[this.data.curDayIndex]
    let voteState = this.data.voteState
    let voteType = this.data.voteType
    if (voteState == 'up') {
      // 上警
      let vote = day.upVotes[this.data.curVoteIndex]
      vote.to = u - 1
      vote.msg = this.getJoins(vote.from) + ' ⇨ ' + u
    } else {
      if (voteType == 'to') {
        let vote = day.events[this.data.curVoteIndex]
        vote.to = u - 1
        vote.msg = this.getJoins(vote.from) + ' ⇨ ' + u
      } else {
        let vote
        if (this.data.curVoteIndex != -1) {
          // 已有的,修改
          vote = day.events[this.data.curVoteIndex]
        } else {
          // 新增
          vote = {
            to: u - 1
          }
        }
        if (voteType == 'ex') {
          vote.type = 'ex'
          vote.msg = u + ' 自爆'
        } else if (voteType == 'die') {
          vote.type = 'die'
          vote.msg = u + ' 死亡'
        }
        if (this.data.curVoteIndex == -1) {
          // 新增
          day.events.push(vote)
        }
      }
    }
    this.setData({
      userNumSingleShow: false,
      days
    })
  },
  // 添加投票事件
  addUpVote (e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      voteState: 'up',
      voteType: 'from',
      curUserChoose: [],
      curDayIndex: index,
      curVoteIndex: -1
    })
    this.commonShowUserChoose()
  },
  changeUpVote (e) {
    let index = e.currentTarget.dataset.index
    let voteIndex = e.currentTarget.dataset.vi
    this.setData({
      voteState: 'up',
      voteType: 'from',
      curUserChoose: this.data.days[index].upVotes[voteIndex].from,
      curDayIndex: index,
      curVoteIndex: voteIndex
    })
    this.commonShowUserChoose()
  },
  // 添加白天事件
  addEvent (e) {
    let index = e.currentTarget.dataset.index
    let page = this
    wx.showActionSheet({
      itemList: ['自爆', '死亡', '投票'],
      success(res) {
        console.log(res)
        if (res.tapIndex == 0) {
          page.setData({
            voteState: 'day',
            voteType: 'ex',
            curUserChoose: [],
            curDayIndex: index,
            userNumSingleShow: true,
            curVoteIndex: -1
          })
          return
        } else if (res.tapIndex == 1)  {
          page.setData({
            voteState: 'day',
            voteType: 'die',
            curUserChoose: [],
            curDayIndex: index,
            userNumSingleShow: true,
            curVoteIndex: -1
          })
        } else if (res.tapIndex == 2) {
          page.setData({
            voteState: 'day',
            voteType: 'from',
            curUserChoose: [],
            curDayIndex: index,
            curVoteIndex: -1
          })
          page.commonShowUserChoose()
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
    
  },
  changeEvent (e) {
    let index = e.currentTarget.dataset.index
    let voteIndex = e.currentTarget.dataset.vi
    let item = e.currentTarget.dataset.item
    if (item.type == 'ex') {
      // 自爆
      this.setData({
        voteState: 'day',
        voteType: 'ex',
        curUserChoose: [],
        curDayIndex: index,
        userNumSingleShow: true,
        curVoteIndex: voteIndex
      })
      return
    }
    if (item.type == 'die') {
      // 死亡
      this.setData({
        voteState: 'day',
        voteType: 'die',
        curUserChoose: [],
        curDayIndex: index,
        userNumSingleShow: true,
        curVoteIndex: voteIndex
      })
      return
    }
    if (item.type == 'vote') {
      // 投票
      this.setData({
        voteState: 'day',
        voteType: 'from',
        curUserChoose: this.data.days[index].upVotes[voteIndex].from,
        curDayIndex: index,
        curVoteIndex: voteIndex
      })
      this.commonShowUserChoose()
    }
    
  },
  getJoins (list) {
    let arr = []
    for (let i of list) {
      arr.push(i + 1)
    }
    return arr.join(',')
  }
})
