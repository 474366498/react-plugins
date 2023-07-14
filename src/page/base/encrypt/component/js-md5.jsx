
import jsMd5 from 'js-md5'
import { Button, Checkbox, Input } from 'antd'
import { useState } from 'react'

console.log('jsMd5',jsMd5('123'))

function JsMd5() {
  let options = [
    {
      label: 'hex',
      value:'hex'
    },
    {
      label: 'array',
      value:'array'
    },
    {
      label: 'digest',
      value:'digest'
    },
    {
      label: 'arrayBuffer',
      value:'arrayBuffer'
    },
    {
      label: 'buffer',
      value:'buffer'
    },
    {
       label: 'base64',
      value:'base64'
    }
  ]
  const [checkVal, setCheckVal] = useState(['hex']),
    [pass, setPass] = useState({text:'',hex:''});

  
  const onChangeCheckbox = (keys) => {
    // console.log(39, keys , pass.text)
    setCheckVal(keys)
    let newPass = { ...pass }
    keys.map(k => {
      newPass[k] = pass[k]||''
    })
    setPass(newPass)
  },
    onInputChange = (e) => {
      let newPass = { ...pass }
      newPass.text = e.target.value 
      setPass(newPass)
    },
    onExtendPass = () => {
      let newPass = {text:pass.text}
      checkVal.map(key => {
        let text = pass.text 
        newPass[key] = jsMd5[key](text)
      })
      // console.log(newPass)
      setPass(newPass)
    }
  
  return (
    <section className='flex flex-dir-c'>
      <p>jsMd5<a target='_blank' href="https://github.com/emn178/js-md5">github</a></p>
      <div className='flex flex-jc-sa'>
        <Checkbox.Group options={options} value={checkVal} onChange={onChangeCheckbox } />
      </div>
      <Input.TextArea rows='2' value={pass.text} onChange={onInputChange} />
      {
        Object.keys(pass).map(key => {
          console.log(61,key)
          if (key != 'text') {
            return <Input.TextArea rows='4' value={pass[key]} key={key} disabled />
          }
        })
      }
      <Button type='primary' onClick={onExtendPass} >js-md5 转义</Button>
    </section>
  )
}

export default JsMd5



