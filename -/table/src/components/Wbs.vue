<template>
    <div class="pmo_box">
        <div class="box-content">
            <div class="box-content_1">
                <div>WBS运营</div>
                <!-- <button class="put" @click="put">导出</button> -->
                
            </div>
            
            <div class="box-content-top"> 
                <div>
                    <span>项目所属部门：</span>
                    <el-cascader
                    :options="this.cascader"
                    size="mini"
                    :props="{ multiple: true, checkStrictly: true ,children:'subOrg',label:'orgName',value:'orgCode',emitPath:false}"
                    v-model="input1"
                    collapse-tags
                    clearable></el-cascader>
                </div>
                <div>
                    <span>WBS类型：</span>
                    <el-select @change="changeselect($event)" multiple collapse-tags v-model="input2" size="mini" placeholder="请选择WBS类型" :clearable='true'>
                        <el-option v-for="(item) in options" :key="item.key" :label="item.value" :value="item.key"></el-option>
                    </el-select>
                </div>
                <div>
                    <span>WBS名称：</span><input v-model="input3" placeholder="请输入WBS名称"/>
                </div>
                
            </div>
            <div class="box-content-top">
                <div>
                    <span>项目经理：</span><input v-model="input4" placeholder="请输入项目经理"/>
                </div>
                <div>
                    <span>WBS编号：</span><input v-model="input5" placeholder="请输入WBS编号"/>
                </div>
                <div>
                    <span>项目阶段：</span>
                    <el-select @change="changeselect($event)" multiple collapse-tags v-model="input6" size="mini" placeholder="请选择" :clearable='true'>
                        <el-option v-for="(item) in options_2" :key="item.key" :label="item.value" :value="item.key"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="dateYears">
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
                <div>
                    <button class="btn" @click="clicksend">查询</button>
                    <button class="put_2" @click="clicksends">重置</button>
                    <el-button
                        class="put"
                        type="primary"
                        @click="put"
                        v-loading.fullscreen.lock="fullscreenLoading">
                        导出
                    </el-button>
                </div>
            </div>
            <div class="plan">
              <span>{{this.years[this.i]}}年</span>
              <div>
                项目成本合计：
                <span>{{this.costTotal}}</span>
              </div>
              <div>
                项目收入合计：
                <span>{{this.mandayTotal}}</span>
              </div>
            </div>
            <div class="box_table" >
                <el-table :data="data" @cell-click="cellclick" @cell-mouse-enter = hovertable @cell-mouse-leave = leacetable style="width: 100%" max-height="380" :header-cell-style="styleObj" :span-method="spanmethod" v-loading="loading"> 
                    <el-table-column prop="deptName" label="项目所属部门" align="center" fixed  :show-overflow-tooltip='true'></el-table-column> 
                    <el-table-column prop="wbsCode" width="100" label="WBS编号" align="center" fixed  :show-overflow-tooltip='true'></el-table-column> 
                    <el-table-column label="WBS名称" width="200" align="center" fixed  :show-overflow-tooltip='true'>
                        <template slot-scope="scope">
                            <span style="color:#10A3FF;border-bottom:1px solid #10A3FF">{{scope.row.tbProjectName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="wbsTypeName" width="100" label="WBS类型" align="center" fixed  :show-overflow-tooltip='true'></el-table-column> 
                    <el-table-column prop="managerName" label="项目经理" align="center" fixed  :show-overflow-tooltip='true'></el-table-column> 
                    <el-table-column prop="costSubTotal" width="120" label="项目总成本" align="center" fixed  :show-overflow-tooltip='true'></el-table-column>
                    <el-table-column prop="incomeSubTotal" label="项目总收入" width="120" align="center" fixed  :show-overflow-tooltip='true'></el-table-column> 
                    <el-table-column prop="incomeYearTotal" label="年度计划收入" width="120" align="center" fixed  :show-overflow-tooltip='true'></el-table-column> 
                    <el-table-column prop="costYearTotal"  width="120" label="年度计划成本" align="center" fixed :show-overflow-tooltip='true'></el-table-column>
                    <el-table-column label="Q1" align="center">
                        <el-table-column prop="incomeQ1" width="120" label="计划收入" align="center" :show-overflow-tooltip='true'> </el-table-column> 
                        <el-table-column prop="costQ1" width="120" label="计划成本" align="center" :show-overflow-tooltip='true'> </el-table-column>
                    </el-table-column>
                    <el-table-column label="Q2" align="center">
                        <el-table-column prop="incomeQ2" width="120" label="计划收入" align="center" :show-overflow-tooltip='true'> </el-table-column> 
                        <el-table-column prop="costQ2"  width="120" label="计划成本" align="center" :show-overflow-tooltip='true'> </el-table-column>
                    </el-table-column>
                    <el-table-column label="Q3" align="center">
                        <el-table-column prop="incomeQ3" width="120" label="计划收入" align="center" :show-overflow-tooltip='true'> </el-table-column> 
                        <el-table-column prop="costQ3" width="120" label="计划成本" align="center" :show-overflow-tooltip='true'> </el-table-column>
                    </el-table-column>
                    <el-table-column label="Q4" align="center">
                        <el-table-column prop="incomeQ4" width="120" label="计划收入" align="center" :show-overflow-tooltip='true'> </el-table-column> 
                        <el-table-column prop="costQ4" width="120" label="计划成本" align="center" :show-overflow-tooltip='true'> </el-table-column>
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
    name:'Wbs',
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
            costTotal:0,
            fullscreenLoading:false,
            mandayTotal:0,
            loading:true,
            options:[{value:'收入类-交付',key:'REV-01'},{value:'收入类-运维',key:'REV-02'},{value:'投资类-交付',key:'MDI-01'},{value:'投资类-运营',key:'MDI-02'},{value:'等待类',key:'WAI-00'},{value:'商机类',key:'BDT-00'},{value:'空闲类',key:'IDL-00'},{value:'培训类-公司培训',key:'TRA-01'},{value:'培训类-小组分享',key:'TRA-02'},{value:'培训类-集团培训',key:'TRA-03'},{value:'培训类-外部培训',key:'TRA-04'},{value:'管理类',key:'MAN-00'},{value:'外部赋能类',key:'ENA-00'},{value:'自驱组织类',key:'SDO-00'}],
            options_2:[{value:'立项',key:'1'},{value:'设计',key:'2'},{value:'开发',key:'3'},{value:'测试',key:'4'},{value:'上线实施',key:'5'},{value:'验收',key:'6'},{value:'运维',key:'7'},{value:'敏捷迭代',key:'8'},{value:'推广实施',key:'9'},{value:'已结项',key:'10'},{value:'已关闭',key:'11'},{value:'暂停',key:'12'}],
            input1:[],
            input2:[],
            input6:[],
            input3:'',
            input4:'',
            input5:'',
            data:[],
            spanArr:[],
            pos:'',
            spanArrs:[],
            poss:'',
            key:'',
            allnums:0,
            row:10,
            page:1,
            years: ["2017", "2018", "2019", "2020", "2021", "2022", "2023"],
            year:[],
            i: 2,
            cascader:[]
        }
    },
    computed:{
        
    },
    watch:{
        i(){
            this.page = 1
            this.axio(this.input1.join(','),this.input2.join(','),this.input3,this.input4,this.input5,this.years[this.i],this.page,this.row,this.input6.join(','))
        }
    },
    methods:{
        clicksends(){
            this.input1 = []
            this.input2 = []
            this.input3 = ''
            this.input4 = ''
            this.input5 = ''
        },
        cellclick(row, column, cell, event){
            if(column.label === "WBS名称"){
                window.open('http://10.39.45.108:8080/web/dist/index.html?project='+row.tbProjectId+'&orgId=5d47dd2cbf86f30001ebebf7&pmo='+row.tbProjectName)
            }
        },
        hovertable(row, column, cell, event){
            if(column.label === 'WBS名称'){                                  
                cell.style.color = '#10A3FF'
                cell.style.cursor = 'pointer';
            }
        },
        leacetable(row, column, cell, event){
            if(column.label === 'WBS名称'){
                cell.style.color = '#606266'
            }
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
        axio(deptCode,wbsType,projectName,managerName,wbsCode,year,page,pageNum,projectStage){
            this.loading = true
            axios.post(host+'/board/operatePlanBoard',{deptCode:deptCode,wbsType:wbsType,projectName:projectName,managerName:managerName,wbsCode:wbsCode,year:year,page:page,pageNum:pageNum,rtoken:this.rtoken,projectStage:projectStage}).then(res=>{
                console.log(res.data)
                if(res.data.code === 200){
                    // this.data = res.data.data.pageList
                    let arr = []
                    this.data = []
                    res.data.data.pageList.forEach(item=>{
                        if(arr.indexOf(item.deptName) === -1){
                            arr.push(item.deptName)
                        }
                    })
                    console.log(arr)
                    arr.forEach(item=>{
                        let costSubTotal = 0
                        let incomeSubTotal = 0
                        let incomeYearTotal = 0
                        let incomeQ1 = 0
                        let costQ1 = 0
                        let incomeQ2 = 0
                        let costQ2 = 0
                        let incomeQ3 = 0
                        let costQ3 = 0
                        let incomeQ4 = 0
                        let costQ4 = 0
                        let costYearTotal = 0
                        
                        res.data.data.pageList.forEach(items=>{
                            if(item === items.deptName){
                                costSubTotal += items.costSubTotal.toFixed(2)*1
                                incomeSubTotal += items.incomeSubTotal.toFixed(2)*1
                                incomeYearTotal += items.incomeYearTotal.toFixed(2)*1
                                costYearTotal += items.costYearTotal.toFixed(2)*1
                                incomeQ1 += items.incomeQ1.toFixed(2)*1
                                costQ1 += items.costQ1.toFixed(2)*1
                                incomeQ2 += items.incomeQ2.toFixed(2)*1
                                costQ2 += items.costQ2.toFixed(2)*1
                                incomeQ3 += items.incomeQ3.toFixed(2)*1
                                costQ3 += items.costQ3.toFixed(2)*1
                                incomeQ4 += items.incomeQ4.toFixed(2)*1
                                costQ4 += items.costQ4.toFixed(2)*1
                                this.data.push(items)
                            }
                        })
                        this.data.push({deptName:'合计',wbsCode:'合计',tbProjectName:'合计',wbsTypeName:'合计',managerName:'合计',costSubTotal:costSubTotal,incomeSubTotal:incomeSubTotal,incomeYearTotal:incomeYearTotal,costYearTotal:costYearTotal,incomeQ1:incomeQ1,costQ1:costQ1,incomeQ2:incomeQ2,costQ2:costQ2,incomeQ3:incomeQ3,costQ3:costQ3,incomeQ4:incomeQ4,costQ4:costQ4})
                    })
                    this.loading = false
                    this.allnums = res.data.data.totalNum
                    this.costTotal = '￥'+formatMoney(res.data.data.costYearAllTotal)
                    this.mandayTotal = '￥'+formatMoney(res.data.data.incomeYearAllTotal)
                }else{
                    this.$message.error('暂无数据 ');
                    this.data = []
                    this.allnums = 0
                    this.costTotal = '￥'+0.00
                    this.mandayTotal = '￥'+0.00
                    this.loading = false
                }
            })
        },
        handleSizeChange(ind){
            console.log(ind)
            this.row = ind
            this.axio(this.input1.join(','),this.input2.join(','),this.input3,this.input4,this.input5,this.years[this.i],this.page,this.row,this.input6.join(','))
        },
        handleCurrentChange(ind){
            // console.log(ind)
            this.page = ind
            this.axio(this.input1.join(','),this.input2.join(','),this.input3,this.input4,this.input5,this.years[this.i],this.page,this.row,this.input6.join(','))
        },
        spanmethod({row, column, rowIndex, columnIndex}){
            if(row.deptName === '合计'){
                if (columnIndex === 0) {
                    return [1, 5];
                } else if (columnIndex === 1) {
                    return [0, 0];
                }else if (columnIndex === 2) {
                    return [0, 0];
                }else if (columnIndex === 3) {
                    return [0, 0];
                }else if (columnIndex === 4) {
                    return [0, 0];
                }
            }
        },
        changeselect(e){
            
        },
        clicksend(){
            this.page = 1
            this.axio(this.input1.join(','),this.input2.join(','),this.input3,this.input4,this.input5,this.years[this.i],this.page,this.row,this.input6.join(','))
        },
        put(){
            this.fullscreenLoading = true
            axios.post(host+'/board/operatePlanBoard',{deptCode:this.input1.join(','),wbsType:this.input2.join(','),projectName:this.input3,managerName:this.input4,wbsCode:this.input5,year:this.years[this.i],page:1,pageNum:10,rtoken:this.rtoken,projectStage:this.input6.join(',')}).then(res=>{
                if(res.data.code === 200){
                    axios.post(host+'/board/operatePlanBoard',{deptCode:this.input1.join(','),wbsType:this.input2.join(','),projectName:this.input3,managerName:this.input4,wbsCode:this.input5,year:this.years[this.i],page:1,pageNum:res.data.data.totalNum,rtoken:this.rtoken,projectStage:this.input6.join(',')}).then(resd=>{
                    console.log(resd.data.data)
                    if(resd.data.code === 200){
                        this.fullscreenLoading = false
                        let data = []
                        let arrs = []
                        if(resd.data.data.pageList.length>0){
                            resd.data.data.pageList.forEach(item=>{
                                if(arrs.indexOf(item.deptName) === -1){
                                    arrs.push(item.deptName)
                                }
                            })
                            console.log(arr)
                            arrs.forEach(item=>{
                                let costSubTotal = 0
                                let incomeSubTotal = 0
                                let incomeYearTotal = 0
                                let incomeQ1 = 0
                                let costQ1 = 0
                                let incomeQ2 = 0
                                let costQ2 = 0
                                let incomeQ3 = 0
                                let costQ3 = 0
                                let incomeQ4 = 0
                                let costQ4 = 0
                                let costYearTotal = 0
                                let incomeMonth1 = 0
                                let incomeMonth2 = 0
                                let incomeMonth3 = 0
                                let incomeMonth4 = 0
                                let incomeMonth5 = 0
                                let incomeMonth6 = 0
                                let incomeMonth7 = 0
                                let incomeMonth8 = 0
                                let incomeMonth9 = 0
                                let incomeMonth10 = 0
                                let incomeMonth11 = 0
                                let incomeMonth12 = 0
                                let costMonth1 = 0
                                let costMonth2 = 0
                                let costMonth3 = 0
                                let costMonth4 = 0
                                let costMonth5 = 0
                                let costMonth6 = 0
                                let costMonth7 = 0
                                let costMonth8 = 0
                                let costMonth9 = 0
                                let costMonth10 = 0
                                let costMonth11 = 0
                                let costMonth12 = 0
                                resd.data.data.pageList.forEach(items=>{
                                    if(item === items.deptName){
                                        costSubTotal += items.costSubTotal.toFixed(2)*1
                                        incomeSubTotal += items.incomeSubTotal.toFixed(2)*1
                                        incomeYearTotal += items.incomeYearTotal.toFixed(2)*1
                                        costYearTotal += items.costYearTotal.toFixed(2)*1
                                        incomeQ1 += items.incomeQ1.toFixed(2)*1
                                        costQ1 += items.costQ1.toFixed(2)*1
                                        incomeQ2 += items.incomeQ2.toFixed(2)*1
                                        costQ2 += items.costQ2.toFixed(2)*1
                                        incomeQ3 += items.incomeQ3.toFixed(2)*1
                                        costQ3 += items.costQ3.toFixed(2)*1
                                        incomeQ4 += items.incomeQ4.toFixed(2)*1
                                        costQ4 += items.costQ4.toFixed(2)*1
                                        incomeMonth1 += items.incomeMonth1.toFixed(2)*1
                                        incomeMonth2 += items.incomeMonth2.toFixed(2)*1
                                        incomeMonth3 += items.incomeMonth3.toFixed(2)*1
                                        incomeMonth4 += items.incomeMonth4.toFixed(2)*1
                                        incomeMonth5 += items.incomeMonth5.toFixed(2)*1
                                        incomeMonth6 += items.incomeMonth6.toFixed(2)*1
                                        incomeMonth7 += items.incomeMonth7.toFixed(2)*1
                                        incomeMonth8 += items.incomeMonth8.toFixed(2)*1
                                        incomeMonth9 += items.incomeMonth9.toFixed(2)*1
                                        incomeMonth10 += items.incomeMonth10.toFixed(2)*1
                                        incomeMonth11 += items.incomeMonth11.toFixed(2)*1
                                        incomeMonth12 += items.incomeMonth12.toFixed(2)*1
                                        costMonth1 += items.costMonth1.toFixed(2)*1
                                        costMonth2 += items.costMonth2.toFixed(2)*1
                                        costMonth3 += items.costMonth3.toFixed(2)*1
                                        costMonth4 += items.costMonth4.toFixed(2)*1
                                        costMonth5 += items.costMonth5.toFixed(2)*1
                                        costMonth6 += items.costMonth6.toFixed(2)*1
                                        costMonth7 += items.costMonth7.toFixed(2)*1
                                        costMonth8 += items.costMonth8.toFixed(2)*1
                                        costMonth9 += items.costMonth9.toFixed(2)*1
                                        costMonth10 += items.costMonth10.toFixed(2)*1
                                        costMonth11 += items.costMonth11.toFixed(2)*1
                                        costMonth12 += items.costMonth12.toFixed(2)*1
                                        data.push(items)
                                    }
                                })
                                data.push({deptName:'合计',wbsCode:'合计',tbProjectName:'合计',wbsTypeName:'合计',managerName:'合计',costSubTotal:costSubTotal,incomeSubTotal:incomeSubTotal,incomeYearTotal:incomeYearTotal,costYearTotal:costYearTotal,incomeQ1:incomeQ1,costQ1:costQ1,incomeQ2:incomeQ2,costQ2:costQ2,incomeQ3:incomeQ3,costQ3:costQ3,incomeQ4:incomeQ4,costQ4:costQ4,incomeMonth1:incomeMonth1,incomeMonth2:incomeMonth2,incomeMonth3:incomeMonth3,incomeMonth4:incomeMonth4,incomeMonth5:incomeMonth5,incomeMonth6:incomeMonth6,incomeMonth7:incomeMonth7,incomeMonth8:incomeMonth8,incomeMonth9:incomeMonth9,incomeMonth10:incomeMonth10,incomeMonth11:incomeMonth11,incomeMonth12:incomeMonth12,costMonth1:costMonth1,costMonth2:costMonth2,costMonth3:costMonth3,costMonth4:costMonth4,costMonth5:costMonth5,costMonth6:costMonth6,costMonth7:costMonth7,costMonth8:costMonth8,costMonth9:costMonth9,costMonth10:costMonth10,costMonth11:costMonth11,costMonth12:costMonth12})
                            })
                            let arr = [{}]
                            console.log(data)
                            data.forEach(item=>{
                                let obj = {}
                                obj.deptName = item.deptName
                                obj.wbsCode = item.wbsCode
                                obj.tbProjectName = item.tbProjectName
                                obj.wbsTypeName = item.wbsTypeName
                                obj.managerName = item.managerName
                                obj.costSubTotal = item.costSubTotal
                                obj.incomeSubTotal = item.incomeSubTotal
                                obj.incomeYearTotal = item.incomeYearTotal
                                obj.costYearTotal = item.costYearTotal
                                obj.incomeQ1 = item.incomeQ1
                                obj.costQ1 = item.costQ1
                                obj.incomeQ2 = item.incomeQ2
                                obj.costQ2 = item.costQ2
                                obj.incomeQ3 = item.incomeQ3
                                obj.costQ3 = item.costQ3
                                obj.incomeQ4 = item.incomeQ4
                                obj.costQ4 = item.costQ4
                                obj.incomeMonth1 = item.incomeMonth1
                                obj.costMonth1 = item.costMonth1
                                obj.incomeMonth2 = item.incomeMonth2
                                obj.costMonth2 = item.costMonth2
                                obj.incomeMonth3 = item.incomeMonth3
                                obj.costMonth3 = item.costMonth3
                                obj.incomeMonth4 = item.incomeMonth4
                                obj.costMonth4 = item.costMonth4
                                obj.incomeMonth5 = item.incomeMonth5
                                obj.costMonth5 = item.costMonth5
                                obj.incomeMonth6 = item.incomeMonth6
                                obj.costMonth6 = item.costMonth6
                                obj.incomeMonth7 = item.incomeMonth7
                                obj.costMonth7 = item.costMonth7
                                obj.incomeMonth8 = item.incomeMonth8
                                obj.costMonth8 = item.costMonth8
                                obj.incomeMonth9 = item.incomeMonth9
                                obj.costMonth9 = item.costMonth9
                                obj.incomeMonth10 = item.incomeMonth10
                                obj.costMonth10 = item.costMonth10
                                obj.incomeMonth11 = item.incomeMonth11
                                obj.costMonth11 = item.costMonth11
                                obj.incomeMonth12 = item.incomeMonth12
                                obj.costMonth12 = item.costMonth12
                                arr.push(obj)
                            })
                            JSONToExcelConvertor(arr,this.years[this.i]+'年运营计划',['项目所属部门','WBS编号','WBS名称','WBS类型','项目经理','项目总成本','项目总收入','年度计划收入','年度计划成本','Q1收入','Q1成本','Q2收入','Q2成本','Q3收入','Q3成本','Q4收入','Q4成本','1月收入','1月成本','2月收入','2月成本','3月收入','3月成本','4月收入','4月成本','5月收入','5月成本','6月收入','6月成本','7月收入','7月成本','8月收入','8月成本','9月收入','9月成本','10月收入','10月成本','11月收入','11月成本','12月收入','12月成本'])
                        }else{
                            this.fullscreenLoading = false
                            this.$message.error('当前暂无数据导出');
                        }
                    }else{
                        this.fullscreenLoading = false
                        this.$message.error('当前暂无数据导出');
                    }
                })
                }else{
                    this.fullscreenLoading = false
                    this.$message.error('当前暂无数据导出');
                }
                
            })
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
        // this.axio(this.input1.join(','),this.input2.join(','),this.input3,this.input4,this.input5,this.years[this.i],this.page,this.row,this.input6.join(','))
    },
    mounted(){

    }
}
</script>
<style>
body .el-table th.gutter {
    display: table-cell !important
}
.box-content-top .el-cascader{
    width: 60%;
    height: 28px;
    display:flex;
    align-items: center;
}
.el-cascader>.el-input>.el-input__inner{
    width: 100%;
    height: 28px;
    padding-left: 15px;
    border: 1px solid #f2f2f2;
    border-radius: 1px;
    font-size: 12px;
    display:flex;
    align-items: center;
}
.el-tooltip{
    width:auto !important;
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
.dateYears{
    display: flex;
    justify-content: space-between;
    padding-right:95px;
    align-items: center;
}
.dateYears>div:nth-child(2){
    display: flex;
}
.dateYear {
  height: 28px;
  display: flex;
  margin-bottom:20px;
  margin-left:10px;
}
.dateYear-left {
  width: 20px;
  height: 28px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(221, 221, 221, 1);
  margin: 0 10px;
  line-height: 28px;
  text-align: center;
  cursor:pointer;
}
.dateYear-left > img {
  width: 10px;
  height: 12px;
  cursor:pointer;
}
.plan {
  min-width: 1000px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0px 0 20px 20px;
}
.plan > span {
  width: auto;
  font-size: 14px;
  font-family: PingFangSC;
  font-weight: 600;
  color: rgba(102, 102, 102, 1);
  border-right: 1px solid rgba(221, 221, 221, 1);
  display: inline-block;
  line-height: 15px;
  padding: 0 5px 0 0;
}
.plan > div {
  width: auto;
  display: flex;
  font-size: 14px;
  font-family: PingFangSC;
  font-weight: 400;
  line-height: 15px;
  color: rgba(102, 102, 102, 1);
  padding: 0 5px;
}
.plan > div > span {
  height: 15px;
  color: #ffaa00;
  border-right: 1px solid rgba(221, 221, 221, 1);
  padding-right: 5px;
}
.action {
  border: 1px solid #10a3ff;
  color: #10a3ff;
  width: 84px;
  height: 28px;
  background: rgba(255, 255, 255, 1);
  font-size: 12px;
  font-family: PingFangSC;
  font-weight: 400;
  line-height: 28px;
  text-align: center;
  cursor:pointer;
}
.years {
  width: 84px;
  height: 28px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(221, 221, 221, 1);
  font-size: 12px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 28px;
  text-align: center;
  cursor:pointer;
}
.box_bottom{
    display: flex;
    justify-content: flex-end;
}
.btn{
    margin-left: 20px;
    width:80px;
    height:28px;
    background:rgba(16,163,255,1);
    border-radius:1px;
    font-size:12px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
    border:0;
}
.btns{
    width:80px;
    height:28px;
    background:#515a6e;
    border-radius:1px;
    font-size:12px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:#000;
    border:0;
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
.dateYears .put{
    width:80px;
    height:28px;
    border-radius:1px;
    font-size:12px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgb(54, 54, 54);
    border:0;
    margin-left: 20px;
    display: flex;
    justify-content: center;
    /* align-items: center; */
    line-height:5px;
    background:#ddd;
}
.box-content-top .put:hover{
    background:#ddd;
    color:rgb(54, 54, 54);
}
.put_2{
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