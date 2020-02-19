import React, { Component } from 'react';

import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import firebase from 'firebase'
//IMPORTANDO COMPONENTES E CONFIGURAÇÃO DE COR
// <------->
import { Colors } from '../config/colors'
import { TextButton } from '../components/textButton';
import { ButtonOpacity } from '../components/buttonOpacity';
// <------->

import logo from '../../assets/logo.png'

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
        <View style={styles.cima}>
          <Image
            source={logo}
            style={styles.logo}
          />
        </View>
        <View style={styles.baixo}>
          {/* container botao */}
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.butto1}>
              <Text style={styles.textButton}>Principal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2}>
              <Text style={styles.textButton2}>Sobre nós</Text>
            </TouchableOpacity>
            {/* container botao */}

          </View>
          {/* container */}
          <View style={styles.sobreContainer}>
            <Text style={styles.textDesc}>Cronotipo de munique</Text>
            <TouchableOpacity style={styles.buttonSobre}>
              <Text>Sobre</Text>
            </TouchableOpacity>
          </View>
          {/* container */}
          <View style={styles.sobreContainer2}>
            <Text style={styles.textDesc}>Edinburgh</Text>
            <TouchableOpacity style={styles.buttonSobre}>
              <Text>Sobre</Text>
            </TouchableOpacity>
          </View>
          {/* container */}
          <View style={styles.sobreContainer3}>
            <Text style={styles.textDesc}>Escala 1 de beck</Text>
            <TouchableOpacity style={styles.buttonSobre}>
              <Text>Sobre</Text>
            </TouchableOpacity>
          </View>
          {/* container */}
        </View>
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
  cima: {
    flex: 1,
    backgroundColor: '#9D8BFB',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  baixo: {
    flex: 1.4,
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center'
  },
  logo: {
    width: 180,
    height: 135
  },
  butto1: {
    backgroundColor: '#9D8BFB',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: 40,
    borderRadius: 8
  },
  button2: {
    backgroundColor: '#ECECEC',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: 40,
    borderRadius: 8
  },
  textButton: {
    fontSize: 18,
    color: '#fff'
  },
  textButton2: {
    fontSize: 18,
    color: '#000'
  },
  sobreContainer: {
    width: '90%',
    backgroundColor: '#9D8BFB',
    height: 70,
    marginTop: 15,
    borderRadius: 8
  },
  sobreContainer2: {
    width: '90%',
    backgroundColor: '#25CED1',
    height: 70,
    marginTop: 15,
    borderRadius: 8
  },
  sobreContainer3: {
    width: '90%',
    backgroundColor: '#AEB4CE',
    height: 70,
    marginTop: 15,
    borderRadius: 8
  },
  buttonSobre: {
    width: 50,
    height: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 10,
    marginLeft: 15
  },

  textDesc: {
    fontSize: 18,
    marginLeft: 15,
    color: '#fff',
    marginTop: 5
  }

})