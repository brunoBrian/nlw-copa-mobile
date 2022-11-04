import React, { createContext, useEffect, useState } from 'react'
import * as GoogleAuth from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import { api } from '../services/api'

WebBrowser.maybeCompleteAuthSession()

export interface UserProps {
  avatarUrl: string;
  name: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState<UserProps>({} as UserProps)
  const [isUserLoading, setIsUserLoading] = useState(false)

  // promptAsync define quando vai abrir fluxo de autenticação
  const [request, response, promptAsync] = GoogleAuth.useAuthRequest({
    clientId: '169078025695-4f8i25ovt03geem019fefsj39vfm55rg.apps.googleusercontent.com',
    redirectUri: AuthSession.makeRedirectUri({useProxy: true}), 
    scopes: ['profile', 'email']
  })

  async function signIn() {
    try {
      setIsUserLoading(true)

      await promptAsync()
    } catch(err) {
      console.log(err)
      throw err
    } finally {
      setIsUserLoading(false)
    }
  }

  async function signInWithGoogle(access_token: string) {
    console.log('Token de autenticacao', access_token);

    try {
      setIsUserLoading(true)

      const tokenResponse = await api.post('/users', {
        access_token
      })

      api.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data?.token}`

      const userInfoResponse = await api.get('/me')

      setUser(userInfoResponse.data.user)
    } catch(err) {
      console.log(err)
      throw err
    } finally {
      setIsUserLoading(false)
    }
    
  }

  useEffect(() => {
    if(response?.type === 'success' && response?.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken)
    }
  }, [response])
  

  return (
    <AuthContext.Provider value={{
      isUserLoading,
      user,
      signIn
    }}>
      {children}
    </AuthContext.Provider>
  )
}