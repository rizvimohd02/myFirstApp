import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import PickerSelect from 'react-native-picker-select';
import { CheckedIcon, UncheckedIcon } from '../images/svg-icons';
import Geolocation from '@react-native-community/geolocation';

import {addB, userID } from '../lib/utils'

const styles = StyleSheet.create({
  outerView: {
    flex: 1,
    padding: 15,
    backgroundColor: '#FFF'
  },
  splitView: {
    flexDirection: 'row',
    borderColor: '#4682bf',
    borderWidth: 2,
    borderRadius: 20,
    padding: 8,
    paddingBottom: 0,
    justifyContent: 'space-between'
    
  },
  timingArea: {
    width: '50%',
  },
  label: {
    fontFamily: 'IBMPlexSans-Medium',
    color: '#000',
    fontSize: 14,
    paddingBottom: 5
  },
  selector: {
    fontFamily: 'IBMPlexSans-Medium',
    borderColor: '#4682bf',
    borderWidth: 2,
    padding: 8,
    marginBottom: 15
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
  textCenterAlign: {
    fontFamily: 'IBMPlexSans-Medium',
    flex: 1,
    borderColor: '#4682bf',
    borderWidth: 2,
    borderRadius: 20,
    padding: 8,
    elevation: 0,
    textAlign:'center',
    marginBottom: 15
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

const AddBusiness = function ({navigation }) {  
  const clearItem = { userID: userID(),businessname: '', openingtime: 'Select Time', closingtime: 'Select Time', personallowed: '', isBookingMand: '', location: '', trnsctype: 'BusinessRegistration' }
  const [item, setItem] = React.useState(clearItem);
  const [useLocation, setUseLocation] = React.useState(true);
  const [position, setPosition] = React.useState({})
  
  React.useEffect(() => {
    navigation.addListener('focus', () => {
      Geolocation.getCurrentPosition((pos) => {
        setPosition(pos)
        if (useLocation) {
          setItem({
            ...item,
            location: `${pos.coords.latitude},${pos.coords.longitude}`
          })
        }
      });
    })
  }, []);

  const toggleUseLocation = () => {
    if (!useLocation && position) {
      setItem({
        ...item,
        location: `${position.coords.latitude},${position.coords.longitude}`
      })
    }
    setUseLocation(!useLocation);
  };

    const sendItem = () => {
    const payload = {
      ...item,
      personallowed: isNaN(item.personallowed) ? 1 : parseInt(item.personallowed)
    };

    addB(payload)
      .then(() => {
        Alert.alert('Thank you!', 'Your Business details has been added.', [{text: 'OK'}]);
        setItem({ ...clearItem, location: payload.location });
      })
      .catch(err => {
        console.log(err);
        Alert.alert('ERROR', 'Please try again. If the problem persists contact an administrator.', [{text: 'OK'}]);
      });
  };

  return (
    <ScrollView style={styles.outerView}>
      <Text style={styles.label}>Business Name</Text>
      <TextInput
        style={styles.textInput}
        value={item.businessname}
        onChangeText={(t) => setItem({...item, businessname: t})}
        onSubmitEditing={sendItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
        placeholder='e.g. Reliance Fresh'
        blurOnSubmit={false}
      />


     <Text style={styles.label}>No. of Persons Allowed / slot</Text>
      <TextInput
        style={styles.textInput}
        value={item.personallowed}
        onChangeText={(t) => setItem({...item, personallowed: t})}
        onSubmitEditing={sendItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
        placeholder='e.g., 25'
      />

<Text style={styles.label}>Business Operating Hours</Text>
<View style={styles.splitView}>
        <View style={styles.timingArea}>
          <Text style={styles.label}>Opening Time</Text>
          <PickerSelect
            style={{inputIOS: styles.selector }}
            value={item.openingtime}
            onValueChange={(t) => setItem({...item, openingtime: t })}
            items={[
              
                {label: 'Select Time', value: 'Select Time' },
                {label: '7 AM', value: '7 AM' },
                {label: '8 AM', value: '8 AM' },
                {label: '9 AM', value: '9 AM' },
                {label: '10 AM', value: '10 AM' },
                {label: '11 AM', value: '11 AM' },
                {label: '12 PM', value: '12 PM' },
                {label: '1 PM', value: '1 PM' },
                {label: '2 PM', value: '2 PM' },
                {label: '3 PM', value: '3 PM' },
                {label: '4 PM', value: '4 PM' },
                {label: '5 PM', value: '5 PM' },
                {label: '6 PM', value: '6 PM' },
                {label: '7 PM', value: '7 PM' },
                {label: '8 PM', value: '8 PM' },
                {label: '9 PM', value: '9 PM' },
                {label: '10 PM', value: '10 PM' },
                {label: '11 PM', value: '11 PM' },
            ]}
          />
        </View>
        <View style={styles.timingArea}>
          <Text style={styles.label}>Closing Time</Text>
          <PickerSelect
            style={{inputIOS: styles.selector }}
            value={item.closingtime}
            onValueChange={(t) => setItem({...item, closingtime: t })}
            items={[
              
                {label: 'Select Time', value: 'Select Time' },
                {label: '7 AM', value: '7 AM' },
                {label: '8 AM', value: '8 AM' },
                {label: '9 AM', value: '9 AM' },
                {label: '10 AM', value: '10 AM' },
                {label: '11 AM', value: '11 AM' },
                {label: '12 PM', value: '12 PM' },
                {label: '1 PM', value: '1 PM' },
                {label: '2 PM', value: '2 PM' },
                {label: '3 PM', value: '3 PM' },
                {label: '4 PM', value: '4 PM' },
                {label: '5 PM', value: '5 PM' },
                {label: '6 PM', value: '6 PM' },
                {label: '7 PM', value: '7 PM' },
                {label: '8 PM', value: '8 PM' },
                {label: '9 PM', value: '9 PM' },
                {label: '10 PM', value: '10 PM' },
                {label: '11 PM', value: '11 PM' },
            ]}
          />
        </View>
      </View>    

      <Text style={styles.label}> </Text>
      <Text style={styles.label}>Is Booking Mandatory?</Text>
      <TextInput
        style={styles.textInput}
        value={item.isBookingMand}
        onChangeText={(t) => setItem({...item, isBookingMand: t})}
        onSubmitEditing={sendItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
        placeholder='Yes or No'
      />

      <Text style={styles.label}>Location</Text>
      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={toggleUseLocation}>
          {
            (useLocation)
              ?
              <CheckedIcon height='18' width='18'/>
              :
              <UncheckedIcon height='18' width='18'/>
          }
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}> Use my current location </Text>
      </View>
      <TextInput
        style={useLocation ? styles.textInputDisabled : styles.textInput}
        value={item.location}
        onChangeText={(t) => setItem({ ...item, location: t})}
        onSubmitEditing={sendItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
        placeholder='street address, city, state'
        editable={!useLocation}
      />
      
      {
        item.businessname !== '' &&
        item.openingtime.trim() !== '' &&
        item.closingtime.trim() !== '' &&
        item.personallowed !== '' &&
        
        <TouchableOpacity onPress={sendItem}>
          <Text style={styles.button}>Submit</Text>
        </TouchableOpacity>
      }
    </ScrollView>
  );
};

export default AddBusiness;
