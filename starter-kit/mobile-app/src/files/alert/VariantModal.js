import React, { Component } from 'react';
import { View, Modal, Text, TouchableOpacity, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import { CommonButton } from '../buttons/AppButton';
import AppColors from '../colors/AppColors'
// import { fontFamily } from '../fontFamily/FontFamily'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import FastImage from 'react-native-fast-image'
import Texts from 'components/texts/Texts';


const { width, height } = Dimensions.get('window');

export default class VariantModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageLoaded: false
        }
    }

    render() {
        const { isVariantModal, onRequestClose, selectedVariant, itemDataVariant, variantData, onSelectVariant, addToCartFromVariant } = this.props
        return (

            <Modal transparent={true} animationType='slide' visible={isVariantModal} onRequestClose={onRequestClose}>
                <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column', justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0, 0.5)' }} >
                    <View style={{ backgroundColor: '#eee', width: width, paddingBottom: 20 }}>
                        <View style={{ justifyContent: 'space-between', padding: 10, flexDirection: 'row', backgroundColor: 'white' }}>
                            <Text allowFontScaling={false} style={{ fontSize: 20, 
                                // fontFamily: fontFamily.RobotoMedium
                                 color: AppColors.appColor }}>Select Variant</Text>
                            <TouchableOpacity onPress={onRequestClose}>
                                <AntDesignIcon name="closecircle" size={30} color={AppColors.appColor} />
                            </TouchableOpacity>

                        </View>
                        <View style={{ backgroundColor: 'white', margin: 10, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', }}>
                            <FastImage onLoad={() => this.setState({ imageLoaded: true })} source={{ uri: selectedVariant.image_url }} style={{ flex: 1, width: 120, height: 120,justifyContent: "center", alignItems: "center" }} resizeMode='center' >                               
                             <ActivityIndicator style={[{ width: 120, height: 120, backgroundColor: AppColors.rewardsBackground, display: (this.state.imageLoaded ? 'none' : 'flex') }]}
                                    animating={!this.state.imageLoaded}
                                    size='small' color={AppColors.appColor} />
                            </FastImage>


                            <View style={{ flex: 1, backgroundColor: 'white', padding: 10, margin: 10, marginTop: 0 }}>
                                <Text allowFontScaling={false} style={{ fontWeight: 'bold', fontSize: 18, marginVertical: 5, color: 'black' }}>{itemDataVariant.product_title}</Text>
                                <Text allowFontScaling={false} style={{ fontSize: 16, color: AppColors.buttonGrayColor }}>{selectedVariant.product_title}</Text>
                                <Text allowFontScaling={false} style={{ fontSize: 16, marginVertical: 5, color: AppColors.buttonGrayColor }}>{selectedVariant.price + Texts.points}</Text>
                            </View>

                        </View>

                        <View style={{ backgroundColor: 'white', padding: 10, margin: 10, marginTop: 0 }}>

                            <FlatList
                                horizontal={true}
                                scrollEnabled={true}
                                data={variantData}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index, count }) => {
                                    return (
                                        <TouchableOpacity style={{ flexDirection: 'row', padding: 5, height: 40, backgroundColor: item.id == selectedVariant.id ? AppColors.appColor : 'white', margin: 10, borderWidth: 2, borderColor: AppColors.appColor, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }} onPress={() => onSelectVariant(item)}>
                                            <Text allowFontScaling={false} style={{ color: item.id == selectedVariant.id ? "white" : AppColors.buttonGrayColor }}>{item.product_title}</Text>
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                        </View>

                        <CommonButton
                            height={40}
                            textFontSize={16}
                            width={120}
                            margintop={10}
                            backgroundColor={AppColors.appColor}
                            textvalue="Add To Cart"
                            borderRadius={20}
                            onPressAction={() => addToCartFromVariant(itemDataVariant)}
                        />
                    </View>
                </View>
            </Modal>
        )
    }

}