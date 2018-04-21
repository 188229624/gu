    <template>
        <div class="shopcart">
            <div class="content">
                <div class="c-left">
                    <div class="cart-logo" @click="showCart">
                        <div class="logo-con" :class="{'nozero':this.totalNum>0}">
                            <i class="iconfont"></i>
                        </div>
                        <div class="num">
                            {{totalNum}}
                        </div>
                    </div>
                    <div class="cart-price">￥{{totalPrice}}</div>
                    <div class="cart-pei">另需配送费{{deliverPrice}}元</div>
                </div>
                <div class="c-right">
                    <div class="cart-pay" :class="payclass">
                        {{qisong}}
                    </div>
                </div>
            </div>
            <transition name="fold">
            <div class="cartList" v-show="cartShow" >
                <div class="title">
                <h2>购物车</h2>
                <span class="clean" @click="qing">清空</span>
                </div>
                <div class="box1" ref="shopScrooll">
                <ul>
                <li v-for="item in cartArr">
                    <span class="name">{{item.name}}</span>
                    <div class="price">
                        <i>￥</i>
                        <span>{{item.price}}</span>
                    </div>
                    <div class="box">
                    <div class="list-add" ><addcart :foods = 'item'></addcart></div>
                    </div>
                </li>
            </ul>
            </div>
            </div>
            </transition>
        </div>
    </template>

    <script>
        import addcart from '@/components/addcart/addcart'
        import bs from 'better-scroll'
        export default {
            props:{
                cartArr:{
                    type:Array
                },
                deliverPrice:{
                    type:Number,
                    default:0
                },
                minPrice:{
                    type:Number,
                    default:0
                }
            },
            data(){
                return {
                    cartShow:false,

                }
            },

            created:function(){
                this.$nextTick(() => {
                this.initScroll();
            })
            },

            computed:{
                totalNum(){
                    let num = 0;
                    for(let i = 0;i<this.cartArr.length;i++){
                        num+=this.cartArr[i].num
                    }
                    return num
                },
                totalPrice(){
                    let  price = 0;
                    for(let i = 0;i<this.cartArr.length;i++){
                        price += (this.cartArr[i].num * this.cartArr[i].price)
                    }
                    return price
                },
                qisong(){
                    if(this.totalPrice == 0){
                        return `￥${this.minPrice}元起送`
                    }else if(this.totalPrice<this.minPrice){
                        let almose = this.minPrice-this.totalPrice
                        return `还差￥${almose}元起送`
                    }else{
                        return `去结算`
                    }
                },
                payclass(){
                    if(this.totalPrice>=this.minPrice){
                        return 'settlement'
                    }else{
                        return `no-settlement`
                    }
                }
            },
            methods:{
                showCart(){
                    this.cartShow= !this.cartShow
                },
                initScroll:function(){
                    this.shopScrooll = new bs(this.$refs.shopScrooll, {
                        click: true,
                })
            },
            qing(){
                for(var i=0;i<this.cartArr.length;i++){
                   this.cartArr[i].num = 0
                }
            }
        },
            components:{
                'addcart':addcart
            }
        }
    </script>

    <style lang="less">
        .shopcart{
            height:0.96rem;
            position:fixed;
            left:0;
            width:100%;
            bottom:0;
            z-index: 100;
        .content{
            display:flex;
            height:0.96rem;
        .c-left{
            flex:1;
            height:0.96rem;
            background:#141d27;
            .cart-logo{
                display:inline-block;
                height:1.12rem;
                width:1.12rem;
                border-radius:50%;
                background:#141d27;
                position:relative;
                top:-0.2rem;
                left:0.06rem;
                box-sizing:border-box;
                padding:0.12rem;
                .logo-con{
                position: relative;
                height:100%;
                width:100%;
                background:#2b343c;
                border-radius: 50%;
            .iconfont{
                display: inline-block;
                color:rgba(255,255,255,0.4);
                background:url('gwc_03.png');
                width:0.5rem;
                height:0.5rem;
                background-size:0.5rem 0.5rem;
                position: absolute;
                margin: auto;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                }
                &.nozero{
                    background:rgb(0,160,220);
                    i{
                        color:fff;
                    }
                }
                }
            .num{
                position:absolute;
                top:0;
                right:0;
                width:0.48rem;
                height:0.32rem;
                text-align:center;
                font-size:0.18rem;
                color:#fff;
                border-radius:0.12rem;
                background:rgb(240,20,20);
                line-height:0.32rem;
            }
            }
            .cart-price{
                    display:inline-block;
                    color:rgba(255,255,255,0.4);
                    font-weight:700;
                    margin-top:0.24rem;
                    line-height:0.48rem;
                    border-right:0.01rem solid rgba(255,255,255,0.1);
                    font-size:0.32rem;
                    padding-right:0.24rem;
                    vertical-align: top;
                    padding-left:0.36rem;
                }
            .cart-pei{
                display:inline-block;
                font-size:0.32rem;
                color:rgba(255,255,255,0.4);
                font-weight:700;
                line-height:0.48rem;
                vertical-align: 0.55rem;
            }

            }
            .c-right{
            flex:0 0 1.5rem;
            width:1.5rem;
            height:0.96rem;
            background:#2b333b;
            .cart-pay{
                text-align:center;
                font-size:0.24rem;
                color:rgba(255,255,255,0.4);
                font-weight:700;
                line-height:0.9rem;
                 &.settlement{
                    background:#4cd964;
                    color:#fff;
                }
            }
        }
        }
        .cartList{
            position:absolute;
            left:0;
            bottom:0.96rem;
            width:100%;
            z-index: -1;
            .title{
                background:#f3f5f7;
                height:0.8rem;
                line-height:0.8rem;
                padding:0 0.36rem;
            h2{
                float: left;
                font-size:0.28rem;
                font-weight:200;
                color:rgb(7,17,27);
            }
            .clean{
                font-size:0.24rem;
                color:rgb(0,160,220);
                float: right;
            }
            }
            .box1{
                overflow:hidden;
                max-height:4.17rem;
            ul{
                padding:0 0.36rem;
                width:100%;
                background:#fff;
            li{
                height:0.96rem;
                border:0.01rem solid rgba(7,17,27,0.1);
                padding: 0.24rem 0;
                position:relative;
                .name{
                    font-size:0.28rem;
                    color:rgb(7,17,27);
                    line-height:0.48rem;
                    vertical-align: 0.3rem;
                    }
                .price{
                    position:absolute;
                    bottom:0.4rem;
                    right:2.5rem;
                    line-height:0.48rem;
                    font-size:0.28rem;
                    color:rgb(240,20,20);
                    font-weight:700;
                    i{
                        font-weight:200;
                        font-size:0.2rem;
                        font-style:normal;
                        }
                    }
                .box{
                    position:relative;
                    top: -0.05rem;
                    right: 0.5rem;
                }
                }
            }
            }
        }
    }
    </style>