// pages/goods_detail/index.js
import {request} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
goodsObj:{},
isCollect:false
  },
GoodsInFo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    console.log(1)
    let pages=getCurrentPages();
    let CurrentPages=pages[pages.length-1];
    let options=CurrentPages.options;
 
    const {goods_id}=options;
    this.getGoodsDetail(goods_id);
   
  },
getGoodsDetail(goods_id){
request({url:"/goods/detail",data:{goods_id}})
.then(result=>{
this.GoodsInFo=result.data.message;
// 获取当地缓存中的商品收藏的数组
let collect=wx.getStorageSync('collect')||[];
// 判断商品是否呗收藏
let isCollect=collect.some(v=>v.goods_id===this.GoodsInFo.goods_id);
// console.log(this.GoodsInFo)

this.setData({
goodsObj:result.data.message,
isCollect
})
})
},
handlePrevewImage(e){
  const urls=this.GoodsInFo.pics.map(v=>v.pics_mid);
  const current=e.currentTarget.dataset.url;
  wx.previewImage({
    current:current,
    urls: urls,
  })
},
handleCartAdd(){
let cart=wx.getStorageSync('cart')||[];

let index=cart.findIndex(v=>v.goods_id===this.GoodsInFo.goods_id);

if(index===-1){
this.GoodsInFo.num=1; 
this.GoodsInFo.checked=true;
cart.push(this.GoodsInFo); 

}else{

  cart[index].num++;
}
wx.setStorageSync('cart', cart);
wx.showToast({
  title: '加入成功',
  icon:'success',
  mask:true
})
},
handleCollect(){
let isCollect=false;
let collect=wx.getStorageSync('collect')||[];
let index=collect.findIndex(v=>v.goods_id===this.GoodsInFo.goods_id);

if(index!==-1){
collect.splice(index,1);
isCollect=false;
wx.showToast({
  title: '取消成功',
  icon:'success',
  mask:true
})
}else{
  
  collect.push(this.GoodsInFo);
  isCollect=true;

  wx.showToast({
    title: '收藏成功',
    icon:'success',
    mask:true
  })
 
}
wx.setStorageSync('collect', collect);
this.setData({
  isCollect
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