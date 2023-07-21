

import { useMemo, useState } from 'react'
import { Virtuoso, TableVirtuoso } from 'react-virtuoso'
import { generateUsers } from '../data'


export default function UseReactVirtuoso() {
  const users = useMemo(() => generateUsers(1e4), [])
  const [range, setRange] = useState({
    start: 0,
    end: 0
  })
  const [scrolling, setScrolling] = useState(false)
  const onHandleRangeChanged = e => {
    let { startIndex, endIndex } = e

    setRange({
      start: startIndex,
      end: endIndex
    })
  }
  return (
    <>
      <div>
        react-virtuoso 用起还是相当顺溜的
        <a href="https://virtuoso.dev/auto-resizing/"> react-virtuoso demo </a>
      </div>
      <div> <p> rangeChanged : {range.start} ~ {range.end}</p> </div>
      <div className='flex flex-jc-sa'>
        <Virtuoso
          style={{ height: 400, width: 400 }}
          data={generateUsers(1e4)}
          itemContent={(index, user) => {
            // console.log(index, user)
            return (
              <div style={{
                backgroundColor: user?.bgColor || 'white',
                padding: '1rem .5rem'
              }}>
                <h4>{user?.name}</h4>
                <div style={{ marginTop: '1rem' }}>{user?.description}</div>
              </div>
            )
          }}
          rangeChanged={onHandleRangeChanged}
        />
        <Virtuoso
          style={{ height: 400, width: 400 }}
          totalCount={users.length}
          isScrolling={scrolling}
          itemContent={i => {
            let user = users[i]
            return (
              <div style={{
                backgroundColor: user.bgColor,
                padding: '1rem .75rem'
              }}>
                <h4>{user.name}</h4>
                <p style={{ marginTop: '1rem' }}>{user.description}</p>
              </div>
            )
          }}
          components={{
            Footer: () => (
              <div style={{ color: 'red', padding: '1rem' }}> 1e4 条数据 到底了</div>
            )
          }}
        />
      </div>
      <br /> <br /> <br />
      <div className='flex flex-jc-sa'>
        <TableVirtuoso
          style={{ height: 200, width: 400 }}
          data={generateUsers(1e3, 1e4)}
          fixedHeaderContent={() => (
            <tr style={{ backgroundColor: 'gray' }}>
              <th>name</th>
              <th>description</th>
            </tr>
          )}
          itemContent={(index, user) => (
            <>
              <th>{user.name}</th>
              <td>{user.description}</td>
            </>
          )}
        />
      </div>
    </>
  )
}



