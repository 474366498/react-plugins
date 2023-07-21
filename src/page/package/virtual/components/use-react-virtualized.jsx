

import { InputNumber, Switch } from "antd";
import React, { Component, useEffect, useMemo , useRef, useState } from "react";

import VirtualizedListClass from './virtualized/list-class'
import VirtualizedListFunction from './virtualized/list-function'

import VirtualizedCollection from './virtualized/collection'

import VirtualizedGrid from "./virtualized/grid";

import VirtualizedMasonry from './virtualized/masonry'
export default function UseReactVirtualized() {

  return (
    <div className="flex flex-dir-c">
      <div > react-virtualized </div>
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
    </div>
  )
}
