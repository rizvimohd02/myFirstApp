/*==========================================================================================*/

/*==========================================================================================*/

import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    View,
    SafeAreaView,
    Text,
    Platform
} from 'react-native'
import Texts from '../texts/Texts'
import { FormInput } from '../textInput/TextInput'
import AppColors from '../colors/AppColors';
import { CommonButton } from '../buttons/AppButton'
import { images } from '../utilities/ImageComponent';
import { commonStyles } from '../utilities/CommonStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import Validation from '../utilities/Validation'
import { StackActions, NavigationActions} from 'react-navigation';
import {constants} from '../constants/constants';
import {MsgModel} from '../alert/CommonAlert'
import Service from '../../api/Service'
import urls from '../../api/urls'
import { POPUPTIME } from '../../../utilities/Config';

const { width, height } = Dimensions.get('window')

export default class ForgotPassword extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: (
                <View style={commonStyles.headerView} >
                <Image source={images.header}/>
            </View>
            ),
            headerStyle: {
                backgroundColor: AppColors.appColor,
            },
            headerTintColor: AppColors.white,
        }
    }

    /*==========================================================================================*/
    // Component life cycle - constructor
    /*==========================================================================================*/
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            isEmailEmpty: false,
            termsConditionsChecked: false,
            showPassword: false,
            emailValidated: false,
            isMsgloading : false,
            alertMsg : "",
            isPressed : false
        }
    }

    openModal = (alertMsg) =>{
        this.setState({isMsgloading : !this.state.isMsgloading , alertMsg : alertMsg},  
        this.forceUpdate(),
        setTimeout(() => {
            this.setState({isMsgloading : !this.state.isMsgloading})
        }, POPUPTIME))
    }

    onChangeEmail(text){
        if(Validation.validateEmail(text)){
            this.setState({emailValidated: true, email: text})
        }else {
            this.setState({emailValidated: false, email: text})
        }
    }

    emailSubmitted(){
        const {email} = this.state
        if(Validation.validateEmail(email)){
            this.setState({emailValidated: true})
        }else {
            
            this.setState({emailValidated: false})
        }
    }

    onClickSubmit() {
        if(this.state.email.trim().length == 0) {
            this.openModal(global.JSONObject != undefined ? global.JSONObject["emailAlert"] : Texts.emailAlert)
        } else if(!this.state.emailValidated) {
            this.openModal(global.JSONObject != undefined ? global.JSONObject["validEmailAlert"] :  Texts.validEmailAlert)
        } else {
            this.setState({isPressed : true})
            let param = {
                email : this.state.email.trim()
            }

            Service.Post(urls.forgotPassword , param )
            .then(response => {
                let status = response.data.status;
                if (status == false) {
                    console.log("Status=== ", status)
                    this.setState({isPressed : false})
                    this.openModal(response.data.message)
                } else {
                    this.setState({isPressed : false})
                    //this.openModal(response.data.message)
                     setTimeout(()=>{this.props.navigation.navigate('OtpVerify', {email : this.state.email})},2000)

                }
            }).catch(error => {
                console.log("Error=== ", error)
                this.setState({isPressed : false})
                if(error == constants.NOINTERNET){
                    this.openModal(global.JSONObject != undefined ? global.JSONObject["noNetworkMessage"] : Texts.noNetworkMessage)
                }
            })
       }
           
    }

    /*==========================================================================================*/
    // Component life cycle - render
    /*==========================================================================================*/
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={commonStyles.container}>
                    <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
                        <Text allowFontScaling={false}  style={ styles.loginText }>
                            {
                                global.JSONObject != undefined 
                                ? 
                                global.JSONObject["forgotPwdText"] 
                                : 
                                Texts.forgotPwdText
                            }
                        </Text>
                        <Text allowFontScaling={false}  style = {styles.accountText}>
                            {
                                global.JSONObject != undefined 
                                ? 
                                global.JSONObject["forgotHelpText"] 
                                : 
                                Texts.forgotHelpText
                            }
                        </Text>
                        <FormInput
                            placeholdertext=
                            {
                                global.JSONObject != undefined 
                                ? 
                                global.JSONObject["emailText"] 
                                : 
                                Texts.emailText
                            }
                            placeholderTextColor={AppColors.helpTextColor}
                            style={commonStyles.textInputStyle}
                            keyboardType='email-address'
                            value={this.state.email}
                            onChange={(text) => {this.onChangeEmail(text)}}
                            onSubmitEditing={() => {
                                this.emailSubmitted()
                            }}
                            returnKeyType = 'done'
                            autoCapitalize = "none"
                        />
                    <CommonButton 
                        backgroundColor={AppColors.appColor} 
                        margintop={50} 
                        borderRadius={30} 
                        textvalue={ global.JSONObject 
                            != undefined ? global.JSONObject["submitText"] :Texts.submitText} 
                        isLoading={this.state.isPressed} 
                        width = {width-60} 
                        height = {45} onPressAction={() => this.onClickSubmit()}>
                    </CommonButton>
                </KeyboardAwareScrollView>
            </View>
            <MsgModel 
                isMsgloading={this.state.isMsgloading} 
                title={global.JSONObject 
                    != undefined ? global.JSONObject["alertTitle"] : Texts.alertTitle} 
                message={this.state.alertMsg}
            />
        </SafeAreaView>
        )
    };
}

const styles = {
    loginText:{
        color: AppColors.textColor, 
        fontSize: constants.font20, 
        textAlign: 'center', 
        marginTop: height * 0.20, 
        fontWeight: Platform.OS == "android" ? "bold" : constants.weight500, 
    },
    accountText:{
        fontSize: constants.acc14, 
        textAlign:'center', 
        marginVertical:20
    },
}
