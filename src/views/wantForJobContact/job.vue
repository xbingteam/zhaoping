/*
 * @Author: liuyr 
 * 求职列表页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: weiyc
 * @Last Modified time: 2019-12-28 20:39:27
 */
<template>
<div class="qiuzhi">
  <div class="main">
      <div class="btn">
       <el-button @click="toGuolv"  type="primary" plain>待联系</el-button>
      </div>
<!-- 表格 -->
  <div class="tabDiv">
    <el-table
    :header-cell-style="headClass"
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
  </div>
  <!-- 查看模态框 -->
<el-dialog :title="Jobhunter.jobhunter?Jobhunter.jobhunter.realname:''" :visible.sync="dialogFormVisible" >
  <el-row :gutter="20">
  <el-col :span="12">
 <div class="seeDiv">
        <span>性别：</span>
        <!-- {{Jobhunter}} -->
        {{Jobhunter.jobhunter?Jobhunter.jobhunter.gender:''}}
      </div>
  </el-col>
  <el-col :span="12"><div class="seeDiv">
        <span>最高学历：</span>
        {{Jobhunter.jobhunter?Jobhunter.jobhunter.education:''}}
      </div></el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="12"><div class="seeDiv">
        <span>出生年月：</span>
        {{Jobhunter.jobhunter?Jobhunter.jobhunter.birth:''}}
      </div></el-col>
  <el-col :span="12"><div class="seeDiv">
        <span>工作经验：</span>
        {{Jobhunter.jobhunter?Jobhunter.jobhunter.workTime:''}}
      </div> </el-col>
</el-row>
</el-dialog>

<!-- 分页 -->
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
</div>

</template>

<script>
import { findAllJobhunter } from "@/api/jobhunter.js";
import { findAllEmploymentJobhunter,findAllWithJobhAndEmpl } from '@/api/employmentJobhunter.js';
import config from '@/utils/config.js';

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
      let pageSize = config.pageSize;
      let page = this.currentPage;
      return temp.slice((page - 1) * pageSize, page * pageSize);
    },
  },
  methods: {
         // 表头样式设置
    headClass () {
      return 'background:#008080;color:#fff;height:50px;font-size:16px;'
    },

      toGuolv(){
          let res = this.emplData.filter(item => {
              return item.remark;
            });
          this.emplData = res;
         
     },

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
  margin-top: 3em;
  margin-bottom: 10px;
}
.seeDiv{
  padding: 10px;
}
.main{
  margin-left: 10%;
  margin-right:10%
}

.tabDiv{
  margin-top: 2em;
  width:100%;
  border: 2px solid #008080;
}
</style>