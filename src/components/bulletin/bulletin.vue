<template>
  <div class="fd-wrapper">
    <div class="fd-detail">
      <div class="detail">年发电目标: <span class="highlight"><span
        class="number icon-">{{yearTarget}}</span>亿千瓦时</span>
      </div>
      <div class="detail">年累计完成: <span class="number icon-">{{yearTotal}}</span>亿千瓦时</div>
      <div class="detail-process">
        <Progress :percent="yearPercent" :stroke-width="5" status="success"><span
          class="process">{{yearPercent}}%</span>
        </Progress>
      </div>
    </div>
    <div class="fd-detail">
      <div class="detail">昨日预测电量: <span class="highlight"><span
        class="number icon-">{{yesterdayPredict}}</span>亿千瓦时</span>
      </div>
      <div class="detail">昨日实际电量: <span class="number icon-">{{yesterdayReal}}</span>亿千瓦时</div>
      <div class="detail-process">
        <Progress :percent="yesterdayPercent" :stroke-width="5" status="success"><span
          class="process">{{yesterdayPercent}}%</span>
        </Progress>
      </div>
    </div>
    <div class="fd-detail">
      <div class="detail">今日预测电量: <span class="highlight"><span
        class="number icon-">{{todayPredict}}</span>亿千瓦时</span>
      </div>
      <div class="detail">今日累计电量: <span class="number icon-">{{todayReal}}</span>亿千瓦时</div>
      <div class="detail-process">
        <Progress :percent="todayPercent" :stroke-width="5" status="success"><span
          class="process">{{todayPercent}}%</span>
        </Progress>
      </div>
    </div>
    <div class="fd-detail">
      <div class="detail">明日预测电量: <span class="highlight"><span
        class="number icon-">{{tomorrowPredict}}</span>亿千瓦时</span>
      </div>
    </div>
    <div class="fd-top">
      <pie></pie>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import pie from 'components/pie/pie'

  const STATUS_CODE = 200
  const BASE_URL = 'http://localhost:8080'
  export default {
    name: 'bulletin',
    components: {
      pie
    },
    data () {
      return {
        tomorrowPredict: '-'
      }
    },
    computed: {
      yearTarget () {
        return 1234
      },
      yearTotal () {
        return 123
      },
      yesterdayPredict () {
        return 12
      },
      yesterdayReal () {
        return 1
      },
      todayPredict () {
        return 12
      },
      todayReal () {
        return 1
      },
      yearPercent () {
        return this.calcPercent(this.yearTotal, this.yearTarget)
      },
      yesterdayPercent () {
        return this.calcPercent(this.yesterdayReal, this.yesterdayPredict)
      },
      todayPercent () {
        return this.calcPercent(this.todayReal, this.todayPredict)
      }
    },
    methods: {
      calcPercent (small, big) {
        if (!this.$lodash.isNumber(big) || !this.$lodash.isNumber(small)) {
          return 0
        }
        if (small > big) {
          return 100
        } else {
          return this.$lodash.round(small * 100 / big)
        }
      },
      getData () {
        this.$http.get(BASE_URL + '/wpps/dianliang/dlpredict').then((res) => {
          if (res.status === STATUS_CODE) {
            this.tomorrowPredict = res.data
          } else {
            this.tomorrowPredict = '-'
          }
        }).catch((err) => {
          if (err) {
            console.log(err)
          }
          this.tomorrowPredict = '-'
        })
      }
    },
    mounted () {
      this.getData()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./bulletin.styl"
</style>
