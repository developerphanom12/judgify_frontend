import React from 'react'
// import { Sidebar } from '../Sidebar/Sidebar'
// import { Login } from '../../Components/Admin-Creating-New-Event/LoginPages/Login/Login'
import { Register } from '../../Components/Admin-Creating-New-Event/LoginPages/Register/Register'

export const Layout = ({ children }) => {
  return (
  <>
    <div className="main_bar">
      <Register/>
      {/* <div className="sideBar">
        <Sidebar/>
      </div> */}

      <div className="main_body">{children}</div>

    </div>
  </>
  )
}
