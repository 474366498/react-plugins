import React, { Component } from "react";

// import {Map, Marker, NavigationControl, InfoWindow} from 'react-bmapgl';

import { getLocation , loadBMapGL , loadBMap , loadBMapMain } from '@/utils/map.js'
import { nodeIsChild } from '@/utils/element.js'
import BMapVariable , {
  BMAP_NORMAL_MAP,
  BMAP_SATELLITE_MAP,
  BMAP_EARTH_MAP,
  BMAP_ANCHOR_TOP_LEFT,
  BMAP_ANCHOR_TOP_RIGHT,
  BMAP_ANCHOR_BOTTOM_LEFT,
  BMAP_ANCHOR_BOTTOM_RIGHT
} from './var.js'

console.log(15, BMAP_NORMAL_MAP )
class BaiduMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      geo: null,
      map: null,
      mapgl : null 
    }
  } 
  componentDidMount() {
    console.log('BMapGL2', window.BMapGL)
      if (!window.BMapGL || !window.BMap) {
        this.loadBaiDuMap()
      } else {
        getLocation((geo) => {
        console.log('getLocation', geo)
        this.setState({ geo }, () => {
          this.initMapV3()
          this.initMapGL()
        })
      }) 
    } 
  }
    
  async loadBaiDuMap() {
    try {
      const mapgl = await loadBMapGL(),
        map = await loadBMap() 
      console.log(46, mapgl, map )
      getLocation((geo) => {
        console.log('getLocation', geo)
        this.setState({ geo }, () => {
          this.initMapV3()
          this.initMapGL()
        })
      }) 
    } catch (error) {
      console.log(error)
    }
  }
  initMapV3() {
    if (this.state?.map) return 
    let {lng , lat } = this.state.geo
    let el = this.mapRef
    var map = new BMap.Map(el)
  //  map.centerAndZoom('成都',10)
    map.centerAndZoom(new BMap.Point(lng, lat), 8)
    
    map.enableScrollWheelZoom(true)
    
    map.addControl(new BMap.ScaleControl({
      anchor : BMAP_ANCHOR_TOP_LEFT
    }))
    map.addControl(new BMap.NavigationControl())
    map.addControl(new BMap.NavigationControl({
      anchor: BMAP_ANCHOR_TOP_RIGHT, type: window.BMAP_NAVIGATION_CONTROL_SMALL
    }))
    map.addControl(new BMap.GeolocationControl({
      anchor:window.BMAP_ANCHOR_BOTTOM_RIGHT
    }))
    this.setState({map})
  }
  initMapGL() {
    if(this.state?.mapgl) return 
    console.log(75, this.state.geo, this.mapglRef , BMapGL)
    let {lng , lat } = this.state.geo
    let el = this.mapglRef
    var mapgl = new BMapGL.Map(el)
     mapgl.centerAndZoom(new BMapGL.Point(lng, lat), 9)
    
    //  mapgl.addControl(new BMapGL.MapTypeControl({
    //   mapTypes:[
    //         BMAP_NORMAL_MAP,
    //         BMAP_SATELLITE_MAP,
    //         BMAP_EARTH_MAP,
    //     ]
    // }))
    // mapgl.setCurrentCity('cd')
    mapgl.setMapType(BMAP_SATELLITE_MAP);  
    mapgl.enableScrollWheelZoom(true)
     mapgl.addControl(new BMapGL.NavigationControl({
       offset: new BMapGL.Size(20,100)
     })) 
    //  比例尺 鼠标滚轮 城市列表
    mapgl.addControl(new BMapGL.ScaleControl()) 
    mapgl.addControl(new BMapGL.ZoomControl()) 
    mapgl.addControl(new BMapGL.CityListControl());

    //  3d 
    let Navi3DCtrl = new BMapGL.NavigationControl3D() 
    mapgl.addControl(Navi3DCtrl)
    
    //  定位
     let locationCtrl = new BMapGL.LocationControl({
       anchor: window.BMAP_ANCHOR_TOP_RIGHT,
       offset : new BMapGL.Size(20,20)
    })
     mapgl.addControl(locationCtrl)
     locationCtrl.addEventListener('locationSuccess', function (res) {
      console.log('res',res)
    }) 
     mapgl.addEventListener('click', function (e) {
      console.log('webgl click',e)
     })
     
    //  mapgl.addOverlay(new BMapGL.DistrictLayer({
    //    name: "(四川省,贵州省,云南省)",
    //    fillColor: '#f00',
    //    fillOpacity:1
    //  }) )
    console.log(128,mapgl)
    this.setState({
      mapgl 
    })
  }
  componentWillUpdate(props, state) {
    console.log('将更新了state', props, state, this.state.mapgl)
    let { map, mapgl } = state 
    
    if (map && mapgl) {
      document.addEventListener('DOMMouseScroll', mapglMouseScroll, false)
      document.addEventListener('mousewheel', mapglMouseScroll, false)
    }
    let glEl = this.mapglRef , el = this.mapRef
    function mapglMouseScroll(e) {
       if (nodeIsChild(e.target,el)) {
         console.log('中 map' , map.getZoom())
       } else if (nodeIsChild(e.target, glEl)) {
         console.log('中 mapgl' , mapgl.getZoom())
       } 
     }
  }
  componentWillUnmount() {
    console.log('unMount')
    let { mapgl , map } = this.state
    if (this.state.mapgl) {
       this.setState({
         mapgl: null,
         map : null 
       }, () => {
         document.removeEventListener('DOMMouseScroll',function(){})
         document.removeEventListener('mousewheel',function(){})
      })
    }
  } 
  render() {
    let {geo } = this.state
    return (
      <div className ='flex flex-dir-c'>
        <div> 
          <a href="https://lbsyun.baidu.com/solutions/reactBmapDoc">react-bmapgl(这个 太low 运行一堆问题)
            <code>s of null (reading 'insertAdjacentHTML')
    at bJ (getscript?type=webgl&v=1.0&ak=eYitAxjBztuzvI8ulZXg7mu6Ue7otzDb&services=&t=20230613170744:5:91575)
    at s._addDom (eval at run (</code>
          </a> 
          {JSON.stringify(geo)}
          <br />
          <a href="https://lbsyun.baidu.com/index.php?title=jspopular">百度地图js</a>  
          <a href="https://lbs.baidu.com/jsdemo3.0.htm#js3_1">更多实例(jsV3)</a>  
          <a href="https://lbsyun.baidu.com/jsdemo.htm#panoControl">更多实例(webgl)</a>
        </div>
        <div className="flex flex-dir-c flex-ai-c">
          {
            geo 
              ? <>
                <div id='map' ref={ el => this.mapRef = el } style={{width:'800px' ,height:'800px'}}></div>
                <br />
                <br />
                <br /> 
                <div id='mapgl' ref={el => this.mapglRef = el} style={{ width: '800px', height: '800px' }}></div>
              </>
              : <div>等待加载信息...</div>
          }
          
        </div>
        {/* <>
          {
            geo
              ? <Map center={{lng: 116.402544, lat: 39.928216}} zoom="11">
            <Marker position={{lng: 116.402544, lat: 39.928216}} />
            <NavigationControl /> 
            <InfoWindow position={{lng: 116.402544, lat: 39.928216}} text="内容" title="标题"/>
              </Map>
              :null
          }
        </> */}
      </div>
    )
  }
}

export default BaiduMap
// export default MapApiLoaderHOC({ak:'eYitAxjBztuzvI8ulZXg7mu6Ue7otzDb'})(BMap)
