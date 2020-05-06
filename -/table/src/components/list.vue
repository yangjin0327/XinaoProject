<template>
    <div class="pmo_box">
        <ProjectValue1 v-if="num === 2" @pack="pack" :tbProjectId="tbProjectId"></ProjectValue1>
        <div class="box-content" v-if="num === 1" >
            <div class="box-content_1">
                <div>项目评价列表</div>
            </div>
            <div class="box-content_2">
                <div>
                    <span>输入搜索：</span>
                    <input type="text" v-model="value_1" placeholder="项目名称/负责人">
                </div>
                <div>
                    <span>评价状态：</span>
                    <el-select v-model="value" size="mini" placeholder="请选择" :clearable='true'>
                        <el-option v-for="(item) in options" :key="item.label" :label="item.value" :value="item.label"></el-option>
                    </el-select>
                </div>
                <button @click="getdata">搜索</button>
            </div>
            <div class="table_w">
                <el-table :data="data" border style="width: 100%" max-height="480" :header-cell-style="styleObj" v-loading="loading"> 
                    <el-table-column prop="num" label="序号" align="center"  :show-overflow-tooltip='true'></el-table-column> 
                    <el-table-column prop="correctorName" width="100" label="理正人" align="center"  :show-overflow-tooltip='true'></el-table-column> 
                    <el-table-column prop="convenerName" label="召集人" align="center"  :show-overflow-tooltip='true'></el-table-column>
                    <el-table-column prop="projectManagerName" width="100" label="负责人" align="center"  :show-overflow-tooltip='true'></el-table-column> 
                    <el-table-column prop="tempProjectId" label="项目编号" align="center"  :show-overflow-tooltip='true'></el-table-column> 
                    <el-table-column prop="projectName" label="项目名称" align="center"  :show-overflow-tooltip='true'></el-table-column> 
                    <el-table-column prop="commentStatus" label="评价状态" align="center"  :show-overflow-tooltip='true'></el-table-column> 
                    <el-table-column label="操作" align="center" width="100"> 
                        <template slot-scope="scope">     
                            <el-button @click="callClick(scope.row)" v-if="scope.row.commentPerm" type="text" size="small">评价</el-button> 
                        </template> 
                    </el-table-column>
                </el-table>
            </div>
            
        </div>
    </div>
</template>
<script>
import host from '../host'
import axios from 'axios'
import ProjectValue1 from '../components/ProjectValue_1'
export default {
    name:'List',
    props:['num','userId'],
    components:{
        ProjectValue1
    },
    data(){
        return {
            options:[{label:2,value:'已评价'},{label:1,value:'未评价'}],
            value:'',
            data:[],
            styleObj:{
                'color':'#333333',
                'font-weight':'600',            
                'background':'rgba(248,248,248,1)',
                'font-size':'14px',
            },
            loading:false,
            tbProjectId:'',
            value_1:''
        }
    },
    computed:{

    },
    methods:{
        getdata(){
            axios.post(host+'/projectvalue/commmentProjectList/commentStatus',{commentStatus:this.value,keyword:this.value_1}).then(res=>{
                console.log(res.data)
                if(res.data.code === 200){
                    this.$message({
                        type: 'success',
                        message: '搜索成功!'
                    });
                    this.data = res.data.data
                    this.data.forEach((item,index)=>{
                        item.num = index+1
                        item.commentStatus === 1?item.commentStatus = '未评价':item.commentStatus = '已评价'
                    })
                }else{
                    this.$message({
                        type: 'error',
                        message: res.data.message
                    });
                }
            })
        },
        pack(i){
            this.$emit('pack',i)
            axios.post(host+'/projectvalue/commmentProjectList/'+this.userId).then(res=>{
                console.log(res.data)
                this.data = res.data.data
                this.data.forEach((item,index)=>{
                    item.num = index+1
                    item.commentStatus === 1?item.commentStatus = '未评价':item.commentStatus = '已评价'
                })
            })
        },
        callClick(row){
            // this.display = true
            this.$emit('callClick',2)
            this.tbProjectId = row.tbProjectId
        }
    },
    created(){
        
        axios.post(host+'/projectvalue/commmentProjectList/'+this.userId).then(res=>{
            console.log(res.data)
            this.data = res.data.data
            this.data.forEach((item,index)=>{
                item.num = index+1
                item.commentStatus === 1?item.commentStatus = '未评价':item.commentStatus = '已评价'
            })
        })
    },
    mounted(){

    }
}
</script>
<style>
.box-content_2{
    display: flex;
    padding: 12px 0 30px 0;
    align-items: center;
}
.box-content_2>div{
    margin-left: 20px;
    display: flex;
    align-items: center;
}
.box-content_2>div>span{
    height:14px;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:14px;
}
.box-content_2>div>input{
    width:300px;
    height:28px;
    padding-left: 15px;
    font-size: 12px;
    background:rgba(255,255,255,1);
    border-radius:1px;
    border:1px solid rgba(232,232,232,1);
    margin-left: 10px;
}
.box-content_2>button{
    width:60px;
    height:28px;
    background:rgba(16,163,255,1);
    border-radius:1px;
    font-size:12px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
    border: 0;
}
.table_w{
    width: 100%;
    height: auto;
    padding: 0 20px 20px 20px;
}
</style>