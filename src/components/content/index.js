import { Route, Routes, useRoutes } from "react-router"
import Login from '../../page/login'

import RouteAuth from "../auth/routeAuth"

import { routes } from '../../router'

function Content() {
  const Element = useRoutes(routes)
  console.log('content 11', Element, routes)
  return (
    <div className="flex flex-1">
      <RouteAuth >{Element} </RouteAuth>
      <Routes>
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default Content 
