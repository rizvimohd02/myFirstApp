import React, { Component } from 'react';
import {View, Modal,ActivityIndicator, Dimensions} from 'react-native'; 
import AppColors from '../colors/AppColors';

const { width, height } = Dimensions.get('window');

const Model = ({ isLoading, marginBottomView = 0 }) => (
    <View style = {
        {
        flex: 1,
      alignItems: 'center',
      // flexDirection: 'column',
      justifyContent: 'space-around',
      backgroundColor: 'rgba(0,0,0,0.5)',
      width:width,
      height: height,
      marginBottom: height*0.3,
      position:'absolute',
      zIndex : 1,
      // backgroundColor:'red'
        }
    }>
      <View style = {{height:50, width: 50, borderRadius:25, backgroundColor: AppColors.white,justifyContent:'center' ,  shadowOffset: { width: 1,  height: 1,  },
            // shadowColor: AppColors.appGrayColor,
            // shadowOpacity:5,
            // shadowRadius:5,
            elevation:1,
            marginBottom:marginBottomView
        }}>
    <ActivityIndicator animating={isLoading} size="small" color={AppColors.appColor} style={{alignSelf:'center'}} />
    </View>
    </View>
)

export default Model;