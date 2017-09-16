<template>
  <div class="lineChart">
    <div class="main"></div>
  </div>
</template>

<script>
  import echarts from 'echarts'

  const STATUS_CODE = 200
  export default {
    data () {
      return {
        date: this.getToday(),
        line: null,
        province: '全国'
      }
    },
    methods: {
      getToday () {
        return this.$moment().format('YYYY-MM-DD')
      },
      paintLine () {
        let options = this._getOptions(this.datas)
        this._initLine(options)
      },
      _getOptions (datas) {
        return {
          title: {
            text: this.date + this.province + '预测发电量',
            left: 'auto',
            textStyle: {
              color: '#fff',
              fontWeight: 100
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            show: false
          },
          toolbox: {
            show: false
          },
          color: ['#ff8f23'],
          calculable: true,
          xAxis: [{
            name: '时刻',
            type: 'category',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            nameTextStyle: {
              color: 'rgba(255, 255, 255, 0.69)'
            },
            axisLabel: {
              textStyle: {
                color: 'white'
              }
            },
            data: this.datas.time
          }],
          yAxis: [{
            min: 0,
            max: 50,
            axisLine: {
              show: false
            },
            nameLocation: 'end',
            nameGap: 20,
            nameRotate: 0,
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: ['rgba(230, 230, 230, 0.2)']
              }
            },
            axisLabel: {
              textStyle: {
                color: 'white',
                fontSize: 14
              }
            },
            name: '(功率/MW)',
            type: 'value',
            nameTextStyle: {
              color: 'rgba(255, 255, 255, 0.69)'
            }
          }],
          series: [{
            name: '标签1',
            type: 'line',
            stack: '总量',
            smooth: true,
            data: this.datas.data
          }]
        }
      },
      _initLine (options) {
        this.$jquery('.lineChart .main').empty()
        if (this.line) {
          this.line.dispose()
        }
        // 基于准备好的dom，初始化echarts实例
        this.line = echarts.init(this.$jquery('.lineChart .main')[0])
        this.line.setOption(options)
        window.addEventListener('resize', function () {
          this.line.resize()
        }.bind(this))
      },
      _getLine () {
        this.paintLine()
      }
    },
    components: {},
    mounted () {
      this.$root.eventHub.$on('changeProvince', (val) => {
        this.province = val
        this.date = this.getToday()
        this._getLine()
      })
      this.$root.eventHub.$on('changeDate', (val) => {
        this.date = val.name
        this._getLine()
      })
      this.$http.get('static/data/line/testData.json').then((res) => {
        if (res.status === STATUS_CODE) {
          this.datas = res.data
          this._getLine()
        }
      })
    }
  }
</script>

<style lang="stylus" scoped>
  .lineChart
    height 280px
    .main
      width 100%
      height 100%
</style>
