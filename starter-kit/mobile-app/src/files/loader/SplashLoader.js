import React, { Component } from 'react';
import {View, Modal,ActivityIndicator, Dimensions} from 'react-native'; 
import AppColors from '../colors/AppColors';

const { width, height } = Dimensions.get('window');

const Model = ({ isLoading }) => (
    <View style = {
        {
        flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: 'transparent',
      width:width,
      height: height,
      marginBottom: height*0.3,
      position:'absolute',
      zIndex : 1,
        }
    }>
      <View style = {{height:50, width: 50, borderRadius:25, backgroundColor: AppColors.white,justifyContent:'center' ,  shadowOffset: { width: 1,  height: 1,  },
            elevation:1,
            // marginBottom:height*0.1
        }}>
    <ActivityIndicator animating={isLoading} size="large" color={AppColors.appColor} style={{alignSelf:'center'}} />
    </View>
    </View>
)

export default Model;