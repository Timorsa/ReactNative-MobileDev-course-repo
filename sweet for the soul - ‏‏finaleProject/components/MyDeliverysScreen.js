import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

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
  ])
  const deleteTaskClicked = selectedId => {
    alert(`deleteTaskClicked: ${selectedId}`);
    setMockDeliveyData(mockDeliveyData.filter(item => item.id !== selectedId));
    // API call to update task
    // do somthing bad for the user
  };
  const completeTaskClicked = selectedId => {
    alert(`deleteTaskClicked: ${selectedId}`);
    setMockDeliveyData(mockDeliveyData.filter(item => item.id !== selectedId));
    // API call to update task
    // do somthing nice for the user
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionText}>MyDeliverysScreen page</Text>
      <ScrollView style={styles.scroll}>
        {mockDeliveyData.map((item, i) => (
          <ListItem
            style={styles.itemStyle}
            key={item.id}
            leftIcon={<Icon name='thumbs-down' size={50} color='red' style={styles.marginIcon} onPress={() => deleteTaskClicked(item.id)}/>}
            rightIcon={<Icon name='thumbs-up' size={50} color='green' style={styles.marginIcon} onPress={() => completeTaskClicked(item.id)}/>}
            title={item.receiverName}
            titleStyle={styles.titleStyle}
            subtitle={'address: ' + item.recieverAddress + ', info: ' + item.info + ', type: ' + item.type}
            subtitleStyle={styles.subtitleStyle}
            contentContainerStyle={styles.contentStyle}
            topDivider
            pad={30}
          />
        ))}
      </ScrollView>
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
    fontSize: 16,
    marginTop: 20
  },
  contentStyle: {
    height: 70,
    display: 'flex',
    justifyContent: 'space-between'
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
  itemStyle: {
    width: '100%'
  }
});