import Vue from 'vue'
import Vuex from 'vuex'
import user from './user';
import cart from './cart';
Vue.use(Vuex)
//使用模块化
 const store=new Vuex.Store({
  modules:{
    user,cart
  }
})

//数据持久化store/index.js
//购物车状态mutation，需要重新设置缓存数据
store.subscribe((mutations,state)=>{
  localStorage.setItem('cart',JSON.stringify(state.cart.list));
});
export default store;
