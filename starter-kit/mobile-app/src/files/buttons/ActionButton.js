/*
    shipping status button
*/

import React, { Component } from 'react';
import { TouchableOpacity,Text } from 'react-native'
import AppColors from '../colors/AppColors'

var colorList = [
    {id :'1', color : AppColors.trackGreen, title : "Track"},
    {id :'2', color : AppColors.returnGray, title : "Return"},
]

export default class ActionButton extends Component {
    render() {
        return (
            // colorList.map(i =>{
            //     i.title == this.props.text ? 
            // })
            <TouchableOpacity style={[this.props.style, {backgroundColor : colorList.map(i=> i.title == this.props.text ? i.color : null)}]} onPress={this.props.onPress}>
                <Text allowFontScaling={false} style={this.props.styleText}>{this.props.text}</Text>
            </TouchableOpacity>
        )
    }
}