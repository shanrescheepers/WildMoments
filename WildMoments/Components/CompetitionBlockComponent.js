import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { useRoute, useNavigation } from '@react-navigation/native';

const CompetitionBlockComponent = ({ }) => {

    const navigation = useNavigation();

    return (
        <View style={styles.competitions}>
            <Text style={styles.photocomp}>#PhotoCompetition:</Text>
            <Text style={styles.photocompSeason}>- Autumn 2023</Text>
            <View style={styles.spacer} />
            <Text style={styles.photocompThemeHeading}>#Theme: <Text style={styles.photocompTheme}>Big Cats</Text> </Text>


            <View style={styles.competitionsButtons}>
                <View style={styles.Enter} >
                    <TouchableOpacity style={styles.competitionsEnter}
                        onPress={() => navigation.navigate('BrowseAndEnterScreen')}>
                        <Text style={styles.competitionsEnterText}>ENTER</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonGap} />
                {/* <View style={styles.Browse}>
                    <TouchableOpacity style={styles.competitionsBrowse}  >
                        <Text style={styles.competitionsBrowseText}>BROWSE</Text>
                    </TouchableOpacity>
                </View> */}
            </View>
            <View style={styles.photocompTimeView}>
                <Text style={styles.photocompTimeHeading}>Remaining Time for Entries</Text>
                <Text style={styles.photocompTime}>Time Here From RT DB/ CLOSED</Text>
            </View>
        </View>

    )
}

export default CompetitionBlockComponent

const styles = StyleSheet.create({
    spacer: {
        marginVertical: RFPercentage(1),
    },
    photocomp: {
        alignSelf: 'flex-start',
        fontSize: RFValue(14),

    },
    photocompSeason: {
        alignSelf: 'flex-start',
        fontSize: RFValue(16),
        fontWeight: 'bold',
    },
    photocompThemeHeading: {
        alignSelf: 'flex-start',
        fontSize: RFValue(14),
    },
    photocompTheme: {
        alignSelf: 'flex-start',
        fontWeight: 'lighter',
        fontSize: RFValue(14),

    },
    competitions: {
        paddingHorizontal: RFValue(16),
        paddingVertical: RFValue(16),
        alignSelf: 'center',
        alignItems: 'center',
        width: RFPercentage(40),
        height: RFPercentage(30),
        backdropFilter: 'blur(25px) saturate(200%)',
        webkitBackdropFilter: 'blur(25px) saturate(200%)',
        backgroundColor: 'rgba(200, 184, 168, 0.56)',
        borderRadius: 12,
        borderWidth: 0,
        borderColor: 'rgba(255, 255, 255, 0.125)',
        elevation: 10, // Adjust the elevation value as per your preference
        shadowColor: '#111',
        shadowOffset: {
            width: 26,
            height: 26,
        },
        shadowOpacity: 1,
        shadowRadius: 20,
    },
    competitionsEnter: {
        backgroundColor: '#FEB62C',
        height: RFPercentage(5),
        width: RFPercentage(18),
        borderRadius: 50,
        marginBottom: 15,
        shadowColor: 'gray',
        textAlign: 'center',
    },
    competitionsEnterText: {
        color: '#111',
        fontSize: RFValue(12),
        paddingHorizontal: RFValue(40),
        paddingVertical: RFValue(10),
        fontWeight: 900
    },
    competitionsButtons: {
        marginTop: RFValue(15),
    },
    buttonGap: {
        marginHorizontal: 10, // Adjust the margin value to set the desired gap
    },
    Enter: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    Browse: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    competitionsBrowse: {
        borderWidth: 2,
        borderColor: '#598059',
        // borderStyle: 'dashed',
        height: RFPercentage(5),
        width: RFPercentage(12),
        backgroundColor: '#598059',
        borderRadius: 50,
        marginBottom: 20,
        // shadowColor: 'gray',
        textAlign: 'center',
        // elevation: 10, // Adjust the elevation value as per your preference

    },


    competitionsBrowseText: {
        color: '#eee',
        fontSize: RFValue(12),
        paddingHorizontal: RFValue(12),
        paddingVertical: RFValue(9),
        fontWeight: 900
    },
    photocompTimeView: {
        marginVertical: RFValue(-2),
        alignSelf: 'flex-start',
    },
    photocompTimeHeading: {
        fontWeight: 'bold',
        marginVertical: RFValue(1),
    }
})