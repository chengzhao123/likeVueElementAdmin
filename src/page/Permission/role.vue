<template>
  <div class="app-container">
    <div>你的权限{{ roles }}</div>
    <el-radio-group v-model="nowRole" @change="changeRole">
      <el-radio-button label="editor"></el-radio-button>
      <el-radio-button label="admin"></el-radio-button>
    </el-radio-group>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Role',
  data() {
    return {
      nowRole: ''
    }
  },
  computed: {
    ...mapGetters(['roles'])
  },
  mounted() {
    if(this.roles.includes('admin')) {
      this.nowRole = 'admin'
    } else {
      this.nowRole = 'editor'
    }
  },
  methods: {
    async changeRole(val) {
      await this.$store.dispatch('user/changeRoles', [val])
    }
  }
}
</script>
<style lang="" scoped>
</style>