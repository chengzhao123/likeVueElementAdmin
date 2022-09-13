<template>
  <div class="dashboard-editor-container">
    <h1 class="editor_title">欢迎光临</h1>
  </div>
</template>
<script>
export default {
  name: 'EditorDashBoard',
  data() {
    return {
      
    }
  },
  mounted() {
    
  }
}
</script>
<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  min-height: calc(100vh - 50px);
  background: url('../../../assets/bg.png') no-repeat;
  background-size: cover;
  background-position: center 0;

  .editor_title {
    text-align: center;
  }
}
</style>