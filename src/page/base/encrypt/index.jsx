

import React  from "react";
import { Tabs } from "antd";
import Base64 from "./component/base";
import JsMd5 from "./component/js-md5";
import BlueimpMd5 from './component/blueimp-md5'
import Jsencrypt from './component/jsencrypt-rsa'
import Crypto from './component/crypto'


class Encrypt extends React.Component{
  constructor() {
    super()
    this.state = {
      key : 'base64'
    }
  }
  componentDidMount() {
    console.log('mount encrypt')
  }
  componentDidUpdate() {
    console.log('update encrypt')
  }
  render() {
    const items = [
      {
        key: 'base64',
        label: 'base64',
        children : <Base64 />
      },
      {
        key: 'js-md5',
        label: 'js-md5',
        children: <JsMd5 />
      },
      {
        key: 'blueimp-md5',
        label: 'blueimp-md5',
        children:<BlueimpMd5 />
      },
      {
        key: 'jsencrypt',
        label: 'jsencrypt',
        children: <Jsencrypt />
      },
      {
        key: 'crypto-js',
        label: 'crypto-js',
        children: < Crypto />
      }
    ]
    const onChange = (e) => {
      console.log(51, e)
      this.setState({
        key : e
      })
    }
    return (
      <section style={{maxWidth:'calc(100% - 20px)'}} >
        <h3> encrypt 加密</h3>
        <Tabs items={ items} activeKey={this.state.key} onChange={onChange}>

        </Tabs>
        
      </section>
    )
  }
}

export default Encrypt





