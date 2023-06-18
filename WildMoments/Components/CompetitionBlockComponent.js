import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Alert, Image } from 'react-native'
import React from 'react'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import CountDown from 'react-native-countdown-component';
import moment from 'moment';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { getEntryCountOfCompetitionFromDB } from '../services/firebseDB';
import lovecircle from '../assets/AppIcons/lovecircle.png';

const CompetitionBlockComponent = ({ competition }) => {
    // console.log(competition);
    // const [myStartDate, setMyStartDate] = useState()
    // const [myEndDate, setMyEndDate] = useState()
    const [castedEntries, setcastedEntries] = useState(0)

    const [timeLeft, setTimeLeft] = useState("")
    const [compClosed, setCompClose] = useState(false)


    const navigation = useNavigation();
    const currentTimestamp = new Date();


    const calculateRemainingTime = (startDate, endDate) => {
        const startDateTime = new Date(startDate).getTime();
        const endDateTime = new Date(endDate).getTime();
        const currentTime = Date.now();

        if (currentTime >= startDateTime && currentTime <= endDateTime) {
            const remainingTime = endDateTime - currentTime;
            const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
            const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

            return {
                days,
                hours,
                minutes,
                seconds
            };
        } else {
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            };
        }
    };


    useEffect(() => {
        // setMyStartDate(new Date(competition.startDate.seconds * 1000))
        // setMyEndDate(new Date(competition.endDate.seconds * 1000))
        getEntries(competition?.id)
        startTimer()


    }, [competition])



    const startTimer = () => {
        const updateTime = () => {
            var myStartDate = new Date(competition?.startDate?.seconds * 1000);
            var myEndDate = new Date(competition?.endDate?.seconds * 1000);
            const endDateTime = new Date().getTime();
            const currentTime = Date.now();
            const remainingTime = endDateTime - currentTime;

            if (remainingTime <= 0) {
                time = calculateRemainingTime(myStartDate, myEndDate);
                setTimeLeft(time.days + " : " + time.hours + " : " + time.minutes + " : " + time.seconds)

                if (time.days == 0 && time.hours == 0 && time.minutes == 0 && time.seconds == 0) {
                    setCompClose(true)
                    setTimeLeft("Closed!")

                }
            }
        };
        if (!compClosed) {

            setInterval(updateTime, 1000);
        }
    };


    const getEntries = async (id) => {
        const entries = await getEntryCountOfCompetitionFromDB(id)
        setcastedEntries(entries)
    }

    return (
        <View style={styles.competitions}>
            <Text style={styles.photocomp}>#PhotoCompetition:</Text>
            <Text style={styles.photocompSeason}>- {competition?.title}</Text>
            <View style={styles.spacer} />
            <Text style={styles.photocompThemeHeading}>#Theme: {competition?.theme} </Text>


            <View style={styles.competitionsButtons}>
                <View style={styles.Enter} >
                    {compClosed ? (
                        <TouchableOpacity
                            style={styles.competitionsClosed} onPress={() =>
                                Alert.alert(
                                    "Competition closed!",
                                    "Go to the gallery to view the Winners!",
                                    [
                                        { text: 'Close', onPress: () => { /* Action for Close button */ } },
                                        { text: 'Gallery', onPress: () => { navigation.navigate("GalleryScreenWinnersOverview", { competition }) } }
                                    ]
                                )}>
                            <Text style={styles.competitionsClosedText}>CLOSED</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={styles.competitionsEnter}
                            onPress={() => navigation.navigate('EnterCompScreen', { competition })}
                        >
                            <Text style={styles.competitionsEnterText}>ENTER</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles.buttonGap} />
                <View style={styles.Browse}>
                    {!compClosed && (<TouchableOpacity
                        style={styles.competitionsBrowse}
                        onPress={() => navigation.navigate('BrowseAndEnterScreen', { competition })} >
                        <Text style={styles.competitionsBrowseText}>JUDGE</Text>
                    </TouchableOpacity>)}
                </View>
            </View>
            <View style={styles.photocompTimeView}>
                <Text style={styles.photocompTimeHeading}>Remaining Time for Entries</Text>

                {compClosed ? (<Text style={{ marginTop: Platform.OS === 'ios' ? -2 : -2, }}>Competition Closed!</Text>) :
                    (<Text style={styles.photocompTime}>{timeLeft}</Text>)}

                <View style={styles.total}>
                    <Text style={styles.totaltitle}>
                        Current total submitted entries:
                    </Text>
                    <View style={styles.entriestotal}>

                        <Text style={styles.totaltitle2}>  {castedEntries}</Text>
                    </View>

                </View>


            </View>
            <View>

            </View>
        </View>

    )
}

