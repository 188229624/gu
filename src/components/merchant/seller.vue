    <template>
        <div class="shop">
        <div class="selwire"></div>
        <div class="star">
            <h3>{{msg.name}}</h3>
            <div class="sum">
                <star :size="24" :score="3.9"></star>
                <h5>（661）</h5>
                <h6>月售{{msg.sellCount}}</h6>
            </div>
        </div>
        <div class="love" @click="yi" ref="lov">
        <h3 ref="lov">已收藏</h3>
        </div>

        <div class="lov" @click="lo" ref="lov">
        <h3>收藏</h3>
        </div>

        <div class="selwire"></div>
        <div class="CompanyData">
            <div class="Send">
                <h3>起送价</h3>
                <div class="sendbox">
                <h2>{{msg.minPrice}}</h2>
                <h6>元</h6>
                </div>
            </div>
            <div class="xian"></div>
            <div class="Send">
                <h3>商家配送</h3>
                <div class="sendbox">
                <h2>{{msg.deliveryPrice}}</h2>
                <h6>元</h6>
                </div>
            </div>
            <div class="xian"></div>
            <div class="Send">
                <h3>平均配送时间</h3>
                <div class="sendbox">
                <h2>{{msg.deliveryTime}}</h2>
                <h6>分钟</h6>
                </div>
            </div>
        </div>
            <div class="selwire"></div>
            <h1 class="tit">公告与活动</h1>
            <P class="seltext">{{msg.bulletin}}</P>

            <ul class="selsupports">
                    <li v-for="item in msg.supports">
                    <span class="icon" :class="classArr[item.type]"></span>
                    <span class="text">{{item.description}}</span>
                    </li>
            </ul>

            <div class="selwire"></div>
            <h1 class="tit">商家实景</h1>

            <div class="selimg" ref="tab">
                    <div class="boximg1">
                        <img  :src="item"v-for="item in msg.pics" ref="tabitem"/>
                    </div>
            </div>

            <div class="selwire"></div>

            <h1 class="tit">商家实景</h1>
            <ul class="selsupports">
                    <li v-for="item in msg.infos">
                        {{item}}
                    </li>
            </ul>
            </div>
    </template>

    <script>
        import star from '@/components/star/star.vue'
        import bs from 'better-scroll'
        import Slide from '@/components/slider/slider'
        export default {
            name:'seller',
            name:'selimg',

            props:{

            },

            data(){
                return{
                    msg:{},
                    loop:true,
                    autoPlay:true,
                    sz:true
                }
            },
            created:function(){
            var _this = this;
            this.$http.get('/api/seller').then(function(response){
                    if(response.data.err == 0){
                    _this.msg = response.data.data;
                    _this.InitTabScroll1()
                }
            })
            this.classArr = ['decrease','discount','special','invoice','guarantee']
            },
            computed:{

            },
            methods:{
                lo(){
                   this.$refs.lov.style.display = 'none'
                },
                yi(){
                    this.$refs.lov.style.display = 'block'
                },

                InitTabScroll1(){
                        this.scroll=new bs(this.$refs.tab, {
                            click:true,
                            scrollX:true,
                            scrollY:false
                        })
            }

            },
            components:{
                'star':star,
            }
        }
    </script>

    <style>
        .shop{
            width:100%;
            position:relative;
        }
        .selwire{
            width:100%;
            height:0.02rem;
            background:rgb(7,17,27);
        }
        .star{
            margin-top:0.36rem;
            margin-left:0.36rem;
            margin-bottom: 0.3rem;
        }
        .star h3{
            font-size:0.28rem;
            color:rgb(7,17,27);
            line-height:0.28rem;
        }
        .sum{
            margin-top:0.16rem;
            display:flex;
        }
        .sum h5{
            font-size:0.2rem;
            color:rgb(77,85,93);
            line-height:0.36rem;
            margin-left:0.16rem;
        }
        .sum h6{
            font-size:0.2rem;
            color:rgb(77,85,93);
            line-height:0.36rem;
            margin-left:0.24rem;
        }
        .love{
            position:absolute;
            width:1rem;
            height:1rem;
            top:0.5rem;
            right:0.36rem;
            font-size:0.48rem;
            color:rgb(240,20,20);
            line-height:0.48rem;
            background:url('爱心_09.png')center 0.1rem no-repeat;
            background-size:0.5rem 0.5rem;
        }
        .love h3{
            margin-top:0.6rem;
            font-size:0.2rem;
            color:rgb(77,85,93);
            line-height:0.2rem;
            text-align:center;
        }
        .lov{
            position:absolute;
            width:1rem;
            height:1rem;
            top:0.5rem;
            right:0.36rem;
            font-size:0.48rem;
            color:rgb(240,20,20);
            line-height:0.48rem;
            background: black;
        }
        .lov h3{
            margin-top:0.6rem;
            font-size:0.2rem;
            color:rgb(77,85,93);
            line-height:0.2rem;
            text-align:center;
        }
        .CompanyData{
           display:flex;
           justify-content:space-around;
           margin-top:0.36rem;
           margin-bottom: 0.3rem;
        }
        .Send h3{
            font-size:0.2rem;
            color:rgb(147,153,159);
            line-height:0.2rem;
        }
        .sendbox{
            display:flex;
            justify-content:space-around;
        }
        .Send h2{
            margin-top:0.08rem;
            font-size:0.48rem;
            font-weight:200;
            color:rgb(7,17,27);
            line-height:0.48rem;
        }
        .Send h6{
            font-size:0.2rem;
            font-weight:200;
            color:rgb(7,17,27);
            line-height:0.8rem;
        }
        .xian{
            height:1rem;
            background:rgb(7,17,27);
            width:0.02rem;
        }
        .tit{
            margin-top:0.36rem;
            font-size:0.48rem;
            font-weight:200;
            color:rgb(7,17,27);
            line-height:0.48rem;
            margin-left:0.3rem;
        }
        .seltext{
            margin-top:0.16rem;
            margin-left:0.4rem;
            font-size:0.24rem;
            font-weight:200;
            color:rgb(240,20,20);
            line-height:0.48rem;
            margin-bottom:0.32rem;
        }
        .selsupports .decrease{background-image:url('decrease_3@2x.png');display:inline-block;width:0.25rem;height:0.25rem;}

        .selsupports .guarantee{background-image:url('guarantee_1@2x.png');display:inline-block;width:0.25rem;height:0.25rem;}

        .selsupports .invoice{background-image:url('invoice_1@2x.png');display:inline-block;width:0.25rem;height:0.25rem;}

        .selsupports .special{background-image:url('special_1@2x.png');display:inline-block;width:0.25rem;height:0.25rem;}

        .selsupports .discount{background-image:url('discount_3@2x.png');display:inline-block;width:0.25rem;height:0.25rem;}

        .selsupports{margin-left: 0.5rem;margin-top:0.3rem}

        .selsupports .text{font-size:0.2rem; color:rgb(7,17,27);font-weight:200;margin-left:0.1rem;margin:0;margin-left:0.2rem;}

        .selsupports li{
            width:6.78rem;
            border-top:0.01rem solid #e6e7e8;
            display:flex;
            align-items:center;
            height:1rem;
        }
        .selimg{
            width:7rem;
            height:1.8rem;
            margin-top:0.24rem;
            margin-bottom:0.36rem;
            margin-left:0.3rem;
            overflow:hidden;
        }
        .sum .star{
            height:0.5rem;
            margin:0;
            margin-top:0.1rem;
        }
        .sum .star span{
            float: left;
        }
        .selsupports li{
            font-size:0.24rem;
            font-weight:200;
            color:rgb(7,17,27);
            line-height:0.32rem;
        }
        .selimg img{
            width:2.4rem;
            height:1.8rem;
            margin-right:0.1rem;
        }
        .boximg1{
            height:1.8rem;
            width:12.5rem;
            display:flex;
        }
    </style>