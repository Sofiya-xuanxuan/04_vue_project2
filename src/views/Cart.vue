<template>
    <div>
        <div class="good" v-for="(item,index) in cart" :key="item.id">
            {{item.title}}
            <div class="right">
                <i class="cubeic-remove" @click="removeCart(index)"></i>
                <span>{{item.cartCount}}</span>
                <i class="cubeic-add" @click="addCart(index)"></i>
            </div>
        </div>
        <div>总价 {{total}}</div>

        <cube-button :disabled="true" v-if="total<minTotal">还差{{minTotal-total}}可以购买</cube-button>
        <cube-button v-else>
            下单
            <span v-if="!isLogin">(需要登录)</span>
        </cube-button>
        <!-- <div>
          {{cart}}
        </div>-->
    </div>
</template>

<script>
    import {mapState,mapMutations,mapGetters} from 'vuex';
    export default {
        name: "Cart",
        data() {
            return {
                minTotal: 1000
            }
        },
        methods: {
            ...mapMutations(['cartremove','cartadd']),
            removeCart(index) {
                this.cartremove(index);
            },
            addCart(index){
                this.cartadd(index);
            }
        },
        created(){

        },
        computed: {
            ...mapState({
                cart:state=>state.cart.list,
                isLogin:state=>state.user.isLogin
            }),
            ...mapGetters(['total'])
        },
    }
</script>

<style scoped lang="stylus">
    .good {
        padding: 10px;
        text-align: left;

    .right {
        float: right;
    }

    i {
        font-size: 18px;
    }
    }
</style>