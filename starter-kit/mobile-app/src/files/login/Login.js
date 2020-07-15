/*==========================================================================================*/
// Login - User enters email and password 
//       - Tap FSP Login button
//       - Our API checks whether the emailand password is valid
//       - If already registered re-direct to Home screen
//       - If not registered display the error message
/*==========================================================================================*/

import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    View,
    SafeAreaView,
    Text,
    Platform,
    ImageBackground,
    DeviceEventEmitter
} from 'react-native'
import Texts from '../texts/Texts'
import { FormInput } from '../textInput/TextInput'
import AppColors from '../colors/AppColors'
import { CommonButton } from '../buttons/AppButton'
// import { images } from '../utilities/ImageComponent'
import { commonStyles } from '../utilities/CommonStyles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import Validation from '../utilities/Validation'
import { StackActions, NavigationActions } from 'react-navigation'
import { constants } from '../constants/constants';
// import { fontFamily } from '../fontFamily/FontFamily';
import { MsgModel } from '../alert/CommonAlert'
import Service from 'api/Service'
import urls from 'api/urls'
import DeviceInfo from 'react-native-device-info';
import User from '../user/User'
import { connect } from 'react-redux'
import { POPUPTIME } from '../utilities/Config';
import ReactNativeBiometrics from 'react-native-biometrics'

const { width, height } = Dimensions.get('window')

