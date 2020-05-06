<template>
    <div class="pmo_box">
        <div class="box-content">
            <div class="box-content_1">
                <div>项目查询</div>
                
            </div>
            <div class="box-content-top"> 
                <div>
                    <span>项目所属部门：</span>
                    <!-- <input v-model="input1" placeholder="请输入内容"/> -->
                    <el-cascader
                    :options="this.cascader"
                    size="mini"
                    :props="{ multiple: true, checkStrictly: true ,children:'subOrg',label:'orgName',value:'orgCode',emitPath:false}"
                    v-model="input1"
                    collapse-tags
                    clearable></el-cascader>
                </div>
                <div>
                    <span>项目类型：</span>
                    <el-select @change="changeselect($event)" multiple collapse-tags v-model="input2" size="mini" placeholder="请选择" :clearable='true'>
                        <el-option v-for="(item) in options" :key="item.key" :label="item.value" :value="item.key"></el-option>
                    </el-select>
                </div>
                <div>
                    <span>项目名称：</span><input v-model="input3" placeholder="请输入内容"/>
                </div>
                
            </div>
            <div class="box-content-top">
                <div>
                    <span>项目经理：</span><input v-model="input4" placeholder="请输入内容"/>
                </div>
                <div>
                    <span>项目编码：</span><input v-model="input5" placeholder="请输入内容"/>
                </div>
                <div>
                    <span>项目阶段：</span>
                    <el-select @change="changeselect($event)" multiple collapse-tags v-model="input6" size="mini" placeholder="请选择" :clearable='true'>
                        <el-option v-for="(item) in options_2" :key="item.key" :label="item.value" :value="item.key"></el-option>
                    </el-select>
                </div>
                
            </div>
            <div class="send_b">
                <div class="dateYear">
                    <div class="dateYear-left" @click="clickLeft('-')">
                    <img src="../assets/Shape.png" alt="">
                    </div>
                    <div :class="0 === i?'action':'years'" @click="clcikItem(i===0?i:i-1)">{{i===0?years[i]+"年":i===years.length-1?years[i-2]+"年":years[i-1]+"年"}}</div>
            <div :class="i !== 0?i !== years.length-1?'action':'years':'years'" @click="clcikItem(i!==0?i!==years.length-1?i:i-1:i+1)">{{i!==0?i!==years.length-1?years[i]+"年":years[i-1]+"年":years[i+1]+"年"}}</div>
            <div :class="years.length-1 === i?'action':'years'" @click="clcikItem(i===years.length-1?i:i+1)">{{i===years.length-1?years[i]+"年":i===0?years[i+2]+"年":years[i+1]+"年"}}</div>
                    <div class="dateYear-left" @click="clickLeft('+')">
                    <img src="../assets/Shape0.png" alt="">
                    </div>
                </div>
                <div></div>
                <div>
                    <button class="put" @click="put">导出</button>
                    <button class="btns_8" @click="clicksend">查询</button>
                </div>
            </div>
            <div class="box_table" >
                <el-table :data="data" style="width: 100%" max-height="410" :header-cell-style="styleObj" :span-method="spanmethod" v-loading="loading" @cell-click="cellclick" @cell-mouse-enter = hovertable
                   @cell-mouse-leave = leacetable> 
                    <el-table-column prop="deptName" label="项目所属部门" align="center" fixed  :show-overflow-tooltip='true'></el-table-column> 
                    <el-table-column prop="projectType" width="100" label="项目类型" align="center" fixed  :show-overflow-tooltip='true'></el-table-column> 
                    <el-table-column prop="tempProjectId" label="项目编码" align="center" fixed  :show-overflow-tooltip='true'></el-table-column>
                    <el-table-column width="200" label="项目名称" align="center" fixed  :show-overflow-tooltip='true'>
                        <template slot-scope="scope">
                            <span style="color:#10A3FF;border-bottom:1px solid #10A3FF">{{scope.row.projectName}}</span>
                        </template>
                    </el-table-column> 
                    <el-table-column prop="managerName" label="项目经理" align="center" fixed  :show-overflow-tooltip='true'></el-table-column> 
                    <el-table-column prop="projectStatus" label="项目状态" align="center" fixed  :show-overflow-tooltip='true'></el-table-column> 
                    <el-table-column prop="budget" label="项目预算" width="120" align="center" fixed  :show-overflow-tooltip='true'></el-table-column> 
                    <el-table-column prop="projectAmount" label="合同额" width="120" align="center" fixed  :show-overflow-tooltip='true'></el-table-column> 
                    <el-table-column prop="alreadyBack" label="已回款" align="center" fixed :show-overflow-tooltip='true'></el-table-column> 
                    <el-table-column prop="backRatio" label="回款比例（%）" align="center" fixed :show-overflow-tooltip='true'></el-table-column> 
                    <el-table-column label="计划成本" align="center">
                        <el-table-column prop="planCostTotal" label="合计" width="100" align="center" :show-overflow-tooltip='true'> </el-table-column> 
                        <el-table-column prop="planCostManday" label="人力成本" align="center" :show-overflow-tooltip='true'> </el-table-column> 
                        <el-table-column prop="planCostBuy" label="采购成本" align="center" :show-overflow-tooltip='true'> </el-table-column> 
                        <el-table-column prop="planCostBudget" label="费用成本" align="center" :show-overflow-tooltip='true'> </el-table-column> 
                        <el-table-column prop="planCostCloud" label="资源交易成本" align="center" :show-overflow-tooltip='true'> </el-table-column>
                    </el-table-column>
                    <el-table-column label="发生成本" align="center"> 
                        <el-table-column prop="actualCostTotal" label="合计" align="center" :show-overflow-tooltip='true' > </el-table-column> 
                        <el-table-column prop="actualCostManday" label="人力成本" align="center" :show-overflow-tooltip='true'> </el-table-column> 
                        <el-table-column prop="actualCostBuy" label="采购成本" align="center" :show-overflow-tooltip='true'> </el-table-column> 
                        <el-table-column prop="actualCostBudget" label="费用成本" align="center" :show-overflow-tooltip='true'> </el-table-column> 
                        <el-table-column prop="actualCostCloud" label="资源交易成本" align="center" :show-overflow-tooltip='true'> </el-table-column> 
                    </el-table-column>
                    <el-table-column prop="costSchedule" label="成本进度（%）" align="center" :show-overflow-tooltip='true'> </el-table-column> 
                    <el-table-column prop="planManday" label="计划人天" align="center" :show-overflow-tooltip='true'> </el-table-column> 
                    <el-table-column prop="actualManday" label="使用人天" align="center" :show-overflow-tooltip='true'> </el-table-column> 
                    <el-table-column prop="mandaySchedule" label="人天进度（%）" align="center" :show-overflow-tooltip='true'> </el-table-column> 
                    <el-table-column label="当年回款" align="center">
                        <el-table-column prop="yearBackTotal" label="合计" align="center" :show-overflow-tooltip='true'> </el-table-column> 
                        <el-table-column prop="yearBackQ1" label="Q1" align="center" :show-overflow-tooltip='true'> </el-table-column> 
                        <el-table-column prop="yearBackQ2" label="Q2" align="center" :show-overflow-tooltip='true'> </el-table-column> 
                        <el-table-column prop="yearBackQ3" label="Q3" align="center" :show-overflow-tooltip='true'> </el-table-column> 
                        <el-table-column prop="yearBackQ4" label="Q4" align="center" :show-overflow-tooltip='true'> </el-table-column> 
                    </el-table-column>
                </el-table>
                <div class="box_bottom">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="row"
                        layout="  prev, pager, next, jumper,sizes,total"
                        :total="allnums">
                    </el-pagination>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import {formatMoney,unFormatMoney} from '../value'
