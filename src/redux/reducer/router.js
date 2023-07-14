

import { createSlice } from "@reduxjs/toolkit";


export const RouterReducer = createSlice({
  name: 'router-reducer',
  initialState: {
    headerMenu: 'base',   // 一级头部导航关键字
    routes: {},           // 所有的导航菜单
    sidebarMenu: [],    // 默认 sidebar menu 展示内容
    forceUpdate: true,  // tabs tabsKey 更新时进行强制更新
    tabsKey: 'home',      // tabs 默认展示关键字
    tabsRoutes: [         // tabs 展示数组
      { key: 'home', path: '/home', label: 'Home' },
      // { key: 'new', path: '/new', label: 'New' },  ['buried', <BuriedPoint />]
      // { key: 'buried', path: '/buried', label: 'BuriedPoint' },
    ]
  },

  reducers: {
    // 头部一级导航更新
    updateHeaderMenu(state, action) {
      console.log('update', action)
      state.headerMenu = action.payload
    },
    updateSidebarMenu(state, action) {
      console.log(27, action)
      let { key, data } = action.payload

      if (!state.routes[key]) {
        state.routes[key] = data
      }
      state.sidebarMenu = data.data

    },
    // sidebar 点击追加
    addTabsRoute: (state, action) => {
      console.log('add', action)
      let key = action.payload.replace(/\//, '')
      console.log(key.substring(0, 1), key.substr(1))
      let item = { key, path: '/' + key, label: key.substring(0, 1).toUpperCase() + key.substr(1) }
      console.log(42, item)
      state.tabsRoutes.push(item)
      state.tabsKey = key
      console.log(25, item, state.tabsKey)
    },
    // tab remove 移除
    removeTabsRoute: (state, action) => {
      console.log('remove', state, action)
      let type = action.payload.replace(/\//, '')

      state.tabsRoutes = state.tabsRoutes.filter(item => item.key !== type)
      console.log(54, state.tabsRoutes)
    },
    // sidebar 、tabs 点击更新  点击
    updateTabsKey: (state, action) => {
      console.log(state, action)
      state.tabsKey = action.payload.replace(/\//, '')
    },
    // 更改 强制更新 状态码 
    updateForceUpdate: (state, action) => {
      console.log(62, state, action)
      state.forceUpdate = action.payload
    }
  }
})
export const {
  updateHeaderMenu,
  updateSidebarMenu,
  // tabsRoutes
  addTabsRoute,
  removeTabsRoute,
  updateTabsKey,
  updateForceUpdate
} = RouterReducer.actions

export default RouterReducer.reducer