import { Button, Checkbox, Input } from "antd"
import { useState } from "react"
import bMd5 from 'blueimp-md5'


function BlueimpMd5() {
  const [flg, setFlg] = useState(),
    [key, setKey] = useState(),
    [hasKey, setHasKey] = useState(),
    [pass, setPass] = useState(''),
    [encryptStr, setEncryptStr] = useState('');

  const onEncryptPass = () => {
    console.log(14, pass)
    if (flg && key) {
      setEncryptStr(bMd5(pass, key, true))
    } else if (flg) {
      setEncryptStr(bMd5(pass, null, true))
    } else if (hasKey && key) {
      setEncryptStr(bMd5(pass, key))
    } else {
      setEncryptStr(bMd5(pass))
    }
  }
  return (
    <section className='flex flex-dir-c'>
      <p>  blueimp-md5 <a href="https://www.npmjs.com/package/blueimp-md5">github</a></p>
      <div className='flex flex-dir-c'>
        <p>has布尔:<Checkbox checked={flg} onChange={e => setFlg(e.target.checked)} /></p>
        <p className="flex"><label>key(额外):</label><Input value={key} onChange={e => setKey(e.target.value)}></Input></p>
        <p>是否有key:<Checkbox checked={hasKey} onChange={e => setHasKey(e.target.checked)} /> </p>
      </div>
      <Input.TextArea rows='4' value={pass} onChange={e => setPass(e.target.value)} />
      <Button type='primary' onClick={onEncryptPass}>加密pass</Button>
      <Input.TextArea rows='7' disabled value={encryptStr} />
    </section>
  )
}

export default BlueimpMd5