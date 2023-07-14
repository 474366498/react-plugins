

import React from 'react'

import Icon ,{createFromIconfontCN} from '@ant-design/icons'

const IconFont = createFromIconfontCN({
  scriptUrl : '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js'
})

console.log(11,Icon , IconFont)
class UserIcon extends React.Component{
  constructor(props) {
    super()
    this.state = {
      types : []
    }
  }
  componentDidMount() {
    let svg = document.body.children[0]
    let svgChildren =Array.prototype.slice.call(svg.children)
    let types = svgChildren.map(item=>item.id)
    console.log(18, svg, svgChildren,types)
    this.setState({
      types
    })
  }
  render() {
    let types = this.state.types
    return (
      <section > 自定义 icon {types}
        <div className='flex flex-wrap'>
        {
          types.map((t) => (
            <span className='flex flex-dir-c' title={t} key={t}>
              <IconFont type={t} />
              <em>{t}</em>
            </span>
          ))
          }
          </div>
      </section>
    )
  }
}

export default UserIcon 

