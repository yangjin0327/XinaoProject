<template>
    <div class="bos_z">
        <div class="box_l">
            <div>
                运营看板
            </div>
            <div @click="clickbox_left(item.id)" :class="item.id === id?'active':null" class="dis_s" v-for="(item,index) in img_1" :key="index">
                <img :src='item.src' alt="">
                {{item.name}}
            </div>
            <!-- <img :src="item" v-for="(item,index) in img_2" :key="index" alt=""> -->
        </div>
        <div class="box_l_1"></div>
        <div class="box_r">
            <Home v-if="id === 1" :rtoken="rtoken"></Home>
            <List v-if="id === 2" :userId="userId" @pack="pack" @callClick="callClick" :num="num"></List>
            <Wbs v-if="id === 3" :rtoken="rtoken"></Wbs>
        </div>
    </div>
</template>
<script>
import Home from '../components/home'
import List from '../components/list'
import ProjectValue1 from '../components/ProjectValue_1'
import Wbs from '../components/Wbs'
export default {
    props:{

    },
    components:{
        Home,
        List,
        ProjectValue1,
        Wbs
    }, 
    data(){
        return {
            num:1,
            img_1:[{
                id:1,
                src:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAW5JREFUKBWNkj1Ow0AQhVmbAoocgZ8WChokoEAy+XFBicQ56JCARLAW4ILUHIAeaCgIspPgAipKDhAqegpEY5tvjDdaI6SwkjU7M+/NvH2ymvrj9Pv9nTzP23yu4zhho9G4VkrlNlTZSRzHPvk5hE/XdU/SNJW+hlQjtlutVs/gC+JwONwAFEJwBOj7/qMBSIyiaIsgA+QcNpvNZ8WWKwgL0vhNoFY51oB32TDLlAxplTdUGGUiGLCCU4VUJm1SCCmkmKExI7GJg8HAy7JMU6PtHNF/MlJfkdnFzW1kizkfgLRsKAk1CG0IDyw5oLcyDWiGbetJkix5nndP3mPDLvESksjSmHEjEvFjmXyN3pct9ZTiiC1BvV4fcR8fXF/E9YDCHAM6tqtjqWw5BvAC4EyYTO9wX0Vq8F+pd8Lju2DD3kSpAORNb7LNnFKqJp+n/yPVNCWKq5OkGnxhjkkk8iZVurrPPaPU5R+9Fak27hvVsu2H+bbFgwAAAABJRU5ErkJggg==',
                name:'项目查询'
            },
            {
                id:3,
                src:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAbtJREFUKBV1Ur9LQlEU9j2fKMZLpWiIlkAcGiqQQNBJRRqCCmqM8D9oCAyqoaW9oS2y9qghW/KJDr4Qgqypn1ANEuRWoSA+Xt/3uE+0HwfOPfd857vn3HvOlRw/pFAorJimOQs4DJWgj9CjZDK5DdsR2d4Vi0VF7F9lWV7z+/0DHo9nGEmWoS82r8eiynw+n9d6wD8cTdNOoHMMKag02G63dxVFSXVzK5VKP/1IJPLRhWdQvaTr+oWEDFsI9OENqyQAHGo0GllJkibog3jj9XrT0Wj0nT74WZgHvnEGwUOCFHFIR6IRKhLozWbzwApicTqdOzALPDgaCATuGOD1WKm7g2I/jh74yMHBGgoFZSzucDhsEKTA5wh+iaqqJkGfz9dAckmG3pZKpTGCohFVZN+gT0HH15Hs2m5SvV4n90kBmDMMYwlOhkS3251utVr7OFyjj/gVMe6FLMLmJNHFS9w9FY/H7+1ouVxWuY/FYp82htFNYnTnGJ11Q7Z4GhXObMJ/Frxj8Pgdrb9o8dgUiMkAvtyby+V6RuYvjGIKhFAikdiziGKx/6eDh4jBBpFkE+8MQdnhKvxTwe+YbxcLzMFWMuOMAAAAAElFTkSuQmCC',
                name:'WBS运营'
            },
            {
                id:2,
                src:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAQpJREFUKBVj3L1791MGBgYpICYF3GfYs2fPb1J0gNQCLfvP9P//f0ZSNYLUMwExMzmaGUHWkmojIyPjUxaQJhcXFyYghyQDQE5lIFUTSA/YRhADHezbt8/4379/u4H+F0ST+wnkZ+HUCNSgBFTwTFBQUMbY2Pg7TPPevXu7gS7UATsVJohMOzk5rQHyr3/48GESyCsgDIxzP6CYJzc3dwNOjSCFnJyc2UCbY4EaQLaDwqITSBVbWFh8wqkRFLffv3+fClS8zdnZ+T5UYw9QvO/EiRN8YI0gRSAJZAAMnBCguA4HB0ccyHaQHNCAOUBq79evXxtACQAlkcPiFBSqf//+3QXUhBGqQAOzAdS+bmPLeJf+AAAAAElFTkSuQmCC',
                name:'项目评价'
            },
            {
                id:3,
                src:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAbtJREFUKBV1Ur9LQlEU9j2fKMZLpWiIlkAcGiqQQNBJRRqCCmqM8D9oCAyqoaW9oS2y9qghW/KJDr4Qgqypn1ANEuRWoSA+Xt/3uE+0HwfOPfd857vn3HvOlRw/pFAorJimOQs4DJWgj9CjZDK5DdsR2d4Vi0VF7F9lWV7z+/0DHo9nGEmWoS82r8eiynw+n9d6wD8cTdNOoHMMKag02G63dxVFSXVzK5VKP/1IJPLRhWdQvaTr+oWEDFsI9OENqyQAHGo0GllJkibog3jj9XrT0Wj0nT74WZgHvnEGwUOCFHFIR6IRKhLozWbzwApicTqdOzALPDgaCATuGOD1WKm7g2I/jh74yMHBGgoFZSzucDhsEKTA5wh+iaqqJkGfz9dAckmG3pZKpTGCohFVZN+gT0HH15Hs2m5SvV4n90kBmDMMYwlOhkS3251utVr7OFyjj/gVMe6FLMLmJNHFS9w9FY/H7+1ouVxWuY/FYp82htFNYnTnGJ11Q7Z4GhXObMJ/Frxj8Pgdrb9o8dgUiMkAvtyby+V6RuYvjGIKhFAikdiziGKx/6eDh4jBBpFkE+8MQdnhKvxTwe+YbxcLzMFWMuOMAAAAAElFTkSuQmCC',
                name:'WBS运营'
            }],
            img_1_2:[{
                id:1,
                src:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAW5JREFUKBWNkj1Ow0AQhVmbAoocgZ8WChokoEAy+XFBicQ56JCARLAW4ILUHIAeaCgIspPgAipKDhAqegpEY5tvjDdaI6SwkjU7M+/NvH2ymvrj9Pv9nTzP23yu4zhho9G4VkrlNlTZSRzHPvk5hE/XdU/SNJW+hlQjtlutVs/gC+JwONwAFEJwBOj7/qMBSIyiaIsgA+QcNpvNZ8WWKwgL0vhNoFY51oB32TDLlAxplTdUGGUiGLCCU4VUJm1SCCmkmKExI7GJg8HAy7JMU6PtHNF/MlJfkdnFzW1kizkfgLRsKAk1CG0IDyw5oLcyDWiGbetJkix5nndP3mPDLvESksjSmHEjEvFjmXyN3pct9ZTiiC1BvV4fcR8fXF/E9YDCHAM6tqtjqWw5BvAC4EyYTO9wX0Vq8F+pd8Lju2DD3kSpAORNb7LNnFKqJp+n/yPVNCWKq5OkGnxhjkkk8iZVurrPPaPU5R+9Fak27hvVsu2H+bbFgwAAAABJRU5ErkJggg==',
                name:'项目查询'
            },
            {
                id:3,
                src:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAbtJREFUKBV1Ur9LQlEU9j2fKMZLpWiIlkAcGiqQQNBJRRqCCmqM8D9oCAyqoaW9oS2y9qghW/KJDr4Qgqypn1ANEuRWoSA+Xt/3uE+0HwfOPfd857vn3HvOlRw/pFAorJimOQs4DJWgj9CjZDK5DdsR2d4Vi0VF7F9lWV7z+/0DHo9nGEmWoS82r8eiynw+n9d6wD8cTdNOoHMMKag02G63dxVFSXVzK5VKP/1IJPLRhWdQvaTr+oWEDFsI9OENqyQAHGo0GllJkibog3jj9XrT0Wj0nT74WZgHvnEGwUOCFHFIR6IRKhLozWbzwApicTqdOzALPDgaCATuGOD1WKm7g2I/jh74yMHBGgoFZSzucDhsEKTA5wh+iaqqJkGfz9dAckmG3pZKpTGCohFVZN+gT0HH15Hs2m5SvV4n90kBmDMMYwlOhkS3251utVr7OFyjj/gVMe6FLMLmJNHFS9w9FY/H7+1ouVxWuY/FYp82htFNYnTnGJ11Q7Z4GhXObMJ/Frxj8Pgdrb9o8dgUiMkAvtyby+V6RuYvjGIKhFAikdiziGKx/6eDh4jBBpFkE+8MQdnhKvxTwe+YbxcLzMFWMuOMAAAAAElFTkSuQmCC',
                
                name:'WBS运营'
            },
            {
                id:2,
                src:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAQpJREFUKBVj3L1791MGBgYpICYF3GfYs2fPb1J0gNQCLfvP9P//f0ZSNYLUMwExMzmaGUHWkmojIyPjUxaQJhcXFyYghyQDQE5lIFUTSA/YRhADHezbt8/4379/u4H+F0ST+wnkZ+HUCNSgBFTwTFBQUMbY2Pg7TPPevXu7gS7UATsVJohMOzk5rQHyr3/48GESyCsgDIxzP6CYJzc3dwNOjSCFnJyc2UCbY4EaQLaDwqITSBVbWFh8wqkRFLffv3+fClS8zdnZ+T5UYw9QvO/EiRN8YI0gRSAJZAAMnBCguA4HB0ccyHaQHNCAOUBq79evXxtACQAlkcPiFBSqf//+3QXUhBGqQAOzAdS+bmPLeJf+AAAAAElFTkSuQmCC',
                name:'项目评价'
            }],
            img_2:['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAZlJREFUKBWNUr8vg1EUPff7SBiaaGuw+LEyWCQYJCwGo8SgLf+CTYIKX4MOzP4A0ZQBi0FtDExGf0BNDFpiED/6veu81mtKBDdp3nfvPefe806f4IeI53QyBNJs+Z4gW0riQES0ESqNSSyv48Zgg5Bn9bHaFEI4IFBBxPOQLiel4PBVYiynwwbIkuD5BN7PypkD2LN9V8fsAAhEfCyWE3Ip0V3dYa/7J0Ij+csA4LaJU1op3lQ8fLnDd5LNKz4xBlTOzbYQzesIC1kyQ3gIHpNybusu2vI6yn5AsMfa0sOMXDip1w+zshXN6YQqzQGerPTPDQHBEbqbLqfklJgF5v1WagvBQ/F97S1Ny4mqFuJ5TIWKbanJCkopHNq/gyb20cRBDn7hryZVDdb4WWzxkblLSNHWXXTsac9rBRlerpO2Lze6WpdK8AotuGr2sW6J7yGWqWqAbmT+JfXN4Jg85YbNUgJzf0rl9OAxJTd2mwsr9S1EwPt11aW6pj2tqzx+lerwVXNcYk+6KtZVo5jnEzR8YluUevT9kX8AW0DI9cJNrPMAAAAASUVORK5CYII=','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAQ1JREFUKBWdkj9rwlAUxc99FcQOkmhBkE7Obv0UheLUSdQPUMd+AVdRHAS3bk2cOneo+Dk6Zoq4+IcOltDq9d6QgEozvAZC4HF+95x7Xsj1OGRGFXZPAMfjHzsGcF6ZjUBkC6regHHFzNYwqa2to7iEcd7/OOqOICJr11xWzBuf734ZM+nAvdBEhvCUCR6AmuyyKDi4DR/wncKuj8GBUY+jpoen31UTb5L/c7fFWFfR152iIcPuxbGXCaowf42u3HK74nNNh0oTfTJ4XrfoKxPUpqMdJrLj+7KJIAGHvMeo5HExBv+6jvIUjxKrniuik7a+btOLDJjLjj26/Mk3LRgVJq1+iPCsVYkbEaF7BJdYYlfrYYqcAAAAAElFTkSuQmCC','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAdFJREFUKBV1Us9LlFEUPff75lNQrBlntBhaRQi5KRgil60GF8Zk1M5B/A9cBAbWwo17F+0CC8cBJYzQNiHYRjcJUytRgwqS8AeTpRmO49zO1e/JZ+iDx7v33HPvu/e8J/hvNRe0vwbkRJGBQFSxKsCrn3kZjlI959yZ05jZJH3zfTy+eh1JvwlpEfQS/Op4p85kQbvjBZ09BZ7hxMf0dbKo9ywUSxc19beGZxJDNsplyxfML/fIb4fHAgwcVvH+0pQuCAlDnKlxu0ceGYFga+UPRmneCBM+1TWib/2+bJjPzkY5zorHpC4aL0MSwqR5inHFNvH5yh5euHggGFHggVUoZxY1sIC1lxjT747kTsMSk3rR/MuT2pIo6C+PstffzeDQkewJTuyIIRXwIoDpe7TEU8HSyATaDQyFKMXH9Yn5tlh9kKU+OpGqm2hnhc+ep5hBFfljGlBfhz52cZsJa7aJdxjm4tTkoedhRkIVP/hAdisvy46QeqNNZm/lZMdhLeN686CGdw3+cYdoLmonBXjrCOedFHKKY+QsfiKEqgqXWoC3/wgCfOEf3N09wC2+WVs5L8+jBY/+51EFJtnJma9R4qe1fbTtU2FWLjEwHU0y+x+Xcat2z0MBnAAAAABJRU5ErkJggg=='],
            id:1,
            userId:'5d412f8ba60adf0001e10873',
            rtoken:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlX3lhbmdqaW4iLCJyZWFsTmFtZSI6IuadqOaZiyIsInBob25lIjoiMTM0MjYxNzgwODYiLCJjb21wYW55TmFtZSI6IuWNjuenkeS8l-WQiOaciemZkOWFrOWPuCIsImV4cCI6MTU4Nzk1MDY1OSwidG9rZW5UeXBlIjoicmVmcmVzaF90b2tlbiIsImVtYWlsIjoieWFuZ2ppbl8wMzI3QDE2My5jb20iLCJ1c2VybmFtZSI6ImVfeWFuZ2ppbiJ9.XBBkHhZLzpssCXUyHP9cP3TMcseFxEad1j2cYjk4vXrAw78mMS2bkbl2JHY3OR8zcQPejA_wFrLWyi6pR2-Cag'
        }
    },
    computed:{
        
    },
    methods:{
        pack(i){
            this.num = i
        },
        clickbox_left(id){
            this.img_1 = JSON.parse(JSON.stringify(this.img_1_2))
            this.id = id
            this.img_1.forEach((item,index)=>{
                if(item.id === id){
                    item.src = this.img_2[index]
                }
            })
            if(id === 2){
                this.num = 1
            }
        },
        callClick(i){
            this.num = i
        }
    },
    created(){
        this.clickbox_left(1)
        let str = window.location.href;
        str.split('?')[1].split('&').forEach((item,index)=>{
            if(item.split('=')[0] === '_userId'){
                this.userId = item.split('=')[1]
                console.log(this.userId)
            }
            if(item.split('=')[0] === 'enn_sso_rtoken'){
                this.rtoken = item.split('=')[1]
                console.log(this.rtoken)
            }
        })
        this.img_1.forEach((item,index)=>{
            if(item.id === this.id){
                item.src = this.img_2[index]
            }
        })
    },
    mounted(){

    }
}
</script>
<style>
.bos_z{
    display: flex;
}
.box_l_1{
    min-width: 200px;
}
.box_l{
    width: 200px;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    background: #fff;
}
.box_l>div:nth-child(1){
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 16px;
    color: #333;
    font-weight: 900;
    padding: 0;
}
.dis_s{
    width: 100%;
    height: 38px;
    padding-left: 38px;
    line-height: 38px;
    font-size: 14px;
    color: #515a6e;
    display: flex;
    align-items: center;
}
.dis_s>img{
    width: 35px;
    height: 15px;
    padding: 0 10px;
}
.box_r{
    width: calc(100% - 200px);
}
.active{
    color:#10A3FF;
    font-weight: 900;
}
</style>