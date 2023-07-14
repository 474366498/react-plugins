
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input } from 'antd'

import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login, asyncLogin } from '../../redux/reducer/user'


import './login.scss'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onFinish = (value) => {
    console.log('finish', value)
    let { username, password, remember } = value

    // dispatch(asyncLogin({ username, password }))
    setTimeout(() => {
      dispatch(login({ username, password }))
      navigate('/tab')
    }, 3000);

  }
  const onFinishFailed = failedInfo => {
    console.log('failed', failedInfo, failedInfo.values)
  }
  return (
    <div className='flex flex-dir-c flex-ai-c flex-jc-c login'>
      <Form className='flex flex-dir-c flex-jc-se' name='login' initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item>
          <h4 className='text-align-c'>系统登录窗口</h4>
        </Form.Item>
        <Form.Item name='username' rules={[{ required: true, message: 'Place input you username' }]}>
          <Input size='large' prefix={<UserOutlined />} placeholder='Place input username' />
        </Form.Item>
        <Form.Item name='password' rules={[{ required: true, message: 'Place input you password' }]}>
          <Input size='large' prefix={<LockOutlined />} placeholder='Place input password' />
        </Form.Item>
        <Form.Item name='remember' valuePropName='checked' >
          <Checkbox>remember me</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button block type='primary' size='large' htmlType="submit">submit</Button>
        </Form.Item>
        <Form.Item>
          <p className='text-align-c'>系统基本信息说明</p>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login 