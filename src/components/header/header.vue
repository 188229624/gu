    <template>
    <div class="header">
        <div class="content-wrap">
            <div class="avatar">
                <img :src="msg.avatar" />
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"><img src="./brand@2x.png"/></span>
                    <span class="name">{{msg.name}}</span>
                </div>
                <div class="description">
                    {{msg.description}} / {{msg.deliveryTime}}分钟送达
                </div>
                <div class="support">
                    <span class="icon" :class="classArr[msg.supports[0].type]"></span>
                    <span class="text">{{msg.supports[0].description}}</span>
                </div>
                <div class="support-num" @click="show()">
                    <span class="num">{{msg.supports.length}}个</span>
                    <i class="icon-right">&gt;</i>
                </div>

            </div>
        </div>
        <div class="notic-wrap" @click="show()">
        <div class="notice-tit"></div>
            <div class="notic-text">{{msg.bulletin}}</div>
            <div class="icon-right">></div>
        </div>
        <div class="header-background">
            <img :src="msg.avatar" width="100%" height="100%"/>
        </div>
        <div class="detail" v-show="showDetail">
            <div class="detail-wrap clearfix">
            <div class="detail-content">
                <h1>{{msg.name}}</h1>
                <div class="star-con">

                    <star :size="48" :score="4.5"></star>

                </div>
                <div class="detail-title">
                    <div class="line"></div>
                    <div class="text">优惠信息</div>
                    <div class="line"></div>
                </div>
                <ul class="supports">
                    <li v-for="item in msg.supports">
                    <span class="icon" :class="classArr[item.type]"></span>
                    <span class="text">{{item.description}}</span>
                    </li>
                </ul>
                <div class="detail-title">
                    <div class="line"></div>
                    <div class="text">商家公告</div>
                    <div class="line"></div>
                </div>
                <div class="detail-bulletin">
                    <P>
                    {{msg.bulletin}}
                    </P>
                </div>
            </div>
            </div>
            <div class="detail-close" @click="hide()">×</div>
        </div>
    </div>
    </template>

    <script>
        import star from '@/components/star/star.vue'
        export default {
            name:"top",
            data(){
                return {
                    msg:{},
                    showDetail:false
                }
            },

        created:function(){
            var _this = this;
            this.$http.get('/api/seller').then(function(response){
                    if(response.data.err == 0){
                    _this.msg = response.data.data;
                }
            })
            this.classArr = ['decrease','discount','special','invoice','guarantee']
        },
        methods:{
            show(){
                this.showDetail=true
            },
            hide(){
                this.showDetail=false
            }
        },

        components:{
            'star':star,
        }
     }
    </script>

    <style>

        .header{
            background: rgba(0,0,0,0.5);
        }
        .content-wrap{
            display:flex;
            padding:0.48rem 0.24rem 0.36rem 0.48rem;
        }
        .avatar{
            flex:0 0 1.28rem;
            margin-right:0.24rem;
        }
        .avatar img{
            width:1.28rem;
            height:1.28rem;
            border-radius: 0.04rem;
        }
        .content-wrap .content{
            flex:1;
            padding:0.01rem 0;
            position:relative;
        }
        .content .title{height:0.3rem;margin-bottom:0.2rem;}

        .content .brand{
            float: left;
            margin-right:0.12rem;
        }

        .brand img{width:auto;height:0.36rem;float: left;}

        .content .name{font-size:0.32rem;line-height:0.18rem;color:#fff;font-weight:bold;float: left;margin-top: 0.1rem;}

        .description{font-size:0.12rem;line-height:1;color:#fff;font-weight:200;margin-bottom:0.2rem;}

        .supports{height:0.24rem;}

        .support .icon{float:left;width:0.24rem;height:0.24rem;margin-right:0.08rem;background-size:0.24rem 0.24rem;background-position:0 0;}

        .support .decrease{background-image:url('decrease_3@2x.png');}

        .support .guarantee{background-image:url('guarantee_1@2x.png');}

        .support .invoice{background-image:url('invoice_1@2x.png');}

        .support .special{background-image:url('special_1@2x.png');}

        .support .discount{background-image:url('discount_3@2x.png');}

        .support{height:0.1rem;}

        .support .text{font-size:0.2rem; color:#fff;float: left;font-weight:200;}

        .support-num{position:absolute;right:0.24rem;bottom:0.18rem;height:0.48rem;padding:0 0.16rem;border-radius:0.14rem;background:rgba(0,0,0,0.2);display:flex;justify-content:space-around;}

        .support-num .num{font-size:0.2rem;color:#fff; float:left;margin-top:0.14rem;cursor:pointer;}

        .support-num .icon-right{
            margin-left: 0.06rem;
            line-height: 0.48rem;
            font-size:0.1rem;
            font-style: normal;
            color:#fff;
        }
        .notic-wrap{
            width:100%;
            height:0.56rem;
            background:rgba(7,17,27,0.2);
            position:relative;
        }
        .notice-tit{
            width:0.4rem;
            height:0.2rem;
            background:url('bulletin@2x.png');
            position:absolute;
            top:0.15rem;
            left:0.05rem;
            background-size:0.4rem 0.2rem;
        }
        .notic-wrap .notic-text{
            flex: 1;
            margin:0 0.08rem;
            font-size:0.2rem;
            color:#fff;
            overflow:hidden;
            white-space:nowrap;
            text-overflow:ellipsis;
            line-height:0.5rem;
            margin-left:0.6rem;
        }

        .notic-wrap .icon-right{
            position:absolute;
            right:0.1rem;
            line-height:0.56rem;
            font-size:0.2rem;
            font-size:normal;
            color:#fff;
            top: 2.2rem;
        }
        .header-background{
            position:absolute;
            top:0;
            left:0;
            width:100%;
            height:2.74rem;
            z-index:-1;
            filter:blur(0.2rem);
        }
        .clearfix{
            display:inline-block;
        }
        .clearfix:after{
            content:".";
            display:block;
            height: 0;
            clear:both;
            visibility: hidden;
        }
        .detail{
            position:fixed;
            background:rgba(1,17,27,0.8);
            width:100%;
            height:100%;
            top:0;
            left:0;
            overflow:auto;
            z-index: 100;
        }
        .detail-wrap{
            width:100%;
            min-height:100%;
            height:auto;
        }
        .detail-content{
            margin-top:1.28rem;
            padding-bottom:1.28rem;
        }
        .detail-close{
            position:relative;
            width:0.64rem;
            height:0.64rem;
            margin:-1.28rem auto 0;
            clear:both;
            font-size:0.64rem;
            color:rgba(255,255,255,0.5);
        }
        .detail-content h1{
            font-size:0.16rem;
            color:#fff;
            font-weight:700;
            text-align:center;
        }
        .star-con{
            margin:0.32rem auto 0.56rem;
            text-align:center;
        }
        .detail-title{
            display:flex;
            margin:0.56rem auto 0.54rem;
            padding:0 0.72rem;
        }
        .detail-title .line{
            flex:1;
            height:0.01rem;
            background:rgba(255,255,255,0.2);
            margin-top:0.06rem;
        }
        .detail-title .text{
            font-size:0.14rem;
            color:#fff;
            font-weight:700;
            flex:0 0 auto;
            margin:0 0.24rem;
        }
        .supports{
            padding:0 0.72rem;
        }
        .supports li{
            height:0.32rem;
            margin-bottom:0.24rem;
            padding-left:0.24rem;
            display:flex;
        }
       .supports .decrease{background-image:url('decrease_3@2x.png');display:inline-block;width:0.25rem;height:0.25rem;}

        .supports .guarantee{background-image:url('guarantee_1@2x.png');display:inline-block;width:0.25rem;height:0.25rem;}

        .supports .invoice{background-image:url('invoice_1@2x.png');display:inline-block;width:0.25rem;height:0.25rem;}

        .supports .special{background-image:url('special_1@2x.png');display:inline-block;width:0.25rem;height:0.25rem;}

        .supports .discount{background-image:url('discount_3@2x.png');display:inline-block;width:0.25rem;height:0.25rem;}

        .supports{height:3rem;}

        .supports .text{font-size:0.2rem; color:#fff;font-weight:200;margin-left:0.1rem}

        .detail-bulletin{
            width:6rem;
            margin: 0 auto;
        }
        .detail-bulletin p{
            font-size:0.24rem;
            color:#fff;
            line-height:0.48rem;
            font-weight:200;
        }
    </style>