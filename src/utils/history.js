const History={
    _history:[],
    install(Vue) {
        //给对象定义一个新的属性
        Object.defineProperty(Vue.prototype,'$routerHistory',{
            //只读
            get(){
                return History
            }
        })
    },
    push(path){
       this._history.push(path);
    },
    pop() {
        this._history.pop();//删除最后一个元素
    },
    canBack(){
        return this._history.length>1;
    }
}
export default History;