
import { Dropdown, Space } from 'antd'
import { DownOutlined ,  UserOutlined , LockOutlined ,LogoutOutlined  } from '@ant-design/icons'


const dropdownMenu = [
  {
    key: 'user',
    label: `个人资料`,
    icon:<UserOutlined />
  },
  {
    key: 'password',
    label: `修改密码`,
    icon:<LockOutlined />
  },
  {
    key: 'logout',
    label: `退出`,
    icon:<LogoutOutlined />
  },
]
export function HeaderDropdown() {
  const dropdownClick = (e) => {
    console.log(38, e)
    let {key, domEvent } = e 
    console.log(key, domEvent)
  } 
  return (
    <Dropdown
        menu={{
          items: dropdownMenu,
          onClick:dropdownClick
        }}
      >
      <a onClick={e => e.preventDefault()}>
          <Space >
              Hover me
              <DownOutlined />
          </Space>
        </a>
      </Dropdown>
  )
}