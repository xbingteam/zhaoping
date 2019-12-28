<template>
  <div class="recruiting">
    <div class="searchDiv">
     <el-dropdown>
       <el-select @change="employmentChange" size="mini" v-model="employment" clearable placeholder="职位类型">
        <el-option
          v-for="item in employmentData"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        ></el-option>
      </el-select>
    </el-dropdown>

    </div>
    <!-- 表格 -->
    <div class="tableDiv">
    <el-table
  
        :data="employmentList"
        tooltip-effect="dark"
        style="width: 100%;"
      >
      <el-table-column align="center" type="selection" width="55"></el-table-column>
      <el-table-column prop="title" label="招聘标题"></el-table-column>
      <el-table-column prop="contactName" label="发布人"></el-table-column>
      <el-table-column prop="contactPhone" label="联系方式"></el-table-column>
      <el-table-column prop="job" label="职位"></el-table-column>
      <el-table-column prop="publishTime" label="发布时间"></el-table-column>
      <el-table-column align="center" label="详情" >
          <template >
            <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
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
      <div class="btnDiv">
        <el-button @click="toBatchDelete" size="mini" type="danger" plain>批量删除</el-button>
      </div>
      <!-- 页面交换 -->
      <div class="pageDiv" style="float:right;">
           <el-pagination
           :page-size="pageSize"
           :current-page.sync="currentPage"
              background
              layout="prev, pager, next"
              :total="employmentData.length">
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
   <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
    
    <!-- 修改模态框 -->
    <el-dialog title="修改招聘信息" :visible.sync="editVisible" width="50%">
  <el-form :model="currentBus">
    <el-row>
      <el-col :span="12"><div class="grid-content bg-purple"><el-form-item label="兼职名称" :label-width="formLabelWidth">
      <el-input v-model="currentBus.name" ></el-input>
    </el-form-item></div></el-col>
    </el-row>
  <el-row :gutter="20" >
          <el-col :span="12"><div class="grid-content bg-purple-light"><el-form-item label="选择工种" :label-width="formLabelWidth">
        <el-row >
    <el-select @change="dialogProChange" v-model="currentBus.employment" placeholder="请选择活动区域">
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
      <el-col :span="24"><div class="grid-content bg-purple"><el-form-item label="职位标签" :label-width="formLabelWidth">
      <el-input v-model="currentBus.name" ></el-input>
    </el-form-item></div></el-col>
    </el-row>

    <el-row>
      <el-col :span="12"><div class="grid-content bg-purple"><el-form-item label="招聘时长" :label-width="formLabelWidth">
      <el-input v-model="currentBus.name" ></el-input>
    </el-form-item></div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><el-form-item label="工作时间" :label-width="formLabelWidth">
      <el-input v-model="currentBus.name" ></el-input>
    </el-form-item></div></el-col>
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
      // employmentList:[],
      //招聘数据
      employmenttypeData:[],
      employmentData: [],
      pageSize:config.pageSize,
    };
  },
  computed: {
    employmentList(){
      let temp = [...this.employmentData];
      let page = this.currentPage;
      let pageSize = config.pageSize;
      return temp.slice((page-1)*pageSize,page*pageSize)
    }
  },
  methods: {
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
                this.findAllBus();
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
        this.employmentData = res.data;
      } catch (error) {
        config.errorMsg(this, "查找错误");
      }
    },
    // 职业发生改变
    async employmentChange(val) {
      if (val) {
        try {
          let res = await findEmploymentByJob({ employment: val });
          this.employmentData = res.data;
          this.currentPage = 1;
        } catch (error) {
          config.errorMsg(this, "通过省份查找商家信息错误");
        }
      } else {
        this.findAllEmp();
      }
    },
    //模态框
     handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
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
      console.log(val);
    
    },
    // 查找所有招聘信息
    async findAllEmp() {
      try {
        let res = await findAllEmployment();
        this.employmentData = res.data.reverse();
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
  </style>