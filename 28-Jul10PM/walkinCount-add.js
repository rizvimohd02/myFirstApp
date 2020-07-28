import React from 'react';
import { StyleSheet, FlatList, View, Text, TouchableOpacity, Alert, ScrollView, TextInput } from 'react-native';
import PickerSelect from 'react-native-picker-select';
import {add, search, userID } from '../lib/utils'

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
    borderColor: '#1e90ff',
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
    borderColor: '#1e90ff',
    borderWidth: 2,
    padding: 8,
    marginBottom: 15
  },
});

const AddWalkinCount = function ({ navigation }) {
  const [items, setItems] = React.useState();
  
  React.useEffect(() => {
    navigation.addListener('focus', () => {
     // search({ userID: userID(),trnsctype: 'BusinessRegistration' })
      search({ trnsctype: 'BusinessRegistration' })
        .then(setItems)
        .catch(err => {
          console.log(err);
          Alert.alert('ERROR', 'Please try again. If the problem persists contact an administrator.', [{text: 'OK'}]);
        });
    })
  }, []);

  const clearItem = { userID: userID(), walkinbusinessname: '', walkinDate: '', walkinTimeSlot: '', walkinCount: '', trnsctype: 'walkinDetails' }  
  const [item1, setItem] = React.useState(clearItem)
  console.log('******************',item1)

  const sendItem = () => {
    
    add(item1)
    console.log('---------------------------',item1)
      .then(() => {
        console.log('******************',item1)
       Alert.alert('Walk-in Count added successfully.', [{text: 'OK'}]);
        setItem({...clearItem });
      })
      .catch(err => {
        console.log(err);
       Alert.alert('ERROR', 'Please try again. If the problem persists contact an administrator.', [{text: 'OK'}]);
      });
  };
 
  if (items && items.length > 0) {
    console.log('items ', items);

    return (
      <ScrollView style={styles.outerView}>
        {/* <FlatList style={styles.flatListView}
        data={items}
        renderItem={({ item }) => <Item {...item} />}
        keyExtractor={item => item.id || item['_id']}
      /> */}

<Text style={styles.label}>Select Business</Text>
          
<View style={{height: 50, borderRadius: 20, borderColor: '#1e90ff', borderWidth: 2}}>      
          <PickerSelect
            style={styles.selector }
            value={item1.walkinbusinessname}
           onValueChange={(t) => setItem({...item1, walkinbusinessname: t })}            
            items= {items.map((person, index) => (
              {label: person.businessname, value: person.businessname }
          ))}

          />

</View>

      <Text style={styles.label}>Walk-in Date</Text>
      <TextInput
        style={styles.textInput}
        value={item1.walkinDate}
        onChangeText={(t) => setItem({...item1, walkinDate: t})}
        onSubmitEditing={sendItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
        //placeholder='e.g., Chris Brown'
        blurOnSubmit={false}
      />
      <Text style={styles.label}>Walk in TimeSlot</Text>
      <TextInput
        style={styles.textInput}
        value={item1.walkinTimeSlot}
        onChangeText={(t) => setItem({...item1, walkinTimeSlot: t})}
        onSubmitEditing={sendItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
        //placeholder='e.g. +91 99607733XX'
      />
      <Text style={styles.label}>Walk-in Count</Text>
      <TextInput
        style={styles.textInput}
        value={item1.walkinCount}
        onChangeText={(t) => setItem({...item1, walkinCount: t})}
        onSubmitEditing={sendItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
       // placeholder='e.g., Chris.Brown@Hotmail.com'
      />    
            
      {
        item1.walkinbusinessname.trim() !== '' &&
        item1.walkinCount.trim() !== '' &&
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
