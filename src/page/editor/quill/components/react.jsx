
import { Button } from 'antd'
import React, { Component } from 'react'
import ReactQuill , {Quill} from 'react-quill'
import 'react-quill/dist/quill.snow.css'

// https://quilljs.com/docs/quickstart/   https://www.npmjs.com/package/react-quill?activeTab=readme#default-toolbar-elements  https://www.jianshu.com/p/c552af25b56b
export default class UseReactQuill extends Component {
 constructor(props) {
    super(props)
    
    var modules = {
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'],        // 切换按钮
          ['blockquote', 'code-block'],

          // [{ 'header': 1 }, { 'header': 2 }],               // 用户自定义按钮值
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'script': 'sub' }, { 'script': 'super' }],      // 上标/下标
          [{ 'indent': '-1' }, { 'indent': '+1' }],          // 减少缩进/缩进
          [{ 'direction': 'rtl' }],                         // 文本下划线

          [{ 'size': ['small', false, 'large', 'huge'] }],  // 用户自定义下拉
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

          [{ 'color': [] }, { 'background': [] }],          // 主题默认下拉，使用主题提供的值
          [{ 'font': [] }],
          [{ 'align': [] }],
          ['link', 'image', 'video'],
          ['clean']                                         // 清除格式
        ],
        handlers: {
          // 'script': this.onHandlerScript.bind(this),
          // 'video': this.showVideoModel.bind(this)
        }
      }
    },
    formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image'
      ]
    this.state = {
      theme: 'snow',
      modules ,
      formats ,
      enabled: true,
      readOnly: false,
      value: { ops: [] },
      events: [],
      
    }
  }
  formatRange(range) {
    console.log(55, range)
    return range
      ? [range.index, range.index + range.length].join(',')
      :'none'
  }
  onEditorFocus = (range,source) => {
    this.setState({
      events : [`[${source}] focus(${this.formatRange(range)})`].concat(this.state.events)
    })
  }
  onEditorBlur = (prevRange, source) => {
    this.setState({
      events : [`[${source}] blur(${this.formatRange(prevRange)})`].concat(this.state.events)
    })
  }
  onEditorChange = (value, delta, source, editor) => {
    this.setState({
      value: editor.getContents(),
      events:[`[${source}] text-change`,...this.state.events]
    })
  }
  onEditorChangeSelection = (range, source) => {
    this.setState({
      selection: range,
      events : [`[${source}] selection-change(${this.formatRange(this.state.selection)} -> ${this.formatRange(range)})`,...this.state.events]
    })
  }
  render() {
    return (
        <div className='flex flex-dir-c'>
          {this.renderToolbar()}
          <hr />
          {this.renderSidebar()}
          {
            this.state.enabled &&
          <ReactQuill
            formats={this.state.formats}
            modules={this.state.modules}
              theme={this.state.theme}
              value={this.state.value}
              readOnly={this.state.readOnly}
              onFocus={this.onEditorFocus}
              onBlur={this.onEditorBlur}
              onChange={this.onEditorChange}
              onChangeSelection={this.onEditorChangeSelection}
            />
          }
        </div>
    )
  }

  renderToolbar() {
    let { enabled, readOnly , selection} = this.state 
    let Selection = this.formatRange(selection)

    return <div className='toolbar'>
      <Button.Group>
        <Button>{enabled ? 'Disable' : 'Enable'}</Button>
        <Button>{readOnly ? 'read/write' : 'read-only'}</Button>
        <Button > Fill contents </Button>
        <Button> Selection:{ Selection }</Button>
      </Button.Group>
    </div>
  }
  renderSidebar() {
    return ( <div className='flex '>
      <textarea
          style={{ display:'block', width:300, height:300 }}
          value={JSON.stringify(this.state.value, null, 2)}
          readOnly={true}
        />
        <textarea
          style={{ display:'block', width:300, height:300 }}
          value={this.state.events.join('\n')}
          readOnly={true}
        />
    </div>)
   
  }
}