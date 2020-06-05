import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { setUser } from '../redux/redux';

const mockUser = {
  userId: 12,
  name: 'mitzi aizik',
  email: 'mitzi@mail.com',
  password: 'mitzi1991',
  phone: '0503148746',
  address: 'Yehuda halevi 92, Tel-Aviv',
  numOfDeliverys: 80
}

function ProfilePage(props) {
  const { isLoggedIn, setIsLoggedIn, setNavIndicator, user } = props;
  // user atributes
  const [userName, setUserName] = useState(undefined);
  const [userPhone, setUserPhone] = useState(undefined);
  const [userAddress, setUserAddress] = useState(undefined);
  const [userEmail, setUserEmail] = useState(undefined);
  const [userPassword, setUserPassword] = useState(undefined);
  // sing-in / sing-up state
  const [form, setForm] = useState(false);

  const changeUserName = val => {
    setUserName(val);
  };
  const changeUserPhone = val => {
    setUserPhone(val);
  };
  const changeUserAddress = val => {
    setUserAddress(val);
  };
  const changeUserEmail = val => {
    setUserEmail(val);
  };
  const changeUserPassword = val => {
    setUserPassword(val);
  };
  const authenticateUser = async () => {
    if(!form) {
      // authenticate from db using email & password, returning user object 
      // alert(`email: ${userEmail}, password: ${userPassword}`);
      setIsLoggedIn(true);
    } else {
      // create new user, returning user object 
      // alert(`name: ${userName}, phone: ${userPhone}, email: ${userEmail}, password: ${userPassword}, address: ${userAddress}`);
      setIsLoggedIn(true);
    }
    await props.setUser(mockUser);
  };

  return (
    <View style={styles.container}>
      {!isLoggedIn && <View style={styles.formContent}>
        <Text style={styles.headText}>Let's start sweetening the world</Text>
        <View style={styles.inputs}>
          {form && <Input onChangeText={value => changeUserName(value)} placeholder='Full name' leftIcon={ <Icon name='child' size={24} color='black' /> } />}
          {form && <Input onChangeText={value => changeUserPhone(value)} placeholder='Phone number' leftIcon={ <Icon name='mobile' size={40} color='black' /> } />}
          <Input onChangeText={value => changeUserEmail(value)} placeholder='E-mail' leftIcon={ <Icon name='envelope' size={24} color='black' /> } />
          <Input onChangeText={value => changeUserPassword(value)} placeholder='Password' leftIcon={ <Icon name='user-secret' size={24} color='black' /> } />
          {form && <Input onChangeText={value => changeUserAddress(value)} placeholder='City, Street, Number' leftIcon={ <Icon name='map-signs' size={24} color='black' /> } />}
          <Button onPress={authenticateUser} style={styles.button} title="Submit" type="outline" />
          <Text style={styles.underText} onPress={() => setForm(!form)}>{form ? 'I allready have an account' : 'Dont have an account yet?'}</Text>
        </View>
      </View>}
      {isLoggedIn && <View style={styles.content}>
        <Text style={styles.headText}>{`Hi ${user.name}`}</Text>
        <Text style={styles.sectionText}>
          We are happy that you are part of our venture!
          with your help we continue to make our community feel and improve the Mutual responsibility in our society.
        </Text>
        <Text style={styles.headText}>Badges:</Text>
        <View style={styles.badgesContainer}>
          <View style={styles.flexRow}>
            <Icon name='trophy' size={50} color='gold' style={styles.trophys}/>
            <Text style={styles.flexText}>welcome! you are awesome</Text>
          </View>
          <View style={styles.flexRow}>
            <Icon name='trophy' size={50} color={user.numOfDeliverys > 9 ? 'green' : 'gray'} style={styles.trophys}/>
            <Text style={styles.flexText}>10 sweet deliverys, keep going!</Text>
          </View>
          <View style={styles.flexRow}>
            <Icon name='trophy' size={50} color={user.numOfDeliverys > 24 ? 'blue' : 'gray'} style={styles.trophys}/>
            <Text style={styles.flexText}>25 sweet deliverys, you are unstopable!</Text>
          </View>
          <View style={styles.flexRow}>
            <Icon name='trophy' size={50} color={user.numOfDeliverys > 49 ? 'red' : 'gray'} style={styles.trophys}/>
            <Text style={styles.flexText}>50 sweet deliverys, baking machine!</Text>
          </View>
          <View style={styles.flexRow}>
            <Icon name='trophy' size={50} color={user.numOfDeliverys > 74 ? 'yellow' : 'gray'} style={styles.trophys}/>
            <Text style={styles.flexText}>75 sweet deliverys, are you a humen or an angel?</Text>
          </View>
          <View style={styles.flexRow}>
            <Icon name='trophy' size={50} color={user.numOfDeliverys > 99 ? 'pink' : 'gray'} style={styles.trophys}/>
            <Text style={styles.flexText}>100 sweet deliverys, we bet your parents are so proud!</Text>
          </View>
        </View>
      </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    backgroundColor: '#efefff',
  },
  formContent: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '80%',
    marginTop: 20
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '80%',
    backgroundColor: 'rgba(255,127,80, 0.4)',
    marginTop: 20
  },
  headText: {
    fontSize: 20,
    marginTop: 20
  },
  sectionText: {
    textAlign: 'center',
    width: '80%',
    fontSize: 14,
    marginTop: 20
  },
  inputs: {
    marginTop: 30,
    width: '80%'
  },
  button: {
    height: 40,
    width: 200
  },
  underText: {
    fontSize: 16,
    marginTop: 30,
    textDecorationLine: 'underline',
    textAlign: 'center'
  },
  badgesContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '96%',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row'
  },
  flexText: {
    marginTop: 23,
    width: '80%'
  },
  trophys: {
    margin: 10
  }
});

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps, { setUser })(ProfilePage)