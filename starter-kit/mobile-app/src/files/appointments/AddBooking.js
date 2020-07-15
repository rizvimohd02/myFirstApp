import React, { Component } from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
    Platform,
    Dimensions, TouchableOpacity, Text, Image,
    Linking
} from 'react-native'
import Texts from '../texts/Texts'
import AppColors from '../colors/AppColors'
import { commonStyles } from '../utilities/CommonStyles'
import { constants } from '../constants/constants';
import { FormInput } from '../textInput/TextInput'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { MsgModel } from '../alert/CommonAlert'
import { AlertMsgModel } from '../alert/AlertWithTwoBtns'
import Validation from '../utilities/Validation'
// import { fontFamily } from '../fontFamily/FontFamily'
// import User from '../texts/user/User';
import { CustomDropdown } from '../dropdown/CustomDropdown'
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';
// import Service from 'api/Service'
// import urls from 'api/urls'
import Loader from '../loader/loader'
import AntDesign from 'react-native-vector-icons/AntDesign'
import DatePicker from 'react-native-datepicker'
import { CommonButton, CommonBorderButton } from '../buttons/AppButton'
// import { images } from '../utilities/ImageComponent';

const { width, height } = Dimensions.get('screen')

const currentDate = new Date()
const minDate = moment(currentDate).add(1, 'days');
const iOSMindate = new Date(minDate)
// var minDate = currentDate;
var maxDate = moment(currentDate).add(1, 'days')

// const minDate = currentDate;
// const maxdate = 


