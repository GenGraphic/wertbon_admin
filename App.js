import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import UserRow from './comp/UserRow';
import UserInfo from './comp/UserInfo';


export default function App() {
  const [usersList, setUsersList] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [pressedUser, setPressedUser] = useState({});

  useEffect(() => {
    fetchUsers();
  }, [])

  //fetch all the user from DB
  const fetchUsers = () => {
    fetch('https://wert-bon24.de/api/fetchUsers.php', {
      method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
      if(data.success === true) {
        setUsersList(data.result);
      } else {
        alert(data.message)
      }
    })
    .catch(error => alert('An error ocurred: ' + error.message));
  }

  return (
    <LinearGradient colors={['#212529', '#343A40', '#495057']} style={styles.body}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar style="light" />
        {popUp &&
          <UserInfo user={pressedUser} setPopUp={setPopUp} fetchUsers={fetchUsers}/>
        }

        <View style={styles.header}>
          <Image source={require('./assets/logo.png')} style={styles.logo}/>
          <Text style={styles.title}>WERTBON</Text>
        </View>

        <View style={styles.tableHead}>
          <View style={[styles.col, styles.smallCol]}>
            <Text style={styles.text}>ID</Text> 
          </View>
          <View style={[styles.col, styles.largeCol]}>
            <Text style={styles.text}>Name</Text> 
          </View>
          <View style={[styles.col, styles.largeCol]}>
              <Text style={styles.text}>Firma</Text>
          </View>
        </View>
        <FlatList
          data={usersList}
          renderItem={({item}) => <UserRow key={item.id} user={item} setPopUp={setPopUp} setPressedUser={setPressedUser}/>}
          keyExtractor={item => item.user_ID}
        />
      </SafeAreaView>
     </LinearGradient>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 40,
  },
  logo: {
    width:100,
    height: 100,
    borderRadius: 50
  },
  title: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 26,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  tableHead: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#00ADB5',
    justifyContent: 'space-between'
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
  text: {
    color: '#FFF'
  },
});
