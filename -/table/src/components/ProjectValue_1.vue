<template>
  <div class="taskvalue_box">
    <div class="tasktwo_top">
        <img src="../assets/返回23.png" @click="pack" alt="">
        <span>目标</span>
    </div>
    <div class="projectvalue_top">
      <div class="projectvalue_top_top">基本信息</div>
      <div class="projectvalue_top_div">
            <div>
                <span>理正人：</span>
                <input type="text" class="input_t" v-model="projectValue.correctorName" disabled="disabled">
            </div>
            <div>
                <span>召集人：</span>
                <input type="text" class="input_t" v-model="projectValue.convenerName" disabled="disabled">
            </div>
            <div>
                <span>项目经理：</span>
                <input type="text" class="input_t" v-model="projectValue.projectManagerName" disabled="disabled">
            </div>
        </div>
        <div class="projectvalue_top_div">
            <div>
                <span>项目编号：</span>
                <input type="text" class="input_t" v-model="projectValue.tempProjectId" disabled="disabled">
            </div>
            <div>
                <span>项目名称：</span>
                <input type="text" class="input_t" v-model="projectValue.projectName" disabled="disabled">
            </div>
            <div>

            </div>
        </div>
    </div>
    <div class="projectvalue_centent">
      <div class="projectvalue_top_top">价值目标</div>
      <div class="projectvalue_left_o">
          <div class="projectvalue_left_1">
            <div>价值目标类型：</div>
            <div>价值目标：</div>
          </div>
          <div>
              <div class="projectvalue_left_2" v-for="(item,index) in projectValue.targetValueList" :key="index">
                 <h3>{{item.targetType == 1?'业务':item.targetType == 2?'财务':item.targetType == 3?'能力':''}}</h3>
                 <div>
                    {{item.targetDesc}}
                 </div>
              </div>
          </div>
      </div>
      <div class="projectvalue_left_o">
          <div class="div_1a">价值目标核定：</div>
          <div class="div_2a">{{projectValue.projectTargetCheck}}</div>
      </div>
      <div class="projectvalue_left_po">
          <div class="div_1a">使用资源：</div>
          <div class="table_02">
                <el-table :data="projectValue.targetResourceList" :header-cell-style="cellstyle" border style="width:100%">
                    <!-- <el-table-column type="selection" align="center" width="55"></el-table-column> -->
                    <el-table-column prop="resourceType" align="center" label="使用资源类型"></el-table-column>
                    <el-table-column prop="resourceContext" align="center" label="使用资源内容"></el-table-column>
                    <el-table-column prop="resourceAmount" align="center" label="使用资源金额"></el-table-column>
                </el-table>
          </div>
      </div>
      
    </div>
    <div class="projectvalue_bottom">
      <div class="projectvalue_top_top">创值成果</div>
      <div class="projectvalue_left_o">
          <div class="projectvalue_left_1">
            <div>创值成果类型：</div>
            <div>创值成果：</div>
          </div>
          <div>
              <div class="projectvalue_left_2" v-for="(item,index) in projectValue.achievementValueList" :key="index">
                 <h3>{{item.achievementType == 1?'业务':item.achievementType == 2?'财务':item.achievementType == 3?'能力':''}}</h3>
                 <div>
                    {{item.achievementDesc}}
                 </div>
              </div>
          </div>
      </div>
      <div class="projectvalue_left_o">
          <div class="div_1a">创值目标核定：</div>
          <div class="div_2a">{{projectValue.projectAchievementCheck}}</div>
      </div>
      <div class="projectvalue_left_po">
          <div class="div_1a">使用资源：</div>
          <div class="table_02">
                <el-table :data="projectValue.achievementResourceList" :header-cell-style="cellstyle" border style="width:100%">
                    <!-- <el-table-column type="selection" align="center" width="55"></el-table-column> -->
                    <el-table-column prop="resourceType" align="center" label="使用资源类型"></el-table-column>
                    <el-table-column prop="resourceContext" align="center" label="使用资源内容"></el-table-column>
                    <el-table-column prop="resourceAmount" align="center" label="使用资源金额"></el-table-column>
                </el-table>
          </div>
      </div>
      
    </div>
    <div class="projectvalue_bottom" style="height:auto;padding:0 0 20px 0;">
      <div class="projectvalue_top_top">评价</div>
      <div class="btnsstyle">
        <button class="btn_1" @click="open(1)">添加实时评价</button>
        <button class="btn_2" @click="open(2)" style="border:1px solid #10A3FF;color:#10A3FF">添加最终评价</button>
      </div>
      <div v-for="(item,index) in num" :key="index">
        <div class="smallbox">
            <div class="yellobox">{{index+1}}</div>
            <div class="messagebox">
                <div class="namebox">
                <span>召集人：</span>
                <span class="item">{{item.convenerName}}</span>
                </div>
                <div class="graybx">{{item.convenerEmpno}}</div>
                <div class="ss" v-if="item.commentType == 1">实时评价</div>
                <div class="zz" v-if="item.commentType == 2">最终评价</div>
                <div class="timebox">{{item.createTime}}</div>
            </div>
            <button class="delbox" @click="del_P5(item)">删 除</button>
        </div>
        <div class="content_89">{{item.commentDesc}}</div>
      </div>
    </div>
    <!-- <button class="btn_add">保存</button> -->
  </div>
