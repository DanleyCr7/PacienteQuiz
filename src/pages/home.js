import React, { Component } from 'react';

import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import firebase from 'firebase'
//IMPORTANDO COMPONENTES E CONFIGURAÇÃO DE COR
// <------->
import { Colors } from '../config/colors'
import { TextButton } from '../components/textButton';
import { ButtonOpacity } from '../components/buttonOpacity';
// <------->

export default class pages extends Component {
  componentDidMount() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyAcQ8jTZK6PPeQRKaO2txOmvpbRG7AqHSU",
      authDomain: "series-3e08b.firebaseapp.com",
      databaseURL: "https://series-3e08b.firebaseio.com",
      projectId: "series-3e08b",
      storageBucket: "",
      messagingSenderId: "779861796924",
      appId: "1:779861796924:web:da506c2ada262d605a3b39"
    };
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Seja bem vindo ao aplicativo de questionarios</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.CONTAINER,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

})