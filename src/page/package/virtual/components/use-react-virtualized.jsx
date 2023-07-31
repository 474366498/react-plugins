

import { InputNumber, Switch } from "antd";
import React, { Component, useEffect, useMemo , useRef, useState } from "react";

import VirtualizedListClass from './virtualized/list-class'
import VirtualizedListFunction from './virtualized/list-function'

import VirtualizedCollection from './virtualized/collection'

import VirtualizedGrid from "./virtualized/grid";

import VirtualizedMasonry from './virtualized/masonry'

import VirtualizedTable from './virtualized/table'

export default function UseReactVirtualized() {

  return (
    <div className="flex flex-dir-c">
      <div >
        react-virtualized
        <a href="https://github.com/bvaughn/react-virtualized"> github </a>
        <a href='https://github1s.com/bvaughn/react-virtualized/blob/master/source/Table/Table.example.js#L202'> demo code github </a>
        <a href="https://bvaughn.github.io/react-virtualized/#/components/Table"> demo </a>
      </div>
      <div className="flex flex-jc-sa">
        <VirtualizedListClass />
        <VirtualizedListFunction />
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="flex flex-jc-sa">
        <VirtualizedCollection />
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="flex flex-jc-sa">
        <VirtualizedGrid />
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="flex flex-jc-sa">
        <VirtualizedMasonry /> 
      </div>
      <br />
      <br />
      <br />
      <div className='flex flex-jc-sa'>
        <VirtualizedTable /> 
      </div>
    </div>
  )
}
