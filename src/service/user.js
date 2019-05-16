import axios from 'axios';
export default {
    login(user) {
        return axios.get('/api/login',{params:user}).then(({data})=>data)//将data解构出来直接返回去
    }
}