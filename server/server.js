const Koa=require('koa');
const Router=require('koa-router');
const jwt=require('jsonwebtoken');//签发令牌
const jwtAuth=require('koa-jwt');//令牌校验

const secret='it is a token';

const app=new Koa();
const router=new Router();

router.get('/api/login',async ctx=>{
    const {username,password}=ctx.query;
    if(username=='sofiya'&& password=='123456') {
        //生成令牌
        const token=jwt.sign({
            data:{name:'sofiya is a girl'},//载荷——用户信息数据
            exp:Math.floor(Date.now()/1000)+60*60//过期时间
        },secret);
        ctx.body={code:1,token}
    }else {
        ctx.status=401;
        ctx.body={code:0,message:'用户名或者密码错误'};
    }
});

router.get('/api/userInfo',jwtAuth({secret}),async ctx=>{
    ctx.body={code:1,data:{name:'sofiya info',age:'27'}}
});
app.use(router.routes());
app.listen(3000);
