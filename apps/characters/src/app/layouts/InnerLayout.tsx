import { Outlet } from "react-router-dom"

const InnerLayout = () => {
  return (
    <div>
        <Outlet />
    </div>
  )
}

export default InnerLayout