
import React, { useState } from 'react'

import AutoCanvasPx from './components/canvas-px'
import AutoCropPlugin from './components/autocrop'
export default function AutoCrop() {
  return (
    <section className='flex flex-dir-c'>
      auto~corp 裁剪图片四周白(偏白-无内容)区域
      <AutoCanvasPx />
      {/* <AutoCropPlugin />  */}
    </section>
  )
}

