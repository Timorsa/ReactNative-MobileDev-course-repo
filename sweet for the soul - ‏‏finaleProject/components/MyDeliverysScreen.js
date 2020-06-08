import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dialog from "react-native-dialog";

export default function MyDeliverysScreen() {

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
      completedAt: undefined
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
      completedAt: undefined
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
      completedAt: undefined
    }
  ]);
  const [cId, setCId] = useState(0);
  const [page, setPage] = useState(false);
  const [name, setName] = useState(undefined);
  const [address, setAddress] = useState(undefined);
  const [info, setInfo] = useState(undefined);
  const [type, setType] = useState(undefined);


  const deleteTaskClicked = selectedId => {
    setMockDeliveyData(mockDeliveyData.filter(item => item.id !== selectedId));
    // API call to update task
    // do somthing bad for the user
    setPage(false);
  };
  const completeTaskClicked = selectedId => {
    setMockDeliveyData(mockDeliveyData.filter(item => item.id !== selectedId));
    // API call to update task
    // do somthing nice for the user
    setPage(false);
  };
  const openPage = selectedId => {
    setCId(selectedId);
    let task = mockDeliveyData.filter(item => item.id === selectedId);
    setName(task[0].receiverName);
    setAddress(task[0].recieverAddress);
    setInfo(task[0].info);
    setType(task[0].type);
    setPage(true);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.backgroundImage} source={{uri: 'https://images.unsplash.com/photo-1506368083636-6defb67639a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80', }} />
      <Text style={styles.sectionText}>Sweet Deliverys</Text>
      <ScrollView style={styles.scroll}>
        {mockDeliveyData.map((item, i) => (
          <ListItem
            onPress={() => openPage(item.id)}
            key={item.id}
            leftIcon={<Image style={styles.image} source={{uri: 'https://images.unsplash.com/photo-1486428128344-5413e434ad35?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', }} />}
            title={item.receiverName}
            titleStyle={styles.titleStyle}
            subtitle={'type: ' + item.type}
            subtitleStyle={styles.subtitleStyle}
            contentContainerStyle={styles.contentStyle}
            containerStyle={styles.containerStyle}
            topDivider
            pad={30}
          />
        ))}
      </ScrollView>
      <Dialog.Container visible={page} contentStyle={styles.dialogStyle}>
        <Image style={styles.dialogImage} source={{uri: 'https://images.unsplash.com/photo-1533910534207-90f31029a78e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', }} />
        <Text style={styles.paperHeadText}>{name}</Text>
        <Text style={styles.paperSectionText}>Address: {address}</Text>
        <Text style={styles.paperSectionText}>Info: {info}</Text>
        <Text style={styles.paperSectionText}>Type: {type}</Text>
        <View style={styles.iconsContainer}>
          <Icon name='thumbs-down' size={50} color='red' onPress={() => deleteTaskClicked(cId)}/>
          <Icon name='thumbs-up' size={50} color='green' onPress={() => completeTaskClicked(cId)}/>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.iconsText}>Remove</Text>
          <Text style={styles.iconsText}>Delivered</Text>
        </View>
        <Dialog.Button label="Cancel" style={{marginTop: 50}} onPress={() => setPage(false)}/>
      </Dialog.Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    backgroundColor: '#efefff'
  },
  sectionText: {
    textAlign: 'center',
    width: '80%',
    fontSize: 18,
    marginTop: 20
  },
  contentStyle: {
    height: 60,
    display: 'flex',
    justifyContent: 'space-between',
  },
  titleStyle: {
    fontSize: 18
  },
  subtitleStyle: {
    fontSize: 12
  },
  scroll: {
    width: '90%',
    marginTop: 20,
    marginBottom: 100
  },
  containerStyle: {
    width: '100%',
    borderRadius: 10,
    opacity: 0.8
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
  iconsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    margin: 30
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20
  },
  iconsText: {
    textAlign: 'left',
    fontSize: 18
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  backgroundImage: {
    width: 400, 
    height: '100%', 
    position: 'absolute',
    opacity: 0.2
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
});