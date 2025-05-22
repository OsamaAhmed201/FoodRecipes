import React from 'react'
import Navbar from './../Navbar/Navbar';
import Header from './../Header/Header';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar.jsx';


export default function MasterLayout() {
  return (
    <>
      <div className="d-flex">
        <div >
          <Sidebar />
        </div>
        <div className="w-100 ">
          <Navbar />
       
          <Outlet />
        </div>

      </div>


    </>
  )
}