class Login extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: (
                <View style={commonStyles.headerView} >
                    {/* <Image source={images.header} /> */}
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
            visible: false,
            email: '',
            password: '',
            isEmailEmpty: false,
            termsConditionsChecked: false,
            showPassword: false,
            emailValidated: false,
            passwordValidated: false,
            isMsgloading: false,
            alertMsg: "",
            isPressed : false
        }
    }
    
    componentDidMount = () => {
        User.getUserFromStore()

        ReactNativeBiometrics.isSensorAvailable()
        .then((resultObject) => {
            const { available, biometryType } = resultObject
            console.log('TouchID is supported test', available, biometryType)
            if (available && biometryType === ReactNativeBiometrics.TouchID) {
                console.log('TouchID is supported')
            } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
                console.log('FaceID is supported')
            } else if (available && biometryType === ReactNativeBiometrics.Biometrics) {
                console.log('Biometrics is supported')
            } else {
                console.log('Biometrics not supported')
            }
        }).catch(error => {
            console.log("Error=== ", error)    
        })
    }
    
    openModal = (alertMsg) => {
        this.setState({ isMsgloading: true, alertMsg: alertMsg },()=>{           
            setTimeout(() => {
                this.setState({ isMsgloading: false})
            }, POPUPTIME)
        })
    }

    onChangeEmail(text) {
        if (Validation.validateEmail(text)) {
            this.setState({ emailValidated: true, email: text })
        } else {
            this.setState({ emailValidated: false, email: text })            
        }                
    }

    emailSubmitted = () => {
        const { email } = this.state
        if (Validation.validateEmail(email)) {
            this.setState({ emailValidated: true })
            this.forceUpdate()
        } else {
            this.setState({ emailValidated: false })
        }
    }

    onChangePassword(text) {
        const { password } = this.state        
        if (password.length == 6) { ///*Validation.validatePassword(password)*/
            this.setState({
                passwordValidated: true, password: text
            })
        } else {
            this.setState({ passwordValidated: false, password: text })
        }
    }

    passwordSubmitted() {
        const { password } = this.state
        if (password.length == 6) { ///*Validation.validatePassword(password)*/
            this.setState({ passwordValidated: true })
        } else {
            this.setState({ passwordValidated: false })
        }
    }

    handleChange = (evt, value) => {
        this.setState(() => ({ [value]: evt }));
    }

    getProfile = () => {
        let Home = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: "BottomTabbar",
                }),
            ],
        });

        Service.Get(urls.getProfile)
        .then(response => {
            this.setState({isPressed : false})

            let status = response.data.status;
                if (status == false) {
                    console.log("Status=== ", response)
                } else {
                    console.log("Status=== 1234", response)
                    let user = {
                        email : response.data.data.email,
                        first_name : response.data.data.first_name,
                        mobile_number : response.data.data.mobile_number ,
                        profile_image : response.data.data.profile_image,
                        token : User.token,
                        notification_allow : User.notification_allow,
                        referralCode : response.data.data.my_referring_code,
                        referralUrl : response.data.data.user_qr_code,
                        accountLevel :  response.data.data.account_level,
                        shopifyId : response.data.data.shopify_customer_id,
                        walletPoints: response.data.data.userPoint ? response.data.data.userPoint.points : 0
                    }
                   User.storeUser(user)
                   this.props.navigation.dispatch(Home)
                }
        }).catch(error => {
            console.log("Error=== ", error)
            if(error == constants.NOINTERNET){
                this.openModal(global.JSONObject != undefined ? global.JSONObject["noNetworkMessage"] : Texts.noNetworkMessage)
            }
        })
    }

    onClickLogin() {
       
        let emailT = this.state.email.trim()
        let passwordT = this.state.password.trim()
        
        if (emailT.length == 0) {
            
            this.setState({email:''}, () => {
                this.openModal(global.JSONObject != undefined ? global.JSONObject["emailAlert"] : Texts.emailAlert)    
            })
            
        } else if (!this.state.emailValidated) {
            this.openModal(global.JSONObject != undefined ? global.JSONObject["validEmailAlert"] : Texts.validEmailAlert)
        } else if (passwordT.length == 0) {
            this.setState({password: ''}, () => {
                this.openModal(global.JSONObject != undefined ? global.JSONObject["passwordAlert"] : Texts.passwordAlert)
            })
            
        } else if (passwordT.length < 6) {
            this.openModal(global.JSONObject != undefined ? global.JSONObject["validAlert"] : Texts.validAlert)
        } else {
            this.setState({isPressed : true} , ()=>{
            var version = DeviceInfo.getDeviceId();
            var sysVersion = DeviceInfo.getSystemVersion()
            let param = {
                email : emailT,
                password : passwordT,
                device_token : global.token,
                device_type : Platform.OS,
                device_version : version,
                device_os_version : sysVersion
            }

            Service.Post(urls.login, param)
            .then(response => {
                let status = response.data.status;
                    if (status == false) {
                        console.log("Status=== ", status)
                        this.setState({isPressed : false})
                        this.openModal(response.data.message)
                    } else {
                        console.log("Status=== login", status)
                        let user = {
                        email : response.data.data.email,
                        first_name : response.data.data.first_name,
                        mobile_number : response.data.data.mobile_number ,
                        token : response.data.data.token,
                        notification_allow : 1
                        }
                        User.storeUser(user)
                        this.getProfile()
                        //global.isLocked = 'unlocked'
                       // console.log("lock value", global.isLocked)
                        
                    }                          
                }).catch(error => {
                    console.log("Error=== ", error)
                    this.setState({ isPressed: false })                        
                    if(error == constants.NOINTERNET){                                
                        this.openModal(global.JSONObject != undefined ? global.JSONObject["noNetworkMessage"] : Texts.noNetworkMessage)
                    }                       
                })
            })            
        }        
    }

    /*==========================================================================================*/
    // Component life cycle - render
    /*==========================================================================================*/
    render() {
        const { emailValidated } = this.state
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {/* <View style={commonStyles.container}> */}
                <ImageBackground  style = {{width,height,  marginTop:-60 }}> 
                    <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true} showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps='handled'
                    >
                        <Text allowFontScaling={false}  style={styles.loginText}>{global.JSONObject != undefined ? global.JSONObject["fspLoginText"] :  Texts.fspLoginText}</Text>
                        <FormInput
                            placeholdertext={global.JSONObject != undefined ? global.JSONObject["emailText"] : Texts.emailText}
                            placeholderTextColor={AppColors.helpTextColor}
                            style={commonStyles.textInputStyle}
                            keyboardType='email-address'
                            onChange={(text) => this.onChangeEmail(text)}
                            onSubmitEditing={() => {
                                this.emailSubmitted()
                            }}
                            value={this.state.email}
                            isEmailValidated={emailValidated}
                            returnKeyType='done'
                            autoCapitalize="none"
                            isEditable = {!this.state.isPressed}
                        />                        
                        {
                            emailValidated 
                            ?
                            <FormInput
                                refer={(input) => { this.passwordRef = input }}
                                placeholdertext={global.JSONObject != undefined ? global.JSONObject["passwordText"] : Texts.passwordText}
                                placeholderTextColor={AppColors.helpTextColor}
                                style={commonStyles.textInputStyle}
                                secureTextEntry={!this.state.showPassword}
                                keyboardType='default'
                                isEyeButton={true}
                                value={this.state.password}
                                onPressEye={() => { this.setState({ showPassword: !this.state.showPassword }) }}
                                returnKeyType='done'
                                onChange={(text) => this.onChangePassword(text)}
                                onSubmitEditing={() => {
                                    this.passwordSubmitted()
                                }}
                                isEditable = {!this.state.isPressed}
                            />
                            :
                            null
                        }
                        <Text allowFontScaling={false}  style={styles.forgotText} onPress={() => { this.props.navigation.navigate('ForgotPassword') }}>
                            {
                                global.JSONObject != undefined 
                                ? 
                                global.JSONObject["forgotPasswordText"] 
                                : 
                                Texts.forgotPasswordText
                            }
                        </Text>
                        <CommonButton height={45} width={width - 60} backgroundColor={AppColors.appColor} margintop={50} borderRadius={30} textvalue =
                            {
                                global.JSONObject != undefined 
                                ? 
                                global.JSONObject["fspLoginText"] 
                                : 
                                Texts.fspLoginText
                            } 
                            isLoading = { this.state.isPressed } onPressAction={() => this.onClickLogin()}>                            
                        </CommonButton>

                        <Text allowFontScaling={false} style={styles.accountText}>
                            {
                                global.JSONObject != undefined 
                                ? 
                                global.JSONObject["dontHaveAccountText"] + ' '
                                : 
                                Texts.dontHaveAccountText + ' '
                            }
                            <Text allowFontScaling={false}  style={styles.signUpText} onPress={() => { this.props.navigation.navigate('SignUp') }}>{Texts.signUpNowText} </Text>
                        </Text>
                    </KeyboardAwareScrollView>
                    </ImageBackground>
                {/* </View> */}
                <MsgModel isMsgloading={this.state.isMsgloading}
                    title =
                    {
                        global.JSONObject != undefined 
                        ? 
                        global.JSONObject["alertTitle"] 
                        : 
                        Texts.alertTitle
                    }
                    message={this.state.alertMsg}
                />
            </SafeAreaView>
        )
    };
}

function mapDispatchToProps(dispatch) {
    return {
        saveData: (item) => { dispatch({ type: "savedata", item }) },
    }
}

export default connect(null, mapDispatchToProps)(Login)

const styles = {
    headerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        height: 50,
        width: width - 100
    },
    loginText: {
        color: AppColors.textColor,
        fontSize: constants.login20,
        textAlign: 'center',
        marginTop: height * 0.14,
        // fontWeight: Platform.OS == "android" ? "bold" : constants.weight500, 
        marginBottom: height*0.18,

    },
    forgotText: {
        marginTop: 15,
        textAlign: 'right',
        marginRight: 40,
        textDecorationLine: 'underline',
        width: 180,
        alignSelf: 'flex-end',
        height: 35,
    },
    signUpText: {
        fontSize: constants.signup14,
        textDecorationLine: 'underline',

    },
    accountText: {
        fontSize: constants.account14,
        textAlign: 'center',
        marginTop: 15,
    },
}
