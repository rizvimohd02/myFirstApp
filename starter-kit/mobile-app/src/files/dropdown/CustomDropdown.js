/*
  Common dropdown component.
*/

import React from 'react';
import AppColors from '../colors/AppColors';
import { TouchableOpacity, Text, StyleSheet, TouchableHighlight, FlatList, View, Dimensions, Modal, Image } from 'react-native'
// import { fontFamily } from '../fontFamily/FontFamily'
import { commonStyles } from '../utilities/CommonStyles'
import { constants } from '../constants/constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { images } from '../utilities/ImageComponent';

const { width, height } = Dimensions.get('screen')

export const CustomDropdown = ({ arrData, onSelect, isVisible, titleText, onPressClose, selectedValue, isMultiple }) => {
    // console.log("item", arrData)
    return (
        <Modal
            transparent={true}
            animationType={'slide'}
            visible={isVisible}
        >
            <View
                style={{
                    height: height,
                    backgroundColor: 'rgba(0,0,0,.5)',
                }}
            >
                <TouchableOpacity style={{ height: 200 }}
                    onPress={onPressClose}
                ></TouchableOpacity>
                <View style={[commonStyles.listStart, { paddingTop: 5, height: height }]}>
                    <TouchableOpacity onPress={onPressClose} style={{ backgroundColor: 'transparent', width: 50, height: 50, position: 'absolute', top: 3, right: 0, justifyContent: 'center', alignItems: 'center', zIndex: 1 }}>
                        {/* <AntDesign name='closecircle' color={AppColors.appColor} size={25} /> */}
                        <Image source={require('../check.png')} style={{height:30, width:30}}></Image>
                    </TouchableOpacity>
                    <Text allowFontScaling={false} style={{ fontSize: 18, textAlign: 'center', margin: 10, color: AppColors.appColor, 
                    // fontFamily: fontFamily.RobotoMedium, 
                    paddingBottom: 5 }}>{titleText}</Text>
                    <View style={{ height: 1, width: width, backgroundColor: AppColors.appColor, alignSelf: 'center' }}></View>

                    <FlatList
                        contentContainerStyle={{
                            marginBottom: 80
                        }}
                        showsVerticalScrollIndicator={false}
                        data={arrData}
                        renderItem={({ item }) =>
                            isMultiple
                                ?
                                <View>
                                    <TouchableOpacity style={styles.cellView} underlayColor='rgba(0,0,0,0.3)' onPress={() => onSelect(item)}>
                                        <Text allowFontScaling={false} style={[styles.cellItem, { fontWeight: selectedValue.includes(item.service) ? "bold" : "normal" }]}>{item.service}</Text>

                                        <Image source={selectedValue.includes(item.service) &&
                                            images.check1} style={{ width: "10%", backgroundColor:'red' }} resizeMode='center' />


                                    </TouchableOpacity>
                                    <View style={{ height: 0.5, width, backgroundColor: '#ddd' }}></View>
                                </View>
                                :
                                <View>
                                    <TouchableOpacity style={styles.cellView} underlayColor='rgba(0,0,0,0.3)' onPress={() => onSelect(item)}>
                                        <Text allowFontScaling={false} style={[styles.cellItem, { fontWeight: selectedValue == item.branch ? "bold" : "normal" }]}>{item.branch}</Text>
                                        <Image source={(selectedValue == item.branch) &&
                                            images.check1} style={{ width: "10%", backgroundColor:'red' }} resizeMode='center' />
                                    </TouchableOpacity>
                                    <View style={{ height: 0.5, width, backgroundColor: '#ddd' }}></View>
                                </View>
                        }
                        keyExtractor={index => index.id}
                    />
                </View>
            </View>
        </Modal>

    );
}


const styles = StyleSheet.create({
    cellView: {
        width, paddingLeft: 20, justifyContent: 'center', padding: 10, alignItems: 'center', flexDirection: 'row'
    },
    cellItem: {
        padding: 5, fontSize: 16,
        //  fontFamily: fontFamily.RobotoRegular, 
         
         flexWrap: 'wrap', width: "90%", textAlign: 'center', color: "#333"
        // ,backgroundColor:'red'
        //  marginHorizontal:10
    },

})