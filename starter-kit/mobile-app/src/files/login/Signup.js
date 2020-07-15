/*
    Sign up
*/
import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    View,
    SafeAreaView,
    Text,
    ImageBackground,
} from 'react-native'
import Texts from '../texts/Texts'
import { FormInput } from '../textInput/TextInput'
import AppColors from '../colors/AppColors';
import { TouchableOpacity} from 'react-native-gesture-handler';
import { CommonButton } from '../buttons/AppButton'
import { images } from '../utilities/ImageComponent';
import { commonStyles } from '../utilities/CommonStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import Validation from '../utilities/Validation'
import {constants} from '../constants/constants'
// import { fontFamily } from '../fontFamily/FontFamily';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera as Camera } from 'react-native-camera'
import { AlertMsgModel } from '../alert/AlertWithTwoBtns'
import {MsgModel} from '../alert/CommonAlert'
import Service from '../../api/Service'
import urls from '../../api/urls'
import { POPUPTIME } from '../../../utilities/Config';
const { width, height } = Dimensions.get('window');

global.refCode = ''

export default class SignUp extends Component {
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
    };

    /*==========================================================================================*/
    // Component life cycle - constructor
    /*==========================================================================================*/
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name : '',
            mob : '',
            pass : '',
            confirm :'',
            isEmailEmpty: false,
            termsConditionsChecked: false,
            showPassword: false,
            showConfirmPass : false,
            emailValidated: false,
            referralCode:'',
            isMsgloading: false,
            alertMsg : "",
            alertModal : false, 
            isPressed : false
        }
    }

    onChangeEmail(text) {
        if (Validation.validateEmail(text)) {
            this.setState({ emailValidated: true, email: text })
        } else {
            this.setState({ emailValidated: false, email: text })
        }
    }

    handleChange = (evt, value) => {
        //console.log("name check", evt)
       //Validation.validateName(evt)
      // if(Validation.validateName(text))
        this.setState(() => ({ [value]: evt }), () => {
        });
    }

    openScanner = () => {
        this.setState({isMsgloading : true})
    }

    goToScanner(){
        this.setState({isMsgloading : false})
        this.props.navigation.navigate('ScanQRCode', {
            onGoBack: () => this.refresh(),
        })
    }

    refresh() {
        this.setState({referralCode: global.refCode})
    }

    openModal = (alertMsg) =>{
        this.setState({alertModal : !this.state.alertModal , alertMsg : alertMsg},  
        this.forceUpdate(),
        setTimeout(() => {
            this.setState({alertModal : !this.state.alertModal})
        }, POPUPTIME))
    }

    onClickLogin() {
        const {name , email , mob, pass, confirm, termsConditionsChecked, referralCode} = this.state

        let fName = name.trim()
        let mail = email.trim()
        let mobile = mob.trim()
        let password = pass.trim()
        let cPassword = confirm.trim()
        let referral = referralCode.trim()

        if(fName.length == 0){
            this.setState({name:''})
            this.openModal(global.JSONObject != undefined ? global.JSONObject["nameAlert"] :  Texts.nameAlert)
        } else if(!Validation.validateName(fName)){
            this.openModal("Please enter a valid name")
        }else if(mobile.length == 0 ){
            this.setState({mob:''})
            this.openModal(global.JSONObject != undefined ? global.JSONObject["mobAlert"] :  Texts.mobAlert)
        } else if(!Validation.validateMobile(mobile)){
            this.openModal(global.JSONObject != undefined ? global.JSONObject["validMobAlert"] :   Texts.validMobAlert)
        } else if(mail.length == 0){
            this.setState({email:''})
            this.openModal(global.JSONObject != undefined ? global.JSONObject["emailAlert"] : Texts.emailAlert)
        } else if(!Validation.validateEmail(mail)){
            this.setState({ emailValidated: false })
            this.openModal(global.JSONObject != undefined ? global.JSONObject["validEmailAlert"] :  Texts.validEmailAlert)
        } else if(password.length == 0){
            this.setState({pass:''})
            this.openModal(global.JSONObject != undefined ? global.JSONObject["newPassword"] : Texts.newPassword)
        } else if(password.length < 6){
            this.openModal(global.JSONObject != undefined ? global.JSONObject["passText"] : Texts.passText)
        } else if(cPassword.length == 0){
            this.setState({confirm:''})
            this.openModal(global.JSONObject != undefined ? global.JSONObject["confirmAlert"] :  Texts.confirmAlert)
        } else if(password != cPassword){
            this.openModal( global.JSONObject != undefined ? global.JSONObject["confirmAlert"] : Texts.confirmAlert)
        } else if(!termsConditionsChecked) {
            this.openModal(global.JSONObject != undefined ? global.JSONObject["termsAlert"] :  Texts.termsAlert)
        } else {
            this.setState({ emailValidated: true , isPressed :true})
            let param = {
                full_name : fName,
                mobile_number : mobile,
                email : mail,
                password : cPassword,
                referral_code : referral
            }
            Service.Post(urls.signup , param)
            .then(response => {
                let status = response.data.status;
                    if (status == false) {
                        console.log("Status=== ", response)
                        this.setState({isPressed : false})
                        this.openModal(response.data.message)
                    } else {
                        console.log("Status=== ", response)
                       this.setState({isPressed : false})
                       this.props.navigation.navigate('SuccessScreen', 
                       {title : "Signup" , 
                       text : global.JSONObject != undefined ? global.JSONObject["thank"] :  Texts.thank, 
                       msg : response.data.message, 
                       })
                    }
            }).catch(error => {
                console.log("Error=== ", error)
                this.setState({isPressed : false})
                this.setState({isMsgloading : false}, ()=>{
                    if(error == constants.NOINTERNET){
                        this.openModal(Texts.noNetworkMessage)
                    }
                })
            })
        }
    }

    closeModal = () =>{
        this.setState({isMsgloading : false})
    }
     
    /*==========================================================================================*/
    // Component life cycle - render
    /*==========================================================================================*/
    render() {
        const { termsConditionsChecked, emailValidated } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {                
                    // <View style={[commonStyles.container, { marginTop : 30}]}>
                         <ImageBackground source = {images.bg_login2_750} style = {{width,height,  marginTop:-60}}> 
                        <KeyboardAwareScrollView
                            resetScrollToCoords={{ x: 0, y: 0 }}
                            scrollEnabled={true}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps='handled'
                        >
                        <FormInput
                            placeholdertext={global.JSONObject != undefined ? global.JSONObject["fullName"] : Texts.fullName}
                            placeholderTextColor={AppColors.helpTextColor}
                            style={[commonStyles.textInputStyle, {marginTop:80}]}
                            value={this.state.name}
                            onChange={(text) => this.handleChange(text,"name")}
                            onSubmitEditing={() => {
                                this.mobileRef.focus()
                            }}
                            returnKeyType='next'
                        />
                        <FormInput
                            refer={(input) => { this.mobileRef = input }}
                            placeholdertext={global.JSONObject != undefined ? global.JSONObject["mobile"] : Texts.mobile}
                            placeholderTextColor={AppColors.helpTextColor}
                            style={commonStyles.textInputStyle}
                            value={this.state.mob}
                            onChange={(text) => this.handleChange(text,"mob")}
                            keyboardType='number-pad'
                            returnKeyType='done'
                            onSubmitEditing={() => {
                                this.emailRef.focus()
                            }}
                            maxLength = {12}
                        />
                        <FormInput
                            refer={(input) => { this.emailRef = input }}
                            placeholdertext={global.JSONObject != undefined ? global.JSONObject["emailText"] :  Texts.emailText}
                            placeholderTextColor={AppColors.helpTextColor}
                            style={commonStyles.textInputStyle}
                            value={this.state.email}
                            onChange={(text) => this.handleChange(text,"email")}
                            autoCapitalize = "none"
                            keyboardType='email-address'
                            returnKeyType='next'
                            onSubmitEditing={() => {
                                this.passRef.focus()
                            }}
                        />
                        <FormInput
                            refer={(input) => { this.passRef = input }}
                            placeholdertext={global.JSONObject != undefined ? global.JSONObject["oldPassText"] :  Texts.oldPassText}
                            placeholderTextColor={AppColors.helpTextColor}
                            style={commonStyles.textInputStyle}
                            value={this.state.pass}
                            onChange={(text) => this.handleChange(text,"pass")}
                            onSubmitEditing={() => {
                                this.confirmRef.focus()
                            }}
                            isEyeButton={true}
                            returnKeyType = 'next'
                            secureTextEntry={!this.state.showPassword}
                            autoCapitalize = {false}
                            onPressEye={() => { this.setState({ showPassword: !this.state.showPassword }) }}
                        />
                        <FormInput
                            refer={(input) => { this.confirmRef = input }}
                            placeholdertext={global.JSONObject != undefined ? global.JSONObject["confirmPassText"] : Texts.confirmPassText}
                            placeholderTextColor={AppColors.helpTextColor}
                            style={commonStyles.textInputStyle}
                            value={this.state.confirm}
                            onChange={(text) => this.handleChange(text,"confirm")}
                            onSubmitEditing={() => {
                                this.referralRef.focus()
                            }}
                            isEyeButton={true}
                            returnKeyType = 'next'
                            autoCapitalize = {false}
                            secureTextEntry={!this.state.showConfirmPass }
                            onPressEye={() => { this.setState({ showConfirmPass : !this.state.showConfirmPass  }) }}
                        />
                        <FormInput
                            refer={(input) => { this.referralRef = input }}
                            placeholdertext={global.JSONObject != undefined ? global.JSONObject["referralCode"] : Texts.referralCode}
                            placeholderTextColor={AppColors.helpTextColor}
                            style={commonStyles.textInputStyle}
                            value={this.state.referralCode}
                            keyboardType='default'
                            returnKeyType='done'
                            scanner = {true}
                            onPressScanner = {()=>this.openScanner()}
                            value = {this.state.referralCode}
                            onChange={(text) => this.handleChange(text,"referralCode")}
                        />
                        <View style = {styles.termView}>
                            <TouchableOpacity onPress = {() => this.setState({ termsConditionsChecked: !termsConditionsChecked })}
                                style={styles.touchView}
                                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                                    <Image 
                                        source= {termsConditionsChecked ? images.check: images.uncheck}
                                        style={{marginBottom : 10, marginLeft : 15}}
                                    />                                                            
                                    <Text allowFontScaling={false}  style = {styles.termText} 
                                        numberOfLines = {2}>{global.JSONObject != undefined ? global.JSONObject["termsText"] : Texts.termsText}
                                    </Text>
                            </TouchableOpacity>
                        </View>
                        <CommonButton 
                            height ={45} 
                            width = {width-60} 
                            backgroundColor={AppColors.appColor} 
                            margintop={30} 
                            borderRadius={30} 
                            textvalue={global.JSONObject != undefined ? global.JSONObject["signUpText"] : Texts.signUpText} 
                            isLoading={this.state.isPressed} 
                            onPressAction={() => this.onClickLogin()}>
                        </CommonButton>
                        <Text allowFontScaling={false}  style={styles.accountText}>
                            {
                                global.JSONObject != undefined 
                                ? 
                                global.JSONObject["alreadyAccountText"] + ' '
                                : 
                                Texts.alreadyAccountText+ ' '
                            }
                            <Text allowFontScaling={false} style={styles.signUpText} 
                                onPress={() => { this.props.navigation.goBack() }}>{global.JSONObject != undefined ? global.JSONObject["loginNowText"] : Texts.loginNowText} 
                            </Text>
                        </Text>
                        </KeyboardAwareScrollView>
                        </ImageBackground>
                    // </View>
                }
                <AlertMsgModel
                    isMsgloading = {this.state.isMsgloading}
                    onRequestClose={()=>this.closeModal()}
                    title = {global.JSONObject != undefined ? global.JSONObject["loginNowalertTitleText"] : Texts.alertTitle}
                    message = {global.JSONObject != undefined ? global.JSONObject["referalTitle"] : Texts.referalTitle}
                    buttonOneText = "Yes"
                    actionBtnOne = {()=>this.goToScanner()}
                    buttonTwoText = "No"
                    actionBtnTwo = {()=>this.closeModal()}
                />
                <MsgModel 
                    isMsgloading={this.state.alertModal} 
                    title={global.JSONObject != undefined ? global.JSONObject["alertTitle"] :  Texts.alertTitle} 
                    message={this.state.alertMsg}
                />
            </SafeAreaView>
        )
    };
}

const styles = {
    loginText: {
        color: AppColors.textColor, 
        fontSize: constants.font20, 
        textAlign: 'center', 
        marginTop: height * 0.12, 
        marginBottom: 40
    },
    signUpText: {
        fontSize: constants.acc14, 
        textDecorationLine: 'underline', 
    },
    accountText: {
        fontSize: constants.acc14, 
        textAlign: 'center', 
        marginTop: 15,
    },
    termText:{
        fontSize: 12,
        textAlign: 'justify', 
        padding:3, 
        marginLeft : 5,
        marginTop : -5,
        width : width*0.75,
        //flex: 1, 
       flexWrap: 'wrap',
       // backgroundColor :"green"
    },
    termView:{
        flexDirection:'row', 
        alignSelf:'center', 
        marginTop:20, 
        justifyContent:'center',
        height :40,
        marginHorizontal : 40
        // width  :width-60,
       // backgroundColor :"red"
    },
    touchView : {
        //width : 40, 
         height : 40, 
        justifyContent :"flex-start",
       alignItems :"center",
        marginTop : 4,
       // marginLeft,
        flexDirection:"row",
        //backgroundColor : "pink"
    },
    centerText: {
        flex: 1,
        fontSize: 18,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
}
