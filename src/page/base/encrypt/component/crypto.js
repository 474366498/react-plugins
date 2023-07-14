

import { useState } from 'react'
import { Button, Input } from "antd";
import C from 'crypto-js'

const key = '1234567890987654321',
  Iv = C.enc.Utf8.parse('abcdefghijklmnopqrstxyz')

function Crypto() {
  const [pass, setPass] = useState(),
    [encryptPass, setEncryptPass] = useState('')

  const onHandleEncrypt = () => {
    if (!pass) return
    let _pass = JSON.stringify(pass)
    setEncryptPass(C.AES.encrypt(_pass, key).toString())
  },
    onHandleDecrypt = () => {
      let bytes = C.AES.decrypt(encryptPass, key)
      let _pass = JSON.parse(bytes.toString(C.enc.Utf8))
      console.log(`%c ${_pass == pass}`, 'background-color:red;')
    }
  return (
    <section className='flex flex-dir-c'>
      <p> crypto~js <a target='_blank' href="https://github.com/brix/crypto-js"> github</a> , <a target='_blank' href="http://t.zoukankan.com/tommymarc-p-13187435.html">文章</a> </p>
      <div className="flex flex-dir-c">
        <Input.TextArea value={pass} onChange={e => setPass(e.target.value)} rows='4'></Input.TextArea>
        <Input.TextArea value={encryptPass} rows='8' disabled></Input.TextArea>
        <Button.Group>
          <Button type='primary' onClick={onHandleEncrypt}> 加密</Button>
          <Button onClick={onHandleDecrypt}>解密</Button>
        </Button.Group>
      </div>
    </section>
  )
}

export default Crypto
