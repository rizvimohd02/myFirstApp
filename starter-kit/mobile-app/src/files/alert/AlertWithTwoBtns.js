import React, { Component } from 'react';
import {View, Modal,Text,TouchableOpacity,Dimensions} from 'react-native'; 
// import {AppColors, fontFamily, fontSize} from '../../components'
import AppColors from '../colors/AppColors'
// import {fontFamily} from '../fontFamily/FontFamily'
import EntypoIcon from 'react-native-vector-icons/Entypo'

const { width, height } = Dimensions.get('window');

export const AlertMsgModel = ({ isMsgloading, title, message, buttonOneText, actionBtnOne, buttonTwoText, actionBtnTwo, onRequestClose, buttonOneWidth = (width*0.50)/2 }) => (
    
    <Modal transparent={true} animationType={'fade'} visible={isMsgloading} onRequestClose={onRequestClose}>
        <View style={{flex: 1, alignItems: 'center', flexDirection: 'column', justifyContent: 'space-around', backgroundColor:'rgba(0,0,0,0)'}}>
            <View> 
                <View style={{backgroundColor: AppColors.black,marginLeft: 20,marginRight: 30/2,borderRadius: 30/2,marginTop: 10,padding: 20,paddingBottom: 70, width: width*0.80, height:165}}>
                    <Text allowFontScaling={false}  style={{textAlign: 'center', fontWeight: 'bold', fontSize: 18, color: AppColors.white}}>{title}</Text>
                    <Text allowFontScaling={false} style={{
                        // fontFamily: fontFamily.RobotoMedium,
                        fontSize: 15,color: AppColors.white,textAlign: 'center',marginTop: 8,}} numberOfLines = {3}>{message}</Text>
                </View>
              
                <View style={{ marginTop: -20, height:50, alignItems:'center', justifyContent:'space-around', flexDirection:'row'}}>    
 
                    <TouchableOpacity style={{marginLeft:20, width: buttonOneWidth,height : 45,alignSelf: 'center',backgroundColor: AppColors.buttonColor,borderRadius: 15,marginTop: -60,bottom: 10, zIndex: 1,borderColor : AppColors.white, borderWidth :1, justifyContent:'center'}} onPress={actionBtnOne}>
                        <Text allowFontScaling={false} style={{textAlign: 'center',color: '#fff',fontSize: 16,letterSpacing:1,
                        // fontFamily: fontFamily.RobotoRegular
                        }}>{buttonOneText}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginRight:10, width: (width*0.50)/2,height : 45,alignSelf: 'center',backgroundColor: AppColors.buttonColor,borderRadius: 15,marginTop: -60,bottom: 10,zIndex: 1,borderColor : AppColors.white, borderWidth :1, justifyContent:'center'}} onPress={actionBtnTwo}>
                        <Text allowFontScaling={false} style={{textAlign: 'center',color: '#fff',fontSize: 16,letterSpacing:1,
                        // fontFamily: fontFamily.RobotoRegular
                        }}>{buttonTwoText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
)

export const AlertWithOneButton = ({ isMsgloading, title, message, buttonOneText, actionBtnOne, onRequestClose, buttonOneWidth = (width*0.50)/2 , onPressCrossIcon}) => (
    
    <Modal transparent={true} animationType={'fade'} visible={isMsgloading} onRequestClose={onRequestClose}>
        <View style={{flex: 1, alignItems: 'center', flexDirection: 'column', justifyContent: 'space-around', backgroundColor:'rgba(0,0,0,0)'}}>
            <View> 
                <TouchableOpacity style = {{  position:'absolute', top:20, right:25, zIndex:1}} 
                hitSlop = {{top : 20 , bottom : 20 , left : 30, right : 30}} onPress = {onPressCrossIcon}>
                    <EntypoIcon name = 'circle-with-cross' size={22} color= 'white'/>
                </TouchableOpacity>
                <View style={{backgroundColor: AppColors.black,marginLeft: 20,marginRight: 30/2,borderRadius: 30/2,marginTop: 10,padding: 20,paddingBottom: 70, width: width*0.80, height:165}}>
                    <Text allowFontScaling={false} style={{textAlign: 'center', fontWeight: 'bold', fontSize: 18, color: AppColors.white}}>{title}</Text>
                    <Text allowFontScaling={false} style={{
                        // fontFamily: fontFamily.RobotoMedium,
                        fontSize: 15,color: AppColors.white,textAlign: 'center',marginTop: 8,}} numberOfLines = {3}>{message}</Text>
                </View>
              
                <View style={{ marginTop: -20, height:50, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>    
 
                    <TouchableOpacity style={{ width: buttonOneWidth,height : 45,alignSelf: 'center',backgroundColor: AppColors.buttonColor,borderRadius: 15,marginTop: -60,bottom: 10, zIndex: 1,borderColor : AppColors.white, borderWidth :1, justifyContent:'center'}} onPress={actionBtnOne}>
                        <Text allowFontScaling={false}  style={{textAlign: 'center',color: '#fff',fontSize: 16,letterSpacing:1,
                        // fontFamily: fontFamily.RobotoRegular
                        }}>{buttonOneText}</Text>
                    </TouchableOpacity>
                 
                </View>
            </View>
        </View>
    </Modal>
)
//export default AlertMsgModel;