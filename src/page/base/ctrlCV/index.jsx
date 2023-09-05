import React, { useEffect } from 'react'

import { Button } from "antd";


export default function CtrlCv() {
  
  const onCopyText = async (e) => {
    let val = document.getElementById('msg').innerText 
    console.log(7, e , val , navigator.clipboard)
    if (navigator.clipboard && navigator.permissions) {
      await navigator.clipboard.writeText(val)
    } else {
      const text = document.createElement('textarea')
      text.value = val 
      text.style.width = 0 
      text.style.position = 'fixed'
      text.style.left = '-999px'
      text.style.top = '10'
      text.setAttribute('readonly', 'readonly')
      document.body.appendChild(text) 

      text.select() 
      document.execCommand('copy')
      document.body.removeChild(text)
    }
  }, onSelectText = e => {  // 向下兼容...
      let text = document.getElementById('p')
      if (document.body.createTextRange) {
        let rang = document.body.createTextRange() 
        rang.moveToElementText(text)
        rang.select()
      } else if (window.getSelection) {
        let selection = window.getSelection() 
        let rang = document.createRange()
        rang.selectNodeContents(text)
        selection.removeAllRanges()
        selection.addRange(rang)
        document.execCommand('copy')
      } else {
        console.log('none')
      }
    }
  
  useEffect(() => {
    console.log('create')
    window.addEventListener('copy', function (e) {
      console.log('copy',e)
    })
    return () => {
      console.log('destroy')
      window.removeEventListener('copy',function () {
        
      })
    }
  },[])
  
  return <div className="flex flex-dir-c flex-ai-c">
    <div className="flex flex-jc-sb">
      <p id='msg'>
        <a href="https://zhuanlan.zhihu.com/p/597944027?utm_id=0">JS复制文字到剪贴板的坑及完整方案</a>
        相信很多人做需求过程中，都遇到过把文字复制到剪贴板的功能。很不幸我也遇到了，本以为是一个简简单单的需求，开发测试过程中却遇到了不少坑，这里一一展开。
      </p>
      <div>
        <Button onClick={e => onCopyText(e)}>copy</Button>
        <Button onClick={e => onSelectText(e)}>select</Button>
      </div>
    </div>
    <p id='p'>pppppppppppppp</p>
    <div> 
      <a href="https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript/30810322#30810322">How do I copy to the clipboard in JavaScript? </a>
    </div>
  </div>
} 

//pppppppppppppp