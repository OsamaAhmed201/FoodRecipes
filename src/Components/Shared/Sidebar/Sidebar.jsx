import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import logo from '../../../assets/logo-dash.png'
import { AuthContext } from '../../Context/authContext/AuthContextProvider.jsx';
import { jwtDecode } from 'jwt-decode';
export default function SideBar() {
  let {  LogData } = useContext(AuthContext)
  let [iscollapse, setIsCollapse] = useState(false)
  let btnCollapse = () => {
    setIsCollapse(!iscollapse)
  }


  let role = LogData?.userGroup;






  return (
    <>
      <div className="sidbarContant ">
        <Sidebar collapsed={iscollapse}  >
          <Menu className='my-5'>
            <MenuItem onClick={btnCollapse} className={`logoSidbar mb-4 ${iscollapse ? '' : 'mb-5'}`}> <img className='img-logo-Dash w-100' src={logo} alt="logo-Dashboard" /> </MenuItem>
            <MenuItem icon={<i className="fa-solid fa-house"></i>} component={<Link to="/dashboard" />}> Home </MenuItem>
            <MenuItem icon={<i className="fa-solid fa-burger"></i>} component={<Link to="/dashboard/recipes" />}> Recipes </MenuItem>
            {role === "SystemUser" ? <MenuItem icon={<i class="fa-solid fa-heart"></i>} component={<Link to="/dashboard/favouruites" />}> Favorites </MenuItem> :''}
            {role === "SystemUser" ? '' : <MenuItem icon={<i className="fa-solid fa-calendar-days"></i>} component={<Link to="/dashboard/categories" />}> Categories </MenuItem>}
            {role === "SystemUser" ? '' : <MenuItem icon={<i className="fa-solid fa-users"></i>} component={<Link to="/dashboard/users" />}> Users </MenuItem>}
    

          </Menu>
        </Sidebar>;
      </div>


    </>

  )
}