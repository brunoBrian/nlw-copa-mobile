import React, { createContext } from 'react'

export interface UserProps {
  avatarUrl: string;
  name: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  signIn: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }) {
  async function signIn() {
    console.log('Ok google');
  }

  return (
    <AuthContext.Provider value={{
      user: {
        name: 'Bruno',
        avatarUrl: 'klnl'
      },
      signIn
    }}>
      {children}
    </AuthContext.Provider>
  )
}