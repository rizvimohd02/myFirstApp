import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Button, Linking, SafeAreaView, ScrollView } from 'react-native';

const Home = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
  <View style={styles.center}>
  <ScrollView style={styles.scroll}>
  
  <Image
        style={styles.logo}
        source={require('../images/poster.jpg')}
        // source={{
        //   uri: 'https://gumlet.assettype.com/nationalherald/2020-06/2443b61e-41f4-46ac-aa01-45681989b90a/15.png?w=1200&h=800',
        // }}
  />
  
  <Text style={styles.content}>
     This is text regarding COVID-Yoddha application information text may get increase as per the need and requirement of application. 
  </Text>
    
  <View style={styles.buttonDisplay}> 
   
      <Button
        title="My Bookings"
        color="#4682bf"
        onPress={() => navigation.navigate('My Bookings')}
      />

  </View>

  <View style={styles.buttonDisplay}> 
        <Button
          title="Get the Code"
          color="#4682bf"
          onPress={() => Linking.openURL('https://www.google.com/')}
        />
  </View>
  
  <View style={styles.buttonDisplay}>  
    <Button
      title="Learn more"
      color="#4682bf"
      onPress={() => Linking.openURL('https://developer.ibm.com/callforcode')}
    />
  </View>
        
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
    
  buttonDisplay: {
    flexDirection: 'column',
    paddingTop: 15,
    paddingBottom: 15,
    justifyContent: 'space-evenly'
  }
  
});

export default Home;