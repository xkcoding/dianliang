<template>
  <div class="pieChart">
    <div class="main"></div>
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    name: 'pie',
    data () {
      return {
        pie: null,
        province: '全国',
        datas: []
      }
    },
    methods: {
      getDatas () {
        this.datas = [
          {value: 335, name: '甘肃'},
          {value: 310, name: '陕西'},
          {value: 234, name: '福建'},
          {value: 135, name: '浙江'},
          {value: 1548, name: '新疆'}
        ]
      },
      paintPie () {
        let options = this._getOptions()
        this._initPie(options)
      },
      _getOptions () {
        return {
          title: {
            text: this.province + '明日TOP5预测发电量',
            left: 'center',
            textStyle: {
              color: '#ffffff',
              fontWeight: 'normal',
              fontSize: 14
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a}<br>{b} : {c} MWh ({d}%)'
          },
          series: [
            {
              name: '明日预测发电量',
              type: 'pie',
              radius: '80%',
              center: ['50%', '55%'],
              data: this.datas,
              label: {
                normal: {
                  show: true,
                  position: 'inside',
                  textStyle: {
                    color: 'white',
                    fontSize: 10,
                    fontWeight: 'normal'
                  }
                }
              },
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ],
          color: ['#3379a6', '#31a79b', '#a5882f', '#2c891a', '#a7b03d', '#c7b5c8']
        }
      },
      _initPie (options) {
        this.pie.setOption(options)
        window.addEventListener('resize', function () {
          this.pie.resize()
        }.bind(this))
      },
      _getPie () {
        this.paintPie()
      },
      __bindAction () {
        this.$root.eventHub.$on('changeProvince', (val) => {
          this.province = val
          this._getPie()
        })
      },
      __init () {
        this.$jquery('.pieChart .main').empty()
        if (this.pie) {
          this.pie.dispose()
        }
        // 基于准备好的dom，初始化echarts实例
        this.pie = echarts.init(this.$jquery('.pieChart .main')[0])
      }
    },
    components: {},
    mounted () {
      this.getDatas()
      this.__init()
      this.__bindAction()
      this._getPie()
    },
    watch: {
      datas (val) {
        this._getPie()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./pie.styl"
</style>
