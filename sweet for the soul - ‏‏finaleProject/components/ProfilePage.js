import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { setUser } from '../redux/actions/userActions';

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
  const { isLoggedIn, setIsLoggedIn, user } = props;
  const [userName, setUserName] = useState(undefined);
  const [userPhone, setUserPhone] = useState(undefined);
  const [userAddress, setUserAddress] = useState(undefined);
  const [userEmail, setUserEmail] = useState(undefined);
  const [userPassword, setUserPassword] = useState(undefined);
  const [form, setForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    if(!form) {
      // authenticate from db using email & password, returning user object 
      // if authenticate successfuly save the user object in redux -> await props.setUser(user) -> setIsLoggedIn(true);
      // if authentication failed alert the user for wrong credentials;
    } else {
      // create new user, returning user object 
      // if user created successfuly save the user object in redux -> await props.setUser(user) -> setIsLoggedIn(true);
      // if authentication failed alert the user for wrong credentials;
    }
    await props.setUser(mockUser);
    setIsLoggedIn(true);
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      {isLoading && <View styles={styles.indicator}>
          <ActivityIndicator size={100} color="#8b0000" />
          <Text style={styles.indicatorText}> waiting for authenticatation... </Text>
        </View>
      }
      <Image style={styles.image} source={{uri: 'https://images.unsplash.com/photo-1506368083636-6defb67639a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80', }} />
      {!isLoggedIn && <View style={styles.content}>
        <Text style={styles.headText}>Let's start sweetening the world</Text>
        <View style={styles.inputs}>
          {form && <Input onChangeText={value => changeUserName(value)} placeholder='Full name' leftIcon={ <Icon name='child' size={24} color='black' /> } />}
          {form && <Input onChangeText={value => changeUserPhone(value)} placeholder='Phone number' leftIcon={ <Icon name='mobile' size={40} color='black' /> } />}
          <Input onChangeText={value => changeUserEmail(value)} placeholder='E-mail' leftIcon={ <Icon name='envelope' size={24} color='black' /> } />
          <Input onChangeText={value => changeUserPassword(value)} placeholder='Password' leftIcon={ <Icon name='user-secret' size={24} color='black' /> } />
          {form && <Input onChangeText={value => changeUserAddress(value)} placeholder='Street, Number, City' leftIcon={ <Icon name='map-signs' size={24} color='black' /> } />}
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
        <Text style={styles.headText}>My Badges:</Text>
        <View style={styles.badgesContainer}>
          <View style={styles.flexRow}>
            <Icon name='trophy' size={50} color='palevioletred' style={styles.trophys}/>
            <Text style={styles.flexText}>welcome! you are awesome</Text>
          </View>
          <View style={styles.flexRow}>
            <Icon name='trophy' size={50} color={user.numOfDeliverys > 9 ? 'palevioletred' : 'gray'} style={styles.trophys}/>
            <Text style={styles.flexText}>10 sweet deliverys, keep going!</Text>
          </View>
          <View style={styles.flexRow}>
            <Icon name='trophy' size={50} color={user.numOfDeliverys > 24 ? 'palevioletred' : 'gray'} style={styles.trophys}/>
            <Text style={styles.flexText}>25 sweet deliverys, you are unstopable!</Text>
          </View>
          <View style={styles.flexRow}>
            <Icon name='trophy' size={50} color={user.numOfDeliverys > 49 ? 'palevioletred' : 'gray'} style={styles.trophys}/>
            <Text style={styles.flexText}>50 sweet deliverys, baking machine!</Text>
          </View>
          <View style={styles.flexRow}>
            <Icon name='trophy' size={50} color={user.numOfDeliverys > 74 ? 'palevioletred' : 'gray'} style={styles.trophys}/>
            <Text style={styles.flexText}>75 sweet deliverys, are you a humen or an angel?</Text>
          </View>
          <View style={styles.flexRow}>
            <Icon name='trophy' size={50} color={user.numOfDeliverys > 99 ? 'palevioletred' : 'gray'} style={styles.trophys}/>
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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '80%',
    marginTop: 20
  },
  headText: {
    fontSize: 20,
    marginTop: 20
  },
  sectionText: {
    textAlign: 'center',
    width: '100%',
    fontSize: 16,
    marginTop: 20
  },
  inputs: {
    marginTop: 30,
    width: '80%'
  },
  button: {
    height: 40,
    width: 200,
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
    fontSize: 12,
    marginTop: 23,
    width: '80%',
    fontFamily: 'monospace',
  },
  trophys: {
    margin: 10
  },
  image: {
    width: 400, 
    height: '100%', 
    position: 'absolute',
    opacity: 0.2
  },
  indicator: {
    marginTop: 130
  },
  indicatorText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 30
  }
});

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps, { setUser })(ProfilePage)
