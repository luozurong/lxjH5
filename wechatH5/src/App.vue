<template>
  <div>
    <!-- <router-view class="home-wrap"></router-view> -->
    <keep-alive include="home,product,shoppingcar,user"><router-view></router-view></keep-alive>
    <div class="home-fixed" v-if='fixedFlag'>
      <router-link  :to="{ path: 'home' }" :class="{'router-link-active':footerActive}">
        <div>
          <img :src="home" alt="">
          <span>首页</span>
        </div>
      </router-link>
      <router-link to="product">
          <div>
            <img :src="product" alt="">
            <span>分类</span>
          </div>
      </router-link>
      <router-link to="shoppingcart">
        <div>
          <img :src="shoppingcart" alt="">
          <span>购物车</span>
        </div>
      </router-link>
      <router-link to="user">
        <div>
          <img :src="user" alt="">
          <span>我的</span>  
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
  import home from '../src/assets/home_nor.png'
  import homeActive from '../src/assets/home_pre.png'
  import product from '../src/assets/life_nor.png'
  import productActive from '../src/assets/life_pre.png'
  import shoppingcart from '../src/assets/message_nor.png'
  import shoppingcartActive from '../src/assets/message_pre.png'
  import user from '../src/assets/mine_nor.png'
  import userActive from '../src/assets/mine_pre.png'

  import { Toast } from 'we-vue'
  export default{
    name:'App',
    data:function(){
      return{
        home:homeActive,
        product:product,
        shoppingcart:shoppingcart,
        user:user,
        footerActive: true,
        fixedFlag:true
      } 
    },
    methods:{
      routeFunc:function(){
        if(this.$route.path == '/home' || this.$route.path == '/lxjH5/dist/home' || this.$route.path == "/"){
          this.home = homeActive;
          this.product = product;
          this.shoppingcart = shoppingcart;
          this.user = user;
          this.footerActive = true;
          this.fixedFlag = true;
        }else if(this.$route.path == '/product' || this.$route.path == '/lxjH5/dist/product'){
          this.home = home;
          this.product = productActive;
          this.shoppingcart = shoppingcart;
          this.user = user;
          this.footerActive = false;
           this.fixedFlag = true;
        }else if(this.$route.path == '/shoppingcart' || this.$route.path == '/lxjH5/dist/shoppingcart'){
          this.home = home;
          this.product = product;
          this.shoppingcart = shoppingcartActive;
          this.user = user;
          this.footerActive = false;
           this.fixedFlag = true;
        }else if(this.$route.path == '/user' || this.$route.path == '/lxjH5/dist/user'){
          this.home = home;
          this.product = product;
          this.shoppingcart = shoppingcart;
          this.user = userActive;
          this.footerActive = false;
          this.fixedFlag = true;
        }else{
          this.footerActive = false;
          this.fixedFlag = false;
        }
      }
    },
    mounted:function(){
      if(window.__wxjs_environment == 'miniprogram'){   
         this.fixedFlag = false;
         console.log(this.fixedFlag);
      }
      this.routeFunc();
    },
    watch:{
      $route: function(to,from){
        this.routeFunc();
      }
    }
  }
</script>
<style scoped>
    *{
     padding: 0;
     margin: 0;
     font-size: 0.14rem;
     -webkit-tap-highlight-color:transparent;
     font-family: "PingFang SC", Helvetica, Tahoma, Arial, "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei";
    }
    body,html{
      min-height: 100%;
      
    }
    body{
      position: relative;
    }
    a{
      color: #aaa;
    }
    .home{
      width: 100%;
      height: 100%;
      overflow-x: hidden; 
      box-sizing: border-box;
    }
    .home-wrap{
      width: 100%;
      overflow-x: hidden; 
      box-sizing: border-box;
    }
    .home-fixed{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background: #fff;
      overflow: hidden;
      border-top: 1px solid #eee;
      box-sizing: border-box;
    }
    .home-fixed div{
       width: 25%;
       float: left;
    }
    .home-fixed div img{
      width: 0.24rem;
      display: block;
      margin: 0.08rem auto 0;
    }
    .home-fixed span{
      display: inline-block;
      font-size: 0.12rem;
      display: block;
      text-align: center;
      line-height: 0.23rem;
      color: #333;
    }
    .router-link-active span{
      color: #fc9153;
    }
</style>