import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  Image,
  Dimensions,
  ToastAndroid
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {socket} from '../elements/Socket';

const windowWidth = Dimensions.get('window').width;
export default JoinRoom = () => {
  const [roomId, setRoomId] = useState('');
  const [name, setName] = useState('');
  const navigation = useNavigation();

 
  useEffect(() => {
    socket.on("saiCode", ({message}) => {
      ToastAndroid.showWithGravity(
        message,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    })
  }, [])

  useEffect(() => {
    socket.on("thayPhong", ({roomId, user1, user2}) => {
      navigation.navigate('RoomWaiting', {roomId, user1, user2});
    })
  }, [])
  const joinRoom = () => {
   if(name !== '' && roomId !== '') {
    socket.emit('JOINROOM', {roomId, name});
   }
   else {
    ToastAndroid.showWithGravity(
        "Vui lòng nhập đầy đủ thông tin",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
}
  };
 
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/imgs/background.jpg')}
        resizeMode="cover"
        style={styles.image}>
        <Image
          style={styles.logoImg}
          source={require('../../assets/imgs/logo.png')}
        />
        <TextInput
          placeholderTextColor='white'
          style={{height: 60, borderBottomColor: '#ffffff', borderBottomWidth: 3, width: windowWidth*0.8, marginHorizontal: 10, marginVertical: 10, fontSize: 16, color: 'white'}}
          placeholder="Nhập định dang của bạn"
          onChangeText={newText => setName(newText)}
        />
         <TextInput
          placeholderTextColor='white'
          style={{height: 60, borderBottomColor: '#ffffff', borderBottomWidth: 3, width: windowWidth*0.8, marginHorizontal: 10, marginVertical: 5, fontSize: 16, color: 'white'}}
          placeholder="Nhập mã phòng"
          onChangeText={newText => setRoomId(newText)}
        />
        <TouchableOpacity onPress={joinRoom}>
          <ImageBackground
            source={require('../../assets/imgs/button.png')}
            resizeMode="contain"
            style={styles.buttonStyle}>
            <View style={styles.answerStyle}>
              <Text style={styles.answerText}>Tham gia phòng chơi</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoImg: {
    width: 300,
    height: 250,
  },
  image: {
    flex: 1,
    alignItems: 'center',
  },

  buttonStyle: {
    width: windowWidth,
    height: 70,
  },
  answerStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});