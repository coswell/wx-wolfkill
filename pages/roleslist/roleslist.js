//listman.js
//获取应用实例
const app = getApp()
Page({
  data: {
    dataList:[
      //村民
      {
          "pic": "/images/icon/平民.png",
          "title": "cunmin",
          "name": "村民",
          "intro": "全场最懵的角色"
      },
      //女巫
      {
          "pic": "/images/icon/女巫.png",
          "title": "nvwu",
          "name": "女巫",
          "intro": "可乐的代言人"
      },
      //猎人
      {
          "pic": "/images/icon/猎人.png",
          "title": "lieren",
          "name": "猎人",
          "intro": "全场最叼的角色"
      },
      //预言家
      {
          "pic": "/images/icon/预言家.png",
          "title": "yuyanjia",
          "name": "预言家",
          "intro": "全场最惨的角色"
      },
      //盗贼
      {
          "pic": "/images/icon/盗贼.png",
          "title": "daozei",
          "name": "盗贼",
          "intro": "全场最gay的角色"
      },
      //丘比特
      {
          "pic": "/images/icon/丘比特.png",
          "title": "qiubite",
          "name": "丘比特",
          "intro": "全民公敌"
      },
      
    ]
  },
  onLoad: function () {
    
  }
})
