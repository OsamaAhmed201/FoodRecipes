import { jwtDecode } from 'jwt-decode'
import React, { createContext, useEffect, useState } from 'react'
export let AuthContext = createContext()
export default function AuthContextProvider({ children }) {
  let [token, setToken] = useState(null)
  let [LogData, setLogData] = useState(null)
 

  useEffect(() => {
    let TokenStorge = localStorage.getItem('token')

    if (TokenStorge) {
      setToken(TokenStorge)
      setLogData(jwtDecode(TokenStorge))
    }
  }, [])

  return (
    <AuthContext.Provider value={{ token, setToken, LogData, setLogData }}>
      {children}
    </AuthContext.Provider>
  )
}
