import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const UserInfo = ({user, setPopUp, fetchUsers}) => {

    const removeUser = () => {
        const formData = new FormData();
        formData.append('user_ID', user.user_ID);
    
        fetch('https://wert-bon24.de/api/removeUser.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then((data) => {
            if(data.success) {
                setPopUp(false);

                fetchUsers();
            } else {
                console.log(data.message);
            }
        })
        .catch(error => {
            console.log(error);
        })
    }
  return (
    <View style={styles.body}>
        <View style={styles.cont}>
            <View style={styles.header}>
                <Text style={styles.title}>User Info</Text>
                <TouchableOpacity onPress={() => setPopUp(false)}>
                    <Image source={require('../assets/close.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>
            <View style={{gap:10, marginBottom: 20}}>
                <Text>Name: {user.name}</Text>
                <Text>Firma: {user.firma}</Text>
                <Text>PIN: {user.pin}</Text>
                <Text>Datum: {user.datum}</Text>
                <Text>User ID: {user.user_ID}</Text>
            </View>
            <View>
                <TouchableOpacity style={styles.deleteBtn} onPress={() => removeUser(user.user_ID)}>
                    <Text style={styles.textBtn}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

export default UserInfo

const styles = StyleSheet.create({
    body: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cont: {
        backgroundColor: '#FFF',
        width: '70%',
        padding: 10,
        borderRadius: 10
    },
    icon: {
        width: 25,
        height: 25
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingBottom: 20
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    deleteBtn: {
        backgroundColor: '#D00000',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        borderRadius: 10
    },
    textBtn: {
        fontWeight:'bold',
        color: '#FFF'
    }

})