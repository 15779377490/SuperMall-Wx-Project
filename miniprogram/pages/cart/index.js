// pages/cart/index.js
Page({


  data: {
address:{},
cart:[],
allChecked:false
  },

 
  onLoad: function (options) {


  },
  onShow:function(){
const address=wx.getStorageSync('address');
const cart=wx.getStorageSync('cart')||[];
// 数组的every方法返回一个回调函数，每个回调函数返回的都是是一个true值，假如有一个回调函数返回的是false则停止循环
// const allChecked=cart.length?cart.every(v=>v.checked):false;
this.setData({address})
this.setCart(cart);
  },
  handleChooseAddress(){

        wx.getSetting({
         
      success:(result)=>{
     
    const scopeAddress=result.authSetting["scope.address"];
console.log(scopeAddress)
    if(scopeAddress===true||scopeAddress===undefined){
      
    wx.chooseAddress({ 
      success: (result1) => {
        const address=result1
      wx.setStorageSync('address', address)
      }
    });
    }else{
      wx.openSetting({        
       success:(result2)=>{
        console.log(11)
         wx.chooseAddress({         
           success: (result3) => {
            
             console.log(result3);
           }
         })
       }
      })
}
  }
})
},
 handleItemChange(e){
  //  获取被修改商品的id
 
  const {id}=e.currentTarget.dataset;

  //获取购物车数组
  let {cart}=this.data;
  //找到被修改的对象
  let index=cart.findIndex(v=>v.goods_id===id);
  //选中状态取反
 
  cart[index].checked=!cart[index].checked;
  // 把购物车数据重新设置回data数据和缓存中\
  this.setCart(cart);
  
},
handleAllCheckedchange(){
 
let allChecked=this.data.allChecked;
let cart=this.data.cart;

allChecked=!allChecked;
cart.forEach(v=>v.checked=allChecked);
this.setData({
  cart,
  allChecked
})
this.setCart(cart);

},
handleItemNumEdit(e){
  
const {operation,id}=e.currentTarget.dataset;

let {cart}=this.data;
let index=cart.findIndex(v=>v.goods_id===id);
if(cart[index].num===1&&operation===-1){
wx.showModal({
 title:"提示",
 content:"您是否要删除",
 success:(res)=>{
   if(res.confirm){
    cart.splice(index,1);
    this.setCart(cart);
   }else if(res.cancel){
console.log("用户点击取消")
   }
  
 }
})
}else{
  cart[index].num+=operation;
  this.setCart(cart);
}

},
handlePay(){
  const {address,totalNum}=this.data;

if(!address.userName){
wx.showToast({

  title: '您还没有选择收获地址',
  icon:'none',
  success:(res)=>{
console.log(res);
  },
  fail:(err)=>{
   console.log(err);
  }
})
return;
}
if(totalNum===0){
  wx.showToast({

    title: '您还没有选购商品',
    icon:'none',
    success:(res)=>{
 console.log(res);
    },
    fail:(err)=>{
    console.log(err);
    }
  })
return;
}
wx.navigateTo({
  url: '/pages/pay/index'
})
},
// 将重复使用的setcart封装进行使用
setCart(cart){
  
  let allChecked=true;
  let totalPrice=0;
  let totalNum=0;
  console.log(cart)
  cart.forEach(v=>{
    if(v.checked){
      totalPrice+=v.num*v.goods_price;
      totalNum+=v.num;
    }else{
      allChecked=false;
    }
  })
  allChecked=cart.length!=0?allChecked:false;
  this.setData({
    cart,
    totalPrice,
    totalNum,
    allChecked
  })
  wx.setStorageSync('cart', cart);
},
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