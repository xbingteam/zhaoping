<template>
  <div class="recruiting">
    <div class="searchDiv">
     <el-dropdown>
       <el-select @change="EmploymentChange(Employment)" size="mini" v-model="Employment" clearable placeholder="职位类型">
          <el-option
          v-for="item in EmploymentDataList"
          :key="item"
          :label="item"
          :value="item">
          </el-option>
      </el-select>
    </el-dropdown>
    </div>
    <!-- 表格 -->
    <div class="tableDiv">
    <el-table
        :data="EmploymentList"
        tooltip-effect="dark"
        style="width: 100%;"
        @selection-change="selectionChange"
        :header-cell-style="headClass"
      >
      <el-table-column align="center" type="selection" width="55"></el-table-column>
      <el-table-column prop="title" label="招聘标题"></el-table-column>
      <el-table-column prop="contactName" label="发布人"></el-table-column>
      <el-table-column prop="contactPhone" label="联系方式"></el-table-column>
      <el-table-column prop="job" label="职位"></el-table-column>
      <el-table-column prop="publishTime" label="发布时间"></el-table-column>
      <el-table-column align="center" label="详情">
          <template slot-scope="scope">
            <el-button @click="toSee(scope.row)" type="text" size="small">查看</el-button>
          </template>
      </el-table-column>
      <el-table-column  label="操作" width="100%">
        <template slot-scope="scope">
          <el-button @click="toEdit(scope.row.id)" type="text" size="mini">修改</el-button>
          <el-button @click="toDelete(scope.row.id)" type="text" size="mini">删除</el-button>
        </template>
      </el-table-column>
      </el-table>
    </div>
    <!-- foot -->
    <div style="">
      <div class="btnDiv" style="float:left;">
        <el-button @click="toBatchDelete" size="mini" type="danger" plain>批量删除</el-button>
      </div>
      <!-- 页面交换 -->
      <div class="pageDiv" style="float:right;">
           <el-pagination
              :page-size="pageSize"
              :current-page.sync="currentPage"
              background
              layout="prev, pager, next"
              :total="EmploymentData.length">
            </el-pagination>
        </div>
    </div> 
    <!-- 发布职位 -->
    <div style="position:absolute; right:20px; top:43px;">
      <el-row>
        <el-button type="primary" plain>发布职位</el-button>
        <el-button type="success" plain>导入职位</el-button>
      </el-row>
    </div>
    <!-- 详情 -->
    

    <!-- 模态框 -->
    <el-dialog :title="currentBus.name" :visible.sync="seeVisible">
      <div class="seeDiv">
        <span>行业类型：</span>
        {{currentBus.industry}}
      </div>
      <div class="seeDiv">
        <span>成立时间：</span>
        {{currentBus.establishedTime}}
      </div>
      <div class="seeDiv">
        <span>注册资本：</span>
        {{currentBus.registeredCapital}}
      </div>
      <div class="seeDiv">
        <span>公司规模：</span>
        {{currentBus.scale}}
      </div>
      <div class="descDiv">&nbsp;&nbsp;&nbsp;&nbsp;{{currentBus.description}}</div>
      <div class="imgDiv">
        <a :href="currentBus.businessLicense" target="_blank">
          <img :src="currentBus.businessLicense" alt width="200" height="150" />
        </a>
      </div>
    </el-dialog> 
                <!-- 修改模态框 -->
          <el-dialog title="修改招聘信息" :visible.sync="editVisible" width="50%">
              <el-form :model="currentBus">
                <el-row>
                  <el-col :span="12"><div class="grid-content bg-purple">
                    <el-form-item label="兼职名称" :label-width="formLabelWidth">
                      <el-input v-model="currentBus.name" ></el-input>
                    </el-form-item></div></el-col>
                </el-row>
                <el-row :gutter="20" >
                  <el-col :span="12"><div class="grid-content bg-purple-light"><el-form-item label="选择工种" :label-width="formLabelWidth">
                <el-row >
                <el-select @change="dialogProChange" v-model="currentBus.Employment" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
                    </el-row>
              </el-form-item></div></el-col>
                      <el-col :span="12">
                        <el-form-item prop="industry" label="招聘人数" :label-width="formLabelWidth" >
                          <el-input v-model="currentBus.industry" placeholder="请输入你要招聘的人数"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                <el-row>
                  <el-col :span="12"><div class="grid-content bg-purple"><el-form-item label="招聘公司" :label-width="formLabelWidth">
                  <el-input v-model="currentBus.name" placeholder="修改招聘公司"></el-input>
                </el-form-item></div></el-col>
                  <el-col :span="12"><div class="grid-content bg-purple"><el-form-item label="薪资水平" :label-width="formLabelWidth">
                  <el-input v-model="currentBus.name" placeholder="请输入薪资"></el-input>
                </el-form-item></div></el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple">
                      <el-form-item label="职位标签" :label-width="formLabelWidth">
                        <el-input v-model="currentBus.name" >
                        </el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <div class="grid-content bg-purple">
                      <el-form-item label="招聘时长" :label-width="formLabelWidth">
                          <el-input v-model="currentBus.name" >
                          </el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12"><div class="grid-content bg-purple">
                    <el-form-item label="工作时间" :label-width="formLabelWidth">
                      <el-input v-model="currentBus.name">

                      </el-input>
                    </el-form-item>
                  </div>
                </el-col>
                </el-row>
            <el-row>
              <el-col :span="24">
                        <el-form-item prop="location" label="职位描述" :label-width="formLabelWidth">
                          <el-input type="textarea" :rows="4" v-model="currentBus.location"></el-input>
                        </el-form-item>
                      </el-col>
            </el-row>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" plain>确定</el-button>
              </div>
