<template>
  <div class="lineChart">
    <div class="main"></div>
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    props: {
      datas: {
        type: Object,
        default: function () {
          return null
        }
      }
    },
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
            name: '(电量/MWh)',
            type: 'value',
            nameTextStyle: {
              color: 'rgba(255, 255, 255, 0.69)'
            }
          }],
          series: [{
            name: '电量',
            type: 'line',
            stack: '总量',
            data: this.datas.data
          }]
        }
      },
      _initLine (options) {
        this.line.setOption(options)
        window.addEventListener('resize', function () {
          this.line.resize()
        }.bind(this))
      },
      _getLine () {
        this.paintLine()
      },
      __bindAction () {
        this.$root.eventHub.$on('changeProvince', (val) => {
          this.province = val
          this.date = this.getToday()
          this._getLine()
        })
        this.$root.eventHub.$on('changeDate', (val) => {
          this.date = val.name
          this._getLine()
        })
      },
      __init () {
        this.$jquery('.lineChart .main').empty()
        if (this.line) {
          this.line.dispose()
        }
        // 基于准备好的dom，初始化echarts实例
        this.line = echarts.init(this.$jquery('.lineChart .main')[0])
      }
    },
    components: {},
    mounted () {
      this.__init()
      this.__bindAction()
      this._getLine()
    },
    watch: {
      datas (val) {
        this._getLine()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "./line.styl"
</style>
