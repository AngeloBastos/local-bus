import React, { useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import AuthContext from '../../contexts/auth'

export default function SigniIn () {
  const navigation = useNavigation()
  const {signIn} = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSignIn () {
    await signIn({email, password} as any)
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.containerForm}>
        <Image
          source={require('../../../assets/icon.png')}
          resizeMode='contain'
          style={{width: 100, height: 100}}/>
        <Text>Faça o login para começar</Text>
        <TextInput 
          style={styles.input} 
          placeholder='Digite seu email'
          keyboardType='email-address'
          onChangeText={setEmail}
          value={email}
        />
        
        <TextInput 
          style={styles.input} 
          placeholder='Digite sua senha'
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        
        <TouchableOpacity
          style={styles.button}
          onPress={handleSignIn}
        >
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.buttonRegister}
          onPress={() => navigation.navigate('Register' as never)}  
        >
          <Text style={styles.buttonTextRegister}>Não possui uma conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFF5EE',
    paddingHorizontal: '4%',
    paddingVertical: '4%',

  },
  containerLogo: {
    height: 100
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2A2B4D'
  },
  containerForm: {
    width: '100%',
    paddingVertical: '5%',
    paddingHorizontal: '4%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#CCD2CB',
    borderWidth: 1,
  },
  input: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#E6ECE5',
    borderRadius: 8,
    borderColor: '#CCD2CB',
    borderWidth: 1,
    marginBottom: '4%'
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf:"center"
  },
  buttonTextRegister: {
    color: "#a1a1a1"
  },
  button: {
    backgroundColor: "#FF634F",
    borderRadius: 4,
    paddingVertical: 8,
    width: "100%",
    height: 40,
    marginTop:14,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  },
})
