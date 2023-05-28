import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';

const HeaderComponent = () => {
    return (
        <View style={styles.backgroundView}>
            <ImageBackground
                source={require('../assets/AppIcons/dropdownImage.png')} // Replace with the actual path to your image
                style={styles.background}
            ></ImageBackground>
        </View>
    )
}

export default HeaderComponent

const styles = StyleSheet.create({
    backgroundView: {
        alignSelf: 'flex-end',
        marginTop: RFPercentage(1),
    },
    background: {

        marginRight: RFPercentage(2),
        height: RFPercentage(4.4),
        width: RFPercentage(10),
        alignContent: 'flex-end',
    }
})