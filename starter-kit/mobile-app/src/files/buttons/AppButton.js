/*
  Common button component.
*/

import React from 'react';
import AppColors from '../colors/AppColors';
import { TouchableOpacity, Text ,StyleSheet, ActivityIndicator, Image, View} from 'react-native'
// import {fontFamily} from '`..`/fontFamily/FontFamily'

export const CommonButton = ({ textvalue, onPressAction, margintop, borderRadius, 
  backgroundColor, isLoading, marginBottom , textFontSize = 20, 
  width , height}) => {
  return (
    <TouchableOpacity 
      style = {{backgroundColor:backgroundColor, width:  width , 
              height:height, justifyContent:'center', marginTop:margintop, 
              alignSelf:'center', borderRadius:borderRadius , marginBottom:marginBottom, }} 
      onPress = {onPressAction}>
      {
        isLoading
        ?
        <View style={{ flexDirection:'row', alignSelf:'center',  }}>
          <Text  allowFontScaling={false} style = {[styles.text, {
            // fontFamily:fontFamily.RobotoRegular,
             fontSize:18,}]}>Please wait... </Text>
          <ActivityIndicator animating={true} size='small' color= {AppColors.white} />
        </View>
        
        :
        <Text allowFontScaling={false}  style = {[styles.text, {fontSize: textFontSize}]}>{textvalue}</Text>
      }
    </TouchableOpacity>
  );
}

export const CommonBorderButton = ({ textvalue, onPressAction, margintop, borderRadius, 
  backgroundColor, isLoading, marginBottom ,
  width , height, buttonBorderColor = AppColors.buttonGrayColor, textFontSize = 18}) => {
  return (
    <TouchableOpacity 
      style = {{backgroundColor:backgroundColor, width:  width , 
              height:height, justifyContent:'center', marginTop:margintop, 
              alignSelf:'center', borderRadius:borderRadius , marginBottom:marginBottom, borderWidth:1, borderColor: buttonBorderColor}} 
      onPress = {onPressAction}>
      {
        isLoading
        ?
        <View style={{ flexDirection:'row', alignSelf:'center',  }}>
          <Text allowFontScaling={false} style = {[styles.text, {
            // fontFamily:fontFamily.RobotoRegular, 
            fontSize:18, color: AppColors.appColor}]}>Please wait... </Text>
          <ActivityIndicator animating={true} size='small' color= {AppColors.buttonGrayColor} />
        </View>
        
        :
        <Text allowFontScaling={false} style = {[styles.text, {color: buttonBorderColor, fontSize: textFontSize}]}>{textvalue}</Text>
      }
    </TouchableOpacity>
  );
}

export const AddToCartButtonWithImage = ({sourceImage, onPressAction, margintop, borderRadius,
  marginBottom, buttonWidth, buttonHeight, isAdded }) => {
  return (
    <TouchableOpacity 
      style={{
      width: buttonWidth, height: buttonHeight, justifyContent: 'center', marginTop: margintop,
      alignSelf: 'center', borderRadius: borderRadius, marginBottom: marginBottom
      }} 
      onPress={onPressAction}>
        <Image source={sourceImage} style={{ alignSelf: 'center' }} resizeMode='center'></Image>
    </TouchableOpacity>
  );
}

export const AddToCartButton = ({ fontSize,textvalue, onPressAction, margintop, borderRadius, 
  backgroundColor, isLoading, marginBottom, buttonWidth, buttonHeight }) => {
  return (
    <TouchableOpacity 
      style = {{backgroundColor:backgroundColor, width: buttonWidth , 
        height:buttonHeight, justifyContent:'center', marginTop:margintop, 
        alignSelf:'center', borderRadius:borderRadius , marginBottom:marginBottom}} 
      onPress = {onPressAction}>
      {
        isLoading
        ?
        <ActivityIndicator animating={isLoading} size='small' color={AppColors.white} />
        :
        <Text allowFontScaling={false} 
          style = {{color:AppColors.white, fontSize:fontSize, fontWeight:'700', 
            textAlign:'center', paddingVertical:5, 
            paddingHorizontal:15}}>
          {textvalue}
        </Text>
      }
    </TouchableOpacity>
  );
}


export const TitleButton = ({buttonTitle, marginTop = 10, onPressAction}) => {
  return (
  <TouchableOpacity onPress={onPressAction} style = {{alignSelf:'center', marginTop: marginTop}}><Text allowFontScaling={false} style = {{
    // fontFamily: fontFamily.RobotoMedium, 
    fontSize:18, fontWeight:'bold', textAlign:'center', padding:4, color: AppColors.appColor}}>{buttonTitle}</Text></TouchableOpacity>
                                
  );
}

const styles = StyleSheet.create({
  text : {
    color:'white', 
    fontSize:20, 
    //fontWeight:Platform.OS == "android" ? "bold" :'500', 
    textAlign:'center',
    // fontFamily : fontFamily.RobotoMedium
  }
})