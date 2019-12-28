/*
 * @Author: liuyr 
 * 求职列表页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: weiyc
 * @Last Modified time: 2019-12-28 11:29:33
 */
<template>
  
  
  <div>
    <div class="btn">
       <el-button size="mini" type="primary" plain>待联系</el-button>
    </div>
     
<!-- {{emplData}} -->
       <el-table
    :data="jobList"
    tooltip-effect="dark"
    style="width: 100%"
    >
    <el-table-column
      prop="jobhunter.realname"
      label="求职者"
      align="center"
      >
    </el-table-column>
    <el-table-column
      prop="jobhunter.telephone"
      label="联系方式"
      align="center"
      >
    </el-table-column>
    <el-table-column
      prop="employmentId"
      label="求职岗位"
      align="center">
    </el-table-column>
    <el-table-column
      label="简历"
      align="center">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="toSee(scope.row)" >查看</el-button>
      </template>
    </el-table-column>
    <el-table-column
     label="申请时间" 
     prop="askTime"
     align="center"
      >
    </el-table-column>
  </el-table>
  <!-- 查看模态框 -->
<el-dialog :title="Jobhunter.realname" :visible.sync="dialogFormVisible" >
   <div class="seeDiv">
        <span>性别：</span>
        <!-- {{Jobhunter}} -->
        {{Jobhunter.gender}}
      </div>
      <div class="seeDiv">
        <span>最高学历：</span>
        {{Jobhunter.education}}
      </div>
      <div class="seeDiv">
        <span>出生年月：</span>
        {{Jobhunter.birth}}
      </div>
      <div class="seeDiv">
        <span>工作经验：</span>
        {{Jobhunter.workTime}}
      </div>     
</el-dialog>
<div class="pagi">
      <el-pagination
        @current-change="currentChange"
        :current-page.sync="currentPage"
        size="mini"
        background
        layout="prev, pager, next"
        :total="emplData.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { findAllJobhunter } from "@/api/jobhunter.js";
import { findAllEmploymentJobhunter,findAllWithJobhAndEmpl } from '@/api/employmentJobhunter.js';

export default {
  data() {
    return {
     
      //当前页
      currentPage: 1,
       
      dialogFormVisible: false,
      formLabelWidth: "120px",
      //扩展数据
      emplData:[],
      JobhunterData:[ ],
      Jobhunter:{
        realname:'',
        gender:'',
        birth:'',
        education:'',
        workTime:'',
      },

      EmploymentJobhunterData:[],
    
    };
  },
  computed: {
    jobList() {
      let temp = [...this.emplData];
      let pageSize = 10;
      let page = this.currentPage;
      return temp.slice((page - 1) * pageSize, page * pageSize);
    },
  },
  methods: {
      toSee(row){
        this.dialogFormVisible = true;
        this.Jobhunter = { ...row };
      },


    //获取信息
     async findAllwjae(){
        try{
          let res = await findAllWithJobhAndEmpl();
          this.emplData = res.data;
          
        }catch(err){
          config.errorMsg(this,'查找错误');
        }
    },


    currentChange(val) {
      //val是当前点击的页数
      this.currentPage = val;
    },
    //获取求职者数据
      async getJobhunterData(){
        try{
            let res = await findAllJobhunter(); 
            this.JobhunterData = res.data;
            
        }catch (err) {
              config.errorMsg(this,'查找错误');
            }
      },


      //
      //获取求职者数据
      async getEmploymentJobhunterData(){
        try{
            let res = await findAllEmploymentJobhunter(); 
            this.EmploymentJobhunterData = res.data;

        }catch (err) {
              config.errorMsg(this,'查找错误');
            }
      },
  },
  created() {
    this.getJobhunterData();
    this.getEmploymentJobhunterData();
    this.findAllwjae();

  },
  mounted() {}
};
</script>
<style scoped lang="scss">
  .pagi {
  float: right;
  margin-top: 10px;
  }
.btn{
  margin-top: 10px;
  float: left;
  margin-bottom: 10px;
}
.seeDiv {
  border-bottom: 1px solid #ccc;
  line-height: 30px;
  font-weight: bold;
  span {
    color: #777;
  }
}
</style>