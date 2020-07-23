import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import PickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-datepicker'

import { update, remove, userID } from '../lib/utils'

const styles = StyleSheet.create({
  outerView: {
    flex: 1,
    padding: 15,
    backgroundColor: '#FFF'
  },
  splitView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  placeArea: {
    width: '50%'
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
    padding: 8,
    marginBottom: 15
  },
  personArea: {
    width: '40%'
  },
  textInput: {
    fontFamily: 'IBMPlexSans-Medium',
    flex: 1,
    borderColor: '#1e90ff',
    borderWidth: 2,
    borderRadius: 20,
    padding: 8,
    elevation: 0,
    marginBottom: 15
  },
  textCenterAlign: {
    fontFamily: 'IBMPlexSans-Medium',
    flex: 1,
    borderColor: '#1e90ff',
    borderWidth: 2,
    borderRadius: 20,
    padding: 8,
    elevation: 0,
    textAlign:'center',
    marginBottom: 15
  },
  updateButton: {
    backgroundColor: '#1e90ff',
    color: '#FFFFFF',
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 16,
    overflow: 'hidden',
    borderRadius: 20,
    padding: 14,
    textAlign:'center',
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: '#b22222',
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

const EditBooking = (props) => {
  const clearItem = { userID: userID(), place: 'DMart', name: '', emailid: '', contact: '', person: '1', datetime: '', bookingtime: '7 AM - 8 AM' }
  const [item, setItem] = React.useState(clearItem);

  React.useEffect(() => {
    props.navigation.addListener('focus', () => {
      const item = props.route.params.item;
      setItem({ 
        ...item,
        person: item.person.toString()
       });

    })
  }, []);

  const updateItem = () => {
    const payload = {
      ...item,
      person: isNaN(item.person) ? 1 : parseInt(item.person),
      id: item.id || item['_id']
    };

    update(payload)
      .then(() => {
        Alert.alert('Done', 'Your booking has been updated.', [{text: 'OK'}]);
        props.navigation.goBack();
      })
      .catch(err => {
        console.log(err);
        Alert.alert('ERROR', err.message, [{text: 'OK'}]);
      });
  };

  const confirmDelete = () => {
    Alert.alert(
      'Delete',
      'Are you sure you want to delete this booking?',
      [
        { text: 'Cancel' },
        { text: 'Delete', onPress: () => deleteItem() }
      ]
    )
  }

  const deleteItem = () => {
    const payload = {
      ...item,
      id: item.id || item['_id']
    };

    remove(payload)
      .then(() => {
        Alert.alert('Done', 'Your booking has been deleted.', [{text: 'OK'}]);
        props.navigation.goBack();
      })
      .catch(err => {
        console.log(err);
        Alert.alert('ERROR', err.message, [{text: 'OK'}]);
      });
  };
  
  return (
    <ScrollView style={styles.outerView}>
      <View style={styles.splitView}>
        <View style={styles.placeArea}>
          <Text style={styles.label}>Place</Text>
          <PickerSelect
            style={{inputIOS: styles.selector }}
            value={item.place}
            onValueChange={(t) => setItem({...item, place: t })}
            items={[
              {label: 'DMart', value: 'DMart' },
              {label: 'Axis Bank', value: 'Axis Bank' },
              {label: 'BBQ Nation', value: 'BBQ Nation' }
          ]}
          />
        </View>
        <View style={styles.personArea}>
          <Text style={styles.label}>Person</Text>
          <TextInput
            style={styles.textCenterAlign}
            value={item.person}
            onChangeText={(t) => setItem({ ...item, person: t})}
            onSubmitEditing={updateItem}
            returnKeyType='send'
            enablesReturnKeyAutomatically={true}
            placeholder='e.g., 10'
            keyboardType='numeric'
          />
        </View>
      </View>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.textInput}
        value={item.name}
        onChangeText={(t) => setItem({ ...item, name: t})}
        onSubmitEditing={updateItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
        placeholder='e.g., Chris Brown'
        blurOnSubmit={false}
      />
      <Text style={styles.label}>Contact Number</Text>
      <TextInput
        style={styles.textInput}
        value={item.contact}
        onChangeText={(t) => setItem({ ...item, contact: t})}
        onSubmitEditing={updateItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
        placeholder='e.g. +91 99607733XX'
      />
      <Text style={styles.label}>Email ID</Text>
      <TextInput
        style={styles.textInput}
        value={item.emailid}
        onChangeText={(t) => setItem({ ...item, emailid: t})}
        onSubmitEditing={updateItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
        placeholder='e.g., Chris.Brown@Hotmail.com'
      />
      <View style={styles.splitView}>
        <View style={styles.personArea}>
          <Text style={styles.label}>Select Date</Text>
          <TouchableOpacity style={[styles.textCenterAlign]}
        onPress={() => { setItem({...item, isDateTimePickerVisible: true}) }}>
      <Text allowFontScaling={false} style={[styles.label]}>{item.datetime}</Text>
      
      </TouchableOpacity>

      {
       item.isDateTimePickerVisible
        &&
        <DatePicker
        style={{width: 200}}
        datetime={item.datetime}
        mode="date"
        format="DD-MMM-YYYY"
        minDate= {new Date()}
        maxDate="2020-10-31"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
        }}
        onDateChange={(datetime) => {setItem({...item, datetime: datetime, isDateTimePickerVisible: false})}}
      />
      }
        </View>
        <View style={styles.placeArea}>
          <Text style={styles.label}>Select Time Slot</Text>
          <PickerSelect
            style={{inputIOS: styles.selector }}
            value={item.bookingtime}
            onValueChange={(t) => setItem({...item, bookingtime: t })}
            items={[
                {label: '7 AM - 8 AM', value: '7 AM - 8 AM' },
                {label: '8 AM - 9 AM', value: '8 AM - 9 AM' },
                {label: '9 AM - 10 AM', value: '9 AM - 10 AM' },
                {label: '10 AM - 11 AM', value: '10 AM - 11 AM' },
                {label: '11 AM - 12 PM', value: '11 AM - 12 PM' },
                {label: '12 PM - 1 PM', value: '12 PM - 1 PM' },
                {label: '1 PM - 2 PM', value: '1 PM - 2 PM' },
                {label: '2 PM - 3 PM', value: '2 PM - 3 PM' },
                {label: '3 PM - 4 PM', value: '3 PM - 4 PM' },
                {label: '4 PM - 5 PM', value: '4 PM - 5 PM' },
                {label: '5 PM - 6 PM', value: '5 PM - 6 PM' },
                {label: '6 PM - 7 PM', value: '6 PM - 7 PM' },
                {label: '7 PM - 8 PM', value: '7 PM - 8 PM' },
                {label: '8 PM - 9 PM', value: '8 PM - 9 PM' },
                {label: '9 PM - 10 PM', value: '9 PM - 10 PM' },
                {label: '10 PM - 11 PM', value: '10 PM - 11 PM' },
            ]}
          />
        </View>
      </View>    

      {
        item.place !== '' &&
        item.name.trim() !== '' &&
        item.contact.trim() !== '' &&
        item.datetime !== '' &&
        item.bookingtime !== '' &&
        <TouchableOpacity onPress={updateItem}>
          <Text style={styles.updateButton}>Update</Text>
        </TouchableOpacity>
      }

      <TouchableOpacity onPress={confirmDelete}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditBooking;
