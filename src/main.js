import Vue from 'vue'
import './plugins/axios'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store/'
import axios from 'axios';
import interceptors from './interceptors';

//cube-ui注册全局组件的方式
import {createAPI} from 'cube-ui';
import CartAnim from '@/components/CartAnim.vue';

//注册全局组件  调用方式：$createCartAnim
createAPI(Vue,CartAnim,['transitionend'])//挂一个自定义属性transitionend，要做清理工作，防止内存溢出


//注册自己的全局方法
import create from '@/utils/create.js';
Vue.prototype.$create=create;


Vue.config.productionTip = false;
Vue.prototype.$ajax = axios;

const vm=new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

interceptors(vm);
