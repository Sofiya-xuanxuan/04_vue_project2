<template>
    <div id="Login">
        <cube-form
                :model="model"
                :schema="schema"
                :immediate-validate="false"
                @validate="validateHandler"
                @submit.prevent="submitHandler">

        </cube-form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                model: {
                    username:'',
                    password:''
                },
                schema:{//用数据来描述表单
                    fields:[
                        {
                            type:'input',
                            modelKey:'username',
                            label:'用户名',
                            props:{placeholder:'请输入用户名'},
                            rules:{
                                required:true
                            },
                            trigger:'blur'
                        },
                        {
                            type:'input',
                            modelKey:'password',
                            label:'密码',
                            props:{placeholder:'请输入密码',type:'password',eye:{open:true}},
                            rules:{
                                required:true
                            },
                            trigger:'blur'
                        },
                        {
                            type:'submit',
                            label:'登录'
                        }
                    ]
                }
            }
        },
        methods: {
            validateHandler(ret) {
                //console.log(ret);
            },
            submitHandler(e){
                //登录请求
                this.$store.dispatch('login',this.model).then(success=>{
                    if(success) {
                        const path=this.$route.query.redirect || '/';
                        this.$router.push(path);
                    }
                }).catch(error=>{
                    const toast=this.$createToast({
                        time:2000,
                        txt:'登录失败',
                        type:'error'
                    }).show();
                })
            }
        },
    }
</script>

<style scoped>

</style>