import { NavLink, useLocation, useNavigate } from "react-router-dom"

import { useSelector, useDispatch } from "react-redux"

import { addTabsRoute, updateTabsKey, updateForceUpdate } from '../../redux/reducer/router'
import { Menu } from "antd"
import { useEffect, useState } from "react"
import { find } from "../../utils/array"
import { force } from "../force"

function Sidebar() {
  const location = useLocation(), navigate = useNavigate()
  const sidebar = useSelector(({ user }) => user.sidebar),
    sidebarMenu = useSelector(({ router }) => router.sidebarMenu),
    tabsKey = useSelector(({ router }) => router.tabsKey),
    tabsRoutes = useSelector(state => state.router.tabsRoutes),
    dispatch = useDispatch()

  console.log(16, location, sidebarMenu, tabsKey)


  const items = menuToItmes(sidebarMenu)
  const firstMenuKey = sidebarMenu.map(item => {
    return item.menuid
  })

  function menuToItmes(data) {
    const items = data.map(item => {
      let children = item.menus && item.menus.length > 0 ? menuToItmes(item.menus) : null,
        type = item.menus && item.menus.length > 0 ? '' : 'group'
      return children
        ? {
          key: item.menuid,
          icon: item.icon,
          children,
          label: item.menuname,
          type,
          url: item.url
        }
        : {
          key: item.menuid,
          icon: item.icon,
          label: item.menuname,
          url: item.url
        }
    })
    return items
  }

  const [selectId, setSelectId] = useState([]),
    [openKey, setOpenKey] = useState([]);

  // 模拟 componentDidMount
  /*
  useEffect(() => {
    console.log('did mount')
    console.log(52, sidebarMenu, tabsRoutes, location)
    let path = location.pathname.replace(/\//, '')
    let update = tabsRoutes.find(item => item.key === path)
    if (update) {
      console.log('is update')
      dispatch(updateTabsKey(location.pathname))
    } else {
      let has = find(sidebarMenu, 'menus', 'url', path)
      if (has) {
        dispatch(addTabsRoute(path))
      }
    }
  }, [])
  
  // 模拟componentDidUpdate：
  useEffect(() => {
    console.log(71, sidebarMenu, tabsRoutes, location)
    let path = location.pathname.replace(/\//, '')
    let update = tabsRoutes.find(item => item.key === path)
    if (update) {
      console.log('is update')
      dispatch(updateTabsKey(location.pathname))
    } else {
      let has = find(sidebarMenu, 'menus', 'url', path)
      if (has) {
        dispatch(addTabsRoute(path))
      }
    }
  })
  */


  // 模拟componentWillUnmount：
  useEffect(() => {
    console.log('首次渲染')
    console.log(71, sidebarMenu, tabsRoutes, location)
    let path = location.pathname.replace(/\//, '')
    let update = tabsRoutes.find(item => item.key === path)
    if (update) {
      console.log('is update')
      dispatch(updateTabsKey(location.pathname))
    } else {
      let has = find(sidebarMenu, 'menus', 'url', path)
      if (has) {
        dispatch(addTabsRoute(path))
      }
    }
    return () => {
      console.log('即将卸载')
    }
  })

  useEffect((e) => {
    console.log('change', tabsKey)
    setSelectId(tabsKey)
  }, [tabsKey])
  // link click 
  const onClickLink = (e) => {
    let path = e.target.getAttribute('href')
    if (path !== location.pathname) {
      let fn = !!tabsRoutes.find(item => item.path === path)   // 这里的path 有 / 
      console.log(52, fn, path)
      if (!fn) {
        dispatch(addTabsRoute(path))
      } else {
        dispatch(updateTabsKey(path))
        force(
          () => dispatch(updateForceUpdate(false)),
          () => dispatch(updateForceUpdate(true))
        )
      }
      navigate(path)
    }
    // console.log(15, e, path, location, navigate)
    // e.preventDefault()
  }
  // menu select change 选中项 
  const onSelect = (e) => {
    // console.log('select', e)
    setSelectId(e.key)
  },
    // menu 中 submenu 展开
    onOpenChange = (keys) => {
      if (openKey.length) {
        let findItem = keys.find(key => !openKey.includes(key))
        // console.log(69, findItem)
        setOpenKey([findItem])
      } else {
        setOpenKey([...keys])
      }
    },
    onClick = (e) => {
      // console.log(77, e)
    },
    // menu 中 menu-item click 
    onClickItem = (e, url) => {
      console.warn('这里要判断url 路由是否在正常的routes路由列表中 如果不在就跳error')
      console.log(81, e, url)
      if (url !== location.pathname) {
        let fn = !!tabsRoutes.find(item => item.key === url) // 这里的url 没有 / 
        console.log(85, tabsRoutes, fn)
        if (!fn) {
          dispatch(addTabsRoute(url))
        } else {
          dispatch(updateTabsKey(url))
          force(
            () => dispatch(updateForceUpdate(false)),
            () => dispatch(updateForceUpdate(true))
          )
        }
        navigate(url)
      }
    }
  // menu 通过children 自定义封装 
  function showMenuItems(item) {
    // console.log(172, item)
    if (item.children && item.children.length) {
      return (
        <Menu.SubMenu
          key={item.key}
          title={<><span className="ant-menu-item-icon">I</span><span className="ant-menu-title-content">{item.label} <em>{item.url}</em></span></>}
        >
          {item.children.map(em => showMenuItems(em))}
        </Menu.SubMenu>
      )
    } else {
      return (
        <Menu.Item
          key={item.key}
          style={{ paddingLeft: '32px' }}
          onClick={e => onClickItem(e, item.url)}
        >
          <span>{item.label} <em>{item.url}</em></span>
        </Menu.Item>
      )
    }
  }
  return (
    <div className="flex flex-dir-c" style={{ width: sidebar ? '80px' : '200px', marginRight: '6px' }}>
      sidebar
      <NavLink onClick={onClickLink} to='home'>首页</NavLink>
      <NavLink onClick={onClickLink} to='new'>new</NavLink>
      <NavLink onClick={onClickLink} to='error'>error</NavLink>
      <NavLink onClick={onClickLink} to='buriedPoint'>buriedPoint</NavLink>
      <p>{selectId}</p>
      {/* <div>
        <Menu
          mode='inline'
          items={items}
          defaultSelectedKeys={firstMenuKey[0]}
          selectedKeys={selectId}
          defaultOpenKeys={firstMenuKey[0]}
          openKeys={openKey}
          onClick={onClick}
          onSelect={onSelect}
          onOpenChange={onOpenChange}
        >
        </Menu>
      </div> */}
      <Menu
        theme='light'
        mode='inline'
        inlineCollapsed={sidebar}
        defaultSelectedKeys={firstMenuKey[0]}
        selectedKeys={selectId}
        defaultOpenKeys={firstMenuKey[0]}
        openKeys={openKey}
        onClick={onClick}
        onSelect={onSelect}
        onOpenChange={onOpenChange}
      >
        {
          items.map(item => showMenuItems(item))
        }
      </Menu>
    </div >
  )
}

export default Sidebar 