export default CompetitionBlockComponent

const styles = StyleSheet.create({
    containerloveimage: {
        width: Platform.OS === 'ios' ? RFValue(22) : RFValue(22),
        height: Platform.OS === 'ios' ? RFValue(22) : RFValue(22),
    },
    entriestotal: {
        flexDirection: 'row',
        borderRadius: 12,
        borderWidth: 3,
        borderColor: 'rgba(255, 255, 255, 0.125)',
        width: Platform.OS === 'ios' ? RFValue(26) : RFValue(30),
        height: Platform.OS === 'ios' ? RFValue(26) : RFValue(30),
        borderColor: Platform.OS === 'ios' ? '#252524' : '#252524',
        marginTop: Platform.OS === 'ios' ? RFValue(0) : RFValue(-4),
    },
    totaltitle: {
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: Platform.OS === 'ios' ? RFValue(12) : RFValue(12),
        color: '#252524',
    },
    totaltitle2: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        fontWeight: 'bold',
        color: '#252524',
        // padding: Platform.OS === 'ios' ? RFValue(0) : RFValue(2),
    },

    total: {
        marginTop: Platform.OS === 'ios' ? RFValue(18) : RFValue(8),
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    photocompTimeView: {

        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    photocompTimeHeading: {
        fontWeight: 'bold',
        marginVertical: RFValue(1),
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        color: '#101010',
        fontSize: Platform.OS === 'ios' ? RFValue(14) : RFValue(14),
    },
    photocompTime: {
        fontSize: Platform.OS === 'ios' ? RFValue(16) : RFValue(14),
        fontWeight: 'bold',
        marginTop: Platform.OS === 'ios' ? RFValue(1) : RFValue(-4),
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    spacer: {
        marginVertical: RFPercentage(1),
    },
    photocomp: {
        alignSelf: 'flex-start',
        fontSize: RFValue(14),
        fontWeight: '900',
        color: '#101010',
    },
    photocompSeason: {
        alignSelf: 'flex-start',
        fontSize: RFValue(16),
        fontWeight: 'bold',
        color: '#101010',
    },
    photocompThemeHeading: {
        alignSelf: 'flex-start',
        fontSize: RFValue(14),
        fontWeight: '800',
        color: '#101010',
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
    competitionsClosed: {
        // backgroundColor: '#FEB62C',
        // height: RFPercentage(5),
        // width: RFPercentage(18),
        // borderRadius: 50,
        // marginBottom: 15,
        // shadowColor: 'gray',
        // textAlign: 'center',


        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#954242',

        // marginBottom: RFValue(5),
        shadowColor: 'gray',

        borderRadius: 50,
        shadowColor: 'gray',
        shadowRadius: RFPercentage(8),
        height: RFValue(35),
        width: RFValue(120),
        marginLeft: 10,
        marginTop: Platform.OS === 'ios' ? 0 : -2,
        alignItems: 'center',
        alignSelf: 'center',
        textAlign: 'center',
    },

    competitionsClosedText: {
        color: '#111',
        fontSize: Platform.OS === 'ios' ? 16 : 14,
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
        borderWidth: Platform.OS === 'ios' ? 1.5 : 1.8,
        borderColor: '#F2C440',
        borderStyle: 'dashed',
        alignItems: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        // elevation: 10, // Adjust the elevation value as per your preference

    },


    competitionsBrowseText: {

        // color: '#F2C440',
        color: Platform.OS === 'ios' ? '#F2C440' : '#111',
        fontSize: Platform.OS === 'ios' ? 16 : 13,
        alignSelf: 'center',
        paddingVertical: RFValue(8),
        fontWeight: '800',
    },

})