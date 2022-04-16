// pages/goods_list/index.js
import {request} from "../../request/index.js";
Page({

  data: {
tabs:[
{
  id:0,
  value:"综合",
  isActive:true
},
{
  id:1,
  value:"销量",
  isActive:false
},
{
  id:2,
  value:"价格",
  isActive:false
}

],
goodsList:[]
  },
 QueryParams:{
 query:"",
 cid:"",
 pagenum:1,
 pagesize:10
 },
  onLoad: function (options) {
    console.log(options.cid)
 this.QueryParams.cid=options.cid;
this.getGoodsList();
  },
  getGoodsList(){
    request({ url:'/goods/search',data:this.QueryParams})
 
    .then(result=>{
     //获取总条数
     const total=result.data.message.total;
     //计算总页数
     this.totalPage=Math.ceil(total/this.QueryParams.pagesize)
   
              this.setData({
                // 拼接的数组
        goodsList:[...this.data.goodsList,...result.data.message.goods]
          })
  wx.stopPullDownRefresh();
   
  
     
    })
   
  },
// 标题点击事件 从子组件传递过来
handleTabsItemChange(e){
  //  获取被点击的标题索引
  const {index}=e.detail;

  //修改原数组
  let {tabs}=this.data;


  tabs.forEach((v,i)=>i===index?v.isActive=true : v.isActive=false);
  // 赋值到data中


  this.setData({
    tabs
  })
},
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
     this.setData({
       goodsList:[]
     })
     this.QueryParams.pagenum=1;
     this.getGoodsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 判断有没有下一页数据
    if(this.QueryParams.pagenum>=this.totalPage){
      //没有下一页数据
      // console.log('%c'+"没有下一页数据","color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,pink)")
      wx-wx.showToast( {title: '没有下一页了'  })
    }else{
this.QueryParams.pagenum++;
this.getGoodsList();
    }
    },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})