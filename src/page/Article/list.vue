<template>
  <div class="app-container">
    <el-table v-loading="listLoading"
    :data="list.slice((this.listQuery.page-1)*this.listQuery.limit,this.listQuery.limit*this.listQuery.page)"
    border fit stripe >
      <el-table-column align="center" label="编号" width="80">
        <template slot-scope="scope">
          <span>{{ (scope.$index + 1 ) + listQuery.limit * (listQuery.page - 1) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="书籍名称">
        <template slot-scope="scope">
          <span>{{ scope.row.bookName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="书籍价格">
        <template slot-scope="scope">
          <span>{{ scope.row.bookPrice }}元</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="作者">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status">
            {{ scope.row.status | statusFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="时间">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="240">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit">
            编辑
          </el-button>
          <el-button type="danger" size="small" icon="el-icon-delete">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="list.length"
      :currentPage="listQuery.page"
      :pageSize="listQuery.limit"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
      />
  </div>
</template>
<script>
export default {
  name: 'ArticleList',
  data() {
    return {
      list: [],
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: '发布成功',
        info: '发布中',
        danger: '发布失败'
      }
      return statusMap[status]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      setTimeout(() => {
        this.listLoading = false
        this.list = [
        { bookName: '三国演义', bookPrice: 200, author: '周树人', status: 'success', timestamp: new Date().toLocaleString() },
      ]
      this.list = new Array(20).fill(...this.list)
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
</style>