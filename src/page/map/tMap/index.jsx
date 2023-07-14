
import React , { Component } from 'react'

import { getLocation , getLocationIp , loadQQMap } from '@/utils/map.js'

/* qq.maps.MapTypeId
 HANDDRAW : "handdraw"
HYBRID : "hybrid"
INDOORMAP : "indoormap"
ROADMAP : "roadmap"
SATELLITE : "satellite"
 */
export default class TxMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      markerList : []
    }
  }

  componentWillMount() {
    if(document.getElementById('TencentMap')) return 
    loadQQMap().then(res => {
      console.log(25, res)
      this.maps = res
      getLocation(geo => {
        console.log(37, geo,this.maps)
        this.setState({ geo , maps:res }, () => {
          this.mapInit(geo)
        })
      })
    }).catch(error => {
      console.log(27,error)
    })
  }
  
  componentDidMount() {
    console.log('didMount')
    if (!this.state?.qqMap && window?.qq) {
      getLocation(geo => {
        this.setState({ geo }, () => {
          this.mapInit(geo)
        })
      })
    }
  }
  componentWillUnmount() {
    console.log('unmount')
    this.setState({
      qqMap: null,
      markerList : []
    })
  }
  mapInit(geo) {
    if(this.state?.qqMap) return 
    let { lat, lng } = geo
    // console.log(45,window , lat , lng)
    var mapOptions = {
      zoom: 10,
      center: new qq.maps.LatLng(lat, lng),
      draggableCursor : 'https://mapapi.qq.com/web/lbs/javascriptV2/demo/img/c1.cur',     //设置鼠标拖拽元素样式
      draggingCursor : 'https://mapapi.qq.com/web/lbs/javascriptV2/demo/img/c2.cur' //设置鼠标移动样式
    }
    var qqMap = new qq.maps.Map(this.mapRef, mapOptions)

    qq.maps.event.addListener(qqMap, 'bounds_changed', function () {
      let bounds = qqMap.getBounds() 
      if (bounds) {
        console.log(bounds , 'getNorthEast:',bounds.getNorthEast() , 'getSouthWest:',bounds.getSouthWest(),'getCenter:',bounds.getCenter())

      }
    })
    // 地图点击事件 
    qq.maps.event.addListener(qqMap, 'click', event => {
      let { lat, lng } = event.latLng 
      let markerList = this.state.markerList 
      let position = new qq.maps.LatLng(lat, lng)
      console.log(81, lat, lng, position)
      
      let marker = new qq.maps.Marker({
        position, 
        map:qqMap,
        draggable: true,
        animation:qq.maps.MarkerAnimation.DROP
      })
      markerList.push(marker)
      this.setState({markerList })
      qq.maps.event.addListener(marker, 'click',  (m) =>  {
        let index = markerList.findIndex(item=>item.position==m.latLng)
        // console.log('marker click', markerList, m, this, index)
        if (index >= 0) {
          markerList[index].setMap(null)
          markerList.splice(index, 1)
          this.setState({markerList})
        }
      })
      qq.maps.event.addListener(marker, 'dragstart', function (e) {
        console.log(109,'dragstart',e)
      })
      qq.maps.event.addListener(marker, 'dragend', function (e) {
        console.log(112,'dragend',e)
      }) 
    })
    // 加载实时路况图层。
    let trafficLayer = new qq.maps.TrafficLayer() 
    trafficLayer.setMap(qqMap)

    // 热力图 visualization 用init=callback 没有Heat这个方法...
    if (qq.maps?.visualization &&qq.maps?.visualization?.Heat ) {
      
      let heatMap = new qq.maps.visualization.Heat({
        map: qqMap, // 必填参数，指定显示热力图的地图对象
        radius:30 // 辐射半径，默认为20
      })
      let data = this.getHeatData()
      console.log(126,data)
      heatMap.setData(data)
    }

    console.log('qqMap',qqMap)
    this.setState({
      qqMap,
      
    })
  }
  
  getHeatData(cnt, max, min) {
    let data = [];
		// 	let center = {
		// 		lat: 39.9,
		// 		lng: 116.4
    // };
      let { lat , lng} = this.state.geo
			cnt = cnt || 100;
			max = max || 100;
      min = min || 0;
    lat = lat || 30.5567 
    lng = lng || 104.0619
			for (let index = 0; index < cnt; index++) {
				let r = Math.random();
				let angle = Math.random() * Math.PI * 2;
				let heatValue = Math.random() * (max - min) + min;
				data.push({
					lat: lat + r * Math.sin(angle),
					lng: lng + r * Math.cos(angle),
					value: heatValue
				});
			}
			return {
				max: max,
				min: min,
				data: data
			};
  }

  render() {
    return (<div className='flex flex-dir-c flex-ai-c'>
      <div>
        <a href="https://lbs.qq.com/webApi/javascriptV2/jsDoc/jsDocIndex"> map 参考手册</a>
        <a href="https://lbs.qq.com/webDemoCenter/javascriptV2/event/mapClick"> map demo </a>
        <a href="http://www.noobyard.com/article/p-mzcxypmp-eq.html">腾讯地图JSAPI开发demo 定位，查询</a>
      </div>
      <div id='map' ref={el => this.mapRef = el} style={{ width: '800px', height: '600px' }}></div>
      <div>
        <span>{ this.state.markerList.length}</span>  
      </div>
    </div>)
  }

}