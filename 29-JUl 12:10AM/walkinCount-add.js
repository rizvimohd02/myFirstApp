import React from 'react';
import { StyleSheet, FlatList, View, Text, TouchableOpacity, Alert, ScrollView, TextInput } from 'react-native';
import PickerSelect from 'react-native-picker-select';
import {add, search, userID } from '../lib/utils'
import DatePicker from 'react-native-datepicker'

const styles = StyleSheet.create({
  flatListView: {
    backgroundColor: '#FFF'
  },
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
  itemTouchable: {
    flexDirection: 'column',
    padding: 15,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    borderBottomColor: '#dddddd',
    borderBottomWidth: 0.25
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemBusinessName: {
    fontSize: 24,
    fontFamily: 'IBMPlexSans-Medium',
  },
  itemDepartmentContact: {
    fontSize: 14,
    fontFamily: 'IBMPlexSans-Medium',
    color: 'gray'
  },
    emptyListView: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyListText: {
    fontFamily: 'IBMPlexSans-Bold',
    color: '#999999',
    fontSize: 16
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
  },
  selector: {
    fontFamily: 'IBMPlexSans-Medium',
    borderColor: '#4682bf',
    borderWidth: 2,
    padding: 8,
    marginBottom: 15
  },
  dateArea: {
    width: '40%'
  },
  timeArea: {
    width: '55%'
  },
  splitView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
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
});

const AddWalkinCount = function ({ navigation }) {
  const [items, setItems] = React.useState();
  
  React.useEffect(() => {
    navigation.addListener('focus', () => {
      search({ userID: userID(),trnsctype: 'BusinessRegistration' })
        .then(setItems)
        .catch(err => {
          console.log(err);
          Alert.alert('ERROR', 'Please try again. If the problem persists contact an administrator.', [{text: 'OK'}]);
        });
    })
  }, []);

  const clearItem = { userID: userID(), walkinbusinessname: '', walkinDate: '', walkinTimeSlot: '', walkinCount: '', trnsctype: 'walkinDetails' }  
  const [item1, setItem] = React.useState(clearItem)

  const sendItem = () => {
    
    add(item1)
      .then(() => {
       //Alert.alert('Walk-in Count added successfully.', [{text: 'OK'}]);
        setItem({...clearItem });
      })
      .catch(err => {
        console.log(err);
      // Alert.alert('ERROR', 'Please try again. If the problem persists contact an administrator.', [{text: 'OK'}]);
      });
  };
 
  if (items && items.length > 0) {
    
    return (
      <ScrollView style={styles.outerView}>

<Text style={styles.label}>Select Business</Text>
          
<View style={{height: 50, borderRadius: 20, borderColor: '#4682bf', borderWidth: 2}}>      
          <PickerSelect
            style={styles.selector }
            value={item1.walkinbusinessname}
           onValueChange={(t) => setItem({...item1, walkinbusinessname: t })}            
            items= {items.map((business, index) => (
              {label: business.businessname, value: business.businessname }
          ))}
          />
</View>

<Text style={styles.label}> </Text>
<View style={styles.splitView}>
        <View style={styles.dateArea}>
          <Text style={styles.label}>Select Date</Text>
          <TouchableOpacity style={[styles.textCenterAlign]}
        onPress={() => { setItem({...item1, isDateTimePickerVisible: true}) }}>
      <Text allowFontScaling={false} style={[styles.label]}>{item1.walkinDate}</Text>
      
      </TouchableOpacity>

      {
       item1.isDateTimePickerVisible
        &&
        <DatePicker
        style={{width: 200}}
        walkinDate={item1.walkinDate}
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
        onDateChange={(walkinDate) => {setItem({...item1, walkinDate: walkinDate, isDateTimePickerVisible: false})}}
      />
      }
        </View>
        <View style={styles.timeArea}>
          <Text style={styles.label}>Select Time Slot</Text>
          
          <View style={{height: 45, borderRadius: 20, borderColor: '#4682bf', borderWidth: 2}}>  
          <PickerSelect
            style={styles.selector}
            value={item1.walkinTimeSlot}
            onValueChange={(t) => setItem({...item1, walkinTimeSlot: t })}
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
      </View>    


      <Text style={styles.label}>Walk-in Count</Text>
      <TextInput
        style={styles.textInput}
        value={item1.walkinCount}
        onChangeText={(t) => setItem({...item1, walkinCount: t})}
        onSubmitEditing={sendItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
      />    
            
      {
        item1.walkinbusinessname.trim() !== '' &&
        item1.walkinCount !== '' &&
        item1.walkinTimeSlot.trim() !== '' &&

        <TouchableOpacity onPress={sendItem}>
          <Text style={styles.button}>Update Walk-in Details</Text>
        </TouchableOpacity>

      }
    </ScrollView>
    )
  } else {    
    return (
      <View style={styles.emptyListView}>
        <Text style={styles.emptyListText}>You currently have no Business listed</Text>        
      </View>
    )
  }
 };

export default AddWalkinCount;
