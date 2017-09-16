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
          <heatmap v-if="datas.length > 0" :datas="datas"></heatmap>
        </div>
      </div>
      <div class="content">
        <div class="chart-wrapper">
          <div class="chart">
            <div class="bar-wrapper">
              <bar v-if="datas.length > 0" :datas="datas"></bar>
            </div>
          </div>
          <div class="chart">
            <div class="line-wrapper">
              <v-line></v-line>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import heatmap from 'components/map/heatmap'
  import bar from 'components/bar/bar'
  import line from 'components/line/line'

  const STATUS_CODE = 200
  export default {
    name: 'DL',
    data () {
      return {
        head: '龙源电力',
        datas: []
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
      },
      dlPredict () {
        return 0.5
      }
    },
    methods: {
      __init () {
        let width = this.$jquery(document).width()
        let height = this.$jquery(document).height()
        this.$jquery('body').css('width', width)
        this.$jquery('body').css('height', height)
        this.$Message.config({
          top: height / 5,
          duration: 3
        })
      }
    },
    mounted () {
      this.__init()
      this.$http.get('/predict').then((res) => {
        if (res.status === STATUS_CODE) {
          this.datas = res.data.array
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
</style>
