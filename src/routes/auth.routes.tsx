import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Signin from '../screens/Signin'
import Register from '../screens/Register'

const AuthStack = createNativeStackNavigator()

export default function AuthRoutes () {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="SignIn" component={Signin}/>
      <AuthStack.Screen name="Register" component={Register}/>
    </AuthStack.Navigator>
  )
}
