import React, { useContext } from 'react'
import imguser from '../../../assets/img_User.png'
import Dropdown from 'react-bootstrap/Dropdown';
import { AuthContext } from '../../Context/authContext/AuthContextProvider.jsx';
export default function Navbar() {
  let { LogData } = useContext(AuthContext)
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
              <li><a className="dropdown-item" href="#">P</a></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
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
