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
  //  import 'echarts/map/js/province/taiwan'
  import 'echarts/map/js/province/tianjin'
  import 'echarts/map/js/province/xianggang'
  import 'echarts/map/js/province/xinjiang'
  import 'echarts/map/js/province/xizang'
  import 'echarts/map/js/province/yunnan'
  import 'echarts/map/js/province/zhejiang'

  const STATUS_CODE = 200
  export default {
    name: 'heatmap',
    props: {},
    data () {
      return {
        map: null,
        datas: null
      }
    },
    methods: {
      paintChina () {
        let options = this._getOptions('china', this.datas)
        this._initMap(options)
        this.map.on('click', (param) => {
          let name = this.$lodash.result(this.$lodash.find(this.datas, function (chr) {
            return chr.name === param.name
          }), 'name')
          if (param.name === name) {
            this.paintProvince(param.name)
            this.$root.eventHub.$emit('changeProvince', param.name)
          } else {
            this.$Message.info(param.name + '省暂时没有风场数据')
          }
        })
      },
      paintProvince (province) {
        let options = this._getOptions(province, this.datas)
        this._initMap(options)
        this.map.on('click', () => {
          this.paintChina(this.datas)
          this.$root.eventHub.$emit('changeProvince', '全国')
        })
      },
      convertData (data) {
        let res = []
        for (let i = 0; i < data.length; i++) {
          let geoCoord = {}
          if (geoCoord) {
            geoCoord.name = data[i].name
            geoCoord.value = Math.round(Math.random() * 2500)
            res.push(geoCoord)
          }
        }
        return res
      },
      _getOptions (province, datas) {
        return {
          title: {
            text: (province === 'china' ? '全国' : province) + '发电量热力图',
            left: 'auto',
            textStyle: {
              color: '#fff',
              fontWeight: 100
            }
          },
          visualMap: {
            min: 0,
            max: 2500,
            bottom: 50,
            splitNumber: 5,
            inRange: {
              color: ['#0d87d0', '#2283e9', '#1567bb', '#0b55b4', '#1e436f']
            },
            textStyle: {
              color: '#fff'
            }
          },
          geo: {
            map: province,
            zoom: province === 'china' ? 1 : 0.8,
            label: {
              emphasis: {
                show: true,
                color: '#fff'
              }
            },
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
                color: 'rgb(61,158,211)',
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
          },
          series: [
            {
              name: 'iphone3',
              type: 'heatmap',
              coordinateSystem: 'geo',
              roam: false,
              data: datas,
              blurSize: 20,
              minOpacity: 0,
              itemStyle: {
                emphasis: {
                  areaColor: '#4ba2d0',
                  color: '#fff'
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
      _getMap () {
        this.paintChina()
      }
    },
    mounted () {
      this.$http.get('static/data/point/testData.json').then((res) => {
        if (res.status === STATUS_CODE) {
          this.datas = res.data
          this._getMap()
        }
      })
    },
    watch: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .mapChart
    height 500px
    .main
      width 100%
      height 100%
</style>
