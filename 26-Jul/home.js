import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

const Home = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
  <View style={styles.center}>
  <ScrollView style={styles.scroll}>
  
  <Image
        style={styles.logo}
        source={require('../images/poster.jpg')}
  />
  
  <Text style={styles.content}>
     This is text regarding COVID-Yoddha application information text may get increase as per the need and requirement of application. 
  </Text>
    
   
      <TouchableOpacity onPress={() => navigation.navigate('My Bookings')}>
        <Text style={styles.myBookingButton}>My Bookings</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('My Bookings')}>
        <Text style={styles.myBookingButton}>People Count</Text>
      </TouchableOpacity>
        
  </ScrollView>
  </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,

  },
  
  scroll: {
    marginHorizontal: 10,
  },
  
  content: {
    fontFamily: 'IBMPlexSans-Light',
    color: '#323232',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16
  },

  logo: {
    width: 335,
    height: 320,
    
  },
  myBookingButton: {
    backgroundColor: '#4682bf',
    color: '#FFFFFF',
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 16,
    overflow: 'hidden',
    borderRadius: 20,
    padding: 10,
    textAlign:'center',
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
    width: 250
  },
    
  buttonDisplay: {
    flexDirection: 'column',
    paddingTop: 15,
    paddingBottom: 15,
    justifyContent: 'space-evenly'
  }
  
});

export default Home;