import React, { useContext } from 'react'
import imguser from '../../../assets/img_User.png'
import Dropdown from 'react-bootstrap/Dropdown';
import { AuthContext } from '../../Context/authContext/AuthContextProvider.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { set } from 'react-hook-form';
export default function Navbar() {
  let {  setToken,setLogData,LogData } = useContext(AuthContext)
  let navigate = useNavigate()
  function logOut() {
    localStorage.removeItem("token")
    setToken(null)
    navigate("/login")
  }

  let userName = (LogData)


  return (
    <>
      <div className="container navbar  d-flex align-items-center justify-content-end ">
        <div className="text-end my-2 mx-5   d-flex">

          <span className="dropdown d-flex align-items-center ">
            <button className="btn " type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fa-solid fa-play"></i>
            </button>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" to="/dashboard/personal_data"> <i class="fa-solid fa-pen-to-square"></i>  Personal Data</Link></li>
              <li><Link className="dropdown-item" to="/dashboard/change-password"> <i className="fa-solid fa-unlock-keyhole text-info "></i> Change Password</Link></li>
              <li><Link onClick={() => { logOut() }} className="dropdown-item" ><i className="fa-solid fa-right-from-bracket text-danger"></i> Logout</Link></li>
            </ul>
          </span>

          <span className=" mx-3 position-relative d-flex align-items-center">
            <div>
              <i className="fa-solid fa-bell"></i>
              <div className="dot"></div>
            </div>
          </span>
          <img src={imguser} className='img_nav rounded-circle mx-2' alt="" />

          <span className="d-flex flex-column text-center">
            <span>{userName?.userName}</span>
            <span className="admin tex">{userName?.roles[0]}</span>
          </span>


        </div>
      </div>
    </>
  )
}
