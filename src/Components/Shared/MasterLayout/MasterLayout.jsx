import React from 'react'
import Navbar from './../Navbar/Navbar';
import Header from './../Header/Header';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar.jsx';


export default function MasterLayout() {
  return (
    <>
      <div className="d-flex">
        <div className="w-25 bg-danger">
          <Sidebar />
        </div>
        <div className="w-75 bg-info">
          <Navbar />
          <Header />
          <Outlet />
        </div>

      </div>


    </>
  )
}
