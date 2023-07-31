

import React, { Component } from 'react'

export default class Item extends Component {
  constructor(props) {
    super(props)
    // console.log(8, props.children)
  }
  componentDidMount() {
    this.props.cachePosition(this.node, this.props.index)
  }
  render() {
    const { index, children } = this.props
    return <div className='list-item' style={{ height: '60px' }} ref={el => this.node = el}>
      {children}
      <p>#${index} eligendi voluptatem quisquam</p>
      <p>Modi autem fugiat maiores. Doloremque est sed quis qui nobis. Accusamus dolorem aspernatur sed rem.</p>
    </div>
  }
}
