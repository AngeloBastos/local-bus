import React, { useContext, useEffect, useState } from 'react'
import MapView, { Marker, Region } from 'react-native-maps';
import {StyleSheet, TouchableOpacity, Text, View, Dimensions} from 'react-native'
import AuthContext from '../../contexts/auth'
import * as Location from 'expo-location';
import api from '../../services/api';

type Bus = {
  id: number
  plateBus: string
  modelBus: string
  yearBus?: number
  passengersBus?: number
  lineName: string
  lineColor: string
  currentBusCoordinate?: string
  startLineCoordinate?: string
  endOfLineCoordinate?: string
}

export default function User () {
  const {signOut, signed, user } = useContext(AuthContext)
  const [region, setRegion] = useState<Region>()
  const [loadingMap, setLoadingMap] = useState<Boolean>(true)
  const [bus, setBus] = useState<Bus[]>([])
  const [busSelected, setBusSelected] = useState<Bus |null >()
  const [permissionStatus, setPermissionStatus] = useState<Location.PermissionStatus>()

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync()
        setPermissionStatus(status)
        setRegion(await getInitialState())
        await getBus()
      } catch (error) {
        console.error(error)
      } finally {
        setLoadingMap(false)
      }
    })()
  },[])

  async function getBus () {
    const res = await api.get(`/bus`)
    setBus(res.data)
  }

  async function getInitialState() {
    let location: Location.LocationObject = await Location.getCurrentPositionAsync({})
    return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }
  }
  
  function onRegionChange(region: Region) {
    console.log(region)
    setRegion(region)
  }
  async function handleSignOut () {
    await signOut()
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerMap}>
        {loadingMap &&
          <Text>Carregando Mapa...</Text>
        }
        {!loadingMap &&
          <MapView
            style={styles.map}
            initialRegion={region}
          >
          {bus.map((item) => 
            <Marker
              key={item.id}
              coordinate={JSON.parse(String(item.currentBusCoordinate))}
              title={item.lineName}
              onPress={() => setBusSelected(item)}
            />
          )}
          </MapView>
        }
        </View>
      <View style={styles.containerInfoAcction}>
        {!!busSelected &&
          <View style={styles.containerInfo}>
              <Text
                style={[
                  styles.infoTitle, 
                  {
                    alignSelf: 'center',
                    marginBottom: 8
                  }
                ]}
              >
                Informação da Linha
              </Text>
            <View style={styles.contentInfo}>
              <Text style={styles.infoTitle}>Linha:</Text>
              <Text style={styles.infoText}>{busSelected.lineName}</Text>
            </View>
            <View style={styles.contentInfo}>
              <Text style={styles.infoTitle}>Cor da linha:</Text>
              <View style={[styles.infoColor,{backgroundColor: busSelected.lineColor}]}/>
            </View>
            <View style={styles.contentInfo}>
              <Text style={styles.infoTitle}>Identificação do ônibus:</Text>
              <Text style={styles.infoText}>{busSelected.plateBus}</Text>
            </View>
          </View>
        }
        <View style={styles.containerAcction}>
          <TouchableOpacity
            style={styles.buttonSignOut}
            onPress={handleSignOut}  
          >
            <Text style={styles.buttonSignOutText}>Sair</Text>
          </TouchableOpacity>
        </View>
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
  containerMap: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    borderBottomWidth: 1, 
    borderBottomColor: '#EFF5EE'
  },
  map: {
    flex: 1 
  },
  containerInfoAcction: {
    flex: .6,
    flexDirection: 'column',
    width: '100%'
  },
  containerInfo: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: '4%',
    borderBottomWidth: 1, 
    borderBottomColor: '#EFF5EE'
  },  
  containerAcction: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: '4%',
    justifyContent: 'center'
  },
  buttonSignOut: {
    width: "100%",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#2A2B4D',
    height: 40,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonSignOutText: {
    color: "#2A2B4D"
  },
  contentInfo: {
    flex: .2,
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
  }
})
