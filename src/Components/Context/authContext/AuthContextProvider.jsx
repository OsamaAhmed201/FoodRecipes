import { jwtDecode } from 'jwt-decode'
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
export let AuthContext = createContext()
export default function AuthContextProvider({ children }) {
  let [token, setToken] = useState(null)
  let [LogData, setLogData] = useState(null)
  function logOut() {
    localStorage.removeItem("token")
    setToken(null)
   
  }
  useEffect(() => {
    let TokenStorge = localStorage.getItem('token')

    if (TokenStorge) {
      setToken(TokenStorge)
      setLogData(jwtDecode(TokenStorge))
    }

  }, [])
  return (
    <AuthContext.Provider value={{ token, setToken, LogData, setLogData ,logOut}}>
      {children}
    </AuthContext.Provider>
  )
}
