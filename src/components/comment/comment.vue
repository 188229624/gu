    <template>
        <div class="grade">
        <div class="gradeTop"></div>
            <div class="gradeRight">
                <h1>{{count}}</h1>
                <h2>综合评分</h2>
                <h3>高于周边商家69.2%</h3>
            </div>
            <div class="wire"></div>
            <div class="gradeLeft">
                <ul>
                    <li>服务态度</li>
                    <li>服务态度</li>
                    <li>送达时间</li>
                </ul>
                <ul class="gradeImg">
                     <star :size="36" :score="count"></star>
                     <star :size="36" :score="count"></star>
                     <h5>{{num}}分钟</h5>
                </ul>
            </div>
        <div class="gradeBot"></div>
        <div class="thread"></div>
        <ul class="evaluate">
            <li @click="sat1">全部{{all}}</li>
            <li @click="satis">满意{{sat}}</li>
            <li @click="sat2">不满意{{bad}}</li>
        </ul>
        <div class="thread"></div>
        <div class="see" @click="fit"><span :class="{ active: isActive }">只看有内容的评价</span></div>
        <div class="thread"></div>
            <dl class="use" v-for="item in ratings" v-if="item.score>=my && item.score<=my1" v-show="nr? item.text : true">
                <dt>
                    <img :src="item.avatar"/>
                </dt>
                <dd>
                <div class="useTime"><a>{{item.username}}</a><span>{{item.rateTime}}</span></div>
                <div class="useGrade"><star :size="24" :score="item.score"></star><h4>{{item.deliveryTime}}分钟送达</h4></div>
                <p>{{item.text}}</p>
                <ul>
                    <li v-for="item1 in item.recommend">{{item1}}</li>
                </ul>
                </dd>
            </dl>
        </div>
    </template>

    <script>
        import star from '@/components/star/star.vue'
        import bs from 'better-scroll'
        import Vue from 'vue'
        export default {
            name:'comment',
            props:{

            },
            data(){
                return{
                    ratings:[],
                    total:0,
                    my:0,
                    my1:5,
                    nr:false,
                    isActive:false
                }
            },
            created:function(){
                var _this = this;
                this.$http.get('/api/ratings').then(function(response){
                if(response.data.err == 0){
                _this.ratings = response.data.data;
                    console.log(_this.ratings)
                }
                })

            },
            computed:{
                count:function(){
                    let a = this.ratings.length
                    let b = 0
                    let c = 0
                    for(var i=0;i<this.ratings.length;i++){
                         b += this.ratings[i].score
                    }
                    c = b/a
                    c=Math.round((c*100)/100)
                    return c
                },
                num:function(){
                    let a = this.ratings.length
                    let b = 0
                    let c = 0
                    for(var i=0;i<this.ratings.length;i++){
                        if(this.ratings[i].deliveryTime>0)
                         b += this.ratings[i].deliveryTime
                    }
                    c = b/a
                    c=Math.round((c*100)/100)
                    return c
                },
                sat:function(){
                    let a = 0
                    for(var i = 0;i<this.ratings.length;i++){
                        if(this.ratings[i].score>=3){
                            a++
                        }
                    }
                    return a
                },
                bad:function(){
                    let a = 0
                    for(var i = 0;i<this.ratings.length;i++){
                        if(this.ratings[i].score<3){
                            a++
                        }
                    }
                    return a
                },
                all:function(){
                    let a = 0
                    for(var i = 0;i<this.ratings.length;i++){
                        if(this.ratings[i].score>=0 || this.ratings[i].score==''){
                            a++
                        }
                    }
                    return a
                }

            },
            methods:{
                satis:function(){
                    this.my1 = 5
                    this.my = 3
                },
                sat1:function(){
                    this.my1 = 5
                    this.my = 0
                },
                sat2:function(){
                    this.my1 = 2.9
                    this.my = 0
                },
                fit:function(){
                    this.nr = !this.nr
                    this.isActive = !this.isActive
                }


            },
            components:{
                'star':star
            }
    }
    </script>

    <style>
        .grade{
            width:100%;
            position:relative;
        }
        .gradeRight{
            float:left;
            width:2rem;
            margin-left:0.35rem;
            margin-top:0.3rem;
            display:flex;
            flex-direction:column;
            align-items:center;
        }
        .gradeRight h1{
            font-size:0.48rem;
            color:rgb(255,153,0);
            line-height:0.56rem;
            margin-top:0.36rem;
        }
        .gradeRight h2{
            font-size:0.24rem;
            color:rgb(7,17,27);
            line-height:0.24rem;
            margin-top:0.12rem;
        }
        .gradeRight h3{
            font-size:0.2rem;
            color:rgb(7,17,27);
            line-height:0.2rem;
            margin-top:0.16rem;
            padding-bottom:0.36rem;
        }
        .wire{
            height:1rem;
            background:rgb(7,17,27);
            width:0.02rem;
            float:left;
            margin-left:0.2rem;
            margin-top:0.8rem;
        }
        .gradeLeft{
            position:absolute;
            right:0.2rem;
            top:0.6rem;
            display:flex;
        }
        .gradeLeft ul li{
            padding-bottom:0.16rem;
            font-size:0.24rem;
            color:rgb(7,17,27);
            line-height:0.36rem;
        }
        .gradeImg{
            margin-left:0.1rem;
        }
        .gradeImg .star{
            height:0.58rem;
            margin:0;
        }
        .gradeImg .star span{
            float: left;
        }
        .gradeImg h5{
            font-size:0.24rem;
            color:rgb(255,153,159);
            margin-top:-0.1rem;
        }
        .gradeTop{
            width:100%;
            height:0.02rem;
            background:rgb(7,17,27);
        }
        .gradeBot{
            width:100%;
            height:0.02rem;
            background:rgb(7,17,27);
            margin-top:2.5rem;
            margin-bottom:0.5rem;
        }
        .thread{
            width:100%;
            height:0.02rem;
            background:rgb(7,17,27);
        }
        .evaluate{
            margin-top:0.36rem;
            padding-bottom:0.8rem;
            margin-left:0.2rem;
        }
        .evaluate li{
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
        .evaluate li:nth-child(2){
            background:#ccecf8;
        }
        .evaluate li:nth-child(3){
            background:#e9ebec;
        }
        .see{
            margin-top:0.5rem;
            padding-bottom:0.5rem;
            margin-left:0.2rem;
            height:0.5rem;
            background:url('pingjia_08.png') 0 0 no-repeat;
            background-size:0.42rem 0.4rem;
        }
        .see span{
            color:#93999f;
            font-size:0.24rem;
            margin-left:0.5rem;
            float: left;
            margin-top:0.1rem;
        }
        .use{
            margin-top:0.36rem;
            padding:0.36rem;
            margin-left:0.2rem;
            display:flex;
        }
        .use dt{
            width:0.5rem;
            height:0.5rem;
        }
        .use dt img{
            width:0.5rem;
            height:0.5rem;
            float:left;
        }
        .use dd{
            margin-left:0.1rem;
            width:6rem;
        }
        .useTime{
            display:flex;
            justify-content:space-between;
        }
        .useTime a{
            font-size:0.2rem;
            color:rgb(7,17,27);
            line-height:0.24rem;
        }
        .useTime span{
            font-size:0.2rem;
            font-weight:200;
            color:rgb(147,153,159);
            line-height:0.24rem;
        }
        .useGrade{
            margin-top:0.08rem;
            display:flex;
        }
        .useGrade h4{
            font-size:0.2rem;
            font-weight:200;
            color:rgb(147,153,159);
            line-height:0.24rem;
            margin-left:0.3rem;
        }
        .useGrade .star{
            height:0.2rem;
            margin: 0;
        }
        .useGrade .star span{
            float: left;
        }
        .use dd p{
            margin-top:0.12rem;
            font-size:0.24rem;
            color:rgb(7,17,27);
            line-height:0.36rem;
        }
        .use dd ul{
            margin-top:0.16rem;
            display:flex;
            flex-wrap: wrap;
        }
        .use dd ul li{
            margin-left:0.16rem;
            width:1.24rem;
            height:0.32rem;
            border-width:1px;
            border-color:rgba(7,17,27,0.1);
            border-radius:0.02rem;
            background-color:rgb(255,255,255);
            font-size:0.18rem;
            color:rgb(147,153,159);
            line-height:0.32rem;
        }
        .active{
            color:blue !important;
        }
    </style>