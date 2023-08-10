import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const UserRow = ({user, setPopUp, setPressedUser}) => {
    
    //select the user you want show see more info about
    //fisrt set the current user in the Home Screen
    //second set the popUp comp true and give it the user als prop
    const selectUser = () => {
        setPressedUser(user);

        setPopUp(true);
    }

  return (
    <TouchableOpacity style={styles.userRow} onPress={selectUser}> 
        <View style={[styles.col, styles.smallCol]}>
           <Text style={styles.text}>{user.user_ID}</Text> 
        </View>
        <View style={[styles.col, styles.largeCol]}>
           <Text style={styles.text}>{user.name}</Text> 
        </View>
        <View style={[styles.col, styles.largeCol]}>
            <Text style={styles.text}>{user.firma}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default UserRow

const styles = StyleSheet.create({
    userRow: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#00ADB5',
        justifyContent: 'space-between'
    },
    text: {
        color: '#FFF',
    },
    col: {
        borderRightWidth: 2,
        borderRightColor: '#00ADB5'
    },
    smallCol: {
        flex: 0.2
    },
    largeCol: {
        flex: 1
    },


})