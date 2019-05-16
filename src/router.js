import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Cart from './views/Cart.vue';
import History from '@/utils/history';

Vue.use(Router)
Vue.use(History)

//给Router挂一个goBack方法
Router.prototype.goBack=function() {
  this.back();
  this.isBack=true;//标志一下，告诉正在回退
}
const router=new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      meta:{auth:true},//此路由需要验证
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
});
router.beforeEach((to,from,next)=>{
  //判断当前用户有么有登录
  if(to.meta.auth) {
    //只要本地有token就认为登录
    const token =localStorage.getItem('token');
    if(token) {
      next();
    }else {
      //未登录
      next({
        path:'/login',
        query:{redirect:to.path}//查询参
      })
    }
  }else {
    //不需要登录（被称为白名单）
    next();
  }
});

router.afterEach((to,from)=>{
  if(router.isBack){
    History.pop();
    router.isBack=false;
    router.transitionName='route-back';
  }else {
    History.push(to.path);
    router.transitionName='route-forward';
  }
})

export default router;
