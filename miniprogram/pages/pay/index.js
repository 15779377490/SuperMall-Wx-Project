// pages/cart/index.js
Page({
  data: {
address:{},
cart:[],
  },
  onLoad: function (options) {


  },
  onShow:function(){
const address=wx.getStorageSync('address');
let cart=wx.getStorageSync('cart')||[];
cart=cart.filter(v=>v.checked);
this.setData({address})
let totalPrice=0;
let totalNum=0;
console.log(cart)
cart.forEach(v=>{
    totalPrice+=v.num*v.goods_price;
    totalNum+=v.num;
})
this.setData({
  cart,
  totalPrice,
  totalNum,
  address
})
wx.setStorageSync('cart', cart);
  },

// 将重复使用的setcart封装进行使用

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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