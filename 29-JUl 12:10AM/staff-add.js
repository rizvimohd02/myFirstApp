import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import {add, userID } from '../lib/utils'

const styles = StyleSheet.create({
  outerView: {
    flex: 1,
    padding: 15,
    backgroundColor: '#FFF'
  },
    label: {
    fontFamily: 'IBMPlexSans-Medium',
    color: '#000',
    fontSize: 14,
    paddingBottom: 5
  },
  textInput: {
    fontFamily: 'IBMPlexSans-Medium',
    flex: 1,
    borderColor: '#4682bf',
    borderWidth: 2,
    borderRadius: 20,
    padding: 8,
    elevation: 0,
    marginBottom: 15
  },
    button: {
    backgroundColor: '#1e90ff',
    color: '#FFFFFF',
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 16,
    overflow: 'hidden',
    borderRadius: 20,
    padding: 14,
    textAlign:'center',
    marginTop: 10,
    marginBottom: 35
  }
});

const AddStaff = function () {  
  const clearItem = { userID: userID(), staffName: '', staffEmailid: '', staffContact: '', staffDepartment: '', trnsctype: 'StaffDetails' }
  const [item, setItem] = React.useState(clearItem);
  
    const sendItem = () => {
    
    add(item)
      .then(() => {
       // Alert.alert('Staff details added successfully.', [{text: 'OK'}]);
        setItem({...clearItem });
      })
      .catch(err => {
        console.log(err);
       // Alert.alert('ERROR', 'Please try again. If the problem persists contact an administrator.', [{text: 'OK'}]);
      });
  };

  return (
    <ScrollView style={styles.outerView}>

      <Text style={styles.label}>Staff Name</Text>
      <TextInput
        style={styles.textInput}
        value={item.staffName}
        onChangeText={(t) => setItem({...item, staffName: t})}
        onSubmitEditing={sendItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
        placeholder='e.g., Chris Brown'
        blurOnSubmit={false}
      />
      <Text style={styles.label}>Contact Number</Text>
      <TextInput
        style={styles.textInput}
        value={item.staffContact}
        onChangeText={(t) => setItem({...item, staffContact: t})}
        onSubmitEditing={sendItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
        placeholder='e.g. +91 99607733XX'
      />
      <Text style={styles.label}>Email ID</Text>
      <TextInput
        style={styles.textInput}
        value={item.staffEmailid}
        onChangeText={(t) => setItem({...item, staffEmailid: t})}
        onSubmitEditing={sendItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
        placeholder='e.g., Chris.Brown@Hotmail.com'
      />    

      <Text style={styles.label}>Staff Department</Text>
      <TextInput
        style={styles.textInput}
        value={item.staffDepartment}
        onChangeText={(t) => setItem({...item, staffDepartment: t})}
        onSubmitEditing={sendItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
        placeholder='e.g., Sales or Backoffice'
      />    
      
      {
        item.staffName.trim() !== '' &&
        item.staffContact.trim() !== '' &&
        item.staffEmailid.trim() !== '' &&

        <TouchableOpacity onPress={sendItem}>
          <Text style={styles.button}>Submit Staff Details</Text>
        </TouchableOpacity>
      }
    </ScrollView>
  );
};

export default AddStaff;
