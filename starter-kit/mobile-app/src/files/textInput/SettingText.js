import React , {Component} from 'react'
import {TextInput, View, Text} from 'react-native'
import Seperator from '../seperator/Seperator'

export default class SettingText extends Component {
    render(){
        return (
            <View style={this.props.styleView}>
                <Text allowFontScaling={false} style={this.props.styleHeading}>{this.props.heading}</Text>
                <TextInput
                    allowFontScaling={false}
                    value = {this.props.value}
                    style={this.props.styleText}
                    editable ={this.props.editable}
                    onChangeText={this.props.onChange}
                    autoCapitalize = {this.props.autoCapitalize}
                    returnKeyType = {this.props.returnKeyType}
                    ref = {this.props.refer}
                    onSubmitEditing={this.props.onSubmitEditing}
                    keyboardType = {this.props.keyboardType}
                />
                <Seperator style={this.props.styleSep}/>
            </View>
        )
    }
}