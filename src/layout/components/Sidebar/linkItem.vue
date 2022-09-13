<template>
  <div>
    <template v-if="icons">
      <template v-if="!sidebar.opened && isNest">
        <el-tooltip :content="title" placement="right">
          <svg-icon :icon-class="icons" />
        </el-tooltip>
      </template>
      <template v-else>
        <svg-icon :icon-class="icons" />
      </template>
    </template>
    <template v-if="title">
      <span>{{ title }}</span>
    </template>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'LinkItem',
  props: {
    title: {
      type: String,
      default: ''
    },
    icons: {
      type: String,
      default: ''
    },
    isNest: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters(['sidebar']),
  }
}
</script>