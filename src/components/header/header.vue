<template>
  <div class="header-wrapper">
    <div class="logo">
      <img src="../../images/logo.png" width="55" height="55" alt="logo">
    </div>
    <div class="logo-name">龙源电力集团股份有限公司</div>
    <div class="page-name">{{head}}-风电场功率预测电量管理平台</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'header',
    props: {
      head: {
        type: String,
        default: '龙源电力'
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./header.styl"
</style>
