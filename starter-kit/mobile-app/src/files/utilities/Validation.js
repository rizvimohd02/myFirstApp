import { StackActions, NavigationActions } from 'react-navigation';
// import User from '../user/User'
// import Service from '../../api/Service'
// import urls from '../../api/urls'
import { Linking } from 'react-native'

//class for common methods
export default class Validation {

  /*validate email*/
  static validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  static thousands_separators = (num) =>{
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
    }

  // for password validation
  // static validatePassword = (password) =>{
  //   //var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,32}/
  //   //var reg = /^{6}$/
  //   //return true
  //   return reg.test(password)
  // }

  static validateMobile = (mobile) => {
    var reg = /^[0-9]{10,12}$/
    return reg.test(mobile)
  }


  static validateName = (name) => {
    var reg =  /^[0-9a-zA-Z ]+$/; 
    return reg.test(name)
  }

  static validateAmount = (amount) => {
    var reg = /^[0-9]$/
    return reg.test(amount)
  }

  static logoutUser = (navigation) => {
    let login = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: "Welcome"
        }),
      ],
    });

    navigation.dispatch(login)
  }

  static getUserPoints() {
    Service.Get(urls.getMyPoints)
      .then(response => {
        let status = response.data.status;
        if (status == false) {
        } else {
          global.myPoints = response.data.data.points
          let user = {
            userImage: User.image,
            token: User.token,
            email: User.email,
            firstName: User.firstName,
            mobile: User.mobile,
            notification_allow: User.notification_allow,
            referralCode: User.referralCode,
            referralUrl: User.referralUrl,
            accountLevel: User.accountLevel,
            shopifyId: User.shopifyId,
            walletPoints: global.myPoints
          }
          User.updateUser(user)
          console.log("updated user ===", user, User)
        }
      }).catch(error => {
        console.log("Error=== ", error)
      })
  }

  static pressCall(phone) {
    var phoneNumber = phone
    var url = ''
    if (Platform.OS !== 'android') {
      url = `telprompt:${phoneNumber}`;
    }
    else {
      url = `tel:${phoneNumber}`;
    }

    Linking.openURL(url)

  }

}