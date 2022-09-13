<template>
  <div class="app-container">
    <div class="actions-container">
      <el-input v-model="userSearch" placeholder="请输入用户名" size="small" style="width: 240px; margin-right: 10px;"></el-input>
      <el-button type="primary" size="small" icon="el-icon-search" @click="handelFilter">搜索</el-button>
      <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAddDialog">新增</el-button>
    </div>
    <el-table v-loading="listLoading" :data="infoData" border fit stripe>
      <el-table-column align="center" label="序号" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.userId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="邮箱">
        <template slot-scope="scope">
          <span>{{ scope.row.useremail }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="电话">
        <template slot-scope="scope">
          <span>{{ scope.row.usertel }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色">
        <template slot-scope="scope">
          <span>{{ scope.row.userrole}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" active-color="#13ce66" inactive-color="#ff4949" @change="handleChangeStatus(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="320">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEditDialog(scope.row)">
            编辑
          </el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(scope.row)">
            删除
          </el-button>
          <el-button type="warning" size="mini" icon="el-icon-delete" @click="handleEditRole(scope.row)">
            修改角色
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="editAction ? '修改用户' : '新增用户'" :visible.sync="dialogVisible" width="80%">
      <el-form ref="form" :rules="userRules" :model="userForm" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input :disabled="editAction" size="small" v-model="userForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userpassword" v-show="!editAction">
          <el-input size="small" type="password" v-model="userForm.userpassword" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="useremail">
          <el-input size="small" v-model="userForm.useremail" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="usertel">
          <el-input size="small" v-model="userForm.usertel" placeholder="请输入手机号"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button v-show="!editAction" type="primary" @click="handleAdd">确 定</el-button>
        <el-button v-show="editAction" type="primary" @click="handleEdit">确 定</el-button>
      </span>
    </el-dialog>
    <pagination :total="list.length" :currentPage="listQuery.page" :pageSize="listQuery.limit"
      @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" />
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { RegExpEmail, RegExpTel } from '@/utils/validator.js'
export default {
  name: 'UserList',
  data() {
    let validatorEmail = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入邮箱'))
      } else {
        if (RegExpEmail(value)) {
          callback()
        } else {
          callback(new Error('邮箱格式错误'))
        }
      }
    }
    let validatorTel = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入手机号'))
      } else {
        if (RegExpTel(value)) {
          callback()
        } else {
          callback(new Error('手机号格式错误'))
        }
      }
    }
    return {
      userSearch: '',
      list: [],
      editAction: false,
      listLoading: false,
      dialogVisible: false,
      listQuery: {
        page: 1,
        limit: 10
      },
      userForm: {
        userId: '',
        username: '',
        userpassword: '',
        useremail: '',
        usertel: '',
        userrole: '超级管理员',
        status: '开'
      },
      userRules: {
        // username: [
        //   { required: true, message: '请输入用户名', trigger: 'blur' },
        //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        // ],
        // userpassword: [
        //   { required: true, message: '请输入密码', trigger: 'blur' },
        //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        // ],
        // useremail: [
        //   { required: true, trigger: 'blur', validator: validatorEmail },
        // ],
        // usertel: [
        //   { required: true, trigger: 'blur', validator: validatorTel },
        // ],
      }
    }
  },
  computed: {
    ...mapState({
      userList: state => state.data.userList
    }),
    infoData() {
      return this.list.slice((this.listQuery.page - 1) * this.listQuery.limit, this.listQuery.limit * this.listQuery.page)
    }
  },
  filters: {

  },
  created() {
    this.getList()
  },
  methods: {
    ...mapActions(['data/addUserList', 'data/editUserList', 'data/delUserList', 'data/changeUserRole']),
    handelFilter() {
      if(this.userSearch.trim().length !== 0) {
        this.list = this.userList.filter(item => {
          return item.username.indexOf(this.userSearch) != -1
        })
      } else {
        this.list = this.userList
      }
    },
    handleChangeStatus(row) {
      this['data/changeUserRole'](row)
    },
    handleEditRole(row) {

    },
    handleAddDialog() {
      this.editAction = false
      this.dialogVisible = true
      this.userForm = {
        userId: '',
        username: '',
        userpassword: '',
        useremail: '',
        usertel: '',
        userrole: '超级管理员',
        status: true
      }
    },
    handleAdd() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.userForm.userId = this.list.length + 1
          this['data/addUserList'](this.userForm)
          this.dialogVisible = false
          this.getList()
        }
      })
    },
    handleEditDialog(row) {
      this.editAction = true
      this.userForm = row
      this.dialogVisible = true
    },
    handleEdit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this['data/editUserList'](this.userForm)
          this.dialogVisible = false
          this.getList()
        }
      })
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this['data/delUserList'](row)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    getList() {
      this.listLoading = true
      setTimeout(() => {
        this.listLoading = false
        this.list = Object.assign([], this.userList)
      }, 300);
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
    },
    handleSizeChange(val) {
      this.listQuery.page = 1
      this.listQuery.limit = val
    }
  }
}
</script>
<style lang="scss" scoped>
.actions-container {
  padding-bottom: 20px;
}
</style>