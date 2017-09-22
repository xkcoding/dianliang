<template>
  <div class="page">
    <div class="header-wrapper">
      <div class="logo">
        <img src="../images/logo.png" width="55" height="55" alt="logo">
      </div>
      <div class="logo-name">龙源电力集团股份有限公司</div>
      <div class="page-name">{{head}}-风电场功率预测电量管理平台</div>
    </div>
    <div class="fd-wrapper">
      <div class="fd-detail">
        <div class="detail">发电目标: <span class="highlight"><span class="number icon-">{{fdTarget}}</span>亿千瓦时</span>
        </div>
        <div class="detail">年累计完成: <span class="number icon-">{{fdTotal}}</span>亿千瓦时</div>
        <div class="detail-process">
          <Progress :percent="fdPercent" :stroke-width="5" status="success"><span class="process">{{fdPercent}}%</span>
          </Progress>
        </div>
      </div>
      <div class="fd-detail">
        <div class="detail">市场电量: <span class="highlight"><span class="number icon-">{{dlTarget}}</span>亿千瓦时</span>
        </div>
        <div class="detail">年累计完成: <span class="number icon-">{{dlTotal}}</span>亿千瓦时</div>
        <div class="detail-process">
          <Progress :percent="dlPercent" :stroke-width="5" status="success"><span class="process">{{dlPercent}}%</span>
          </Progress>
        </div>
      </div>
      <div class="fd-detail">
        <div class="detail">未来7天预测电量: <span class="highlight"><span class="number icon-">{{dlPredict}}</span>亿千瓦时</span>
        </div>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="content">
        <div class="map-wrapper">
          <heatmap v-if="heatMapData" :datas="heatMapData"></heatmap>
        </div>
      </div>
      <div class="content">
        <div class="chart-wrapper">
          <div class="chart">
            <div class="bar-wrapper">
              <bar v-if="barData" :datas="barData"></bar>
            </div>
          </div>
          <div class="chart">
            <div class="line-wrapper">
              <v-line v-if="lineData" :datas="lineData"></v-line>
            </div>
          </div>
        </div>
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
        dlPredict: '-',
        heatMapData: [],
        barData: null,
        lineData: null,
        date: ''
      }
    },
    computed: {
      fdTarget () {
        return 1234
      },
      fdTotal () {
        return 123
      },
      fdPercent () {
        if (!this.$lodash.isNumber(this.fdTarget) || !this.$lodash.isNumber(this.fdTotal)) {
          return 0
        }
        if (this.fdTotal > this.fdTarget) {
          return 100
        } else {
          return this.$lodash.round(this.fdTotal * 100 / this.fdTarget)
        }
      },
      dlTarget () {
        return 12
      },
      dlTotal () {
        return 1
      },
      dlPercent () {
        if (!this.$lodash.isNumber(this.dlTarget) || !this.$lodash.isNumber(this.dlTotal)) {
          return 0
        }
        if (this.dlTotal > this.dlTarget) {
          return 100
        } else {
          return this.$lodash.round(this.dlTotal * 100 / this.dlTarget)
        }
      }
    },
    methods: {
      toHeatMap () {
        window.location.href = 'index.html'
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
      this.$http.get(BASE_URL + '/wpps/dianliang/dlpredict').then((res) => {
        if (res.status === STATUS_CODE) {
          this.dlPredict = res.data
        } else {
          this.dlPredict = '-'
        }
      }).catch((err) => {
        if (err) {
          console.log(err)
        }
        this.dlPredict = '-'
      })
      this.$http.get(BASE_URL + '/wpps/dianliang/heatmap/全国?from=' + this.date).then((res) => {
        if (res.status === STATUS_CODE) {
          this.heatMapData = res.data
        }
      })
      this.$http.get(BASE_URL + '/wpps/dianliang/bar/全国?from=' + this.date).then((res) => {
        if (res.status === STATUS_CODE) {
          this.barData = res.data
        }
      })
      this.$http.get(BASE_URL + '/wpps/dianliang/line/全国?from=' + this.date).then((res) => {
        if (res.status === STATUS_CODE) {
          this.lineData = res.data
        }
      })
    },
    components: {
      heatmap,
      bar,
      'v-line': line
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .page
    color #fff
    .header-wrapper
      position relative
      width 99%
      height 84px
      top 8px
      margin-left 0.5%
      border 1px solid rgb(28, 125, 160)
      border-radius 5px
      box-shadow 1px 1px 10px 0 rgb(28, 125, 160)
      text-align center
      .logo
        position absolute
        top 1px
        left 3px
        width 72px
        height 72px
      .logo-name
        position absolute
        left 68px
        font-size 24px
        font-weight 500
        line-height 55px
      .page-name
        font-size 32px
        font-weight 500
        line-height 84px
    .fd-wrapper
      display flex
      margin 2% 2% 1.5% 2%
      .fd-detail
        flex 1
        height 100px
        margin-right 2%
        border 1px solid #fff
        &:last-child
          margin-right 0
        .detail
          margin-top 10px
          margin-left 10%
          font-size 16px
          .highlight
            color: #0df3fd
        .detail-process
          margin 1% 5% 0 10%
          .process
            color: #fff
    .content-wrapper
      display flex
      margin-left 2%
      margin-right 2%
      margin-bottom 2%
      .content
        flex 1
        height 500px
        .chart-wrapper
          display flex
          flex-direction column
          height 100%
          .chart
            flex 1
            margin-bottom 2%
            border 1px solid #fff
            &:last-child
              margin-bottom 0
            .bar-wrapper
              width 100%
              height 250px
            .line-wrapper
              width 100%
              height 250px
    .toggle-wrapper
      font-size 12px
      text-align center
      .to-heatmap
        position fixed
        cursor pointer
        top 40%
        left -105px
        width 120px
        height 30px
        background-color rgb(82, 173, 164)
        background-size 20px 20px
        background-position 8px 8px
        line-height 30px
        border-radius 15px
        z-index 9999
        &:hover
          margin-left 100px
      .to-classic
        position fixed
        cursor pointer
        top 46%
        left -105px
        width 120px
        height 30px
        background-color rgb(82, 173, 164)
        background-size 20px 20px
        background-position 8px 8px
        line-height 30px
        border-radius 15px
        z-index 9999
        &:hover
          margin-left 100px
</style>
