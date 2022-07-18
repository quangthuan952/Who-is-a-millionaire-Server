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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {socket} from '../elements/Socket';

const windowWidth = Dimensions.get('window').width;
export default HomeScreen = () => {
  // const [roomCode, setRoomCode] = useState('');
  const [roomId, setRoomId] = useState('');
  //   const [roomCode, setRoomcCode] = useState('');r
  const navigation = useNavigation();
  //1. Tạo phòng
  socket.on('200', console.log);
  socket.on('210', ({roomCode: roomId}) => {
    navigation.navigate('RoomWaiting', {roomId});
  });
  // Thông báo có người chơi khác vào phòng
  socket.on('211', console.log);
  socket.on('220', console.log);

  socket.on('res', () => {
    console.log('naby');
  });

  //Theo dõi người chơi vào phòng
  const createRoom = () => {
    socket.emit('CREATEROOM');
  };
  const joinRoom = () => {
    socket.emit('JOINROOM', roomId);
    navigation.navigate('RoomWaiting', {roomId});
  };
  const startGame = () => {
    socket.emit('STARTGAME', roomId);
    navigation.navigate('LineAnswers', {roomId});
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
          style={{height: 40}}
          placeholder="Nhập mã phòng"
          onChangeText={newText => setRoomId(newText)}
        />
        <TouchableOpacity onPress={createRoom}>
          <ImageBackground
            source={require('../../assets/imgs/answer.png')}
            resizeMode="contain"
            style={styles.buttonStyle}>
            <View style={styles.answerStyle}>
              <Text style={styles.answerText}>Tạo phòng chơi mới</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity onPress={joinRoom}>
          <ImageBackground
            source={require('../../assets/imgs/answer.png')}
            resizeMode="contain"
            style={styles.buttonStyle}>
            <View style={styles.answerStyle}>
              <Text style={styles.answerText}>Tham gia phòng chơi</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity onPress={startGame}>
          <ImageBackground
            source={require('../../assets/imgs/answer.png')}
            resizeMode="contain"
            style={styles.buttonStyle}>
            <View style={styles.answerStyle}>
              <Text style={styles.answerText}>Bắt đầu trò chơi</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        {/* <Text>{msg}</Text>
          <TouchableOpacity onPress={startGame} style={{backgroundColor: 'pink', padding: 10}}><Text>Bắt đầu chơi</Text></TouchableOpacity>
          <Text>{question}</Text> */}
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
    height: 300,
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