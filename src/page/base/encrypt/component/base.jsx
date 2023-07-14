



import { Button, Input  , message } from "antd"
import { useState } from "react"


function Base64() {
  const { TextArea } = Input 
  const [text, setText] = useState(),
    [textBase, setTextBase] = useState(),
    [messageApi, contextHolder] = message.useMessage();
  console.log(14,message)
  const onToBase64 = (e) => {
    console.log('base', text,window)
    if (text) {
      let ps = window.btoa(text)
      setTextBase(ps)
    }
  },
    baseToStr = () => {
      if (textBase) {
        let t = window.atob(textBase)
        console.log(23, t)
        messageApi.info(t)
    }
  }
  return (
    <div className='flex flex-dir-c'>
      {contextHolder}
      <TextArea rows={4} value={text} onChange={e => { setText(e.target.value)}} />
      <Button type="primary" onClick={onToBase64}>转base64</Button>
      <TextArea rows={6} value={textBase} disabled></TextArea>
      <Button type='ghost' onClick={baseToStr}>转回文本</Button>
      <a target='_blank' href='www.baidu.com'>百度了解更多 window.btoa window.atob </a>
    </div>
  )  
}


export default Base64