import React, { Component } from 'react';
import {TextInput, Dimensions, View, TouchableOpacity, Platform, Image } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome' 
import IonIcon from 'react-native-vector-icons/Ionicons'
import { images } from '../utilities/ImageComponent';
import Texts from '../texts/Texts'

const { width, height } = Dimensions.get('window');

export const FormInput = ({ 
  autoFocus, refer,placeholdertext,name,action,returnKeyType,secureTextEntry,onChange,onSubmitEditing,
  blurOnSubmit,editable,selectTextOnFocus,keyboardType,maxLength,placeholderTextColor,
  style,numberOfLines,multiline, isEyeButton, onPressEye, isEmailValidated , scanner, onPressScanner, value, autoCapitalize, textAlignVertical}) => {
  return (
    <View>
    <TextInput 
    allowFontScaling={false} 
            autoFocus={autoFocus}
            ref={refer}
            placeholder={placeholdertext} 
            placeholderTextColor={placeholderTextColor}
            style={[ {color: 'black'}, style]} 
            onTouchEnd={action}
            name={name}
            secureTextEntry={secureTextEntry} 
            underlineColorAndroid='transparent'
            value={value} 
            keyboardType={keyboardType}
            onChangeText={onChange}
            editable={editable} 
            selectTextOnFocus={selectTextOnFocus} 
            onSubmitEditing={onSubmitEditing}
            blurOnSubmit={blurOnSubmit}
            returnKeyType = {returnKeyType}
            maxLength={maxLength} 
            numberOfLines={numberOfLines}
            multiline={multiline} 
            autoCorrect={false}
            textAlignVertical= {textAlignVertical}
            autoCapitalize = {autoCapitalize}
            //scanner = {scanner}
        />
        {
            isEmailValidated
            &&
            <Image source = {images.check1} style = {{position:'absolute', right:50, alignItems:'center', top:20, }}></Image>
          }
        {
          isEyeButton
          ?
          <TouchableOpacity style = {{ position:'absolute', width:44, height:44, right:40, alignItems:'center', top:10}} onPress = {onPressEye}>
          {
            Platform.OS == 'android'
            ?
            <IonIcon name = {secureTextEntry ? 'md-eye-off' : 'md-eye'}  size = {15} style = {{padding:15}}></IonIcon>
            :
            <FontAwesomeIcon name = {secureTextEntry ? 'eye-slash' : 'eye'}  size = {15} style = {{padding:15}}></FontAwesomeIcon>


          }
          
          </TouchableOpacity>
          :
          null

        }
        {
           scanner && placeholdertext == Texts.referralCode
           ?
           <TouchableOpacity  onPress={onPressScanner} style = {{ position:'absolute', width:44, height:44, right:40, alignItems:'center', top:20}}>
              <Image source={images.camera}  style={{width : 25, height :25 }}/>
          </TouchableOpacity>
          :
          null
        }
        </View>
  )
}






