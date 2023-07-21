
import  React , { useEffect, useRef } from 'react'
import {Link , NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import UseReactVirtualized from './components/use-react-virtualized'

import UseReactVirtuoso from './components/use-react-virtuoso'

export default function VirtualList() {
  const location = useLocation(),
    navigate = useNavigate()
  console.log(10, location)
  
  // useEffect(() => { 
  //   if (location.pathname === '/virtual') {
  //       console.log('转')
  //       navigate('virtual/react-virtuoso')    
  //     }
  // },[])
  const links = [
    {label:'react-virtuoso' , name : '?react-virtuoso',element:<UseReactVirtuoso />} ,
    {label:'react-virtualized' , name : '?react-virtualized',element:<UseReactVirtualized />} ,
    // {label:'' , name : ''} ,
  ]
  const renderCom = () => (location.search && links.find(link=>link.name == location.search).element) || <UseReactVirtualized />
  return (
    <div className='flex flex-dir-c'>
      <div className='flex flex-jc-sa'>
        {links.map(link =>(
          <NavLink key={ link.name} to={link.name}>{ link.label}</NavLink>
        ))}
      </div>
      {/* <Routes className='flex' path='/virtual'>
        {links.map(link => (
          <Route key={ link.name} path={ link.name} element={link.element} />
        ))}
        <Route path='*' element={<UseReactVirtuoso />}></Route>
        
      </Routes> */}
      {
        renderCom()
      }
      
    </div>
  )
}


