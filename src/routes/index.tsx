import React, { useContext } from 'react'

import AuthContext from '../contexts/auth'

import AuthRoutes from './auth.routes'
import AppRoutes from './app.routes'
import { ActivityIndicator, View } from 'react-native'

export default function Routes () {
  const { signed, loading } = useContext(AuthContext)

  // if (loading) {
  //   return (
  //     <View style={{flex: 1, backgroundColor: '#EFF5EE', justifyContent: 'center', alignItems: 'center'}}>
  //       <ActivityIndicator size='large' color='#2A2B4D'/>
  //     </View>
  //   )
  // }

  return signed ? <AppRoutes /> : <AuthRoutes /> 
}
