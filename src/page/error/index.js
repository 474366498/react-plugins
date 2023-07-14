
import { useLocation } from "react-router"


function Error() {
  let location = useLocation()
  console.log(7, location)
  return (
    <div> <strong>{location.pathname}</strong> component is error </div>
  )
}

export default Error

