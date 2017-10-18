<template>
  <div class="page">
    <v-header :head="head"></v-header>
    <div class="content-wrapper">
      <div class="content">
        <div class="map-wrapper">
          <heatmap v-if="heatMapData" :datas="heatMapData"></heatmap>
        </div>
      </div>
      <div class="fd-content">
        <bulletin></bulletin>
      </div>
    </div>
    <div class="toggle-wrapper">
      <div class="to-heatmap" @click="toHeatMap">
        <Icon type="earth"></Icon>
        切换到热力图
      </div>
      <div class="to-classic" @click="toClassic">
        <Icon type="stats-bars"></Icon>
        切换到经典模式
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from 'components/header/header'
  import bulletin from 'components/bulletin/bulletin'
  import heatmap from 'components/map/heatmap'
  import bar from 'components/bar/bar'
  import line from 'components/line/line'

  const STATUS_CODE = 200
  const BASE_URL = 'http://localhost:8080'
  export default {
    name: 'DL',
    data () {
      return {
        head: '龙源电力',
        heatMapData: [],
        barData: null,
        lineData: null,
        date: ''
      }
    },
    methods: {
      toHeatMap () {
        window.location.href = '../../../index.html'
      },
      toClassic () {
        window.location.href = 'classic-index.html'
      },
      getToday () {
        return this.$moment().format('YYYY-MM-DD')
      },
      __bindAction () {
        this.$root.eventHub.$on('changeProvince', (val) => {
          this.head = val === '全国' ? '龙源电力' : val
          this.date = this.getToday()
          this.$http.get('http://localhost:8080/wpps/dianliang/heatmap/' + val + '?from=' + this.date).then((res) => {
            if (res.status === STATUS_CODE) {
              this.heatMapData = res.data
            }
          })
          this.$http.get('http://localhost:8080/wpps/dianliang/bar/' + val + '?from=' + this.date).then((res) => {
            if (res.status === STATUS_CODE) {
              this.barData = res.data
            }
          })
          this.$http.get('http://localhost:8080/wpps/dianliang/line/' + val + '?from=' + this.date).then((res) => {
            if (res.status === STATUS_CODE) {
              this.lineData = res.data
            }
          })
        })
        this.$root.eventHub.$on('changeDate', (val) => {
          this.date = val.name
          this.$http.get('http://localhost:8080/wpps/dianliang/heatmap/' + val.seriesName + '?from=' + this.date).then((res) => {
            if (res.status === STATUS_CODE) {
              this.heatMapData = res.data
            }
          })
          this.$http.get('http://localhost:8080/wpps/dianliang/line/' + val.seriesName + '?from=' + this.date).then((res) => {
            if (res.status === STATUS_CODE) {
              this.lineData = res.data
            }
          })
        })
      },
      __init () {
        let width = this.$jquery(document).width()
        let height = this.$jquery(document).height()
        this.$jquery('body').css('width', width)
        this.$jquery('body').css('height', height)
        this.$Message.config({
          top: height / 5,
          duration: 3
        })
        this.date = this.getToday()
      }
    },
    mounted () {
      this.__init()
      this.__bindAction()
      this.$http.get(BASE_URL + '/wpps/dianliang/heatmap/全国?from=' + this.date).then((res) => {
        if (res.status === STATUS_CODE) {
          this.heatMapData = res.data
        }
      })
//      this.$http.get(BASE_URL + '/wpps/dianliang/bar/全国?from=' + this.date).then((res) => {
//        if (res.status === STATUS_CODE) {
//          this.barData = res.data
//        }
//      })
//      this.$http.get(BASE_URL + '/wpps/dianliang/line/全国?from=' + this.date).then((res) => {
//        if (res.status === STATUS_CODE) {
//          this.lineData = res.data
//        }
//      })
    },
    components: {
      'v-header': header,
      bulletin,
      heatmap,
      bar,
      'v-line': line
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./index.styl"
</style>
