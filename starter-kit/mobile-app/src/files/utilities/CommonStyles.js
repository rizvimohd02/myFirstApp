import { Dimensions, Platform } from 'react-native'
import AppColors from '../colors/AppColors';
import { constants } from '../constants/constants';
// import { fontFamily } from '../fontFamily/FontFamily'


const { width, height } = Dimensions.get('window');

export const commonStyles = {
    containerSafe: {
        flex: 1,
        height,
        backgroundColor: AppColors.appColor,
    },

    container: {
        flex: 1,
        width: width,
        height: Platform.OS == 'android' ? height : height - 50,
        backgroundColor: AppColors.appBackgroundColor
    },

    //textinput view style 
    textInputStyle: {
        borderWidth: 1, borderColor: AppColors.appGrayColor,
        borderRadius: 25, height: 45, marginTop: 10,
        width: width - 60, alignSelf: 'center', paddingHorizontal: 15,
    },

    //divider 
    divider: {
        height: 1, backgroundColor: AppColors.appGrayColor,
        alignSelf: 'center',
        marginBottom: 10,
        width: width - 60

    },

    //tab config
    viewTab: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: AppColors.appColor,
        height: 90,
    },
    activeTab: {
        borderBottomColor: AppColors.white,
        width: '50%',
    },
    inActiveTab: {
        borderBottomColor: AppColors.white,
        borderBottomWidth: 0,
        width: '50%',
    },
    activeTab3: {
        borderBottomColor: AppColors.white,
        borderBottomWidth: constants.borderWidth,
        width: '50%',
    },
    inActiveTab3: {
        borderBottomColor: AppColors.white,
        borderBottomWidth: 0,
        width: '50%',
    },
    activeTabText: {
        fontSize: constants.mediumFont,
        color: AppColors.white,
        fontWeight: constants.weight600,
        textAlign: 'center',
        marginTop: 10,
        opacity: constants.activeOpacity,
        // fontFamily: fontFamily.RobotoRegular
    },
    inActiveTabText: {
        fontSize: constants.mediumFont,
        color: AppColors.white,
        fontWeight: constants.weight600,
        textAlign: 'center',
        marginTop: 10,
        opacity: constants.inActiveOpacity
    },

    //list 
    listStart: {
        marginTop: -20,
        borderTopEndRadius: 15,
        borderTopStartRadius: 15,
        backgroundColor: "white",
        zIndex: 1,
    },

    //header 
    headerView: {
        justifyContent: 'center', alignItems: 'center', alignContent: 'center', height: 50, width: width - 100
    },
    done: {
        marginRight: 15,
        marginTop: 0,
        // backgroundColor:'red'
    },
    doneText: {
        color: AppColors.white,
        //fontWeight :"bold",
        fontSize: 16,
        // fontFamily: fontFamily.RobotoMedium,
        // width:130
        // backgroundColor :"red"
    },
    customHeader: {

        //width:width - 140,

        backgroundColor: AppColors.appColor,
        height: 60,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        color: AppColors.white,
        // fontFamily: fontFamily.RobotoMedium
    },
    //booking
    noDataTextStyle:
    {
        textAlign: 'center', margin: 15, fontSize: 16, 
        // fontFamily: fontFamily.RobotoRegular
    }


}