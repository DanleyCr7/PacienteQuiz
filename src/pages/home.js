import React, { Component } from 'react';

import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, ActivityIndicator, FlatList, ImageBackground } from 'react-native';
import firebase from 'firebase'
//IMPORTANDO COMPONENTES E CONFIGURAÇÃO DE COR
// <------->
import { Colors } from '../config/colors'
import { TextButton } from '../components/textButton';
import { ButtonOpacity } from '../components/buttonOpacity';
// <------->

import logo from '../../assets/colect.png'
import backdround from '../../assets/fundo/6.jpg'

export default class pages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sobre: 'São utilizados os questionários CRONOTIPO DE MUNIQUE, EDINBURG, ESCALA 1 DE BECK, ESCALA DE ANSIEADE DE BECK, OSTBERG, PITTSBURGH, ESCALA DE NÍVEL DE ATENÇÃO como formas de auxiliar na identificação de características comportamentais e cognitivas individuais.'
      // selectedOption: 'esquerda'
    }
  }
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
        <Image
          style={styles.logo}
          source={logo}
        // aspectRatio={1}
        // resizeMode='stretch'
        />
        <Text style={styles.logoText}>  Collect{'\n'}Voluntary</Text>
        <Text style={styles.text}>Sobre o aplicativo</Text>
        <View style={styles.card}>
          <Text style={styles.sobre}>{this.state.sobre}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#252C4A',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 70,
    width: 60,
    marginBottom: 5
    // alignItems: 'center'
  },
  text: {
    fontSize: 17,
    color: '#fff',
    marginBottom: 10,
    fontWeight: 'bold'
  },
  sobre: {
    fontSize: 18,
    color: '#fff',
    margin: 15,
    textAlign: 'center'
  },
  card: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15
  }


})