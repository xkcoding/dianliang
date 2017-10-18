<template>
  <div class="page">
    <v-header :title="head"></v-header>
    <div class="content-wrapper">
      <div class="content">
        <div class="map-wrapper">
          <heatmap v-if="heatMapData" :datas="heatMapData"></heatmap>
        </div>
      </div>
      <div class="fd-content">
        <bulletin :province="province"></bulletin>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from 'components/header/header'
  import bulletin from 'components/bulletin/bulletin'

  export default {
    name: 'province',
    components: {
      'v-header': header,
      bulletin
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
  @import "./province.styl"
</style>
