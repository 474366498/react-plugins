
import React , { Component } from "react";

import AMapLoader from '@amap/amap-jsapi-loader'
import { getLocation , getLocationIp , loadQQMap } from '@/utils/map.js'

import {GD_MAP_KEY , GD_MAP_SAFETY_KEY} from '@/keys'

export default class GdMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      city: null,
      geo : null ,
      mapInstance: null,
      busMap: null,
      busStand: '天府四街', // 公交站
      busLine : '515'    , // 公交线路
    }
  }
  componentDidMount() {
    console.log(14, GD_MAP_KEY)
    if (!document.getElementById('gdMap-safety')) {
      let script = document.createElement('script')
      script.innerText = `
        window._AMapSecurityConfig = {
          securityJsCode : '${GD_MAP_SAFETY_KEY}'
        }
      `
      script.id = 'gdMap-safety'
      document.head.appendChild(script)
      console.log(22,script,script.parentNode)
    }

    AMapLoader.load({
      key: GD_MAP_KEY,
      version: '2.0',
      plugins: [   // 插件列表  https://lbs.amap.com/api/javascript-api-v2/guide/abc/plugins-list
        'AMap.ElasticMarker',
        'AMap.ToolBar',
        'AMap.Scale',
        'AMap.MapType',
        'AMap.Geolocation',
        'AMap.AdvancedInfoWindow',  // 这个在v2版本没有
        'AMap.AutoComplete',
        'AMap.PlaceSearch',
        'AMap.DistrictSearch',
        'AMap.LineSearch',
        'AMap.StationSearch',
        'AMap.Driving',
        'AMap.Walking'
      ]
    }).then(AMap => {
      getLocation(geo => {
        console.log(37, geo, AMap)

        this.setState({ geo, AMap }, () => {
          this.initBusMap(geo ,AMap )
          let mapInstance = new AMap.Map('map', {
            // viewMode: '3D',
            resizeEnable: true,
            zoom: 10,
            zooms:[2,29],
            center: [geo.lng  , geo.lat]
          })
          
          let toolbar = new AMap.ToolBar() 
          mapInstance.addControl(toolbar)
          let mapType = new AMap.MapType()
          mapInstance.addControl(mapType)
          let scale = new AMap.Scale()
          mapInstance.addControl(scale)


          let Geolocation = new AMap.Geolocation({
            timeout: 12e3,
            position: 'RB',
            offset: [20, 100] ,
            zoomToAccuracy:true
          })
          mapInstance.addControl(Geolocation)
          Geolocation.getCurrentPosition( (status, result)=> {
            console.log('geolocation',status,result)
          })
          // var locCity 

          mapInstance.getCity( (info) =>  {
            console.log('getCity', info)
            var polygons = []
            // 智能搜索
            let { city, citycode } = info
            let auto = new AMap.AutoComplete({
              input: 'autoInput',
              city
            })
            console.log('auto',auto)
            let PlaceSearch = new AMap.PlaceSearch({
              map : mapInstance 
            })

            auto.on('select', function (e) {
              console.log('AutoComplete select',e)
              PlaceSearch.setCity(e.poi.adcode)
              PlaceSearch.search(e.poi.name)
            })
            
            let disSearch = new AMap.DistrictSearch({
              level: 'city',
              subdistrict:5 
            })
            disSearch.search(city,  (status,result) => {
              console.log('search', status, result)
              if (status == 'complete') {
                // getDisSearchData(result.districtList[0])
              }
            })
            /*
            function getDisSearchData(data, level) {
              let bounds = data.boundaries 
              if (bounds) {
                for (var i = 0, l = bounds.length; i < l; i++) {
                  var polygon = new AMap.Polygon({
                      map: mapInstance,
                      strokeWeight: 1,
                      strokeColor: '#0091ea',
                      fillColor: '#80d8ff',
                      fillOpacity: 0.2,
                      path: bounds[i]
                  });
                  polygons.push(polygon);
                }
                mapInstance.setFitView();//地图自适应
              }
            }
            */
            
          })
          
          mapInstance.on('click', function (event) {
            console.log('map click',event)
          })
          mapInstance.on('moveend', function (event) {
            console.log('map moveend',event)
          })
          mapInstance.on('zoomend', function (event) {
            console.log('map zoomend',event)
          })
          console.log('mapInstance', mapInstance , mapInstance.getBounds())
          this.setState({
            mapInstance
          })
        })
      })
      
    })
  }
  initBusMap(geo , AMap) {
    let busMap = new AMap.Map('busMap', {
        // viewMode: '3D',
        resizeEnable: true,
        zoom: 10,
        zooms:[2,29],
        center: [geo.lng  , geo.lat]
      })
    busMap.getCity(info => {
      console.log(213, info)
      this.setState({
        busMap,
        city : info.city
      })
    }) 
  }

  // 查询站点
  onBusStandSearch() {
    var markers = [] // 站点list 
    let { city , busMap , busStand} = this.state
    if (!busStand) return 
    markers.length && busMap.remove(markers)
    markers = []
    var station = new window.AMap.StationSearch({
      pageIndex: 1,
      pageSize: 10,
      city
    })
    station.search(busStand, (status, result) => {
      if (status === 'complete' && result.info === 'OK') {
        stationSearch_Callback(result , busMap)
      } else {
        console.log(result)
      }
    })
    // 查询站点回显
    function stationSearch_Callback(result , map) {
      console.log('stationSearch_Callback', result)
      let data = result.stationInfo,
        length = data.length 
      if (length > 0) {
        for (let i = 0; i < length; i++) {
          let marker = new window.AMap.Marker({
            image: '//a.amap.com/jsapi_demos/static/resource/img/pin.png',
            offset:new window.AMap.Pixel(-16,-32),
            position: data[i].location,
            map ,
            title: data[i].name
          })
          marker.info = new window.AMap.InfoWindow({
            content: data[i].name,
            offset : new window.AMap.Pixel(0,-30)
          })
          marker.on('mouseover', function (e) {
            console.log('bus map mouseover', e.target)
            e.target.info.open(map,e.target.getPosition())
          })
          markers.push(marker)
        }
        console.log('markers' , markers)
        map.setFitView()
      }
    }
  }
  // 查询线路 
  onBusLineSearch() {
    let { busLine, busMap , city} = this.state 
    if (!busLine) return 
    let lineSearch = new window.AMap.LineSearch({
      pageIndex: 1,
      city,
      pageSize: 1,
      extensions : 'all'
    })
    lineSearch.search(busLine, (status, result) => {
      busMap.clearMap()
      if (status === 'complete' && result.info === 'OK') {
        lineSearchCallback(result)
      } else {
        console.log('search bus line error',result)
      }
    })
    function lineSearchCallback(result) {
      console.log(241, result)
      let data = result.lineInfo, 
        length = data.length 
      if (length > 0) {
        for (let i = 0; i < length; i++) {
          let pathArr = data[i].path,
            stops = data[i].via_stops,
            stopStart = stops[0].location,
            stopEnd = stops[stops.length - 1].location
          drawBusLine(stopStart,stopEnd , pathArr)
        }
      }
    }
    
    function drawBusLine(s, e, arr) {
      new window.AMap.Marker({
        map: busMap,
        position: s,
        icon: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
        zIndex: 10,
        anchor:'bottom-center'
      })
      new window.AMap.Marker({
        map: busMap,
        position: e, //基点位置
        icon: "https://webapi.amap.com/theme/v1.3/markers/n/end.png",
        zIndex: 10,
        anchor: 'bottom-center',
      })
      busMap.setFitView(new window.AMap.Polyline({
        map: busMap,
        path: arr,
        strokeColor: "#09f",//线颜色
        strokeOpacity: 0.8,//线透明度
        isOutline:true,
        outlineColor:'white',
        strokeWeight: 6//线宽
      }),true , [60,200,60,60] )
    }

  }
  componentWillUnmount() {
    this.setState({
      geo: null,
      AMap:null 
    })
    let s = document.getElementById('gdMap-safety')
    s && s.parentNode.removeChild(s)
  }
  render() {
    let {
      busStand,
      busLine
    } = this.state 
    return (
      <div className="flex flex-dir-c flex-ai-c">
        <div className="flex  flex-jc-c">
          <a href="https://lbs.amap.com/api"> api 大类</a>
          <a href="https://lbs.amap.com/api/javascript-api/reference/core"> 地图JS API</a>
          <a href="https://lbs.amap.com/api/javascript-api-v2/guide/abc/plugins-list"> 地图JS API 2.0 </a>
          <a href="https://lbs.amap.com/demo/javascript-api/example/map/get-mapzoom"> demo </a>
          <a href="https://lbs.amap.com/demo/javascript-api-v2/example/calcutation/calculate-distance-between-two-markers"> demo v2</a>
        </div>
          <div className='map-auto'>
            <label>地点关键字</label>
            <input id='autoInput' ></input>
          </div>
         
        <div id='map' style={{ width: '1000px', height: '700px' }}> map </div>
        <br /> <br />
        <div className="map-bus">
          <label>公交站点</label>
          <input id='busInput' type='text' value={busStand} onChange={e=>this.setState({busStand:e.target.value})}  />
          <button id='busStandSearch' onClick={e => this.onBusStandSearch(e)}>查</button>
          <label>公交线路</label>
          <input id='busLine' type='text' value={busLine} onChange={e=>this.setState({busLine:e.target.value})} /> 
          <button id='busLineSearch' onClick={e => this.onBusLineSearch(e)}>搜</button>
        </div> 
        <div id='busMap' style={{ width: '1000px', height: '700px' }}> bus map </div>
      </div>
    )
  }
}

