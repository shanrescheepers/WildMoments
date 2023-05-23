import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { signOutUser } from '../../services/firebaseAuth'

const GalleryScreen = () => {
    return (
        <SafeAreaView>
            <View>
                <Text>GalleryScreen</Text>

                <TouchableOpacity style={styles.logout} onPress={(signOutUser)}>
                    <Text style={styles.logoutText}>LOG OUT</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default GalleryScreen

const styles = StyleSheet.create({
    logout: {
        backgroundColor: 'black',
        marginTop: 30,

        padding: 15,
        borderRadius: 50,
        marginBottom: 20,
        shadowColor: 'gray',
    },
    logoutText: {

        color: '#FFFF',
        fontSize: 20,
        textAlign: 'center',

    }
})