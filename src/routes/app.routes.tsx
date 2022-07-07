import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useContext } from 'react'
import AuthContext from '../contexts/auth'

import Driver from '../screens/Driver'
import User from '../screens/User'

const AppStack = createNativeStackNavigator()

export default function AppRoutes () {
  const { user }: any = useContext(AuthContext)

  function isDriver (): boolean {
    return user?.role == 'DRIVER'
  }
 
  return (
    <AppStack.Navigator>
      {isDriver()
        ?(<AppStack.Screen name="Driver" options={{headerTitle: 'Motorista'}} component={Driver}/>)
        :(<AppStack.Screen name="User" options={{headerTitle: 'Usuário'}} component={User}/>)
      }
      </AppStack.Navigator>
  )
}
