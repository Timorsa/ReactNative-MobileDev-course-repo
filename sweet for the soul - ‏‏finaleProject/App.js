import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import HomeScreen from './components/HomeScreen';
import MapScreen from './components/MapScreen';
import ProfilePage from './components/ProfilePage';
import InfoScreen from './components/InfoScreen';
import MyDeliverysScreen from './components/MyDeliverysScreen';
import { Provider } from 'react-redux'
import { store } from './redux/redux'

export default function App() {

  const [navIndicator, setNavIndicator] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // false by default

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <SafeAreaView style={styles.safe} />
        <View style={styles.header}>
          <View style={styles.logo}><FontAwesome name="birthday-cake" size={30} color="purple" /></View>
          <Text style={styles.headerText}>Making Sweet For The Soul</Text>
        </View>

        {navIndicator === 0 && <HomeScreen />}
        {navIndicator === 1 && <InfoScreen />}
        {navIndicator === 2 && <MyDeliverysScreen />}
        {navIndicator === 3 && <MapScreen />}
        {navIndicator === 4 && <ProfilePage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setNavIndicator={setNavIndicator}/>}

        <View style={styles.nav}>
          <View style={styles.navItem}>
            <FontAwesome name="user-circle-o" size={30} color={navIndicator === 4 ? "purple" : "black"} onPress={() => setNavIndicator(4)} />
          </View>
          {isLoggedIn && <View style={styles.navItem}>
            <FontAwesome name="map-o" size={30} color={navIndicator === 3 ? "purple" : "black"} onPress={() => setNavIndicator(3)} />
          </View>}
          {isLoggedIn && <View style={styles.navItem}>
            <FontAwesome name="calendar-check-o" size={30} color={navIndicator === 2 ? "purple" : "black"} onPress={() => setNavIndicator(2)} />
          </View>}
          {isLoggedIn && <View style={styles.navItem}>
            <FontAwesome name="info-circle" size={30} color={navIndicator === 1 ? "purple" : "black"} onPress={() => setNavIndicator(1)} />
          </View>}
          <View style={styles.navItem}>
            <FontAwesome name="home" size={30} color={navIndicator === 0 ? "purple" : "black"} onPress={() => setNavIndicator(0)} />
          </View>
        </View>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  safe: {
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 30 : 0
  },
  header: {
    height: 50,
    width: '100%',
    backgroundColor: 'pink',
    display: 'flex',
    justifyContent: 'center'
  },
  logo: {
    width: 35,
    height: 35,
    position: 'absolute',
    left: 7,
    top: 9,
  },
  headerText: {
    textAlign: 'center',
    color: 'purple',
    fontSize: 20,
  },
  nav: {
    height: 50,
    width: '100%',
    position: 'absolute',
    bottom: 1,
    backgroundColor: '#c3c3c3',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navItem: {
    height: '100%',
    width: 60,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
