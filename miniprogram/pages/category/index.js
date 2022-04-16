import {request} from "../../request/index.js";
Page({

  data: {
    // 左侧的菜单数据
    leftMenuList:[],
    rightContent:[],
    //被点击的左侧菜单
    currentIndex:0,
    scrollTop:0
  },
Cates:[],
  onLoad: function (options) {
    // web中的本地存储和小程序的本地存储的区别
    // 1.写代码的方式不一样了
    // web：localStorage.setItem("key","value") localStorage.getItem("key")
    // 小程序中:wx.setStorageSync('key', "value") wx.getStorageSync('key')
    // 2.存的时候 有没有做类型转换
    // web不管存入什么类型的数据都会先调用tostring方法转换为字符串然后存进去
    // 小城：不存在类型转换这个操作，村什么数据类型进去获取的时候就是什么数据
    // 1.先判断一下本地存储中有没有旧的数据
    // {time:Date.now(),data:[...]}
    // 2.没有旧数据 直接发送新请求
    // 3.有旧数据同时旧的数据也没有过期就是用本地存储中的旧数据
// 获取本地存储中的数据
    const Cates=wx.getStorageSync('cates');
if(!Cates){
  this.getCates();
}else{
  if(Date.now()-Cates.time>1000*10){
    this.getCates();
  }else{
    this.Cates=Cates.data;
    let leftMenuList=this.Cates.map(v=>v.cat_name);
    let rightContent=this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })
  }
}
   

  },
  getCates(){
    request({
      url:"/categories"
    })
    .then(res=>{
     
      this.Cates=res.data.message;
      
      // 把接口的数据存入到本地存储中
      wx.setStorageSync('cates', {time:Date.now(),data:this.Cates});
      //构造左侧的大菜单数据
      let leftMenuList=this.Cates.map(v=>v.cat_name);
      let rightContent=this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightContent
      })

     
    })
    
  },
  //左侧菜单的点击事件
  handleItemTap(e){

   const {index}=e.currentTarget.dataset;
   let rightContent=this.Cates[index].children;
   this.setData({
     currentIndex:index,
     rightContent,
     scrollTop:0
   })

  },
  onReady: function () {

  },

  onShow: function () {

  },


  onHide: function () {

  },


  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },


  onShareAppMessage: function () {

  }
})