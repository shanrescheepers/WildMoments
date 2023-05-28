import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'

const CompetitionBlockComponent = () => {
    return (
        <View style={styles.competitions}>
            <Text style={styles.photocomp}>#PhotoCompetition:</Text>
            <Text style={styles.photocompSeason}>- Autumn 2023</Text>
            <View style={styles.spacer} />
            <Text style={styles.photocompThemeHeading}>Theme: <Text style={styles.photocompTheme}>Big Cats</Text> </Text>


            <View style={styles.competitionsButtons}>
                <View style={styles.Enter}>
                    <TouchableOpacity style={styles.competitionsEnter} >
                        <Text style={styles.competitionsEnterText}>ENTER</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonGap} />
                <View style={styles.Browse}>
                    <TouchableOpacity style={styles.competitionsBrowse}  >
                        <Text style={styles.competitionsBrowseText}>BROWSE</Text>
                    </TouchableOpacity>
                </View>
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
        fontSize: RFValue(16),
        fontWeight: 'bold',
    },
    photocompSeason: {
        alignSelf: 'flex-start',
    },
    photocompThemeHeading: {
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        fontSize: RFValue(16),
    },
    photocompTheme: {
        alignSelf: 'flex-start',
        fontWeight: 'lighter'
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
        backgroundColor: 'rgba(205, 208, 212, 0.74)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.125)',
        elevation: 10, // Adjust the elevation value as per your preference
        shadowColor: '#111',
        shadowOffset: {
            width: 26,
            height: 26,
        },
        shadowOpacity: 1,
        shadowRadius: 60,
    },
    competitionsEnter: {
        backgroundColor: '#F2C440',
        height: RFPercentage(5),
        width: RFPercentage(12),

        borderRadius: 50,
        marginBottom: 20,
        shadowColor: 'gray',
        textAlign: 'center',
    },
    competitionsEnterText: {
        color: '#2b2b2b',
        fontSize: RFValue(12),
        paddingHorizontal: RFValue(20),
        paddingVertical: RFValue(9),
        fontWeight: 900
    },

    competitionsButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: RFValue(10),
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
        borderWidth: 1.5,
        borderColor: '#F2C440',
        borderStyle: 'dashed',
        height: RFPercentage(5),
        width: RFPercentage(12),

        borderRadius: 50,
        marginBottom: 20,
        shadowColor: 'gray',
        textAlign: 'center',
        elevation: 10, // Adjust the elevation value as per your preference

    },


    competitionsBrowseText: {
        color: '#2b2b2b',
        fontSize: RFValue(12),
        paddingHorizontal: RFValue(12),
        paddingVertical: RFValue(9),
        fontWeight: 900
    },
    photocompTimeView: {
        marginVertical: RFValue(-8),
        alignSelf: 'flex-start',
    },
    photocompTimeHeading: {
        fontWeight: 'bold',
    }
})