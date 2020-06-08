import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import flagBlueImg from '../assets/flag-blue.png';
import flagPinkImg from '../assets/flag-pink.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dialog from "react-native-dialog";

export default function MapScreen() {

  const [mockDeliveyData, setMockDeliveyData] = useState([
    {
      id: '1',
      userId: '12',
      createdAt: '1.1.2020',
      receiverName: 'russle westbrok',
      recieverAddress: 'hoquq',
      info: 'alergic to peanuts',
      type: 'soldier',
      isComplete: false,
      completedAt: undefined,
      coordinate: {
        latitude: 32.07256,
        longitude: 34.780378
      }
    },
    {
      id: '2',
      userId: '12',
      createdAt: '4.1.2020',
      receiverName: 'Misha Kaplan',
      recieverAddress: 'Jerusalem',
      info: 'entrence code #1212',
      type: 'elder',
      isComplete: false,
      completedAt: undefined,
      coordinate: {
        latitude: 32.072969,
        longitude: 34.775754
      }
    },
    {
      id: '3',
      userId: '12',
      createdAt: '5.1.2020',
      receiverName: 'Nahum Sokolovski',
      recieverAddress: 'Tel-Aviv',
      info: 'call when arriving',
      type: 'holocaust survivor',
      isComplete: false,
      completedAt: undefined,
      coordinate: {
        latitude: 32.07066,
        longitude: 34.781515
      }
    }
  ])
  const [isLoading, setIsLoading] = useState(true)
  const [location, setLocation] = useState(undefined)
  const [geocode, setGeocode] = useState(undefined)
  const [errorMessage, setErrorMessage] = useState(undefined)
  const [cId, setCId] = useState(0);
  const [page, setPage] = useState(false)
  const [name, setName] = useState(undefined)
  const [address, setAddress] = useState(undefined)
  const [info, setInfo] = useState(undefined)
  const [type, setType] = useState(undefined)

  const openPage = (selectedId) => {
    setCId(selectedId);
    const task = mockDeliveyData.filter((item) => item.id === selectedId)
    setName(task[0].receiverName)
    setAddress(task[0].recieverAddress)
    setInfo(task[0].info)
    setType(task[0].type)
    setPage(true)
  }

  const assignTaskClicked = selectedId => {
    setMockDeliveyData(mockDeliveyData.filter(item => item.id !== selectedId));
    // API call to update task
    // do somthing good for the user
    setPage(false);
  };

  const getGeocodeAsync = async (location) => {
    const geocode = await Location.reverseGeocodeAsync(location)
    setGeocode({ geocode })
  }

  const getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      setErrorMessage('Permission to access location was denied')
    }

    const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest })
    const { latitude, longitude } = location.coords
    await getGeocodeAsync({ latitude, longitude })
    setLocation({ latitude, longitude })
    setIsLoading(false)
  }

  useEffect(() => {
    if (location === undefined) {
      getLocationAsync()
    }
  }, [location])

  return (
    <View>
      {isLoading && (
        <View styles={styles.indicator}>
          <ActivityIndicator size={100} color="#8b0000" />
          <Text style={styles.indicatorText}> loading map... </Text>
        </View>
      )}
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      {location && (
        <MapView
          style={styles.container}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}
        >
          <Marker
            title="home"
            key={0}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude
            }}
            image={flagBlueImg}
          />
          {mockDeliveyData.map((item, i) => (
            <Marker
              onPress={() => openPage(item.id)}
              title={item.receiverName}
              key={item.id}
              coordinate={{
                latitude: item.coordinate.latitude,
                longitude: item.coordinate.longitude
              }}
              image={flagPinkImg}
            />
          ))}
        </MapView>
      )}
      <Dialog.Container visible={page} contentStyle={styles.dialogStyle}>
        <Image style={styles.dialogImage} source={{uri: 'https://images.unsplash.com/photo-1533910534207-90f31029a78e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', }} />
        <Text style={styles.paperHeadText}>{name}</Text>
        <Text style={styles.paperSectionText}>Address: {address}</Text>
        <Text style={styles.paperSectionText}>Info: {info}</Text>
        <Text style={styles.paperSectionText}>Type: {type}</Text>
        <View style={styles.iconsContainer}>
          <Icon name='plus-circle' size={50} onPress={() => assignTaskClicked(cId)}/>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.iconsText}>Sign me up!</Text>
        </View>
        <Dialog.Button label="Cancel" style={{marginTop: 50}} onPress={() => setPage(false)}/>
      </Dialog.Container>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 400,
    height: 700
  },
  errorText: {
    fontSize: 26
  },
  paper: {
    position: 'absolute',
    minHeight: 450,
    height: '40%',
    minWidth: 300,
    width: '90%',
    marginLeft: '5%',
    backgroundColor: 'white',
    top: 45,
    zIndex: 3,
    opacity: 0.9,
    borderRadius: 20
  },
  paperHeadText: {
    marginTop: 10,
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 26
  },
  paperSectionText: {
    marginTop: 20,
    marginLeft: 20,
    textAlign: 'left',
    fontSize: 18
  },
  returnText: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 18,
    textDecorationLine: 'underline'
  },
  iconsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 70,
    margin: 30,
    marginBottom: 5
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  iconsText: {
    textAlign: 'left',
    fontSize: 18
  },
  indicator: {
    marginTop: 130
  },
  indicatorText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 30
  },
  dialogStyle: {
    borderRadius: 20,
    opacity: 0.9
  },
  dialogImage: {
    width: '100%', 
    height: '110%', 
    position: 'absolute',
    opacity: 0.2
  }
})
