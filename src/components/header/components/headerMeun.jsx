

import {ContactsTwoTone, ReconciliationTwoTone, GoldTwoTone, SettingTwoTone,} from '@ant-design/icons'

import { Menu } from '../../../api/menu' 
import { useWatcher } from 'alova'

import { useSelector , useDispatch } from 'react-redux'
import { updateHeaderMenu , updateSidebarMenu} from '../../../redux/reducer/router' 

// console.log(8, AL , Menu)


const menuMap = [
  {
    id: 'm1', text: '个人办公', icon: <ContactsTwoTone style={{ fontSize: '2.4rem' }} />, key: 'user'
  },
  { id: 'm2', text: '协同办公', icon: <ReconciliationTwoTone style={{ fontSize: '2.4rem' }} />, key: 'synergy' },
  { id: 'm3', text: '业务管理', icon: <GoldTwoTone style={{ fontSize: '2.4rem' }} />, key: 'business' },
  { id: 'm4', text: '系统管理', icon: <SettingTwoTone style={{ fontSize: '2.4rem' }} />, key: 'setting' },
]

export function HeaderMenu() {
  
  const headerMenu = useSelector(state => state.router.headerMenu)
  const dispatch = useDispatch()
  console.log(29, headerMenu)
  

  const onMenuClick = (e,key) => {
    console.log(16, e, key)
    return false 
    // dispatch(updateHeaderMenu(key))
  }
  // const axArray = ['user' , 'synergy']
  // useEffect(() => {
  //   console.log('effect ', headerMenu , Menu)
  //   if (axArray.includes(headerMenu)) {
  //     // axios
  //     Menu[headerMenu]().then(res => {
  //       console.log(41,res)
  //     }).catch(error => {
  //       console.log(43,error)
  //     })
  //   } else {
  //     // alova 
  //     console.log(48,Menu[headerMenu])
     
  //   }
  // }, [headerMenu])

  // Menu.MenuUser()
   const { onSuccess, onError } = useWatcher(Menu[headerMenu](), [headerMenu])
      onSuccess(res => {
        console.log(51, res.data)
        dispatch(updateSidebarMenu({key:headerMenu , data : res.data}))
      })
      onError(err => {
        console.log(53,headerMenu,err)
      })
  // const { onSuccess , onError } = useRequest(Menu.setting(), {})
  // onSuccess(res => {
  //   console.log(28,res)
  // })
  // onError(err => {
  //   console.log(31,err)
  // })
  return (
    <ul className='flex flex-jc-sa menu'>
          {
            menuMap.map(item => {
              return (
                <li className='flex flex-dir-c flex-ai-c menu-item pointer' onClick={e=>onMenuClick(e,item.key)} key={item.key}>
                  {item.icon}
                  <span> {item.text} </span>
                </li>
              )
            })
          }
        </ul>
  )
}

