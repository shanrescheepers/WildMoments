import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import CountDown from 'react-native-countdown-component';
import moment from 'moment';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { getEntryCountOfCompetitionFromDB } from '../services/firebseDB';

const CompetitionBlockComponent = ({ competition }) => {
    console.log(competition);
    // console.log("Test");
    const [startDate, setStartDate] = useState()
    const [startDateSec, setStartDateSec] = useState()
    const [castedEntries, setcastedEntries] = useState(0)


    const navigation = useNavigation();
    const currentTimestamp = new Date();

    useEffect(() => {
        var myStartDate = new Date(competition.startDate.seconds * 1000);
        var myEndDate = new Date(competition.endDate.seconds * 1000);


        getEntries(competition.id)
    }, [])

    const getEntries = async (id) => {
        const entries = await getEntryCountOfCompetitionFromDB(id)
        setcastedEntries(entries)
        // console.log("Entries: ", entries);
    }

    return (
        <View style={styles.competitions}>
            <Text style={styles.photocomp}>#PhotoCompetition:</Text>
            <Text style={styles.photocompSeason}>- {competition.title}</Text>
            <View style={styles.spacer} />
            <Text style={styles.photocompThemeHeading}>#Theme: {competition.theme} </Text>


            <View style={styles.competitionsButtons}>
                <View style={styles.Enter} >
                    <TouchableOpacity
                        style={styles.competitionsEnter}
                        onPress={() => navigation.navigate('EnterCompScreen', { competition })}
                    >
                        <Text style={styles.competitionsEnterText}>ENTER</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonGap} />
                <View style={styles.Browse}>
                    <TouchableOpacity
                        style={styles.competitionsBrowse}
                        onPress={() => navigation.navigate('BrowseAndEnterScreen', { competition })} >
                        <Text style={styles.competitionsBrowseText}>JUDGE</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.photocompTimeView}>
                <Text style={styles.photocompTimeHeading}>Remaining Time for Entries</Text>

                <Text style={styles.photocompTime}>{startDate}</Text>


                <Text> Total Entries in Comp : {castedEntries}</Text>
                {/* is hierdie component fucky? */}
                {/* <CountDown
                    // vat datum direk in in seconds
                    until={new Date(competition.startDate.seconds) / 1000}
                    //duration of countdown in seconds
                    timetoShow={['D', 'H', 'M', 'S']}
                    //on Press call
                    onFinish={() => alert("Times Up!")}
                    size={15}
                    timeLabels={{ d: 'Days', h: 'Hours', m: 'Minutes', s: 'Seconds' }}
                    showSeparator
                /> */}
            </View>
            <View>

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
        fontWeight: '900',
    },
    photocompSeason: {
        alignSelf: 'flex-start',
        fontSize: RFValue(16),
        fontWeight: 'bold',
    },
    photocompThemeHeading: {
        alignSelf: 'flex-start',
        fontSize: RFValue(14),
        fontWeight: '800',
    },
    photocompTheme: {
        alignSelf: 'flex-start',
        fontWeight: '300',
        fontSize: RFValue(14),

    },
    competitions: {
        paddingHorizontal: RFValue(16),
        paddingVertical: RFValue(16),
        alignSelf: 'center',
        alignItems: 'center',
        width: RFPercentage(40),
        height: RFPercentage(38),
        backdropFilter: 'blur(10px) saturate(200%)',
        webkitBackdropFilter: 'blur(25px) saturate(200%)',
        backgroundColor: 'rgba(200, 184, 168, 0.59)',
        borderRadius: 12,
        borderWidth: 0,
        borderColor: 'rgba(255, 255, 255, 0.125)',
        // elevation: 10, // Adjust the elevation value as per your preference
        shadowColor: '#111',
        shadowOffset: {

            height: RFPercentage(3),

        },
        shadowOpacity: 1,
        shadowRadius: 20,

    },
    competitionsEnter: {
        // backgroundColor: '#FEB62C',
        // height: RFPercentage(5),
        // width: RFPercentage(18),
        // borderRadius: 50,
        // marginBottom: 15,
        // shadowColor: 'gray',
        // textAlign: 'center',


        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#A27A51',

        // marginBottom: RFValue(5),
        shadowColor: 'gray',

        borderRadius: 50,
        shadowColor: 'gray',
        shadowRadius: RFPercentage(8),
        height: RFValue(35),
        width: RFValue(120),

        alignItems: 'center',
        alignSelf: 'center',
        textAlign: 'center',
    },
    competitionsEnterText: {
        color: '#111',
        fontSize: RFValue(16),
        alignSelf: 'center',
        paddingVertical: RFValue(8),
        fontWeight: '700',
    },
    competitionsButtons: {
        marginTop: RFValue(15),
        marginBottom: RFValue(15),
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    // this is the button shadow
    Browse: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    competitionsBrowse: {

        borderRadius: 50,
        shadowColor: 'gray',
        shadowRadius: RFPercentage(8),
        height: RFValue(35),
        width: RFValue(120),
        borderWidth: 1.5,
        borderColor: '#F2C440',
        borderStyle: 'dashed',
        alignItems: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        // elevation: 10, // Adjust the elevation value as per your preference

    },


    competitionsBrowseText: {
        color: '#F2C440',
        fontSize: RFValue(16),
        alignSelf: 'center',
        paddingVertical: RFValue(8),
        fontWeight: '800',
    },
    photocompTimeView: {
        marginVertical: RFValue(-2),
        alignSelf: 'flex-start',
    },
    photocompTimeHeading: {
        fontWeight: '500',
        marginVertical: RFValue(1),
    }
})