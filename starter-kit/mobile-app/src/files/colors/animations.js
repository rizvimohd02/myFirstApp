import React, { Component } from 'react';
import {
    Text,
    Image,
    Animated,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');


class MyButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // isLoading: false,
            textvalue: this.props.textvalue, 
            // onPressAction : this.props.onPressAction, 
            margintop : this.props.margintop, 
            borderRadius : this.props.borderRadius, 
            backgroundColor: this.props.backgroundColor, 
            isLoading : this.props.isLoading 
        };

        this.buttonAnimated = new Animated.Value(0);
        this.onPress = this.onPress.bind(this);
    }

    onPress = () => {
        if (this.state.isLoading) return;

        this.setState({ isLoading: true });
        this._animation(this.buttonAnimated, 1, 200);

        setTimeout(() => {
            this.setState({ isLoading: false });
            this._animation(this.buttonAnimated, 0, 200);
        }, 5000);
    }

    _animation(obj, toValue, duration) {
        Animated.timing(
            obj,
            {
                toValue,
                duration,
            }
        ).start();
    }

    render() {
        const changeWidth = this.buttonAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [width*0.85,height*0.08],
        });

        const{textvalue, margintop, borderRadius, backgroundColor, isLoading} = this.state

        return (
          
<Animated.View style={{ width: changeWidth }}>
<TouchableOpacity style = {{backgroundColor:backgroundColor, width: isLoading ? 45 : width-60 , height:45, justifyContent:'center', marginTop:margintop, borderRadius:borderRadius, }} 
  onPress={this.onPress}
// onPress = {onPressAction}
activeOpacity={0.8}
>
  {
    isLoading
    ?
    <ActivityIndicator animating={isLoading} size='small' color='white' />
    :
    <Text allowFontScaling={false} style = {{color:'white', fontSize:20, fontWeight:'500', textAlign:'center'}}>{textvalue}</Text>

  }

  </TouchableOpacity>
  </Animated.View>
        );
    }
}


export default MyButton;