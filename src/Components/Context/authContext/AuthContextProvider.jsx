import React, { createContext, useEffect, useState } from 'react'
export let AuthContext = createContext()
export default function AuthContextProvider({ children }) {
  let [token, setToken] = useState(null)
  useEffect(() => {
    let TokenStorge = localStorage.getItem('token')
    if (TokenStorge) {
      setToken(TokenStorge)
    }

  }, [])
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  )
}