</template>
<script>
import axios from 'axios';
import host from '../host';
export default {
  name: "ProjectValue1",
  props: ['tbProjectId'],
  components: {},
  data() {
    return {
        cellstyle:{
            'color':'#333333',
            'font-weight':'600',            
            'background':'rgba(248,248,248,1)',
            'font-size':'14px',
        },
        projectValue:'',
        num:[]
    };
  },
  computed: {},
  methods: {
      pack(){
          this.$emit('pack',1)
      },
      open(i){
            this.$prompt(i===1?'实施评价':'最终评价', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                // inputPattern: ,
                inputErrorMessage: '请输入评价内容'
            }).then(({ value }) => {
                console.log(value)
                if(value){
                    axios.post(host+'/projectvalue/addComment',{commentDesc:value,commentType:i,tbProjectId:this.tbProjectId}).then(res=>{
                        if(res.data.code === 200){
                            this.$message({
                                type: 'success',
                                message: '保存评价成功!'
                            });
                            axios.get(host+'/projectvalue/commentList/'+this.tbProjectId).then(res=>{
                                this.num = res.data.data
                            })
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.data.message
                            });
                        }
                    })
                }else{
                    this.$message({
                        type: 'info',
                        message: '您未输入任何内容！'
                    });
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });       
            });
        },
      del_P5(item){
          this.$confirm('是否删除该评价！', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                axios.post(host+"/projectvalue/deleteComment",item).then(res=>{
                    if(res.data.code === 200){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        axios.get(host+'/projectvalue/commentList/'+this.tbProjectId).then(res=>{
                            this.num = res.data.data
                        })
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.data.message
                        });
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
          
      }
  },
  created() {
      axios.get(host+'/projectvalue/detail/'+this.tbProjectId).then(res=>{
          if(res.data.code === 200){
              this.projectValue = res.data.data
              axios.get(host+'/projectvalue/commentList/'+this.tbProjectId).then(res=>{
                  this.num = res.data.data
              })
          }
      })
  },
  mounted() {}
};
</script>
<style>
.taskvalue_box{
    min-width: 1000px;
    margin-top: 20px;
}
.projectvalue_left_o{
    display: flex;
}
.projectvalue_left_po{
    display: flex;
    padding-bottom: 20px;
}
.projectvalue_left_1{
    width: 130px;
    font-size:14px;
    font-family:PingFangSC-Semibold,PingFang SC;
    font-weight:600;
    color:rgba(51,51,51,1);
    padding-left: 20px;
    padding-right: 10px;
}
.projectvalue_left_1>div{
    height: 28px;
    line-height: 28px;
    text-align: end;
    margin-top:20px;
}
.content_89{
    margin-left: 56px;
    margin-top: 20px;
    width:1000px;
    padding-right: 56px;
    height:auto;
    background:rgba(248,248,248,1);
    padding: 13px 20px;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:24px;
    margin-bottom: 50px;
}
.projectvalue_left_2>h3{
    margin-top: 20px;
    height: 28px;
    line-height: 28px;
    font-size:14px;
    font-family:PingFangSC-Semibold,PingFang SC;
    font-weight:600;
    color:rgba(51,51,51,1);
}
.tasktwo_centent_2{
    padding: 36px 0;
    border-top: 1px solid rgba(238,238,238,1);
    margin:0 44px;
}
.tasktwo_centent_1_1{
    width: 100%;
    height: 28px;
    display: flex;
    align-items: center;
    margin: 0 24px 30px 24px;
}
.tasktwo_centent_1_1>div:nth-child(1){
    width: auto;
    height:28px;
    font-size:16px;
    font-family:PingFangSC-Semibold,PingFang SC;
    font-weight:600;
    color:rgba(51,51,51,1);
    line-height:28px;
}
.btn_q{
    width:104px;
    height:28px;
    background:rgba(16,163,255,1);
    border-radius:1px;
    font-size:12px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
    margin-left: 30px;
    border: 0;
}
.btn_w{
    width:104px;
    height:28px;
    background:rgba(255,255,255,1);
    border-radius:1px;
    border:1px solid rgba(16,163,255,1);
    font-size:12px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(16,163,255,1);
    margin-left: 10px;
}
.tasktwo_centent_1_2{
    border: 1px solid #fff;
    padding: 39px 24px 30px 24px;
}
.tasktwo_centent_1_2:hover{
    border: 1px solid #10A3FF;
}
.tasktwo_centent_1_2>div>button{
    width:60px;
    height:28px;
    background:rgba(255,255,255,1);
    border-radius:1px;
    border:1px solid rgba(255,92,92,1);
    font-size:12px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(255,92,92,1);
}
.tasktwo_centent_1_2>div:nth-child(1){
    display: flex;
    justify-content: space-between;
}
.tasktwo_centent_1_2>div:nth-child(2){
    margin-left: 56px;
    width:712px;
    height:auto;
    background:rgba(248,248,248,1);
    padding: 13px 20px;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:24px;
}
.tasktwo_centent_1_2left{
    display: flex;
}
.tasktwo_centent_1_2left>div{
    width:auto;
    height:16px;
    font-size:14px;
    font-family:PingFangSC-Semibold,PingFang SC;
    font-weight:600;
    color:rgba(51,51,51,1);
    line-height:16px;
    padding-right: 10px;
}
.tasktwo_centent_1_2left>span:nth-child(2){
    width:68px;
    height:16px;
    text-align: center;
    line-height: 16px;
    background:rgba(153,153,153,1);
    border-radius:1px;
    font-size:12px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;

}
.ss{
    width:68px;
    height:16px;
    background:rgba(255,255,255,1);
    border-radius:1px;
    text-align: center;
    line-height: 14px;
    border:1px solid rgba(152,175,237,1);
    font-size:12px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(152,175,237,1);
    margin-left: 10px;
}
.zz{
    width:68px;
    height:16px;
    background:rgba(255,255,255,1);
    border-radius:1px;
    border:1px solid rgba(241,190,92,1);
    font-size:12px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(241,190,92,1);
    line-height: 14px;
    text-align: center;
    margin-left: 10px;
}
.tasktwo_centent_1_2left>span:nth-child(4){
    font-size:12px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height: 16px;
    margin-left: 10px;
}
.projectvalue_left_2>div{
    margin-top: 20px;
    min-height: 28px;
    width: 700px;
    line-height: 28px;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(102,102,102,1);
}
.tasktwo_top{
    width: 100%;
    height:56px;
    background:rgba(255,255,255,1);
    border-radius:1px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}
