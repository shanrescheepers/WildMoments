import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HomeTab from '../../navigators/HomeTab'
import { Dimensions } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import HeaderComponent from '../../Components/HeaderComponent';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RulesScreen = ({ }) => {
    return (
        <View>
            <View style={styles.headercomponent}>
                <HeaderComponent />
            </View>
            <ImageBackground
                source={require('../../assets/backgroundImage.png')} // Replace with the actual path to your image
                style={styles.background}
            >
                <View style={styles.rules}>

                    <Text style={styles.rules1}>Strictly NO RHINO or ELEPHANT TUSKERS's Locations</Text>
                    <View style={styles.spacer} />
                    <Text style={styles.rules2}>Photos for competitions must have been taken in the GREATER KRUGER, inclusive of KRUGER NATIONAL PARK and not older than 5 years.</Text>
                    {/* <View style={styles.spacer} /> */}
                    <Text style={styles.rules3}>Caption and describe images, as shown in the example below:must be supplied by the photographer:</Text>
                    <View style={styles.spacer} />
                    <Text style={styles.rules4}>#Photo Competition: SPRING 2020</Text>
                    <View style={styles.spacer} />
                    <Text style={styles.rules5}>Title: Portrait of a Lion</Text>
                    <View style={styles.spacer} />
                    <Text style={styles.rules6}>Location: Greater Kruger </Text>
                    <View style={styles.spacer} />
                    <Text style={styles.rules7}>Camera: Canon EOS Lens: Sigma 60-600mm </Text>
                    <View style={styles.spacer} />
                    <Text style={styles.rules8}>Photographers must have taken the image that they submit themselves and be able to supply quality resolution images</Text>
                    <View style={styles.spacer} />
                    <View style={styles.important}>
                        <Text style={styles.rules9}>PHOTOGRAPHERS RETAIN COPYRIGHT TO THEIR OWN IMAGES AS DISPLAYED ON WILDMOMENTS. </Text>
                        <View style={styles.spacer} />
                        <Text style={styles.rules10}>WILDMOMENTS DO NOT OWN IN ANY WAY WHATSOEVER, THE COPYRIGHTS OF A PHOTOGRAPHERS CREATIVE EYE AND PRODUCT. </Text>
                    </View>
                </View>

            </ImageBackground>
        </View>
    );
}
export default RulesScreen

const styles = StyleSheet.create({
    background: {
        // alignSelf: 'center',
        resizeMode: 'contain',

        height: RFPercentage(300),
        paddingHorizontal: RFPercentage(4),
        paddingVertical: RFValue(8),
        windowWidth: windowWidth,
    },
    rules: {
        width: RFPercentage(50),
        justifyContent: 'flex-start',
        alignSelf: 'center',
        paddingHorizontal: RFPercentage(4),
        paddingVertical: RFValue(8)
    },
    rules1: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FA993B'

    },
    rules2: {
        paddingHorizontal: RFValue(16),
        fontSize: RFValue(11),
        color: '#A27A51',
    },
    rules3: {
        paddingHorizontal: RFValue(16),
        fontSize: RFValue(11),
        color: '#A27A51',
    },
    rules4: {
        paddingHorizontal: RFValue(16),
        color: '#C8C8C8',
    },
    rules5: {
        paddingHorizontal: RFValue(16),
        color: '#C8C8C8',
    },
    rules6: {
        paddingHorizontal: RFValue(16),
        color: '#C8C8C8',
    },
    rules7: {
        paddingHorizontal: RFValue(16),
        color: '#C8C8C8',
    },
    rules8: {
        paddingHorizontal: RFValue(16),
        color: '#C8C8C8',


    },
    rules9: {
        paddingHorizontal: RFValue(6),
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: RFValue(16),
        color: '#A27A51',
    },
    rules10: {
        paddingHorizontal: RFValue(8),
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: RFValue(16),
        color: '#A27A51',
    },

    spacer: {
        marginVertical: RFPercentage(1),
    },
    important: {
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        borderStyle: 'dashed',
        borderColor: '#71563A',
        borderWidth: 1,
        padding: 2,
        // paddingHorizontal: RFPercentage(4),
        color: '#A27A51',
        width: RFValue(260),
        // marginHorizontal: RFPercentage(2),
    }
})