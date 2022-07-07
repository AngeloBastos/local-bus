import React, { createContext, useState, useEffect } from 'react'
import * as auth from '../services/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../services/api'

type User = {

}

interface AuthContextData {
  signed: boolean,
  user: object | null,
  loading: boolean
  signIn(user: auth.UserSignIn): Promise<void>
  signOut(): Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider ({ children }: any) {
  const [user, setUser] = useState<object | null>(null)
  const [loading, setloading] = useState<boolean>(true)

  useEffect(() => {
    async function loadStorageData() {
      const[[, storageUser], [, storageToken]] = await AsyncStorage.multiGet(['@RNAuth:user','@RNAuth:token'])
      
      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser))
        setloading(false)

        api.defaults.headers.common['Authorization'] = "Bearer " + storageToken;
      }
    }
    loadStorageData()
  },[])

  async function signIn (user: auth.UserSignIn) {
    const response = await auth.signIn(user)

      setUser(response.user)
      await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user))
      await AsyncStorage.setItem('@RNAuth:token', response.token)

      api.defaults.headers.common['Authorization'] = "Bearer " + response.token;
  }

  async function signOut () {
    await AsyncStorage.clear()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
