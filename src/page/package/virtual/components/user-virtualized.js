

import React, { useState, useRef, useEffect, createRef } from 'react'

import UserVirtualizedSmall from './user/small'
import UserVirtualizedList from './user/virtualized'
import UserDynamicVirtualizedList from './user/dynamic-virtualized'

export default function UserVirtualized() {

  return (<div className='flex flex-dir-c'>
    <p style={{ color: 'red', fontWeight: 900 }}> 有些方法可以往 this.setState中放置执行 有些千万别....</p>
    <UserVirtualizedSmall />
    <br /> <br /> <br /> <br />
    <UserVirtualizedList />
    <br /> <br /> <br /> <br />
    <UserDynamicVirtualizedList />
  </div>)
}

