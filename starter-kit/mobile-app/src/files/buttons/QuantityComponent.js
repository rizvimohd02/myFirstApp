/*
        component for update quantity.
*/

import React, { Component } from 'react';
import { Dimensions, Image, View, Text, FlatList, StyleSheet, SafeAreaView , Platform, TouchableOpacity} from 'react-native'
import { images } from '../utilities/ImageComponent'
import AppColors from '../colors/AppColors';
import Texts from '../texts/Texts';
// import { fontFamily } from '../fontFamily/FontFamily'   

export default class QuantityComponent extends Component {
    render(){
        return (
            this.props.isShow ?

            <View style={this.props.style}>
                <TouchableOpacity style={styles.button} hitSlop = {{ top: 10, bottom: 10, left: 10, right: 10, left : 10}} onPress={this.props.onPressDecrease}>
                    <Image source = {images.minusIcon} style={styles.img}/>
                </TouchableOpacity>
                <Text allowFontScaling={false} style ={{marginTop : 5, fontSize : 14,
                    //  fontFamily : fontFamily.RobotoRegular, 
                     color : AppColors.appColor}}>{this.props.quan}</Text>
                <TouchableOpacity style={styles.button} hitSlop = {{ top: 10, bottom: 10, left: 10, right: 10, left : 10}} onPress={this.props.onPressIncrease}>
                    <Image source = {images.addIcon} style={styles.img}/>
                </TouchableOpacity>
            </View>
            :
            null
        )
    }
}

const styles = StyleSheet.create({
    img :{
        width : 30,
        height : 30,
        //justifyContent :"space-between"
    },
    button : {marginHorizontal : 10}
})