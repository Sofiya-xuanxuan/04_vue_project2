import us from '@/service/user';
export default {
    state: {
        isLogin:!!localStorage.getItem('token')//！！表示布尔值转换——转为了true或者false
    },
    mutations: {
        setLoginState(state,val){
            state.isLogin=val;
        }
    },
    actions: {
        login({commit},userInfo){
            return us.login(userInfo).then(({code,token})=>{//直接解构出来
                //code 、token
                if(token) {
                    //更改isLogin的状态
                    commit('setLoginState',true);
                    //缓存token
                    localStorage.setItem('token',token)//此处token不需要序列化，因为token本身就是字符串
                    //告诉外界，我的结果
                    return true;
                }
                return false;
            })
        },
        logout({commit}){
            localStorage.removeItem('token');
            commit('setLoginState',false);
        }
    }
}