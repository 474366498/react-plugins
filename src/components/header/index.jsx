
import { useSelector , useDispatch } from 'react-redux'

import {  ArrowLeftOutlined } from '@ant-design/icons'

import { HeaderMenu } from './components/headerMeun'

import { HeaderDropdown} from './components/headerDropdown'

import {updateSidebar} from '../../redux/reducer/user'

import './header.scss'

function Header(params) {
  const sidebar = useSelector(({ user }) => user.sidebar),
        dispatch = useDispatch()
  const onChangeSidebar = () => {
    dispatch(updateSidebar())
  }
  return (
    <div id='app-header' className='flex flex-jc-sb' >
      <div className='flex flex-ai-c header-left'>
        <div className='title'>
          react plugins
        </div>
        <div className='flex flex-jc-c flex-ai-c pointer arrow ' onClick={onChangeSidebar}>
          <ArrowLeftOutlined className={[sidebar?'rotate':'spin'].join(' ') } />
          {/* {sidebar
            ? <ArrowLeftOutlined />
            : <ArrowRightOutlined />
          } */}
        </div>
        <HeaderMenu />
      </div>
      <div>
        {/* <span>在线人数 num </span>
        <span>打卡</span>
        <span>已收消息</span>
        <span>未读消息</span> */}

        <HeaderDropdown />
       

      </div>
      
    </div>
  )
}

export default Header