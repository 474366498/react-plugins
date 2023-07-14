import { Component } from "react";
import WangEdit from "./wang-react";
import UseWangEditor from './use-wang/index'

export default class WangEditor extends Component{
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="flex flex-dir-c ">
        <div className="flex flex-ai-c flex-jc-c"> <a href="https://www.wangeditor.com/v5/for-frame.html#react">wangEditor 文档地址</a></div>
        <div className="flex flex-jc-sa">
          <WangEdit /> 
          <UseWangEditor /> 
        </div>
      </div>
    )
  }
}
