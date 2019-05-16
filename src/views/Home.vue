<template>
    <div class="home">
        <k-header title="开课吧">
            <i class="cubeic-tag"></i>
        </k-header>
        <cube-slide ref="slide" :data="slider" :interval="5000">
            <cube-slide-item v-for="(item, index) in slider" :key="index">
                <router-link :to="`/detail/$item.id`">
                    <img :src="item.img">
                </router-link>
            </cube-slide-item>
        </cube-slide>
        <!--商品列表-->
        <!--<goods-list :data="goods" @cartanim="$refs.ca.start($event)"></goods-list>-->
        <goods-list :data="goods" @cartanim="startCartAnim"></goods-list>
        <!--动画-->
        <!--<cart-anim ref="ca"></cart-anim>-->
    </div>
</template>

<script>
    import gs from '@/service/goods.js';
    import GoodsList from '@/components/GoodsList.vue';
    import CartAnim from '@/components/CartAnim.vue';
    import KHeader from '@/components/Header.vue';
    export default {
        name: 'home',
        components:{
            GoodsList,
            KHeader
            // CartAnim
        },
        data() {
            return {
                goodsInfo: {},
                slider: [],
                keys: []
            }
        },
        created() {
            gs.getGoodsInfo().then(data => {
                if (data) {
                    console.log(data);
                    const {goodsInfo, slider, keys} = data;
                    this.goodsInfo = goodsInfo;
                    this.slider = slider;
                    this.keys = keys;
                }
            })
        },
        methods: {
            startCartAnim(el) {
                //cube-ui创建组件的方式
                // const anim=this.$createCartAnim({
                //     onTransitionEnd(){
                //         anim.remove();//动画结束后，要将组件清除掉，防止内存溢出
                //     }
                // })
                // anim.start(el);//自己组件有start方法

                //自己封装的全局组件创建的方式
                const anim=this.$create(CartAnim,{
                    pos:{left:'46%',bottom:'30px'}
                })
                anim.start(el);
                //监听动画结束
                anim.$on('transitionend',anim.remove)
            }
        },
        computed: {
            goods() {
                // [[{},{}],[{},{}]] => [{},{}...]
                //flatMap是脱壳方法
                //var A = [ 1, 2, 3, 4, 5 ];
                //c = A.flatMap(x => [x * 3]); //[3,6,9,12,15]
                //flatMap有兼容性问题，Chrome在71版本以上才可以
                return this.keys.flatMap(item=>this.goodsInfo[item]);
            }
        },
    }
</script>
<style scoped>
    .cube-slide {
        height: auto;
    }

    .cube-slide-item > a > img {
        width: 100%;
        height: auto;
    }
</style>
