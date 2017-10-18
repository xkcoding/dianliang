<template>
  <div>
    <v-header :title="head"></v-header>
    chart page{{province}}
  </div>
</template>

<script type="text/ecmascript-6">
  import header from 'components/header/header'

  export default {
    name: 'chart',
    components: {
      'v-header': header
    },
    data () {
      return {
        head: '龙源电力',
        province: '全国'
      }
    },
    methods: {
      __init () {
        let province = this.$route.params.province
        if (province) {
          this.province = province
          if (province === '全国') {
            this.head = '龙源电力'
          } else {
            this.head = province
          }
        }
        console.log(province)
      }
    },
    mounted () {
      this.__init()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': '__init'
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./chart.styl"
</style>
