export default {
    state: {
        list:JSON.parse(localStorage.getItem('cart'))||[]
    },
    mutations: {
        //添加购物车
        addcart(state,item){
            const good=state.list.find(k=>k.title==item.title)
            if(good) {
                good.cartCount++
            }else {
                state.list.push({
                    ...item,
                    cartCount:1
                })
            }
            //localStorage.setItem('cart',JSON.stringify(state.list));//存储到本地
        },
        //减少商品
        cartremove(state,index){
            if(state.list[index].cartCount>1) {
                state.list[index].cartCount-=1
            }
            //localStorage.setItem('cart',JSON.stringify(state.list));//存储到本地
        },
        //增加商品
        cartadd(state,index){
            state.list[index].cartCount+=1;
            //localStorage.setItem('cart',JSON.stringify(state.list));//存储到本地
        }
    },
    getters:{
        //商品总数
        cartTotal(state){
            let sum=0;
            state.list.forEach(item=>{
                sum+=item.cartCount
            })
            return sum;
        },
        //总价
        total(state){
           // let sum=0;
           // state.list.forEach(item=>{
           //     sum+=item.cartCount*item.price
           // });
           return state.list.reduce((total,item)=>{
               return total+item.cartCount*item.price//必须return出去
           },0)
        }
    }
}