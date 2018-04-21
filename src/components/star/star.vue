    <template>
        <div class="star" :class="starSize">
            <span v-for="item in starsArr" :class="item"></span>
        </div>
    </template>

    <script>
        export default {
            name:'star',
            props:{
                size:{
                    type:Number
                },
                score:{
                    type:Number
                }
            },
            computed:{
                starSize:function(){
                    return "star-" + this.size;
                },
                starsArr:function(){
                     let result = []
                     let integer = Math.floor(this.score)
                     let decimal = this.score - integer
                     for(var i =0; i<integer;i++){
                        result.push('on')
                     }
                     if(decimal>=0.5){
                        result.push('half')
                     }
                     while(result.length<5){
                        result.push('off')
                     }
                     return result;
                },

            }
        }
    </script>

    <style>
        .star span{
            display:inline-block;
            background-repeat:no-repeat;
        }
        .star.star-48 span{
            width:0.48rem;
            height:0.48rem;
            background-size:0.48rem 0.48rem;
            margin-right:0.4rem;
        }
        .star.star-48 .on{
            background-image:url('star48_on@2x.png');
        }
        .star.star-48 .half{
            background-image:url('star48_half@2x.png');
        }
        .star.star-48 .off{
            background-image:url('star48_off@2x.png');
        }
         .star.star-36 .on{
            background-image:url('star36_on@2x.png');
        }
        .star.star-36 .half{
            background-image:url('star36_half@2x.png');
        }
        .star.star-36 .off{
            background-image:url('star36_off@2x.png');
        }
        .star.star-24 .on{
            background-image:url('star24_on@2x.png');
        }
        .star.star-24 .half{
            background-image:url('star24_half@2x.png');
        }
        .star.star-24 .off{
            background-image:url('star24_off@2x.png');
        }
        .star.star-36 span{
            width:0.36rem;
            height:0.36rem;
            background-size:0.36rem 0.36rem;
            margin-right:0.32rem;
        }
        .star.star-24 span{
            width:0.24rem;
            height:0.24rem;
            background-size:0.24rem 0.24rem;
            margin-right:0.24rem;
        }
    </style>