<template>
  <div class="app-container">
    <div class="actions-container">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAddDialog">添加角色</el-button>
    </div>
    <el-table v-loading="listLoading" :data="infoData" border fit stripe>
      <el-table-column align="center" label="序号" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.roleId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色名称">
        <template slot-scope="scope">
          <span>{{ scope.row.rolename }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色描述">
        <template slot-scope="scope">
          <span>{{ scope.row.roledesc }}</span>
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
            分配权限
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="editAction ? '修改角色' : '新增角色'" :visible.sync="dialogVisible" width="80%">
      <el-form ref="form" :rules="roleRules" :model="roleForm" label-width="80px">
        <el-form-item label="角色名称" prop="rolename">
          <el-input :disabled="editAction" size="small" v-model="roleForm.rolename" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roledesc">
          <el-input size="small" v-model="roleForm.roledesc" placeholder="请输入角色描述"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" prop="role">
          <el-tree
            :data="roleData"
            show-checkbox
            node-key="id"
            :props="defaultProps">
          </el-tree>
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
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: 'RoleList',
  data() {
    return {
      list: [],
      editAction: false,
      listLoading: false,
      dialogVisible: false,
      listQuery: {
        page: 1,
        limit: 10
      },
      defaultProps: {
          children: 'children',
          label: 'label'
        },
      roleForm: {
        userId: '',
        rolename: '',
        roledesc: '',
        role: []
      },
      roleRules: {
        rolename: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
        ],
        roledesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
        ],
      }
    }
  },
  computed: {
    ...mapState({
      roleList:  state => state.data.roleList,
    }),
    ...mapGetters(['permission_routes']),
    infoData() {
      return this.list.slice((this.listQuery.page - 1) * this.listQuery.limit, this.listQuery.limit * this.listQuery.page)
    },
    roleData() {
      let val = []
      this.permission_routes.forEach(item => {
        if(!item.hidden && item.meta) {
          if(item.children && item.children.length) {
              val.push({
                id: item.path,
                label: item.meta.title,
                children: []
              })
              item.children.forEach(items => {
                val[val.length -1].children.push({
                  id: items.path,
                  label: items.meta.title
                })
              })
          } else {
            val.push({
              id: item.path,
              label: item.meta.title
            })
          }
        }
      })
      return val
    }
  },
  filters: {

  },
  created() {
    this.getList()
  },
  methods: {
    ...mapActions(['data/addUserList', 'data/editUserList', 'data/delUserList', 'data/changeUserRole', 'data/addRoleList',
    'data/editRoleList', 'data/delRoleList'
    ]),
    handleChangeStatus(row) {
      this['data/changeUserRole'](row)
    },
    handleEditRole(row) {

    },
    handleAddDialog() {
      this.editAction = false
      this.dialogVisible = true
      this.roleForm = {
        roleId: '',
        rolename: '',
        roledesc: '',
        role:[]
      }
    },
    handleAdd() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.roleForm.roleId = this.list.length + 1
          this['data/addRoleList'](this.roleForm)
          this.dialogVisible = false
          this.getList()
        }
      })
    },
    handleEditDialog(row) {
      this.editAction = true
      this.roleForm = row
      this.dialogVisible = true
    },
    handleEdit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this['data/editRoleList'](this.roleForm)
          this.dialogVisible = false
          this.getList()
        }
      })
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this['data/delRoleList'](row)
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
        this.list = Object.assign([], this.roleList)
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