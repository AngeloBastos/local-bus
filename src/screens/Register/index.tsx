import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import api from '../../services/api'

export default function Login () {
  const navigation = useNavigation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  let isValidRequiredField = !name|| !email || !password
  
  async function handleRegister () {
    api.post('/users', {
      name,
      email,
      password
    })
    .then(() => {
      navigation.navigate('SignIn' as never)
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.containerForm}>
        <Image
          source={require('../../../assets/icon.png')}
          resizeMode='contain'
          style={{width: 100, height: 100}}
        />
        
        <TextInput 
          style={styles.input}
          placeholder='Digite seu nome'
          onChangeText={setName}
          value={name}
        />

        <TextInput 
          style={styles.input} 
          placeholder='Digite seu email'
          onChangeText={setEmail}
          keyboardType='email-address'
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
          style={!isValidRequiredField ? styles.button : styles.buttonDisable}
          onPress={handleRegister}
          disabled={isValidRequiredField}
          >
          <Text style={styles.buttonText}>Cadastar</Text>
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
  buttonDisable: {
    backgroundColor: "#ff644f8f",
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