.tasktwo_top>img{
    width:15px;
    height:14px;
    margin: 0 20px;
}
.tasktwo_top>span{
    font-size:16px;
    font-family:PingFangSC-Semibold,PingFang SC;
    font-weight:600;
    color:rgba(51,51,51,1);
}
.div_1a{
    height: 28px;
    line-height: 28px;
    text-align: end;
    margin-top:20px;
    width: 130px;
    font-size:14px;
    font-family:PingFangSC-Semibold,PingFang SC;
    font-weight:600;
    color:rgba(51,51,51,1);
    padding-left: 20px;
    padding-right: 10px;
}
.div_2a{
    height: 28px;
    line-height: 28px;
    margin-top:20px;
    width: 130px;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(51,51,51,1);
}
.table_02{
    width:calc(100% - 150px);
    margin-top: 20px;
}
.messagehead {
  display: flex;
  padding-left: 60px;
  line-height: 28px;
}
.btnsstyle {
  margin-left: 44px;
  margin-top: 30px;
  margin-bottom: 61px;
}
.btnsstyle > button {
  width: 104px;
}
.projectvalue_top_div .input_t{
    border: 0;
}
.smallbox {
  display: flex;
  margin-left: 44px;
  flex-direction: space-around;
}
.yellobox {
  width: 30px;
  height: 30px;
  background: rgba(241, 190, 92, 1);
  border-radius: 1px;
  font-size: 20px;
  font-family: Arial-BoldMT, Arial;
  font-weight: normal;
  color: rgba(255, 255, 255, 1);
  line-height: 30px;
  text-align: center;
}
.messagebox {
  flex: 1;
  margin-left: 20px;
  display: flex;
}
.namebox {
  /* width: 98px; */
  height: 14px;
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  line-height: 14px;
}
.el-tooltip__popper is-light{
     outline-style: none !important;
     border: 1px solid #F8F8F8 !important;
     background:#F8F8F8 !important;
}
.graybx {
  width: 68px;
  height: 16px;
  background: rgba(153, 153, 153, 1);
  border-radius: 1px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 16px;
  text-align: center;
  margin-left: 10px;
}
.talkbox {
  width: 68px;
  height: 16px;
  background: rgba(255, 255, 255, 1);
  border-radius: 1px;
  border: 1px solid rgba(152, 175, 237, 1);
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(152, 175, 237, 1);
  line-height: 16px;
  text-align: center;
  margin-left: 10px;
  line-height: 14px;
  margin-right: 10px;
}
.timebox {
  height: 12px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 16px;
  margin-left: 10px;
}
.delbox {
  width: 60px;
  height: 28px;
  outline-style: none;
  background: rgba(255, 255, 255, 1);
  border-radius: 1px;
  border: 1px solid rgba(255, 92, 92, 1);
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 92, 92, 1);
  line-height: 28px;
  text-align: center;
  margin-right: 54px;
}
.btn_2{
    width:60px;
    height:27px;
    background:rgba(255,255,255,1);
    border-radius:1px;
    border:1px solid rgba(221,221,221,1);
    font-size:12px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(102,102,102,1);
    margin-left: 10px;
}
.btn_1{
    width:60px;
    height:27px;
    background:rgba(16,163,255,1);
    border-radius:1px;
    border:1px solid rgba(221,221,221,1);
    font-size:12px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
}
.p_del_1{
    width:60px;
    height:28px;
    background:rgba(238,238,238,1);
    border-radius:1px;
    font-size:12px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(102,102,102,1);
    margin-left: 10px;
    border: 0;
}
.projectvalue_top{
    width:100%;
    height:auto;
    background:rgba(255,255,255,1);
    border-radius:1px;
    padding-bottom: 30px;
}
.projectvalue_centent_type{
    width: 100%;
    height: 28px;
    margin-top: 30px;
    display: flex;
}
.table_2{
    padding: 30px 20px 20px 20px;
}
.projectvalue_centent_type>span{
    display: inline-block;
    margin-left: 30px;
    width:98px;
    height:28px;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:28px;
}
.select{
    margin: 0 0 30px 0;
    border: 0;
}
.projectvalue_top_top{
    width:100%;
    height:16px;
    font-size:16px;
    font-family:PingFangSC-Semibold,PingFang SC;
    font-weight:600;
    color:rgba(51,51,51,1);
    line-height:16px;
    padding:20px;
}
.projectvalue_top_div{
    display: flex;
    width: 100%;
    height: 28px;
    margin-top: 30px;
}
.projectvalue_top_div>div{
    flex:1;
    text-align: center;
}
.projectvalue_top_div>div>span{
    display: inline-block;
    width:80px;
    height:28px;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:28px;
    text-align: end;
}
.projectvalue_top_div>div>input{
    width:200px;
    height:28px;
    padding-left: 10px;
    background:rgba(255,255,255,1);
    border-radius:1px;
    border:1px solid rgba(232,232,232,1);
}
.projectvalue_centent{
    width: 100%;
    height:auto;
    background:rgba(255,255,255,1);
    border-radius:1px;
    margin-top: 20px;
}
.projectvalue_bottom{
    width: 100%;
    height:auto;
    background:rgba(255,255,255,1);
    border-radius:1px;
    margin-top: 20px;
}
.btn_add{
    width:60px;
    height:28px;
    background:rgba(16,163,255,1);
    border-radius:1px;
    font-size:12px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
    border:0;
    margin: 20px 0;
}
.projectvalue_top_2{
    margin-top: 30px;
    display: flex; 
}
.projectvalue_top_2>span{
    display: inline-block;
    width:98px;
    height:28px;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:28px;
    text-align: end;
    margin-left: 30px;
}
.add_m_1{
    height: 20px;
    display: flex;
    align-items: center;
}
.add_m_1>img{
    width: 20px;
}
.add_m_1>span{
    display: inline-block;
    height:20px;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(16,163,255,1);
    margin-left: 10px;
}
.input_p_1{
    width:610px;
    height:28px;
    background:rgba(255,255,255,1);
    border-radius:1px;
    padding-left: 10px;
    border:1px solid rgba(232,232,232,1);
}
.input_p_1_1{
    width:610px;
    resize:none;
    height:100px;
    background:rgba(255,255,255,1);
    border-radius:1px;
    padding-left: 10px;
    border:1px solid rgba(232,232,232,1);
}
.input_p_5{
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
}
</style>