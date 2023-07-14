
import { useSelector, useDispatch } from 'react-redux'

import { useNavigate } from 'react-router'
import { message, Tabs } from 'antd'
import { removeTabsRoute, updateTabsKey, updateForceUpdate } from '../../redux/reducer/router'
import { force } from '../force'

import './tab.scss'

// 把组件 tabMap 单独抽离出来 
import Home from '../../page/home'
import New from '../../page/new'
import Error from '../../page/error'
// import BuriedPoint from '../../page/base/buriedPoint'

import { pageMap } from '../../page'

let defaultMap = new Map([
  ['home', <Home />],
  ['new', <New />],
  ['error', <Error />],
])

let tabMap = new Map()

defaultMap.forEach(function (val, key) {
  tabMap.set(key, val)
})
pageMap.forEach(function (val, key) {
  tabMap.set(key, val)
})

console.log(26, tabMap)

function Tab() {
  const tabsKey = useSelector(state => state.router.tabsKey),
    tabsRoutes = useSelector(state => state.router.tabsRoutes),
    forceUpdate = useSelector(state => state.router.forceUpdate),
    sidebar = useSelector(state => state.user.sidebar),
    dispatch = useDispatch()
  const navigate = useNavigate()

  const [messageApi, contextHolder] = message.useMessage()
  var tabsRoutesView = []
  for (let i = 0; i < tabsRoutes.length; i++) {
    let item = Object.assign({}, tabsRoutes[i])
    item.children = tabMap.has(item.key) ? tabMap.get(item.key) : < Error />
    tabsRoutesView.push(item)
  }

  const onChange = (key) => {
    console.log('change', key)
    navigate(key)
    dispatch(updateTabsKey(key))
    force(
      () => dispatch(updateForceUpdate(false)),
      () => dispatch(updateForceUpdate(true))
    )
  }

  const onEdit = (key, action) => {
    console.log(key, action, tabsRoutes.length)
    if (key !== 'home') {
      removeNavigate(key)
      dispatch(removeTabsRoute(key))
    } else {
      messageApi.warning('首页不可关闭')
    }
  },
    removeNavigate = (key) => {
      let index = tabsRoutes.findIndex(item => item.key === key) - 1
      let newPath = tabsRoutes[index >= 0 ? index : 0].path
      console.log(72, index, newPath)
      navigate(newPath)
    }


  return (
    <>
      {contextHolder}
      {
        forceUpdate
          ?
          <Tabs
            className='page-tabs'
            style={{ maxWidth: `calc(100vw - ${sidebar ? '80px' : '220px'})` }}
            hideAdd
            activeKey={tabsKey}
            defaultActiveKey={tabsKey}
            type='editable-card'
            items={tabsRoutesView}
            onChange={onChange}
            onEdit={onEdit}>

          </Tabs>
          : null
      }
    </>
  )
}
export default Tab