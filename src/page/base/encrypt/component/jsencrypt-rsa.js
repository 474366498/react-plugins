
import { Button, Input } from 'antd'

import JSEncrypt from "jsencrypt"
import { useState } from 'react'

console.log('JSEncrypt', JSEncrypt)

const publicKey = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDi9oEgpnBi2s+5Oqliqf+scAvFJ8px8qzBrOGuBESLoOA2n//MEn7SUIpV3Ehpws77IxSVW4Xf+c5u5bw8+5nVztl80OSvLaSZbNB1ThuKm2BjY2lzIxt3ESFg9yDG88ivlDDMo1cQG+vYQybBJFzYcELaurUQt+L6skiwh8UYiwIDAQAB`,
  privateKey = `MIICXQIBAAKBgQDi9oEgpnBi2s+5Oqliqf+scAvFJ8px8qzBrOGuBESLoOA2n//MEn7SUIpV3Ehpws77IxSVW4Xf+c5u5bw8+5nVztl80OSvLaSZbNB1ThuKm2BjY2lzIxt3ESFg9yDG88ivlDDMo1cQG+vYQybBJFzYcELaurUQt+L6skiwh8UYiwIDAQABAoGAW+P95+A7RGrfC1mq1t2JPKGowkwX9QaR12BNhw0HS5j47mTdRhx+6Fvfhl/Hmbpb3uYXIVmK3GHhqJivG+mqIFlupMF5rguoFjEOIdG64uYsuU9+L92YbztKuz3O4lZNgWBGg3O56GwPb4z4cu9jFSwzG/ygshIOC0IV5NQ8r6ECQQD5qhh5gBo1gfxVlcsDSB4uMN2yDQXaX6iyZsVm7i1Zr5G1kWtmrjoNCJOJwHPiurRT7kLsMSpQvtYblnw8gmejAkEA6LjumJcBySrfsINw9xf+1ZSjYyPRkUieztu71xv24vsJjZSYk1fjVYgjID9ONBZf72gZdYP4b/pG+Q5Vdmk5+QJBAOriLT55166JiTWXxLRksAgy7w/pEp2dK6AT8hnhcIcVF1ej5VBoD7NdYzjQ9/XSQ39HBG0j4DSxJcw0qtNeuFMCQGqrMTmhpYDmdOc8KBAp4HVXDtjHNyxnY9se3mdHew8oz4UkghavJxUyNB94xMidJNXgGiNCHSJ+Tf+kMUn4C0kCQQCWg9iBZmMPm6O77om7L6fO1i5E9GLnXzvJNKjb7bUXLmYsZpIGkICm+EmheVwOl4lNw4Gj8A4n3lz0fkB50ZR1`

function Jsencrypt() {
  const [pass, setPass] = useState(),
    [encryptPass, setEncryptPass] = useState('');
  let encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey)
  encryptor.setPrivateKey(privateKey)
  const desEncrypt = () => {
    if (!pass) return
    console.log(pass)
    setEncryptPass(encryptor.encrypt(pass))
  },
    desDecrypt = () => {
      if (!encryptPass) return
      let _pass = encryptor.decrypt(encryptPass)
      console.log(`%c ${pass === _pass}`, 'background-color:red',)
    }
  return (
    <section className='flex flex-dir-c'>
      <p>jsencrypt <a target='_blank' href='https://github.com/travist/jsencrypt'>github</a></p>
      <div className='flex flex-dir-c'>
        <Input.TextArea rows='3' value={pass} onChange={e => setPass(e.target.value)}></Input.TextArea>
        <Input.TextArea rows='8' value={encryptPass} disabled ></Input.TextArea>
        <Button.Group>

          <Button type='primary' onClick={desEncrypt} > 加密pass</Button>
          <Button type='default' onClick={desDecrypt}>解密encryptPass</Button>
        </Button.Group>
      </div>
    </section>
  )
}

export default Jsencrypt