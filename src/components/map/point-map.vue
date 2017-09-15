<template>
  <div id="map"></div>
</template>

<script type="text/ecmascript-6">
  import echarts from 'echarts'
  import 'echarts/map/js/china'

  const STATUS_CODE = 200
  export default {
    name: 'PonitMap',
    data () {
      return {
        map: {},
        geoCoordMap: {}
      }
    },
    methods: {
      convertData (data) {
        let res = []
        for (let i = 0; i < data.length; i++) {
          let geoCoord = this.geoCoordMap[data[i].name]
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            })
          }
        }
        return res
      },
      _initMap (options) {
        this.map = echarts.init(document.getElementById('map'))
        this.map.setOption(options)
        this.$root.charts.push(this.map)
        window.addEventListener('resize', function () {
          this.map.resize()
        }.bind(this))
      },
      _getCityData () {
        this.$http.get('static/data/cityData.json').then((res) => {
          if (res.status === STATUS_CODE) {
            this.geoCoordMap = res.data
            this.$nextTick(() => {
              this._getMap()
            })
          }
        })
      },
      _getMap () {
        this.$http.get('static/data/point/testData.json').then((res) => {
          if (res.status === STATUS_CODE) {
            let options = {
              title: {
                text: '空气质量',
                subtext: 'data from PM25.in',
                sublink: 'http://www.pm25.in',
                x: 'left',
                textStyle: {
                  color: '#fff',
                  fontSize: 100
                },
                subtextStyle: {
                  color: '#fff'
                }
              },
              tooltip: {
                trigger: 'item',
                formatter: function (params) {
                  return params.name + ' : ' + params.value[2]
                }
              },
              legend: {
                orient: 'vertical',
                y: 'bottom',
                x: 'right',
                data: ['pm2.5'],
                textStyle: {
                  color: '#fff'
                }
              },
              visualMap: {
                min: 0,
                max: 200,
                calculable: true,
                inRange: {
                  color: ['#50a3ba', '#eac736', '#d94e5d']
                },
                textStyle: {
                  color: '#fff'
                }
              },
              geo: {
                map: 'china',
                label: {
                  emphasis: {
                    show: false
                  }
                },
                itemStyle: {
                  normal: {
                    areaColor: '#323c48',
                    borderColor: '#fff'
                  },
                  emphasis: {
                    areaColor: '#2a333d'
                  }
                }
              },
              series: [
                {
                  name: 'pm2.5',
                  type: 'scatter',
                  coordinateSystem: 'geo',
                  data: this.convertData(res.data),
                  symbolSize: 12,
                  label: {
                    normal: {
                      show: false
                    },
                    emphasis: {
                      show: false
                    }
                  },
                  itemStyle: {
                    emphasis: {
                      borderColor: '#fff',
                      borderWidth: 1
                    }
                  }
                }
              ]
            }

            this._initMap(options)
          }
        })
      }
    },
    created () {
      this._getCityData()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  #map
    height 500px
</style>