import {JSONToExcelConvertor} from '../exec'
import host from '../host'
export default {
    name:'Home',
    props:['rtoken'],
    components:{

    },
    data(){
        return {
            styleObj: {
                'color':'#333333',
                'font-weight':'600',            
                'background':'rgba(248,248,248,1)',
                'font-size':'14px'
            },
            years: ["2017", "2018", "2019", "2020", "2021", "2022", "2023"],
            year:[],
            i: 2,
            loading:true,
            options:[{value:'收入类-交付',key:'REV-01'},{value:'收入类-运维',key:'REV-02'},{value:'投入类-交付',key:'MDI-01'},{value:'投入类-运营',key:'MDI-02'},{value:'等待类',key:'WAI-00'},{value:'商机类',key:'BDT-00'},{value:'空闲类',key:'IDL-00'},{value:'培训类-公司培训',key:'TRA-01'},{value:'培训类-小组分享',key:'TRA-02'},{value:'培训类-集团培训',key:'TRA-03'},{value:'培训类-外部培训',key:'TRA-04'},{value:'管理类',key:'MAN-00'},{value:'赋能类',key:'ENA-00'},{value:'自驱组织类',key:'SDO-00'}],
            options_2:[{value:'立项',key:'1'},{value:'设计',key:'2'},{value:'开发',key:'3'},{value:'测试',key:'4'},{value:'上线实施',key:'5'},{value:'验收',key:'6'},{value:'运维',key:'7'},{value:'敏捷迭代',key:'8'},{value:'推广实施',key:'9'},{value:'已结项',key:'10'},{value:'已关闭',key:'11'},{value:'暂停',key:'12'}],
            input1:[],
            input2:[],
            input3:'',
            input4:'',
            input5:'',
            input6:'',
            data:[],
            spanArr:[],
            pos:'',
            spanArrs:[],
            poss:'',
            key:'',
            allnums:0,
            row:10,
            page:1,
            cascader:[]
        }
    },
    computed:{
        
    },
    watch:{
        i(){
            this.page = 1
            this.axio(this.input3,this.input1.join(','),this.input2.join(','),this.input4,this.input5,this.page,this.row,this.input6.join(','))
        }
    },
    methods:{
        axio(tbProjectName,deptName,bizType,managerName,tempProjectId,page,pageNum,projectStage){
            // this.data=[],
            this.spanArr=[],
            this.pos='',
            this.spanArrs=[],
            this.poss='',
            
            axios.post(host+'/contract/pmoBoard',{
                year:this.years[this.i],
                projectName: tbProjectName, //项目名称
                deptCode: deptName, //部门名称
                bizType: bizType,  //项目类型
                managerName: managerName, //项目经理
                tempProjectId: tempProjectId, //项目编码
                page: page,
                rtoken:this.rtoken,
                projectStage:projectStage,//项目阶段
                pageNum: pageNum}).then(res=>{
                                    this.loading = false
                                    this.allnums = res.data.data?res.data.data.totalNum:0
                                    this.data = []
                                    for(var i in res.data.data.projectList){
                                        for(var j in res.data.data.projectList[i]){
                                            for(var h in res.data.data.projectList[i][j]){
                                                let obj = {}
                                                for(var n in res.data.data.projectList[i][j][h]){
                                                    obj[n] = res.data.data.projectList[i][j][h][n]
                                                    if(n === 'budget'){
                                                        obj[n] = formatMoney(res.data.data.projectList[i][j][h][n])
                                                    }
                                                    
                                                }
                                                this.data.push(obj)
                                            }
                                        }
                                    }
                                    this.data.forEach(item=>{
                                        item.backRatio = formatMoney(item.backRatio) + '%'
                                        item.costSchedule = formatMoney(Number(item.costSchedule.split('%')[0])) + '%'
                                        item.mandaySchedule = formatMoney(Number(item.mandaySchedule.split('%')[0])) + '%'
                                    })
                                    this.spanArr = []
                                    for (var i = 0; i < this.data.length; i++) {
                                            if (i === 0) {
                                                this.spanArr.push(1);
                                                this.pos = 0
                                            } else {
                                                // 判断当前元素与上一个元素是否相同
                                                if (this.data[i].deptName == this.data[i - 1].deptName) {
                                                    this.spanArr[this.pos] += 1;
                                                    this.spanArr.push(0);
                                                } else {
                                                    this.spanArr.push(1);
                                                    this.pos = i;
                                                }
                                            }
                                    }
            })
        },
        clickLeft: function(str) {
            if (str === "-") {
                if (this.i > 0) {
                this.i--;
                }
            } else {
                if (this.i < this.years.length - 1) {
                this.i++;
                }
            }
        },
        clcikItem(ind) {
            this.i = ind;
        },
        cellclick(row, column, cell, event){
            if(column.label === "项目名称"){
                window.open('http://10.39.45.108:8080/web/dist/index.html?project='+row.tbProjectId+'&orgId=5d47dd2cbf86f30001ebebf7&pmo='+row.projectName)
            }
        },
        hovertable(row, column, cell, event){
            if(column.label === '项目名称'){                                  
                cell.style.color = '#10A3FF'
                cell.style.cursor = 'pointer';
            }
        },
        leacetable(row, column, cell, event){
            if(column.label === '项目名称'){
                cell.style.color = '#606266'
            }
        },
        handleSizeChange(ind){
            this.row = ind
            this.loading = true
            this.axio(this.input3,this.input1.join(','),this.input2.join(','),this.input4,this.input5,this.page,this.row,this.input6.join(','))
        },
        handleCurrentChange(ind){
            this.page = ind
            this.loading = true
            this.axio(this.input3,this.input1.join(','),this.input2.join(','),this.input4,this.input5,this.page,this.row,this.input6.join(','))
        },
        spanmethod({row, column, rowIndex, columnIndex}){
            if (columnIndex === 0) {
                const _row = this.spanArr[rowIndex];
                const _col = 1
                return {
                    rowspan: _row,
                    colspan: _col
                }
              }
        },
        changeselect(e){
                
        },
        clicksend(){
            this.loading = true
            this.page = 1
            this.axio(this.input3,this.input1.join(','),this.input2.join(','),this.input4,this.input5,this.page,this.row,this.input6.join(','))
          // window.open('http://tb.enn.cn/project/5d818f913c02a7782f81dcf4/plugin/5d5b3b9c6d8c3a44fb2fd025')
        },
        put(){
            let arr = [{}]
            this.data.forEach(item=>{
                let obj = {}
                obj.deptName = item.deptName
                obj.tempProjectId = item.tempProjectId
                obj.projectType = item.projectType
                obj.projectName = item.projectName
                obj.managerName = item.managerName
                obj.projectStatus = item.projectStatus
                obj.budget = item.budget
                obj.projectAmount = item.projectAmount
                obj.alreadyBack = item.alreadyBack
                obj.backRatio = item.backRatio
                obj.planCostTotal = item.planCostTotal
                obj.planCostManday = item.planCostManday
                obj.planCostBuy = item.planCostBuy
                obj.planCostBudget = item.planCostBudget
                obj.planCostCloud = item.planCostCloud
                obj.actualCostTotal = item.actualCostTotal
                obj.actualCostManday = item.actualCostManday
                obj.actualCostBuy = item.actualCostBuy
                obj.actualCostBudget = item.actualCostBudget
                obj.actualCostCloud = item.actualCostCloud
                obj.costSchedule = item.costSchedule
                obj.planManday = item.planManday
                obj.actualManday = item.actualManday
                obj.mandaySchedule = item.mandaySchedule
                obj.yearBackTotal = item.yearBackTotal
                obj.yearBackQ1 = item.yearBackQ1
                obj.yearBackQ2 = item.yearBackQ2
                obj.yearBackQ3 = item.yearBackQ3
                obj.yearBackQ4 = item.yearBackQ4
                arr.push(obj)
            })
            console.log(arr)
            JSONToExcelConvertor(arr,'PMO',['项目所属部门','项目编码','项目类型','项目名称','项目经理','项目状态','项目预算','合同额','已回款','回款比例','计划成本合计','计划成本人力成本','计划成本采购成本','计划成本费用成本','计划成本云资源成本','发生成本云合计','发生成本人力成本','发生成本采购成本','发生成本费用成本','发生成本云资源成本','成本进度（%）','计划人天','使用人天','人天进度（%）','当年回款合计','当年回款Q1','当年回款Q2','当年回款Q3','当年回款Q4'])
        },
        cascaderF(options){
            options.forEach(item=>{
                if(item.subOrg.length>0){
                    this.cascaderF(item.subOrg)
                }else{
                    item.subOrg = ''
                } 
            })
        } 
    },
    created(){
        this.i = this.years.findIndex((item,index)=>{
            if(item*1 === new Date().getFullYear()){
                return index
            }
        })
        axios.post(host+'/board/queryDeptTree').then(res=>{
            this.cascader = []
            this.cascader.push(res.data.data)
            this.cascaderF(this.cascader)
        })
        this.axio()
    },
    mounted(){

    }
}
</script>
<style>
body .el-table th.gutter {
    display: table-cell !important
}
.el-select .el-input{
    width: 100%;
    height: 28px;
    padding: 0;
    margin: 0;
    border: 0;
}
.el-select .el-input .el-input__inner{
    border: 1px solid #f2f2f2;
    border-radius: 1px;
}
.el-select{
    width: 60%;
    height: 28px;
}
.el-table td, .el-table th.is-leaf,.el-table--border, .el-table--group{
  border-color: rgba(238,238,238,1); 
  font-size:12px;
  
}
.el-table--border::after, .el-table--group::after, .el-table::before{
  background-color: rgba(238,238,238,1);
}
thead,.el-table{ color: #333333; }
.el-pagination{
    margin:20px 0;
}
.box{
    width: 100%;
    height: 100%;
    background: #f2f2f2;
    padding-top: 20px;
}
.box_table{
    margin: 0 20px;
}
.pmo_box{
    width: calc(100%-40px);
    height: 100%;
    margin: 0 20px;
}
.box_bottom{
    display: flex;
    justify-content: flex-end;
}
.send_b{
    display: flex;
}
.send_b>div{
    width:33%;
    margin-bottom:20px;
    display: flex;
}
.send_b>div:nth-child(3){
    display: flex;
    justify-content: flex-end;
}
.btns_8{
    width:80px;
    height:28px;
    background:rgba(16,163,255,1);
    border-radius:1px;
    font-size:12px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
    border:0;
    margin-right: 80px;
    margin-left: 20px;
}
.box-content_1{
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    justify-content: space-between;
}
.box-content_1>div{
    font-weight: 900;
    font-size: 16px;
    color: #515a6e;
}
.put{
    width:80px;
    height:28px;
    border-radius:1px;
    font-size:12px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgb(54, 54, 54);
    border:0;
    margin-left: 20px;
    
}
.box_top{
    min-width: 1000px;
    font-size: 18px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    padding: 20px;
    background: #fff;
    overflow: auto;
    display: flex;
    justify-content: space-between;
}
.box-content{
    min-width: 1000px;
    background: #fff;
    margin-top: 20px;
    margin-bottom: 20px;
    overflow: auto;
}
.box-content-top{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px;
    flex-wrap:nowrap;
}
.box-content-top>div{
    width: 33.3%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.box-content-top>div>span{
    width: 100px;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(102,102,102,1);
}
.selects{
    width: 60px;
    height: 28px;
    padding-left: 10px;
    border: 1px solid #f2f2f2;
}
.box-content-top>div>input{
    width: 60%;
    height: 28px;
    padding-left: 15px;
    border: 1px solid #f2f2f2;
    border-radius: 1px;
    font-size: 12px;
}
</style>