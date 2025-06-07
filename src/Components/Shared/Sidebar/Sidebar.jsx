import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import logo from '../../../assets/logo-dash.png'
import { AuthContext } from '../../Context/authContext/AuthContextProvider.jsx';
import { jwtDecode } from 'jwt-decode';
export default function SideBar() {
  let { setToken, token } = useContext(AuthContext)
  let [iscollapse, setIsCollapse] = useState(false)
  let btnCollapse = () => {
    setIsCollapse(!iscollapse)
  }


  let navigate = useNavigate()
  function logOut() {
    localStorage.removeItem("token")
    setToken(null)
    navigate("/login")
  }

  


  return (
    <>
      <div className="sidbarContant ">
        <Sidebar collapsed={iscollapse}  >
          <Menu className='my-5'>
            <MenuItem onClick={btnCollapse} className={`logoSidbar mb-4 ${iscollapse ? '' : 'mb-5'}`}> <img className='img-logo-Dash w-100' src={logo} alt="logo-Dashboard" /> </MenuItem>

            <MenuItem icon={<i className="fa-solid fa-house"></i>} component={<Link to="/dashboard" />}> Home </MenuItem>
            <MenuItem icon={<i className="fa-solid fa-users"></i>} component={<Link to="/dashboard/users" />}> Users </MenuItem>
            <MenuItem icon={<i className="fa-solid fa-burger"></i>} component={<Link to="/dashboard/recipes" />}> Recipes </MenuItem>
            <MenuItem icon={<i className="fa-solid fa-calendar-days"></i>} component={<Link to="/dashboard/categories" />}> Categories </MenuItem>
            <MenuItem icon={<i className="fa-solid fa-unlock-keyhole"></i>} component={<Link to="/dashboard/change-password" />}>  Change Password </MenuItem>
            <MenuItem onClick={() => { logOut() }} icon={<i className="fa-solid fa-right-from-bracket"></i>}> Logout </MenuItem>

          </Menu>
        </Sidebar>;
      </div>


    </>

  )
}