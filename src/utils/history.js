const History={
    _history:[],
    install(Vue) {
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
        this._history.pop();
    },
    canBack(){
        return this._history.length>1;
    }
}
export default History;