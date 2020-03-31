import React, { Component } from 'react';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  Alert
} from 'react-native';
import firebase from 'firebase'
// import { Container } from './styles';
import fundo from '../../assets/testeFundo.png';
import gitLab from '../../assets/git.png';
import DatePicker from 'react-native-datepicker'
import AsyncStorage from '@react-native-community/async-storage';


const { width, height } = Dimensions.get('window')
import { Colors } from '../config/colors'
let date = (new Date().getDate() > 10) ? `${new Date().getDate()}` : `0${new Date().getDate()}`
let month = ((new Date().getMonth() + 1) >= 10) ? `${(new Date().getMonth() + 1)}` : `0${(new Date().getMonth() + 1)}`
let year = new Date().getFullYear();
export default class pages extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nome: '',
      dataNasc: '01-01-1990',
      CidEst: '',
      peso: null,
      altura: '',
      email: '',
      fone: '',
      curso: '',
      periodo: '',
      dataColeta: `${date}-${month}-${year}`,
      resposta: [],
      rota: '',
      nomePesquisador: '',
      escala: '',
      profissao: ''
    }
  }
  limparDados() {
    Alert.alert('Atenção', 'Tem certeza que deseja limpar a informações inseridas?',
      [{
        text: 'Não',
        onPress: () => {
        },
      }, {
        text: 'Sim',
        onPress: async () => {
          this.setState({
            nome: '', dataNasc: '', CidEst: '',
            peso: '', altura: '', email: '', fone: '', curso: '', periodo: '', profissao: ''
          })
        },
      }])
  }
  async componentDidMount() {
    const { navigation } = this.props;
    const { idPesquisador } = navigation.state.params;
    const ref = await firebase.database().ref(`${idPesquisador}/dados`)
    await ref.on('value', async (snapshot) => {
      const dados = snapshot.toJSON();
      // const item = JSON.parse(dados);
      this.setState({ nomePesquisador: dados.nome })
      // console.log(dados.nome)
    })

    const dado = await AsyncStorage.getItem('dados')
    const itens = JSON.parse(dado);
    if (itens) {
      await this.setState({
        nome: itens.nome, dataNasc: itens.dataNasc, CidEst: itens.CidEst,
        peso: itens.peso, altura: itens.altura, email: itens.email, fone: itens.fone, curso: itens.curso, periodo: itens.periodo,
        profissao: itens.profissao
      })
    }
  }
  async cad() {
    const { nome, dataNasc, CidEst,
      peso, altura, email, fone, curso, periodo,
      dataColeta, profissao, nomePesquisador
    } = this.state
    const { navigation } = this.props;
    const { escala, question, idPesquisador } = navigation.state.params;
    const dados = {
      nome, profissao, dataNasc, CidEst,
      peso, altura, email, fone, curso, periodo,
      dataColeta, idPesquisador, nomePesquisador
    }

    // console.log(teste)
    const teste = {
      dado: dados,
      resposta: question
    }
    const db = firebase.database();
    await db.ref(`/${idPesquisador}/${escala}`).push(teste)
    await db.ref(`/${escala}`).push(teste)
    await AsyncStorage.setItem('dados', JSON.stringify(dados));
    await this.props.navigation.replace('home')
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {/* <-- pergunta ----> */}
          <View style={styles.View}>
            <TextInput
              style={styles.input}
              autoCorrect={false}
              autoCapitalize='none'
              placeholder='Nome Completo'
              placeholderTextColor={Colors.TEXT}
              value={this.state.nome}
              onChangeText={nome => this.setState({ nome })}
            />
          </View>
          {/* <-- pergunta ----> */}
          <View style={styles.View}>
            <TextInput
              style={styles.input}
              autoCorrect={false}
              autoCapitalize='none'
              placeholder='Profissão'
              placeholderTextColor={Colors.TEXT}
              value={this.state.profissao}
              onChangeText={profissao => this.setState({ profissao })}
            />
          </View>
          {/* <-- pergunta ----> */}
          {/* <-- pergunta4 ----> */}
          <View style={styles.View}>
            <TextInput
              style={styles.input}
              autoCorrect={false}
              autoCapitalize='none'
              placeholder='Email'
              placeholderTextColor={Colors.TEXT}
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
            />
          </View>
          {/* <-- pergunta4 ----> */}

          {/* <-- pergunta2 ----> */}
          <View style={styles.View2}>
            <TextInput
              style={styles.input2}
              autoCorrect={false}
              autoCapitalize='none'
              placeholder='Cid/Est de Origem'
              placeholderTextColor={Colors.TEXT}
              value={this.state.CidEst}
              onChangeText={CidEst => this.setState({ CidEst })}
            />
            <View style={{ marginTop: 10, marginLeft: 10 }}>
              <Text style={styles.data}>Data de Nascimento: </Text>
              <DatePicker
                style={{ width: 120 }}
                date={this.state.dataNasc}
                androidMode="spinner"
                format="DD-MM-YYYY"
                minDate="01-01-1970"
                maxDate="01-01-2050"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                    borderColor: '#3B54B8',
                  },
                  dateText: {
                    color: '#3B54B8',
                    textAlign: 'center',
                  },
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => { this.setState({ dataNasc: date }) }}
              />
            </View>
            {/* <View style={styles.viewInput}>
              <TextInput
                style={styles.input}
                autoCorrect={false}
                autoCapitalize='none'
                placeholder='Data de Nascimento'
                placeholderTextColor='#3B54B8'
                value={this.state.dataNasc}
                onChangeText={dataNasc => this.setState({ dataNasc })}
              />
            </View> */}
          </View>
          {/* <-- pergunta2 ----> */}
          {/* <-- pergunta3 ----> */}
          <View style={styles.View2}>
            <TextInput
              style={styles.input2}
              autoCorrect={false}
              autoCapitalize='none'
              placeholder='Peso'
              keyboardType={'numeric'}
              placeholderTextColor={Colors.TEXT}
              value={this.state.peso}
              onChangeText={peso => this.setState({ peso })}
            />
            <TextInput
              style={styles.input2}
              autoCorrect={false}
              autoCapitalize='none'
              placeholder='Altura'
              keyboardType={'numeric'}
              placeholderTextColor={Colors.TEXT}
              value={this.state.altura}
              onChangeText={altura => this.setState({ altura })}
            />
          </View>
          {/* <-- pergunta3 ----> */}

          {/* <-- pergunta5 ----> */}
          <View style={styles.View}>
            <View style={styles.viewInput}>
              <TextInput
                style={styles.input}
                autoCorrect={false}
                autoCapitalize='none'
                placeholder='Telefone para contato'
                keyboardType={'numeric'}
                placeholderTextColor={Colors.TEXT}
                value={this.state.fone}
                onChangeText={fone => this.setState({ fone })}
              />
            </View>
          </View>
          {/* <-- pergunta5 ----> */}
          {/* <-- pergunta6 ----> */}
          <View style={styles.View2}>
            <TextInput
              style={styles.input2}
              autoCorrect={false}
              autoCapitalize='none'
              placeholder='Curso'
              placeholderTextColor={Colors.TEXT}
              value={this.state.curso}
              onChangeText={curso => this.setState({ curso })}
            />
            <TextInput
              style={styles.input2}
              autoCorrect={false}
              autoCapitalize='none'
              keyboardType={'numeric'}
              placeholder='Período'
              placeholderTextColor={Colors.TEXT}
              value={this.state.periodo}
              onChangeText={periodo => this.setState({ periodo })}
            />
          </View>
          {/* <-- pergunta6 ----> */}
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity style={styles.buttonLogin} onPress={() => this.cad()}>
              <Text style={styles.textButton}>Finalizar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Limpar} onPress={() => this.limparDados()}>
              <Text style={styles.textButton}>Limpar dados</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#FFF',
  },
  viewInput2: {
    height: 40,
    width: width - 20,
    // backgroundColor: '#fff',
    // borderRadius: 8,
    // justifyContent: 'center',
    marginTop: 30,
    borderBottomWidth: 2,
    borderColor: Colors.TEXT,
    // marginLeft: 10
  },
  input: {
    fontSize: 14,
    color: '#8F98C1',
    borderColor: Colors.TEXT,
    borderBottomWidth: 1,
    width: width - 40
  },
  input2: {
    fontSize: 14,
    color: '#8F98C1',
    borderColor: Colors.TEXT,
    borderBottomWidth: 1,
    width: 150,
    marginRight: 25
  },
  buttonLogin: {
    height: 40,
    width: width - 40,
    backgroundColor: '#3B54B8',
    marginTop: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 3,
    borderColor: '#000',
    marginBottom: 20
  },
  Limpar: {
    height: 40,
    width: width - 40,
    backgroundColor: '#eb4c34',
    // marginTop: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 3,
    borderColor: '#000',
    marginBottom: 30
  },
  textButton: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff'
  },
  View: {
    flexDirection: 'row',
    marginHorizontal: 15,
    justifyContent: 'space-between',
    // alignItems: 'center',
    marginTop: 10
  },
  View2: {
    flexDirection: 'row',
    marginLeft: 15,
    // alignItems: 'center',
    marginTop: 10,
  },
  data: {
    // marginLeft: 8,
    marginBottom: 5,
    color: Colors.TEXT
  }
})


{/* <TouchableOpacity style={styles.buttonLogin} onPress={() => this.props.navigation.navigate('Cidades', {
              dados: {
                nome: this.state.nome,
                cidEsta: this.state.CidEst,
                dataNasci: this.state.dataNasc,
                peso: this.state.peso,
                altura: this.state.altura,
                email: this.state.email,
                fone: this.state.fone,
                curso: this.state.curso,
                periodo: this.state.periodo,
                dataColeta: this.state.dataColeta,
              }
            })}>
              <Text style={styles.textButton}>Finalizar Questionário</Text>
            </TouchableOpacity> */}