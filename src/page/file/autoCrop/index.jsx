
import React, { useState } from 'react'

import AutoCanvasPx from './components/canvas-px'
import AutoCropPlugin from './components/autocrop'
export default function AutoCrop() {
  return (
    <section className='flex flex-dir-c'>
      auto~corp
      <AutoCanvasPx />
      <AutoCropPlugin /> 
    </section>
  )
}

