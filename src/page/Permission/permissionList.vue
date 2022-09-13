<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="infoData" border fit stripe>
      <el-table-column align="center" label="序号" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.roleId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="权限名称">
        <template slot-scope="scope">
          <span>{{ scope.row.rolename }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="路径">
        <template slot-scope="scope">
          <span>{{ scope.row.rolepath }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="等级">
        <template slot-scope="scope">
          <el-tag :type="scope.row.rolelevel.indexOf('一') != -1 ? '' : 'success'">
            {{ scope.row.rolelevel }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="list.length" :currentPage="listQuery.page" :pageSize="listQuery.limit"
      @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'RoleList',
  data() {
    return {
      list: [],
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10
      },
    }
  },
  computed: {
    ...mapGetters(['permission_routes']),
    infoData() {
      return this.list.slice((this.listQuery.page - 1) * this.listQuery.limit, this.listQuery.limit * this.listQuery.page)
    },
    roleData() {
      let val = []
      this.permission_routes.forEach(item => {
        if (!item.hidden && item.meta) {
          if (item.children && item.children.length) {
            val.push({
              roleId: '',
              rolename: item.meta.title,
              rolepath: item.path,
              rolelevel: '一级'
            })
            item.children.forEach(items => {
              val.push({
                roleId: '',
                rolename: items.meta.title,
                rolepath: '/' + items.path,
                rolelevel: '二级'
              })
            })
          } else {
            val.push({
              roleId: '',
              rolename: item.meta.title,
              rolepath: item.path,
              rolelevel: '一级'
            })
          }
        }
      })
     val.forEach((item, index) => {
        item.roleId = index + 1
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
    getList() {
      this.listLoading = true
      setTimeout(() => {
        this.listLoading = false
        this.list = Object.assign([], this.roleData)
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