export default class AddBooking extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: global.addBooking ? "Add Booking" : "Booking Detail",
            headerStyle: {
                backgroundColor: AppColors.appColor,
            },
            headerTitleStyle: {
                alignSelf: 'center',
                textAlign: 'center',
                width: width - 140,
                fontWeight: 'bold',
                fontSize: 18,
                // fontFamily: fontFamily.RobotoMedium
            },
            headerTintColor: AppColors.white,

        };
    };

    // static navigationOptions = {
    //     headerTitle: "Add Booking",

    // }

    /*==========================================================================================*/
    // Component life cycle - constructor
    /*==========================================================================================*/
    constructor(props) {
        super(props);
        const isEditable =  false
        const data =  undefined
        console.log("data", data)
        this.state = {
            bookingStatus: data ? data.appointment_status && data.appointment_status.id : undefined,
            aptId: isEditable ? data.id : '',
            name: 'User.firstName',
            mobile: isEditable ? data.mobile_number : 'User.mobile',
            emailId: 'User.email',
            isMsgloading: false,
            alertModal: false,
            alertMsg: "",
            alertTitle: "",
            arrServices: [],
            arrBranches: [],
            isDropdownOpen: false,
            isDropdownBranch: false,
            service: isEditable ? data.get_services[0].service.service : Texts.selectService,
            branch: isEditable ? data.branch.branch : Texts.selectBranch,
            isServiceSelected: isEditable ? true : false,
            isBranchSelected: isEditable ? true : false,
            isDateTimePickerVisible: false,
            dateTime: isEditable ? moment(data.date_and_time).format('lll') : 'Select Date and Time',
            dateValue: isEditable ? data.date_and_time : '',
            isLoading: false,
            selectedDate: isEditable ? data.date_and_time : '',
            selectedBrId: isEditable ? data.branch.id : '',
            serviceCharge: isEditable ? data.service_charge : '',
            rewardPoints: isEditable ? data.reward_points : '',
            isBookingEditable: isEditable ? data.is_editable : false,
            enableEditing: isEditable ? false : true,
            isFromNotifications: false,
            isNavigate: false,
            serviceArr: [],
            selectedServiceArr: isEditable ? data.get_services : [],
            notes: isEditable ? data.notes : '',
            isDetail: isEditable ? true : false,
            isCancel: false,
            isDataLoaded: isEditable ? true : false,
            branchData: {},
            isConditionsChecked:0
        }
        this.sum = isEditable ? data.service_charge : 0
        this.sumPoints = isEditable ? data.reward_points : 0;

        

    }

    componentDidMount = () => {
        // this.getBranches()
        
        console.log("this.state.isNavigate ", this.state.isNavigate);

        if (this.state.isDetail) {
            let showData = " "
            if (this.state.selectedServiceArr.length > 1) {
                let length = this.state.selectedServiceArr.length - 1
                showData = this.state.selectedServiceArr[0].service.service + " +" + length + " more"
            } else {
                showData = this.state.selectedServiceArr[0].service.service
            }

            var dataForList = this.state.selectedServiceArr
            this.state.selectedServiceArr = []
            dataForList.map((data) => {
                this.state.selectedServiceArr.push(data.service.service)
                this.state.serviceArr.push(data.service_id)

            })

            // this.getServices(this.state.selectedBrId)
            this.setState({ service: showData })

        }

        if (this.state.isNavigate && global.redirectUrl && global.redirectUrl.length != 0) {
            this.openLink()
        }                                    

        // if (this.state.isFromNotifications) {
        //     this.getBookingDetails()
        // } else {
        // }
    }

    calculateDate = () => {
        const data = this.state.branchData
        var openTime = data.opening_time
        var closeTime = data.closing_time
        var openDay = data.opening_time
        var closeDay = data.closing_time

        var dt = moment(currentDate).format('LL')

        // var day = currentDate.getDay()
        
        // var month = currentDate.getMonth() + 1
        // var year = currentDate.getFullYear()
        var str = dt + " " + openTime
        var dOpen = new Date(str);
        var str2 = dt + " " + closeTime
        var dClose = new Date(str2);
        console.log(dClose)

        minDate = dOpen
        maxDate = dClose


    }

    getServices = (id) => {
        // this.setState({isLoading: true})
        let data = {
            branch_id:  id
        }
        Service.Post(urls.getServices, data)
            .then(response => {
                this.setState({isLoading: false})
                if (response.data.status == true) {
                    console.log('response services', response.data.data)
                    var list = response.data.data
                    this.setState({ arrServices: list }, () => {
                        console.log("arrservices", this.state.arrServices)
                    })
                } else {
                    // console.log(' respons false', response)
                }
            }).catch(error => {
                this.setState({isLoading: false})
                // console.log('response error', error)
                if (error == constants.NOINTERNET) {
                    this.openModal(global.JSONObject != undefined ? global.JSONObject["noNetworkMessage"] : Texts.noNetworkMessage)
                }
            })
    }

    getBranches = () => {
        this.setState({isLoading: true})
        Service.Get(urls.getBranches)
            .then(response => {
                if (response.data.status == true) {
                    console.log('response branches', response.data.data)
                    var list = response.data.data
                    this.setState({ arrBranches: list }, () => {
                        if (this.state.arrBranches.length == 1) {
                            this.setState({
                                branch: this.state.arrBranches[0].branch, isBranchSelected: true, selectedBrId: this.state.arrBranches[0].id, branchData: this.state.arrBranches[0]
                            }, () => {
                                this.getServices(this.state.selectedBrId)
                                // this.calculateDate()
                            })
                        } 
                    })
                    
                } else {
                    // console.log(' respons false', response)
                }
                this.setState({isLoading: false})
            }).catch(error => {
                // console.log(' respons false', error)
                this.setState({ isLoading: false })
                if (error == constants.NOINTERNET) {
                    this.openModal(global.JSONObject != undefined ? global.JSONObject["noNetworkMessage"] : Texts.noNetworkMessage)
                }
            })
    }

    getBookingDetails = () => {
        Service.Get(urls.getAppointmentDetails + "/" + this.props.navigation.state.params.aptId)
            .then(response => {
                // this.setState({ isLoading: false })
                if (response.data.status == true) {
                    console.log('response===', response.data.data)
                    var data = response.data.data
                    this.sum = data.service_charge
                    this.sumPoints = data.reward_points
                    this.setState({
                        mobile: data.mobile_number,
                        branch: data.branch.branch,
                        isServiceSelected: true,
                        isBranchSelected: true,
                        dateTime: moment(data.date_and_time).format('lll'),
                        selectedDate: data.date_and_time,
                        selectedBrId: data.branch.id,
                        serviceCharge: data.service_charge,
                        rewardPoints: data.reward_points,
                        enableEditing: false,
                        bookingStatus: data.appointment_status ? data.appointment_status.id : "",
                        notes: data.notes,
                        serviceArr: [],
                        selectedServiceArr: data.get_services,
                        isBookingEditable: data.is_editable,
                        aptId: this.props.navigation.state.params.aptId,
                        isDataLoaded: true,

                    }, () => {                                                
                        // console.log("values",this.state.branch)
                        let showData = " "
                        if (this.state.selectedServiceArr.length > 1) {
                            let length = this.state.selectedServiceArr.length - 1
                            showData = this.state.selectedServiceArr[0].service.service + " +" + length + " more"
                        } else {
                            showData = this.state.selectedServiceArr[0].service.service
                        }

                        var dataForList = this.state.selectedServiceArr
                        this.state.selectedServiceArr = []
                        dataForList.map((data) => {
                            this.state.selectedServiceArr.push(data.service.service)
                            this.state.serviceArr.push(data.service_id)

                        })
                        console.log("update", this.state.serviceArr)
                        this.setState({ service: showData })
                        this.getServices(this.state.selectedBrId)
                        // this.forceUpdate()
                    })


                } else {
                    // console.log(' respons false', response)
                }
            }).catch(error => {
                //  console.log(' respons false', error)
                this.setState({ isLoading: false })
                if (error == constants.NOINTERNET) {
                    this.openModal(global.JSONObject != undefined ? global.JSONObject["noNetworkMessage"] : Texts.noNetworkMessage)
                }
            })
    }


    submit(isEdit) {
        const { name, mobile, emailId, service, branch, dateTime, isServiceSelected, isBranchSelected, selectedDate, isConditionsChecked } = this.state
        if (mobile.length == 0) {
            this.openAlert(global.JSONObject != undefined ? global.JSONObject["mobileAlert"] : Texts.mobileAlert, global.JSONObject != undefined ? global.JSONObject["alert"] : Texts.alert)
        } else if (!isBranchSelected) {
            this.openAlert(global.JSONObject != undefined ? global.JSONObject["branchAlert"] : Texts.branchAlert, global.JSONObject != undefined ? global.JSONObject["alert"] : Texts.alert)
        } else if (!isServiceSelected) {
            this.openAlert(global.JSONObject != undefined ? global.JSONObject["serviceAlert"] : Texts.serviceAlert, global.JSONObject != undefined ? global.JSONObject["alert"] : Texts.alert)
        } else if (selectedDate.length == 0) {
            this.openAlert(global.JSONObject != undefined ? global.JSONObject["dateAlert"] : Texts.dateAlert, global.JSONObject != undefined ? global.JSONObject["alert"] : Texts.alert)
        } else if (!Validation.validateMobile(mobile)) {
            this.openAlert(global.JSONObject != undefined ? global.JSONObject["validMobAlert"] : Texts.validMobAlert, global.JSONObject != undefined ? global.JSONObject["alert"] : Texts.alert)
        } else if(!isEdit) {
            if(global.covid19) {
                if (!isConditionsChecked) {
                    this.openAlert(global.JSONObject != undefined ? global.JSONObject["covidAlert"] :  Texts.covidAlert, global.JSONObject != undefined ? global.JSONObject["alert"] : Texts.alert)            
                } else {
                    this.submitBooking(isEdit)
                }
            } else {
                this.submitBooking(isEdit)
            }
        } else {
            this.submitBooking(isEdit)
        }
    }

    submitBooking = (isEdit) => {
        const { aptId, name, mobile, emailId, service, branch, dateTime, selectedBrId, serviceCharge, rewardPoints, serviceArr, notes, isConditionsChecked } = this.state
        const edit = this.state.isFromNotifications ? isEdit : this.props.navigation.getParam('isEdit')
        this.setState({ isLoading: true })
        let formdata = new FormData();
        serviceArr.forEach((item, i) => {
            formdata.append("service_id[]", (
                item
            ));
        });

        let value = 0
        if (isConditionsChecked) {
            value = 1
        }
        formdata.append("full_name", name);
        formdata.append("mobile_number", mobile);
        formdata.append("email", emailId);
        formdata.append("branch_id", selectedBrId);
        formdata.append("date_and_time", moment(dateTime).format('YYYY-MM-DD H:mm:ss'));
        formdata.append("service_charge", serviceCharge);
        formdata.append("reward_points", rewardPoints);
        formdata.append("appointment_id", edit ? aptId : undefined)
        formdata.append("notes", notes)
        formdata.append("covid_undertaking", value)
        // console.log("urllll", param)

        Service.Post(edit ? urls.updateAppointment : urls.addAppointment, formdata)
            .then(response => {
                // console.log("response", response)
                this.setState({ isLoading: false })
                let status = response.data.status;
                if (status == false) {
                    this.openModal(response.data.message)
                    setTimeout(() => {
                        this.setState({ alertModal: false })
                    }, 2000)

                } else {
                    this.openModal(response.data.message)
                    setTimeout(() => {
                        this.setState({ alertModal: false }, () => this.props.navigation.goBack())
                    }, 2000)
                }
            }).catch(error => {
                this.setState({ isLoading: false })
                if (error == constants.NOINTERNET) {
                    this.openModal(global.JSONObject != undefined ? global.JSONObject["noNetworkMessage"] : Texts.noNetworkMessage)
                }
            })
    }

    actionCancelBooking = () => {
        this.setState({ isMsgloading: true, isCancel: true })
    }

    actionDelete = () => {
        this.setState({ isMsgloading: true, isCancel: false })
    }

    cancelBooking = () => {
        this.setState({ isMsgloading: false }, () => {
            this.setState({ isLoading: true })
        })
        Service.Post(urls.cancelAppointment + "?appointment_id=" + this.state.aptId)
            .then(response => {
                console.log('response', response)
                this.setState({ isLoading: false })
                if (response.data.status == true) {
                    this.openModal(response.data.message)
                    setTimeout(() => {
                        this.setState({ alertModal: false }, () =>
                            this.props.navigation.goBack()

                        )
                    }, 2000)
                } else {
                    console.log('respons false', response)
                    this.openModal(response.data.message)
                    setTimeout(() => {
                        this.setState({ alertModal: false })
                    }, 2000)
                }
            }).catch(error => {
                this.setState({ isLoading: false })
                console.log('response error', error)
                if (error == constants.NOINTERNET) {
                    this.openModal(global.JSONObject != undefined ? global.JSONObject["noNetworkMessage"] : Texts.noNetworkMessage)
                }
            })
    }

    deleteBooking = () => {
        this.setState({ isMsgloading: false }, () => {
            this.setState({ isLoading: true })
        })
        Service.Delete(urls.deleteAppointment + "?appointment_id=" + this.state.aptId)
            .then(response => {
                console.log('response', response)
                this.setState({ isLoading: false })
                if (response.data.status == true) {
                    this.openModal(response.data.message)
                    setTimeout(() => {
                        this.setState({ alertModal: false }, () => this.props.navigation.goBack())
                    }, 2000)
                } else {
                    console.log('respons false', response)
                    this.openModal(response.data.message)
                    setTimeout(() => {
                        this.setState({ alertModal: false })
                    }, 2000)
                }
            }).catch(error => {
                this.setState({ isLoading: false })
                console.log('response error', error)
                if (error == constants.NOINTERNET) {
                    this.openModal(global.JSONObject != undefined ? global.JSONObject["noNetworkMessage"] : Texts.noNetworkMessage)
                }
            })
    }



    openAlert = (alertMsg, alertTitle) => {
        this.setState({ alertModal: !this.state.alertModal, alertMsg: alertMsg, alertTitle: alertTitle }, this.forceUpdate(),
            setTimeout(() => {
                this.setState({ alertModal: !this.state.alertModal })
            }, 1500))
    }

    handleChange = (evt, value) => {
        this.setState(() => ({ [value]: evt }), () => {
        });
    }

    openModal = (msg) => {
        this.setState({ alertModal: true, alertMsg: msg, alertTitle: Texts.alert })
    }

    onSelectService = (item) => {
        if (this.state.selectedServiceArr.includes(item.service)) {
            const index = this.state.selectedServiceArr.indexOf(item.service, 0);
            if (index > -1) {
                this.state.selectedServiceArr.splice(index, 1);
            }
            const index2 = this.state.serviceArr.indexOf(item.id, 0);
            if (index2 > -1) {
                this.state.serviceArr.splice(index2, 1);
            }

            // this.state.selectedServiceArr.pop(item.service)
            // this.state.serviceArr.pop(item.id)
            this.sum = this.sum - item.service_charge
            this.sumPoints = this.sumPoints - item.reward_points
        } else {
            this.state.selectedServiceArr.push(item.service)
            this.state.serviceArr.push(item.id)
            this.sum = this.sum + item.service_charge
            this.sumPoints = this.sumPoints + item.reward_points
        }
        console.log("sum==", this.sum, this.sumPoints)
        this.setState({ isServiceSelected: true, serviceCharge: this.sum, rewardPoints: this.sumPoints })
    }

    onPressCloseService = () => {
        console.log("onclose", this.state.selectedServiceArr)
        let showData = Texts.selectService
        let isSelect = true
        if (this.state.selectedServiceArr.length > 1) {
            let length = this.state.selectedServiceArr.length - 1
            showData = this.state.selectedServiceArr[0] + " +" + length + " more"
        } else if (this.state.selectedServiceArr.length == 1) {
            showData = this.state.selectedServiceArr[0]
        } else {
            showData = Texts.selectService
            isSelect = false
        }

        this.setState({ service: showData, isDropdownOpen: false, isServiceSelected: isSelect })
    }

    onSelectBranch = (item) => {
        //below if condition need to tested, on edit booking feature
        if(this.state.isDetail || this.state.isFromNotifications){
            if(this.state.selectedBrId != item.id){
                this.sum = 0
                this.sumPoints = 0;
                this.setState({selectedServiceArr: [], serviceArr: [], service: Texts.selectService, serviceCharge: this.sum, rewardPoints: this.sumPoints  })        
            }
        }
        this.setState({ branch: item.branch, isDropdownBranch: false, isBranchSelected: true, selectedBrId: item.id, branchData: item }, () => {
            // this.calculateDate()
            this.getServices(this.state.selectedBrId)

        })
    }

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = (date) => {
        // console.log("Min Date",minDate)
        // alert(" mindate =" + moment(minDate).format('YYYY-MM-DD HH:mm') + "date=" + date)
        var androidMinDate = Platform.OS == "android" ? moment(minDate).format('YYYY-MM-DD HH:mm') : minDate
        // console.log("Selected Date", date, minDate, date<minDate)
        if (date < androidMinDate) {
            this.setState({ isDateTimePickerVisible: false, })
            // return false
        } else {
            var newDate = moment(date).format('lll')
            this.setState({ dateTime: newDate, isDateTimePickerVisible: false, selectedDate: date }, () => {
            })
        }
        this.hideDateTimePicker();
    };

    cancel = () => {
        this.setState({ isMsgloading: false })
    }

    enableEditing = () => {
        this.setState({ enableEditing: true })
    }

    openServicePicker = () => {
        if(this.state.isBranchSelected){
            this.setState({ isDropdownOpen: true })
        } else {
            this.openAlert(global.JSONObject != undefined ? global.JSONObject["addBranchFirst"] : Texts.addBranchFirst, global.JSONObject != undefined ? global.JSONObject["alert"] : Texts.alert)
        }
    } 

    render() {
        const { name, mobile, emailId, arrServices, branch, service, dateTime, arrBranches, rewardPoints, serviceCharge, enableEditing, isBookingEditable, isFromNotifications, bookingStatus, dateValue, selectedServiceArr, notes, isCancel, isDetail, isDataLoaded } = this.state
        const edit = false
        return (
            <SafeAreaView style={commonStyles.containerSafe}>
                <View style={{ flex: 1, backgroundColor: AppColors.appColor }}>
                {this.state.isLoading ? <Loader marginBottomView={height*0.2} /> : null}
                    <KeyboardAwareScrollView style={{ backgroundColor: "white" }} bounces={false} showsVerticalScrollIndicator={false}>
                        <View style={styles.mainView}>
                            <View style={styles.innerView}>
                                <FormInput
                                    refer={(input) => this.fullName = input}
                                    placeholdertext={global.JSONObject != undefined ? global.JSONObject["name"] : Texts.name}
                                    style={[commonStyles.textInputStyle, styles.placeholder]}
                                    onChange={(text) => this.handleChange(text, "name")}
                                    onSubmitEditing={() => {
                                    }}
                                    returnKeyType='next'
                                    autoCapitalize="words"
                                    value={name}
                                    editable={false}
                                />
                                <FormInput
                                    refer={(input) => this.email = input}
                                    placeholdertext={global.JSONObject != undefined ? global.JSONObject["emailId"] : Texts.emailId}
                                    placeholderTextColor={AppColors.helpTextColor}
                                    style={[commonStyles.textInputStyle, styles.placeholder,]}
                                    onChange={(text) => this.handleChange(text, "emailId")}
                                    onSubmitEditing={() => {
                                    }}
                                    returnKeyType='next'
                                    autoCapitalize="words"
                                    value={emailId}
                                    editable={false}

                                />

                                <FormInput
                                    refer={(input) => this.mobile = input}
                                    placeholdertext={global.JSONObject != undefined ? global.JSONObject["mobile"] : Texts.mobile}
                                    placeholderTextColor={AppColors.helpTextColor}
                                    style={[commonStyles.textInputStyle, styles.placeholder]}
                                    onChange={(text) => this.handleChange(text, "mobile")}
                                    onSubmitEditing={() => {
                                        this.email.focus()

                                    }}
                                    returnKeyType='next'
                                    autoCapitalize="words"
                                    value={mobile}
                                    keyboardType='numeric'
                                    editable={enableEditing}

                                />

                                <TouchableOpacity disabled={!enableEditing} style={[commonStyles.textInputStyle, styles.placeholder, styles.dropdown]}
                                    onPress={() => { enableEditing && this.setState({ isDropdownBranch: true }) }}>

                                    <Text allowFontScaling={false} style={[styles.dropDownText, { color: AppColors.textColor, }]}>{branch}</Text>
                                    <AntDesign name='caretdown' size={18} color={AppColors.appColor} style={{}} />

                                </TouchableOpacity>


                                <TouchableOpacity disabled={!enableEditing} style={[commonStyles.textInputStyle, styles.placeholder, styles.dropdown]}
                                    onPress={() => { enableEditing && this.openServicePicker() }}>

                                    <Text allowFontScaling={false} style={[styles.dropDownText, { color: AppColors.textColor, }]}>{service}</Text>
                                    <AntDesign name='caretdown' size={18} color={AppColors.appColor} style={{}} />
                                </TouchableOpacity>


                                <TouchableOpacity disabled={!enableEditing} style={[commonStyles.textInputStyle, styles.placeholder, { justifyContent: 'center', }]}
                                    onPress={() => { enableEditing && this.setState({ isDateTimePickerVisible: true }) }}>

                                    <Text allowFontScaling={false} style={[styles.dropDownText, { color: AppColors.textColor, }]}>{dateTime}</Text>

                                </TouchableOpacity>
                                
                                {
                                    (isFromNotifications || isDetail) && notes.length == 0 && !enableEditing

                                    ?
                                    null
                                    :
                                    <FormInput
                                    refer={(input) => this.notes = input}
                                    placeholdertext={Texts.notes}
                                    placeholderTextColor={AppColors.textColor}
                                    style={[commonStyles.textInputStyle, styles.placeholderNotes]}
                                    onChange={(text) => this.handleChange(text, "notes")}
                                    onSubmitEditing={() => {
                                    }}
                                    returnKeyType='next'
                                    autoCapitalize="sentences"
                                    value={notes}
                                    keyboardType='default'
                                    editable={enableEditing}
                                    multiline={true}
                                    textAlignVertical="top"
                                    numberOfLines={5}
                                />
                            
                                }
                                
                                {
                                    rewardPoints && serviceCharge
                                        ?
                                        <View style={{ marginHorizontal: 15 }}>
                                            <View style={{
                                                justifyContent: 'space-between', flexDirection: 'row', marginTop: 15, backgroundColor: 'white', borderRadius: 4, height: 48, alignItems: 'center', paddingHorizontal: 10, shadowColor: AppColors.appGrayColor,
                                                shadowOpacity: 5,
                                                shadowRadius: 5,
                                                elevation: 5
                                            }}>

                                                <Text allowFontScaling={false} style={styles.titleText}>{global.JSONObject != undefined ? global.JSONObject["serviceCharge"] : Texts.serviceCharge}</Text>

                                                <Text allowFontScaling={false} style={{ 
                                                    // fontFamily: fontFamily.RobotoMedium, 
                                                    fontSize: 18, color: AppColors.black, textAlign: 'right', }}>{serviceCharge + Texts.currency}</Text>

                                            </View>

                                            {
                                                bookingStatus && bookingStatus == 2
                                                    ?
                                                    null :
                                                    <View style={{ alignItems: 'center', marginTop: 25 }}>
                                                        <Text allowFontScaling={false} style={[styles.titleText, { fontSize: 14 }]}>{bookingStatus == 3 ? "Points Earned" : Texts.pointsWillBeEarned}</Text>
                                                        <Text allowFontScaling={false} style={{ 
                                                            // fontFamily: fontFamily.RobotoMedium, 
                                                            fontSize: 26, color: 'green', }}>{rewardPoints + " Points"}</Text>
                                                    </View>
                                            }

                                        </View>
                                        :
                                        null
                                }

                                {
                                    this.state.isDateTimePickerVisible
                                        &&
                                        Platform.OS == 'android'
                                        ?
                                        <DatePicker
                                            // style={{ width: width - 30, alignSelf: 'center', marginTop: -50 }}
                                            date={edit ? dateValue : currentDate}
                                            mode="datetime"
                                            is24Hour={false}
                                            placeholder="Select date and time"
                                            minDate={minDate}
                                            // maxDate="2020-04-23 19:30"
                                            onDateChange={(date) => this.handleDatePicked(date)}
                                            androidMode="spinner"
                                            onCloseModal={() => this.setState({ isDateTimePickerVisible: false })}
                                        />
                                        :
                                        this.state.isDateTimePickerVisible
                                        &&
                                        <DateTimePicker
                                            isVisible={this.state.isDateTimePickerVisible}
                                            onConfirm={this.handleDatePicked}
                                            onCancel={this.hideDateTimePicker}
                                            mode='datetime'
                                            minimumDate={iOSMindate}
                                            // date={edit && dateValue}
                                            minuteInterval={15}
                                            // maximumDate={maxDate}
                                        />
                                }

                            </View>
                            
                                {
                                    (!isDetail && !isFromNotifications && global.covid19) ?
                                    <View style={[{justifyContent:'center',  alignSelf:'center', width:width-30, flexDirection:'column'}]}>                                        
                                        <Text allowFontScaling={false}  style = {[styles.termText, {marginLeft : 25,}]}>
                                                {global.JSONObject != undefined ? global.JSONObject["covid"] : Texts.covid}
                                        </Text>
                                        <View style = {styles.termView}>
                                            <TouchableOpacity onPress = {() => this.setState({ isConditionsChecked: !this.state.isConditionsChecked })} style={styles.touchView} hitSlop={{ top: 10, bottom: 10,    left: 5, right: 5 }}>
                                                {/* <Image 
                                                    source= {this.state.isConditionsChecked ? images.check: images.uncheck}
                                                    style={{marginTop : 25, marginLeft : 0}}
                                                />                                                             */}
                                                <Text allowFontScaling={false}  style = {styles.termText}>
                                                    {"\n"}
                                                    {global.JSONObject != undefined ? global.JSONObject["covid1"] : Texts.covid}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>   
                                    :
                                    null                                 
                                }
                                {
                                !isDetail && !isFromNotifications
                                &&
                                <CommonBorderButton
                                    backgroundColor={AppColors.white}
                                    borderRadius={30}
                                    textvalue={"Submit"}
                                    isLoading={this.state.isPressed}
                                    onPressAction={() => this.submit(false)}
                                    height={50}
                                    width={width * 0.43}
                                    margintop={20}
                                    marginBottom={50}
                                />
                            }
                            {
                                enableEditing && edit && isDataLoaded
                                &&
                                <CommonBorderButton
                                    backgroundColor={AppColors.white}
                                    borderRadius={30}
                                    textvalue={"Resubmit"}
                                    isLoading={this.state.isPressed}
                                    onPressAction={() => this.submit(true)}
                                    height={50}
                                    width={width * 0.43}
                                    margintop={20}
                                    marginBottom={50}
                                />
                            }

                            {
                                bookingStatus && (bookingStatus == 4 || bookingStatus == 3 || bookingStatus == 2)
                                ?
                                <CommonBorderButton
                                    backgroundColor={AppColors.white}
                                    borderRadius={30}
                                    textvalue={"Delete"}
                                    isLoading={this.state.isPressed}
                                    onPressAction={() => this.actionDelete()}
                                    height={50}
                                    width={width * 0.43}
                                    margintop={20}
                                    marginBottom={50}
                                />
                                :
                                null
                            }

                        </View>
                        {
                            isBookingEditable && !enableEditing
                            &&
                            <View style={{
                                flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, marginTop: 0, marginBottom: 50
                            }}>

                                <CommonBorderButton
                                    backgroundColor={AppColors.white}
                                    borderRadius={30}
                                    textvalue={"Edit"}
                                    isLoading={this.state.isPressed}
                                    onPressAction={() => this.enableEditing()}
                                    height={50}
                                    width={width * 0.44}
                                    margintop={20}

                                />
                                <CommonBorderButton
                                    backgroundColor={AppColors.white}
                                    borderRadius={30}
                                    textvalue={"Cancel"}
                                    isLoading={this.state.isPressed}
                                    onPressAction={() => this.actionCancelBooking()}
                                    height={50}
                                    width={width * 0.44}
                                    margintop={20}
                                />
                            </View>
                        }

                    </KeyboardAwareScrollView>                    
                    <CustomDropdown
                        arrData={this.state.isDropdownOpen ? arrServices : arrBranches}
                        onSelect={this.state.isDropdownOpen ? (item) => this.onSelectService(item) : (item) => this.onSelectBranch(item)}
                        isVisible={this.state.isDropdownOpen ? this.state.isDropdownOpen : this.state.isDropdownBranch}
                        titleText={this.state.isDropdownOpen ? Texts.selectService : Texts.selectBranch} onPressClose={() => this.state.isDropdownOpen ? this.onPressCloseService() : this.setState({ isDropdownBranch: false })}
                        selectedValue={this.state.isDropdownOpen ? selectedServiceArr : branch} isMultiple={this.state.isDropdownOpen ? true : false}
                    />

                    <MsgModel
                        isMsgloading={this.state.alertModal}
                        title={this.state.alertTitle}
                        message={this.state.alertMsg}

                    />

                    <AlertMsgModel
                        isMsgloading={this.state.isMsgloading}
                        title={global.JSONObject != undefined ? global.JSONObject["alertTitle"] : Texts.alertTitle}
                        message={isCancel ? Texts.confirmCancel : Texts.confirmDelete}
                        buttonOneText="Yes"
                        actionBtnOne={() => isCancel ? this.cancelBooking() : this.deleteBooking()}
                        buttonTwoText="No"
                        actionBtnTwo={() => this.cancel()}
                    />
                </View>
            </SafeAreaView>

        )
    };
}

