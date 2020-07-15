import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import PickerSelect from 'react-native-picker-select';
import {CheckedIcon, UncheckedIcon } from '../images/svg-icons';
import Geolocation from '@react-native-community/geolocation';

import {add, userID } from '../lib/utils'

const styles = StyleSheet.create({
  outerView: {
    flex: 1,
    padding: 22,
    backgroundColor: '#FFF'
  },
  splitView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  typeArea: {
    width: '40%'
  },
  label: {
    fontFamily: 'IBMPlexSans-Medium',
    color: '#000',
    fontSize: 14,
    paddingBottom: 5
  },
  selector: {
    fontFamily: 'IBMPlexSans-Medium',
    borderColor: '#D0E2FF',
    borderWidth: 2,
    padding: 16,
    marginBottom: 25
  },
  quantityArea: {
    width: '40%'
  },
  textInput: {
    fontFamily: 'IBMPlexSans-Medium',
    flex: 1,
    borderColor: '#D0E2FF',
    borderWidth: 2,
    padding: 14,
    elevation: 2,
    marginBottom: 25
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10
  },
  checkboxLabel: {
    fontFamily: 'IBMPlexSans-Light',
    fontSize: 13
  },
  textInputDisabled: {
    fontFamily: 'IBMPlexSans-Medium',
    backgroundColor: '#f4f4f4',
    color: '#999',
    flex: 1,
    padding: 16,
    elevation: 2,
    marginBottom: 25
  },
  button: {
    backgroundColor: '#1062FE',
    color: '#FFFFFF',
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 16,
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
    marginTop: 15
  }
});

const AddBooking = function ({navigation }) {
  const clearItem = {userID: userID(), place: 'DMart', name: '', emailid: '', contact: '', person: '1' }
  const [item, setItem] = React.useState(clearItem);
 
  const sendItem = () => {
    const payload = {
      ...item,
      person: isNaN(item.person) ? 1 : parseInt(item.person)
    };

    add(payload)
      .then(() => {
        Alert.alert('Thank you!', 'Your booking is completed.', [{text: 'OK'}]);
        setItem({...clearItem});
      })
      .catch(err => {
        console.log(err);
        Alert.alert('ERROR', 'Please try again. If the problem persists contact an administrator.', [{text: 'OK'}]);
      });
  };
  
  return (
    <ScrollView style={styles.outerView}>
      <View style={styles.splitView}>
        <View style={styles.typeArea}>
          <Text style={styles.label}>Place</Text>
          <PickerSelect
            style={{inputIOS: styles.selector }}
            value={item.place}
            onValueChange={(t) => setItem({...item, place: t })}
            items={[
                {label: 'DMart', value: 'DMart' },
                {label: 'Axis Bank', value: 'Axis Bank' },
                {label: 'Barbeque Nation', value: 'Barbeque Nation' }
            ]}
          />
        </View>
        <View style={styles.quantityArea}>
          <Text style={styles.label}>Person</Text>
          <TextInput
            style={styles.textInput}
            value={item.person}
            onChangeText={(t) => setItem({...item, person: t})}
            onSubmitEditing={sendItem}
            returnKeyType='send'
            enablesReturnKeyAutomatically={true}
            placeholder='e.g., 2'
            keyboardType='numeric'
          />
        </View>
      </View>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.textInput}
        value={item.name}
        onChangeText={(t) => setItem({...item, name: t})}
        onSubmitEditing={sendItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
        placeholder='e.g., Chris Brown'
        blurOnSubmit={false}
      />
      <Text style={styles.label}>Contact Number</Text>
      <TextInput
        style={styles.textInput}
        value={item.contact}
        onChangeText={(t) => setItem({...item, contact: t})}
        onSubmitEditing={sendItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
        placeholder='e.g. +91 99607733XX'
      />
      <Text style={styles.label}>Email ID</Text>
      <TextInput
        style={styles.textInput}
        value={item.description}
        onChangeText={(t) => setItem({...item, description: t})}
        onSubmitEditing={sendItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
        placeholder='e.g., Chris.Brown@Hotmail.com'
      />

      {
        item.place !== '' &&
        item.name.trim() !== '' &&
        item.contact.trim() !== '' &&
        <TouchableOpacity onPress={sendItem}>
          <Text style={styles.button}>Confirm</Text>
        </TouchableOpacity>
      }
    </ScrollView>
  );
};

export default AddBooking;
