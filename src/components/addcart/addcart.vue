    <template>
        <div class="add-box">
            <transition name="move">
            <div class="reduce" @click="reduce" v-show="foods.num>0">
            </div>
            </transition>
            <div class="num" v-show="foods.num>0">{{foods.num}}
            </div>
            <div class="add" @click="add">
            </div>
        </div>
    </template>
    <script>
        import Vue from 'vue'
        export default{
            props:{
                foods:{
                    type:Object
                }
            },
            methods:{
                add(){
                    if(!this.foods.num){
                        Vue.set(this.foods,'num',1)

                    }else{
                        this.foods.num ++
                    }
                },
                reduce(){
                    if(this.foods.num){
                        this.foods.num--;
                    }
                }
            }
        }
    </script>
    <style lang="less">
    .add-box{
        position:absolute;
        top: -0.4rem;
        right: 0.05rem;
        width: 1.3rem;
        .reduce{
            background:url('jian_81.png');
            float:left;
            font-size:0.48rem;
            line-height:0.48rem;
            color:rgb(0,160,220);
            padding:0.05rem;
            width:0.4rem;
            height:0.4rem;
            background-size:0.4rem 0.4rem;
            background-repeat: no-repeat;
            padding-right:0;
            transition:all 0.4s;
            transform:translate3d(0,0,0);
            &.move-enter-active,&.move-leave-active{
                transition:all 0.4s;
            }
            &.move-enter,&.move-leave{
                opacity:0;
                transform:rotate(180deg) translate3d(-0.48rem,0,0);
            }

        }
        .num{
            float:left;
            font-size:0.2rem;
            color:rgb(147,153,159);
            line-height:0.48rem;
            padding-left: 0.08rem;
        }
        .add{
            float:right;
            background:url('jia_79.png');
            font-size:0.48rem;
            color:rgb(0,160,220);
            line-height:0.48rem;
            padding:0.05rem;
            width:0.4rem;
            height:0.4rem;
            background-size:0.4rem 0.4rem;
            background-repeat: no-repeat;
            padding-left:0;
        }
        }

    </style>