import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/authContext/AuthContextProvider.jsx'

export default function Sidebar() {
  let { setToken } = useContext(AuthContext)
  let navigate = useNavigate()
  function logOut() {
    localStorage.removeItem("token")
    setToken(null)
    navigate("/login")
  }
  return (
    <>
      <div className="text-center">
        <div>Sidebar</div>
        <button className='p-2 rounded-3' onClick={() => { logOut() }}>LogOut</button>
      </div>
    </>

  )
}