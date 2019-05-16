import Vue from 'vue';

export default function(Component,props){
    const instance=new Vue({
        render(h){
            return h(Component,{props})//虚拟dom
        }
    }).$mount();
    //手动挂载：将生成的dom元素追加至body
    document.body.appendChild(instance.$el)//真实dom，不是vue的实例
    //将组件的实例传出去，方便外面做清除工作
    const comp=instance.$children[0];//因为只有1个组件，所以第0个就是
    //要提供一个组件清除方法
    comp.remove=()=>{
        document.body.removeChild(instance.$el);//将页面中插入的真实dom清除掉
        instance.$destroy();//同时要将vue的实例也清除掉
    }
    return comp;
}