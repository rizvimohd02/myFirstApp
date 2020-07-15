import React, { Component } from 'react';
import {View, Modal,Text,TouchableOpacity,Dimensions, Platform, ActivityIndicator} from 'react-native'; 
import AppColors from '../colors/AppColors'
// import {fontFamily} from '../fontFamily/FontFamily'

const { width, height } = Dimensions.get('window');

export const MsgModel = ({ isMsgloading, title, message, actiontext, action ,isLoading, onRequestClose}) => (
    
    <Modal transparent={true} animationType={'fade'} visible={isMsgloading} onRequestClose = {onRequestClose}>
        {
           
              <View style={{flex: 1, alignItems: 'center', flexDirection: 'column', justifyContent: 'space-around', backgroundColor:'rgba(0,0,0,0)'}}>
              <View> 
                  <View style={{alignSelf:'center', backgroundColor: 'rgba(0,0,0,0.9)',marginLeft: 20,marginRight: 15,borderRadius: 15,marginTop: 10,padding: 20,paddingBottom: 60,marginBottom:-15, width: width*0.75, height:150}}>
                      <Text allowFontScaling={false} style={{textAlign: 'center', fontWeight: 'bold', fontSize: 18, color: AppColors.white}}>{title}</Text>
                      <Text allowFontScaling={false}  style={{
                        //   fontFamily: fontFamily.RobotoMedium
                          fontSize: 15,lineHeight: 16,color: AppColors.white,textAlign: 'center',marginTop: 20}}>{message}</Text>
                  </View>
                  {/* </View><View style={{zIndex: 2}}>    //change done for android tap issue*/}  
                  <View>    
   
                      {/* <TouchableOpacity style={{width: width*0.68,alignSelf: 'center',backgroundColor: AppColors.buttonColor,borderRadius: 30,marginTop: -50,zIndex: 1,}} onPress={action}>
                          <Text style={{textAlign: 'center',padding: 15,color: '#fff',fontSize: 16,letterSpacing:1,fontFamily: fontFamily.RobotoRegular}}>{actiontext}</Text>
                      </TouchableOpacity> */}

                      {/* <TouchableOpacity style={{width: 60,height:40,alignSelf: 'center',backgroundColor: 'transparent',borderRadius: 30,marginTop: -40,zIndex: 1,}} onPress={action}>
                          <Text style={{textAlign: 'center',padding: 10,color: AppColors.buttonColor,fontSize: 16,letterSpacing:1,fontFamily: fontFamily.ROBOTOBOLD}}>{actiontext}</Text>
                      </TouchableOpacity> */}
                  </View>
  
              </View>
          </View>

        }

      
    </Modal>
)


// export  //MsgModel;
