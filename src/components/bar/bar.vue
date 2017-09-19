<template>
  <div class="barChart" v-if="datas.length > 0">
    <div class="main"></div>
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    props: {
      datas: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data () {
      return {
        selfDatas: {
          date: [],
          data: []
        },
        bar: null,
        province: '全国'
      }
    },
    methods: {
      paintBar () {
        this.convertData()
        let options = this._getOptions(this.selfDatas)
        this._initBar(options)
        this.bar.on('click', (params) => {
          this.$root.eventHub.$emit('changeDate', params)
        })
      },
      convertData () {
        this.selfDatas.date = []
        this.selfDatas.data = []
        if (this.province === '全国') {
          this.datas.forEach((val) => {
            this.selfDatas.date.push(val.date)
            let total = 0
            val.data.forEach((data) => {
              total += data.value
            })
            this.selfDatas.data.push(total)
          })
        } else {
          this.datas.forEach((val) => {
            this.selfDatas.date.push(val.date)
            val.data.forEach((data) => {
              if (data.name === this.province) {
                this.selfDatas.data.push(data.value)
              }
            })
          })
        }
      },
      _getOptions (datas) {
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
            data: this.selfDatas.date
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
              'data': this.selfDatas.data,
              'barWidth': '40%'
            }
          ]

        }
      },
      _initBar (options) {
        this.$jquery('.barChart .main').empty()
        if (this.bar) {
          this.bar.dispose()
        }
        // 基于准备好的dom，初始化echarts实例
        this.bar = echarts.init(this.$jquery('.barChart .main')[0])
        this.bar.setOption(options)
        window.addEventListener('resize', function () {
          this.bar.resize()
        }.bind(this))
      },
      _getBar () {
        this.paintBar()
      }
    },
    components: {},
    mounted () {
      this.$root.eventHub.$on('changeProvince', (val) => {
        this.province = val
        this._getBar()
      })
      this._getBar()
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

