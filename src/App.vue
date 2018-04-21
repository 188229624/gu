<template>
  <div id="app">
    <vheader></vheader>
    <div class="tab">
        <ul>
            <li><router-link to="/goods" >商品</router-link></li>
            <li><router-link to="/comment">评价</router-link></li>
            <li><router-link to="/seller">商家</router-link></li>
        </ul>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import top from '@/components/header/header'
export default {
  name: 'App',
  data(){
    return {
        seller:{},
        fl:false
    }
  },
  components:{
    'vheader':top,
  },
  created(){
    var _this = this
    this.$http.get('/api/seller').then(function(response){
        if(response.data.err == 0){
            _this.seller = response.data.data
        }
    })
  }

}
</script>

<style>
    .router-link-active{
        color:red !important;
    }
    .tab{
        height:1rem;
        width:100%;
        border-bottom:1px solid rgba(7,17,27,0.1);
    }
    .tab ul{
        height:0.8rem;
        width:100%;
        display:flex;
    }
    .tab ul li{
        flex:1;
        line-height:0.4rem;
        text-align:center;
    }
    .tab a{
        font-size:0.24rem;
        line-height:0.28rem;
        color:rgb(77,85,93);
    }
</style>

