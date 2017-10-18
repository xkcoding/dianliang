<template>
  <div class="mapChart">
    <div class="main"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import echarts from 'echarts'
  import 'echarts/map/js/china'
  import 'echarts/map/js/province/anhui'
  import 'echarts/map/js/province/aomen'
  import 'echarts/map/js/province/beijing'
  import 'echarts/map/js/province/chongqing'
  import 'echarts/map/js/province/fujian'
  import 'echarts/map/js/province/gansu'
  import 'echarts/map/js/province/guangdong'
  import 'echarts/map/js/province/guangxi'
  import 'echarts/map/js/province/guizhou'
  import 'echarts/map/js/province/hainan'
  import 'echarts/map/js/province/hebei'
  import 'echarts/map/js/province/heilongjiang'
  import 'echarts/map/js/province/henan'
  import 'echarts/map/js/province/hubei'
  import 'echarts/map/js/province/hunan'
  import 'echarts/map/js/province/jiangsu'
  import 'echarts/map/js/province/jiangxi'
  import 'echarts/map/js/province/jilin'
  import 'echarts/map/js/province/liaoning'
  import 'echarts/map/js/province/neimenggu'
  import 'echarts/map/js/province/ningxia'
  import 'echarts/map/js/province/qinghai'
  import 'echarts/map/js/province/shandong'
  import 'echarts/map/js/province/shanghai'
  import 'echarts/map/js/province/shanxi'
  import 'echarts/map/js/province/shanxi1'
  import 'echarts/map/js/province/sichuan'
  import 'echarts/map/js/province/taiwan'
  import 'echarts/map/js/province/tianjin'
  import 'echarts/map/js/province/xianggang'
  import 'echarts/map/js/province/xinjiang'
  import 'echarts/map/js/province/xizang'
  import 'echarts/map/js/province/yunnan'
  import 'echarts/map/js/province/zhejiang'

  export default {
    name: 'heatmap',
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
        map: null,
        province: 'china',
        date: ''
      }
    },
    methods: {
      getToday () {
        return this.$moment().format('YYYY-MM-DD')
      },
      paintMap () {
        let options = this._getOptions(this.province, this.datas)
        this._initMap(options)
        this.map.on('click', (param) => {
          this.date = this.getToday()
          if (this.province === 'china') {
            let name = this.$lodash.result(this.$lodash.find(this.datas, function (chr) {
              return chr.name === param.name
            }), 'name')
            if (param.name === name) {
              this.province = param.name
              this.paintMap()
              this.$root.eventHub.$emit('changeProvince', param.name)
            } else {
              this.$Message.info(param.name + '省暂时没有风场数据')
            }
          } else {
            this.province = 'china'
            this.paintMap()
            this.$root.eventHub.$emit('changeProvince', '全国')
          }
        })
      },
      convertData (data) {
        let res = []
        let count = 0
        data.forEach((val) => {
          count += val.value
        })
        for (let i = 0; i < data.length; i++) {
          let geoCoord = {}
          if (geoCoord) {
            geoCoord.name = data[i].name
            geoCoord.value = this.$lodash.round(data[i].value / count, 2)
            res.push(geoCoord)
          }
        }
        return res
      },
      _getOptions (province, datas) {
        return {
          title: {
            text: this.date + (province === 'china' ? '全国' : province) + '发电量热力图',
            left: 'auto',
            textStyle: {
              color: '#fff',
              fontWeight: 100
            }
          },
          tooltip: {
            show: true
          },
          visualMap: {
            min: 0,
            max: 0.3,
            bottom: 50,
            left: 50,
            splitNumber: 5,
            inRange: {
              color: ['#0d87d0', '#2283e9', '#1567bb', '#0b55b4', '#1e436f']
            },
            textStyle: {
              color: '#fff'
            }
          },
          series: [
            {
              name: '电量',
              type: 'map',
              zoom: province === 'china' ? 1 : 0.8,
              mapType: province,
              label: {
                emphasis: {
                  show: true,
                  color: '#fff'
                }
              },
              roam: false,
              data: datas,
              zlevel: 0,
              z: 2,
              blurSize: 20,
              minOpacity: 0,
              itemStyle: {
                normal: {
                  color: 'rgb(39,107,188)',
                  borderColor: '#fff',
                  borderType: 'solid',
                  borderWidth: 1,
                  shadowBlur: 5,
                  shadowColor: 'black',
                  shadowOffsetX: 0,
                  shadowOffsetY: 0,
                  opacity: 1
                },
                emphasis: {
                  areaColor: '#4ba2d0',
                  color: '#fff',
                  borderColor: '#555',
                  borderType: 'solid',
                  borderWidth: 1,
                  shadowBlur: 5,
                  shadowColor: 'black',
                  shadowOffsetX: 0,
                  shadowOffsetY: 0,
                  opacity: 1
                }
              }
            }
          ]
        }
      },
      _initMap (options) {
        this.$jquery('.mapChart .main').empty()
        if (this.map) {
          this.map.dispose()
        }
        this.map = echarts.init(this.$jquery('.mapChart .main')[0])
        this.map.setOption(options)
        window.addEventListener('resize', function () {
          this.map.resize()
        }.bind(this))
      },
      __bindAction () {
        this.$root.eventHub.$on('changeDate', (val) => {
          this.province = val.seriesName === '全国' ? 'china' : val.seriesName
          this.date = val.name
          this._getMap()
        })
      },
      _getMap () {
        this.paintMap()
      }
    },
    mounted () {
      this.__bindAction()
      this.date = this.getToday()
      this._getMap()
    },
    watch: {
      datas (val) {
        this._getMap()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./heatmap.styl"
</style>