const styles = StyleSheet.create({
    dropdown: {
        justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'
    },
    titleText: {
        // fontFamily: fontFamily.RobotoMedium, 
        fontSize: 16, color: AppColors.helpTextColor
    },
    absoluteView: {
        marginVertical: 20,
        //  position: 'absolute', 
        //  bottom: 10, 
        flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15
    },

    cover: {
        backgroundColor: "rgba(0,0,0,.5)",
    },

    sheet: {
        position: "absolute",
        top: Dimensions.get("window").height,
        left: 0,
        right: 0,
        height: "100%",
        justifyContent: "flex-end",
    },
    popup: {
        backgroundColor: "#FFF",
        marginHorizontal: 10,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        minHeight: 160,
        alignItems: "center",
        justifyContent: "center",
    },
    dropDownText: {
        fontWeight: constants.placeholder600,
        // fontFamily: fontFamily.RobotoRegular,
        color: AppColors.textColor,
    },
    header: {
        height: 50,
        backgroundColor: AppColors.appColor,
        alignItems: "center",
        flexDirection: "row",
    },
    mainView: {
        backgroundColor: AppColors.white,
        flex: 1
    },
    back: {
        flexDirection: "row",
        marginLeft: Platform.OS == "android" ? 15 : null,
        marginBottom: Platform.OS == "android" ? 0 : 2

    },
    backText: {
        fontSize: 17,
        color: AppColors.white,
        fontWeight: '400',
        marginTop: 2
    },
    innerView: {
        backgroundColor: AppColors.white,
        marginTop: 10,
        paddingBottom: 15
    },
    placeholder: {
        fontWeight: constants.placeholder600,
        width: width - 30,
        // fontFamily: fontFamily.RobotoRegular,
        color: AppColors.textColor,
    },
    placeholderNotes: {
        fontWeight: Platform.OS == 'ios' ? constants.placeholder600 : 'normal',
        width: width - 30,
        height: 100,
        // fontFamily: fontFamily.RobotoRegular,
        color: AppColors.textColor,
        borderRadius: 5
    },
    buttonView: {
        marginTop: 20
    },
    termText:{
        // fontFamily: fontFamily.RobotoMedium,
        fontSize: 16,
        textAlign: 'justify', 
        padding:3, 
        marginLeft : 5,
        width  :width-60,
       flexWrap: 'wrap',
       // backgroundColor :"green"
    },
    termView:{
        flexDirection:'row', 
        alignSelf:'center', 
        marginTop:4, 
        justifyContent:'center',        
        width  :width-30,
    },
    touchView : {
        width  :width-30,        
        // alignItems :"center",        
        flexDirection:"row",        
    },
})