</el-dialog>
  </div>
</template>

<script>
import { findAllEmployment } from "@/api/employment_wh.js";
import config from "@/utils/config.js";
import { deleteEmploymentById } from "@/api/employment_wh.js";
import { findEmploymentByTitle } from "@/api/employment_wh.js";
import { findEmploymentByJob } from "@/api/employment_wh.js";
export default {
  data() {
    return {
      Employment:"",
       dialogVisible: false,
      //当前查看或修改的对象
      currentBus: {},
      //修改模态框汉字宽度
      formLabelWidth:"100px",
      //当前查看的对象
      currentBus:'',
      //修改模态框修饰与否
      editVisible:false,
      //当前查看的对象
      currentEnp:'',
      seeVisible:false,
      currentPage: 1,
      //招聘列表
      // EmploymentList:[],
      //招聘数据
      EmploymentTypeData:[],
      EmploymentData: [],
      pageSize:config.pageSize,
      ids:[],
    };
  },
  computed: {
    //   toSee(row) {
    //   this.currentBus = { ...row };
    //   this.seeVisible = true;
    // },
    
    EmploymentList(){
      let temp = [...this.EmploymentData];
      let page = this.currentPage;
      let pageSize = config.pageSize;
      return temp.slice((page-1)*pageSize,page*pageSize)
    },
    EmploymentDataList(){
      let msg =[];
    this.EmploymentData.forEach(res=>{
      msg.push(res.job)
    });
    msg = [...new Set(msg)]
    console.log(msg)
    return msg;
    }
  },
  methods: {
    // 表头样式设置
    headClass () {
      return 'background:#008080;color:#fff;height:50px;font-size:16px;'
    },
    //去重
    
    //模态框工种发生改变
    async dialogProChange(val) {
      this.currentBus.city = "";
      try {
        let res = await findEmploymentByJob({ Employment: val });
        this.EmploymentData = res.data;
        } catch (error) {
        console.log(error);
        config.errorMsg(this, "查找工种失败");
      }
    },
    
    //批量删除
    toBatchDelete() {
      //获取要批量删除的id  this.id
      let ids = this.ids;
      console.log(ids);
      if (ids.length > 0) {
        this.$alert("是否删除？", "提示", {
          confirmButtonText: "删除",
          callback: action => {
            if (action === "confirm") {
              let result = [];
              ids.forEach(async id => {
                try {
                  let res = await deleteEmploymentById({ id: id });
                  result.push(res.status);
                } catch (error) {
                  result.push(500);
                }
              });
              setTimeout(() => {
                // console.log(result);
                //判断是否都是200
                let resu = result.every(item => {
                  return item === 200;
                });
                if (resu) {
                  config.successMsg(this, "批量删除成功");
                } else {
                  config.errorMsg(this, "批量删除失败");
                }
                this.findAllEmp();
              }, 2000);
            }
          }
        });
      } else {
        this.$message({
          message: "请选中要删除的数据",
          type: "warning"
        });
      }
    },
    //查找所有职业类型信息
    async findAllEmpType() {
      try {
        let res = await findEmploymentByJob();
        this.EmploymentTypeData = res.data;
      } catch (error) {
        console.log(error)
        config.errorMsg(this, "查找错误");
      }
    },
    // 职业发生改变
    async EmploymentChange(val) {
      if (val) {
        try {
          let res = await findEmploymentByJob({ job: val });
          this.EmploymentData = res.data;
          this.currentPage = 1;
        } catch (error) {
          config.errorMsg(this, "信息错误");
        }
      } else {
        this.findAllEmp();
      }
    },

    //查看
    toSee(row){
     this.currentEnp = {...row};
     this.seeVisible = ture;
    },
    //编辑
    toEdit(row){
      alert('编辑');
    },
    //页面发生转换
    pageChange(page){
      this.currentPage = page;
    },
    //复选框选中切换
    selectionChange(val) {
      //val 就是选中的对象组成的数组
      this.ids = val.map(item=>{return item.id});
    
    },
    // 查找所有招聘信息
    async findAllEmp() {
      try {
        let res = await findAllEmployment();
        this.EmploymentData = res.data.reverse();
      } catch (error) {
        console.log(error,'====')
        config.errorMsg(this, "查找错误");
      }
    },
    //编辑
    toEdit(row){
      this.currentBus = [...row];
      this.editVisible = true;
    },
    // 删除按钮
    toDelete(id) {
      //row代表当前要删除的city对象
      this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          //访问后台接口
          //try后面跟着catch
           try {
             console.log("555")
             console.log(id)
            let res = await deleteEmploymentById({id:id});
            console.log(res.status)
            if (res.status===200){
              config.successMsg(this,'删除成功');
            // config.log('删除成功');
              this.findAllEmp();
            }
            else{
              config.erroMsg(this,'删除失败');
              // config.log('删除失败');
            }
          
        }catch(error){
          config.erroMsg(this,'删除失败');
          // config.log('删除失败1');
        }
    })
    }

    },
    created() {
      this.findAllEmp();
      this.findAllEmpType();
    },
    mounted() {}
    };
  </script>
  <style lang="scss" scoped>
  .seeDiv {
    border-bottom: 1px solid #ccc;
    line-height: 30px;
    font-weight: bold;
    span {
      color: #777;
    }
  }
  .tableDiv{
  margin-top: 2em;
  width:100%;
  border: 2px solid #008080;
}

  </style>