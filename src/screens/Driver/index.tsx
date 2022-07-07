import React, { useContext, useEffect, useState } from 'react'
import {Text, StyleSheet, Image, View, TouchableOpacity} from 'react-native'
import AuthContext from '../../contexts/auth'
import api from '../../services/api'
import * as Location from 'expo-location';

export default function Driver () {
  const {signOut, user} = useContext(AuthContext)
  const [permissionStatus, setPermissionStatus] = useState<Location.PermissionStatus>()
  const [errorMsg, setErrorMsg] = useState('')
  const [busInfo, setBusInfo] = useState<any>('')
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>()

  async function handleSignOut () {
    await signOut()
  }

  async function handleStart () {
    try {
      if (permissionStatus !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        return;
      }
      setIntervalId(setInterval(async () => {
        let location: Location.LocationObject = await Location.getCurrentPositionAsync({})
  
        if (!!busInfo) {
          console.log(busInfo.id,location?.coords.latitude, location.coords.longitude)
          api.put(`/bus/${busInfo.id}/currentcoord`, {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          })
        } 
        }, 5000)
      )
    } catch (error) {
      console.error(error)
    } 
  }
  
  async function handleStop () {
    clearInterval(intervalId)
    setIntervalId(undefined)
  }
  
  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync()
        setPermissionStatus(status)
        if (user?.id) {
          const res = await api.get(`bus/${user?.id}`)
          setBusInfo(res?.data)
        }
      } catch (error) {
        console.error(error)
      }
    })()
  })

  if (errorMsg)
    return (
      <View style={styles.container}>
        <Text
          style={{color: '#2A2B4D', fontSize: 24, textAlign: 'center'}}
        >
          Permission to access location was denied
        </Text>
      </View>
    )

  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
      <Image
          source={require('../../../assets/images/iconbus.png')}
          resizeMode='contain'
          style={{width: 60, height: 60, alignSelf: 'center', marginBottom: '8%'}}/>
        <View style={styles.contentInfo}>
          <Text style={styles.infoTitle}>Identificação:</Text>
            <Text style={styles.infoText}>{busInfo?.plateBus}</Text>
        </View>
        <View style={styles.contentInfo}>
          <Text style={styles.infoTitle}>Modelo:</Text>
          <Text style={styles.infoText}>{busInfo?.modelBus}</Text>
        </View>
        <View style={styles.contentInfo}>
          <Text style={styles.infoTitle}>Linha:</Text>
          <Text style={styles.infoText}>{busInfo?.lineName}</Text>
        </View>
        <View style={styles.contentInfo}>
          <Text style={styles.infoTitle}>Cor da linha:</Text>
          <View style={[styles.infoColor,{backgroundColor: busInfo?.lineColor}]}/>
        </View>
        <View style={styles.contentInfo}>
          <Text style={styles.infoTitle}>Max passageiros:</Text>
          <Text style={styles.infoText}>{busInfo?.passengersBus}</Text>
        </View>
      </View>
      <View style={styles.containerAcction}>
        <View style={styles.contentInfoAcction}>
          <Text style={styles.infoTitle}>Controle</Text>
          <Text style={styles.infoText}>Inicia a rota para o rastreamente.</Text>
        </View>
        <TouchableOpacity 
          style={[
            {backgroundColor: !intervalId ? "#13C985" : "#FF634F"},
            styles.acctionButton
          ]}
          onPress={!intervalId ? handleStart : handleStop} 
        >
          <Text style={styles.acctionButtonText}>
            {!intervalId ? "Iniciar Rota" : "Parar Rota"}
          </Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={styles.buttonSignOut}
          onPress={handleSignOut}  
        >
          <Text style={styles.buttonSignOutText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FEFEFE',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerInfo: {
    flex: 1,
    width: '100%',
    paddingHorizontal: '4%',
    justifyContent: 'center',
    borderBottomWidth: 1, 
    borderBottomColor: '#EFF5EE'
  },
  containerAcction: {
    flex: .9,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '4%'
  },
  acctionButton: {
    borderRadius: 4,
    paddingVertical: 8,
    width: "100%",
    height: 40,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  acctionButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  },
  buttonSignOut: {
    width: "100%",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#2A2B4D',
    height: 40,
    paddingVertical: 8,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonSignOutText: {
    color: "#2A2B4D"
  },
  contentInfo: {
    flex: .1,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center'
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2A2B4D',
    lineHeight: 24 
  },
  infoText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '400',
    color: '#2A2B4D',
    lineHeight: 19 
  },
  infoColor: {
    marginLeft: 8,
    width: 40,
    height: 16,
    borderRadius: 25,
    backgroundColor: '#EFF5EE'
  },
  contentInfoAcction: {
    flex: .1, 
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center'
  }
})
