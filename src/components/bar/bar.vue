<template>
  <div class="barChart">
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
        bar: null,
        province: '全国'
      }
    },
    methods: {
      paintBar () {
        let options = this._getOptions()
        this._initBar(options)
        this.bar.on('click', (params) => {
          this.$root.eventHub.$emit('changeDate', params)
        })
      },
      _getOptions () {
        return {
          title: {
            text: this.province + '未来7天发电量预测',
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
          color: ['#63b3fc'],
          calculable: true,
          xAxis: [{
            name: '日期',
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
              interval: 0,
              textStyle: {
                color: 'white'
              }
            },
            data: this.datas.date
          }],
          yAxis: [{
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
          series: [
            {
              'itemStyle': {
                emphasis: {
                  color: '#ff8f23'
                }
              },
              'name': this.province,
              'type': 'bar',
              'data': this.datas.data,
              'barWidth': '40%'
            }
          ]

        }
      },
      _initBar (options) {
        this.bar.setOption(options)
        window.addEventListener('resize', function () {
          this.bar.resize()
        }.bind(this))
      },
      _getBar () {
        this.paintBar()
      },
      __bindAction () {
        this.$root.eventHub.$on('changeProvince', (val) => {
          this.province = val
          this._getBar()
        })
      },
      __init () {
        this.$jquery('.barChart .main').empty()
        if (this.bar) {
          this.bar.dispose()
        }
        // 基于准备好的dom，初始化echarts实例
        this.bar = echarts.init(this.$jquery('.barChart .main')[0])
      }
    },
    components: {},
    mounted () {
      this.__init()
      this.__bindAction()
      this._getBar()
    },
    watch: {
      datas (val) {
        this._getBar()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .barChart
    height 280px
    .main
      width 100%
      height 100%
</style>

