
import React, { Component } from 'react'

import UseReactQuill from './components/react'
import UseQuillEditor from './components/useQuill'

export default class QuillEditor extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div className='flex flex-dir-c'>
        <div >
          <a href="https://www.npmjs.com/package/quill?activeTab=versions"> quill npm </a>
          <a href="https://www.kancloud.cn/liuwave/quill/1434144"> quill 中文</a>
          <a href="https://quilljs.com/docs/api/#insertembed" > quill 原文档</a>
        </div>
        <UseReactQuill />
        <br />
        <br />
        <br />
        <br />
        <UseQuillEditor />
      </div>
    )
  }

}

