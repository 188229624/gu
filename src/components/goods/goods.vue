    <template>
        <div class="goods">
            <div class="menu" ref="menuScrooll">
                <ul>
                    <li v-for="(item,index) in goods" :class="{'on':index == onIdex}" ref="menuList" @click='scrollTo(index)'>
                        <span class="text">
                        <span class="icon" v-if="item.type>=0" :class="classArr[item.type]"></span>
                        {{item.name}}
                        </span>

                    </li>
                </ul>
            </div>
            <div class="list" ref="listScrooll">
                <ul class="foodItem">
                    <li v-for="(item,index1) in goods" ref="fdlist">
                        <h3 class="title">{{item.name}}</h3>
                        <ul class="foodList">
                            <li v-for="(item1,index) in item.foods">
                                <div class="icon" @click="goshow(index1,index)">
                                    <img :src="item1.icon"/>
                                </div>
                                <div class="content">
                                    <h2 class="name">{{item1.name}}</h2>
                                    <div class="desc">
                                        {{item1.description}}
                                    </div>
                                    <div class="sellCount">
                                    <span>月售{{item1.sellCount}}份</span>
                                    <span>好评率{{item1.rating}}%</span>
                                    </div>
                                    <div class="price">
                                    <span class="now"><i>￥</i>{{item1.price}}</span>
                                    <span class="oldPrice" v-show="item1.oldPrice"><i>￥</i>{{item1.oldPrice}}</span>
                                    </div>
                                </div>
                                <div class="list-add" ><addcart :foods="item1"></addcart></div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <shopcart :cartArr="foodTocart" :deliverPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>

            <div class="merchbox" v-show="merchand">
            <div class="merchimg" @click="gohide()">
                <img :src="goods[a].foods[b].image"/>
            </div>
            <h1 class="merchtit">{{goods[a].foods[b].name}}</h1>
            <div class="mertext">
                <span>月售{{goods[a].foods[b].sellCount}}份</span><span>好评率{{goods[a].foods[b].rating}}%</span>
            </div>
            <div class="merpri">
                <span>￥{{goods[a].foods[b].price}}</span><a>￥{{goods[a].foods[b].oldPrice}}</a>
            </div>
            <div class="join" @click="jia(a,b)">加入购物车</div>
            <div class="gowrite"></div>
            <div class="gowrite2"></div>
            <h1 class="gotit">商品介绍</h1>
            <P class="gotxt">{{goods[a].foods[b].info}}</P>
            <div class="gowrite"></div>
            <div class="gowrite2"></div>
            <h1 class="gotit">商品评价</h1>
            <ul class="gooevaluate">
                <li>全部{{goods[a].foods[b].ratings
.length}}</li>
                <li>推荐{{go}}</li>
                <li>吐槽{{ba}}</li>
            </ul>
            <div class="gosee"><span>只看有内容的评价</span></div>
            <div class="gowrite"></div>
            <ul class="goevaluate">
                <li v-for="item3 in goods[a].foods[b].ratings">
                <div class="gouse">
                    <span>{{item3.rateTime}}</span>
                    <div class="im">
                    <a>{{item3.username}}</a>
                    <div class="imbox">
                    <img :src='item3.avatar'/></div>
                    </div>
                </div>
                <div class="goapp">
                    <div class="goappim" :class="dian[item3.rateType]"></div>
                    <h6>{{item3.text}}</h6>
                </div>
                </li>
            </ul>
            <shopcart :cartArr="foodTocart" :deliverPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
        </div>
        </div>

    </template>

    <script>
        import bs from 'better-scroll'
        import addcart from '@/components/addcart/addcart'
        import shopcart from '@/components/shopcart/shopcart'
         import Vue from 'vue'
        export default {
            name:'goods',
                props:{
                    seller:{
                        type:Object
                    }
                },
            data(){
                return{
                    goods:[],
                    listHeight:[],
                    scrollheight:0,
                    merchand:false,
                    food:[],
                    a:0,
                    b:0

                }
            },
            created:function(){
                var _this = this;
                this.$http.get('/api/goods').then(function(response){
                if(response.data.err == 0){
                _this.goods = response.data.data;
                _this.$nextTick(function(){
                    _this.initscroll()
                    _this.getHeight()
                })
                }
                })

                this.classArr = ['decrease','discount','special','invoice','guarantee']

                this.dian = ['good','bady']

            },
            computed:{
                onIdex:function(){
                    for(let i=0;i<this.listHeight.length;i++){
                        let height1 = this.listHeight[i]
                        let height2 = this.listHeight[i+1]
                        if(this.scrollheight>=height1 && this.scrollheight<height2){
                            this.menuScrooll.scrollToElement(this.$refs.menuList[i],300,0,0)
                            return i
                        }
                    }
                },
                foodTocart:function(){
                    let cartArr = []
                    for(let i=0;i<this.goods.length;i++){
                        for(let j=0;j<this.goods[i].foods.length;j++){
                            if(this.goods[i].foods[j].num>0){
                                cartArr.push(this.goods[i].foods[j])
                            }
                        }
                    }
                     return cartArr
                },

                go:function(){
                    let c = 0
                    for(var i=0;i<this.goods[this.a].foods[this.b].ratings.length;i++){
                        if(this.goods[this.a].foods[this.b].ratings[i].rateType ==0){
                            c++
                        }
                    }
                        return c;

                },

                ba:function(){
                    let d = 0
                    for(var i=0;i<this.goods[this.a].foods[this.b].ratings.length;i++){
                        if(this.goods[this.a].foods[this.b].ratings[i].rateType ==1){
                            d++
                        }
                    }
                        return d;
                }

                },

            methods:{
                initscroll:function(){
                    var _this = this;
                    this.menuScrooll = new bs(this.$refs.menuScrooll,{
                        click: true
                    })
                    this.listScrooll = new bs(this.$refs.listScrooll,{
                        click: true,
                        probeType:3
                    })
                    this.listScrooll.on('scroll',function(pos){
                        _this.scrollheight = Math.abs(Math.round(pos.y))
                    })
                },
                getHeight:function(){
                let height = 0;
                this.listHeight.push(height);
                for(var i= 0;i<this.$refs.fdlist.length;i++){
                    height +=this.$refs.fdlist[i].clientHeight;
                    this.listHeight.push(height)
                }
                },
                scrollTo(index){
                    this.listScrooll.scrollToElement(this.$refs.fdlist[index],300,0,0)
                },
                goshow(index1,index){
                    this.merchand = true
                    this.food = []
                    this.food.push(index1,index)
                    this.a = this.food[0]
                    this.b = this.food[1]
                },
                gohide(){
                    this.merchand = false
                },
                jia(a,b){

                    if(!this.goods[a].foods[b].num){
                        Vue.set(this.goods[a].foods[b],'num',1)
                    }else{
                        this.goods[a].foods[b].num ++
                    }

                }
            },
             components:{
                'addcart':addcart,
                'shopcart':shopcart,
                'xq':shopcart
             }
        }
    </script>

    <style lang="less">
        .goods{
            display:flex;
            position:absolute;
            top:3.5rem;
            bottom:0.96rem;
            width:100%;
            overflow:hidden;
            z-index: 99;
        }
        .menu{
            flex:0 0 1.6rem;
            width:1.6rem;
            background:#f3f5f7;
        }
        .menu li{
            height:1.08rem;
            padding:0 0.24rem;
            display:table;
            &.on{
                background: #fff;
                .text{
                    color:rgb(7,17,27);
                    border-bottom:0;
                }
            }
        }
        .menu span{
            display:table-cell;
            vertical-align: middle;
            font-size:0.24rem;
            color:rgb(77,85,93);
            line-height:0.28rem;
            width:1.12rem;
            margin:0 auto;
            border-bottom:0.01rem solid rgba(7,17,27,0.1);
        }
        .menu .icon{float:left;width:0.24rem;height:0.24rem;margin-right:0.08rem;background-size:0.24rem 0.24rem;background-position:0 0;}

        .menu .decrease{background-image:url('decrease_3@2x.png');}

        .menu .guarantee{background-image:url('guarantee_1@2x.png');}

        .menu .invoice{background-image:url('invoice_1@2x.png');}

        .menu .special{background-image:url('special_1@2x.png');}

        .menu .discount{background-image:url('discount_3@2x.png');}

        .list{
            flex:1;
        }
        .foodItem .title{
            background:#f3f5f7;
            height:0.52rem;
            padding-left:0.24rem;
            font-size:0.24rem;
            color:rgb(147,153,159);
            line-height:0.52rem;
            font-weight:200;
            border-left:0.02rem solid #d9dde1;
        }
        .foodList li{
            padding:0.36rem 0;
            margin:0  0.36rem;
            display:flex;
            border-bottom:0.01rem solid rgba(7,17,27,0.1);
            position:relative;
        }
        .foodList .icon{
            flex:0 0 1.12rem;
            margin-right:0.2rem;
        }
        .foodList .icon img{
            width:1.12rem;
            height:1.12rem;
            border-radius:0.02rem;
        }
        .foodList .name{
            font-size:0.28rem;
            color:rgb(7,17,27);
            font-weight:200;
            margin-top:0.04rem;
         }
         .foodList .desc{
            font-size:0.1rem;
            color:rgb(147,153,159);
            line-height:0.3rem;
            margin-top:0.5rem;
         }
         .foodList .sellCount{
            font-size:0.1rem;
            color:rgb(147,153,159);
            line-height:0.1rem;
            margin-top:0.2rem;
         }
         .sellCount span{
            margin-right:0.24rem;
         }
         .foodList .price{
            margin-top:0.2rem;
            height: 0.2rem;
            display:flex;
         }
         .foodList .now{
          font-size:0.14rem;
          line-height:0.24rem;
          color:rgb(240,20,20);
          font-weight:700;
          margin-right:0.08rem;
         }
         .foodList .now i{
            font-style:normal;
            font-size:0.1rem;
            font-weight:normal;
         }
         .foodList .oldPrice{
            font-size:0.1rem;
          line-height:0.24rem;
          color:rgb(147,153,159);
          font-weight:700;
          text-decoration: line-through;
         }
         .foodList .oldPrice i{
            font-style:normal;
            font-size:0.1rem;
            font-weight:normal;
         }
         .list-add{
            position:absolute;
            right:0.01rem;
            bottom:0.2rem;
         }
         .merchbox{
            position: fixed;
            background:#ffffff;
            width: 100%;
            height: 100%;
            left: 0;
            bottom: 0.96rem;
            overflow: auto;
            z-index: 100;
         }
         .merchimg{
            width:100%;
            height:7.5rem;
         }
         .merchtit{
            margin-top:0.36rem;
            margin-left:0.36rem;
            font-size:0.28rem;
            font-weight:700;
            color:rgb(7,17,27);
            line-height:0.2rem;
         }
         .mertext{
            margin-top:0.16rem;
            margin-left:0.36rem;
            display:flex;
         }
         .mertext span{
            font-size:0.2rem;
            color:rgb(147,153,159);
            line-height:0.2rem;
            margin-bottom:0.36rem;
            margin-right:0.2rem;
         }
         .merpri{
            height:0.5rem;
            display: flex;
            margin-left:0.36rem;
            margin-bottom: 0.36rem;
         }
         .merpri span{
            font-size:0.28rem;
            font-weight:700;
            color:rgb(240,20,20);
            line-height:0.48rem;
         }
         .merpri a{
            font-size:0.2rem;
            font-weight:normal;
            color:rgb(147,153,159);
            line-height:0.48rem;
            margin-left:0.2rem;
         }
         .join{
            width:1.48rem;
            height:0.48rem;
            font-size:0.2rem;
            color:rgb(255,255,255);
            line-height:0.48rem;
            border-radius:0.24rem;
            background-color:rgb(0,160,220);
            text-align:center;
            position:absolute;
            top:8.8rem;
            right:0.36rem;
         }
         .gowrite{
            width:100%;
            height:0.02rem;
            background:rgb(7,17,27);
         }
         .gowrite2{
            width:100%;
            height:0.02rem;
            background:rgb(7,17,27);
            margin-top:0.8rem;
         }
         .gotit{
            margin-top:0.36rem;
            font-size:0.48rem;
            font-weight:200;
            color:rgb(7,17,27);
            line-height:0.48rem;
            margin-left:0.36rem;
         }
         .gotxt{
            margin-top:0.12rem;
            font-size:0.24rem;
            font-weight:200;
            color:rgb(77,85,93);
            line-height:0.48rem;
            margin-left:0.5rem;
            margin-bottom: 0.5rem;
         }
         .gooevaluate{
            margin-top:0.36rem;
            padding-bottom:0.8rem;
            margin-left:0.2rem;
            border-bottom:0.01rem solid #e6e7e8;
        }
        .gooevaluate li{
            float: left;
            margin-left:0.2rem;
            width:1rem;
            height:0.5rem;
            background:#00a0dc;
            color:#4d555d;
            font-size:0.2rem;
            text-align:center;
            line-height:0.5rem;
        }
        .gooevaluate li:nth-child(2){
            background:#ccecf8;
        }
        .gooevaluate li:nth-child(3){
            background:#e9ebec;
        }
        .gosee{
            margin-top:0.5rem;
            padding-bottom:0.5rem;
            margin-left:0.3rem;
            height:0.5rem;
            background:url('pingjia_08.png') 0 0 no-repeat;
            background-size:0.42rem 0.4rem;
        }
        .gosee span{
            color:#93999f;
            font-size:0.24rem;
            margin-left:0.5rem;
            float: left;
            margin-top:0.1rem;
        }
        .goevaluate{
            width:100%;
        }
        .goevaluate li{
            width:6.2rem;
            height:1rem;
            margin-top:0.32rem;
            border-bottom:1px solid rgba(7,17,27,0.1);
            margin-left:0.3rem;
        }
        .gouse {
            display:flex;
            justify-content:space-between;
        }
        .gouse span{
            font-size:0.2rem;
            color:rgb(147,153,159);
            line-height:0.24rem;
        }
        .im a{
            font-size:0.2rem;
            color:rgb(147,153,159);
            line-height:0.24rem;
            float:left;
        }
        .imbox{
            float:right;
            width:0.3rem;
            height:0.3rem;
            margin-left:0.2rem;
        }
        .imbox img{
            width:0.3rem;
            height:0.3rem;
            float:left;
        }
        .goapp{
            margin-top:0.12rem;
            display:flex;
        }
        .goappim{
            width:0.3rem;
            height:0.3rem;
            margin-right:0.08rem;
        }
        .good{
            background:url('haoping_31.png');
        }
        .bady{
            background:url('chaping_28.png');
        }
        .goapp h6{
            font-size:0.24rem;
            color:rgb(7,17,27);
            line-height:0.32rem;
        }
        .merchimg img{
            width:7.5rem;
            height:7.5rem;
        }
    </style>