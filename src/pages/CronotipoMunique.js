import React, { Component } from 'react';
import firebase from 'firebase';
import {
  Linking,
  Share,
  View,
  Button,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';
import ciclo from '../../assets/ciclo.png'
const { width } = Dimensions.get('window')
import DatePicker from 'react-native-datepicker'
import { RadioButtons } from 'react-native-radio-buttons'
import AsyncStorage from '@react-native-community/async-storage';
var sonsetT = 0
var sonsetF = 0
var sdT = 0
var sdF = 0
var msfT = 0
var msfF = 0
var avsdT = 0
var msfSC = 0
var jls = 0
var selected = 0
var selected2 = ''
var question = []
var options2 = [
  'Sim',
  'Não'
]
export default class pages extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // respostas: [],
      pergunta1: '00:00',
      pergunta2: '00:00',
      pergunta3: '00:00',
      pergunta4: 0,
      pergunta5: '05:00',
      pergunta6: '',
      pergunta7: '00:00',
      pergunta8: '00:00',
      pergunta9: '00:00',
      pergunta10: 0,
      pergunta11: '05:00',
      pergunta12: '',
      nome: '',
      idPesquisador: '00:00',
      foraTrab: '00:00',
      diaTrab: '00:00',

      // date: "",
    }
  }
  converterMin(hora) {
    let s = hora.split(':');
    let min = parseInt(s[0]) * 60 + parseInt(s[1]);
    hora = min / 60
    return hora
  }

  sonsetT() {
    const { pergunta3, pergunta4 } = this.state;
    let Q3 = this.converterMin(pergunta3)
    let Q4 = pergunta4 / 60
    let resposta = (Q3 - Q4) - 24
    sonsetT = resposta
    console.log('SosentT', sonsetT)
  }
  sonsetF() {
    const { pergunta9, pergunta10 } = this.state;
    let Q3 = this.converterMin(pergunta9)
    let Q4 = pergunta10 / 60
    let resposta = (Q3 - Q4) - 24
    sonsetF = resposta
    console.log('SosentF', sonsetF)
  }
  sdT() {
    const { pergunta5 } = this.state;
    let Q5 = this.converterMin(pergunta5)
    let resposta = Q5 - sonsetT
    sdT = resposta
    console.log('sdT', sdT)
  }
  sdF() {
    const { pergunta11 } = this.state;
    let Q5f = this.converterMin(pergunta11)
    let resposta = Q5f - sonsetF
    sdF = resposta
    console.log('sdF', sdF)
  }
  msfT() {
    const { pergunta5 } = this.state;
    let Q5f = this.converterMin(pergunta5)
    let resposta = (sonsetT + Q5f) / 2
    msfT = resposta
    console.log('msfT', msfT)
  }
  msfF() {
    const { pergunta11 } = this.state;
    let Q5f = this.converterMin(pergunta11)
    let resposta = (sonsetF + Q5f) / 2
    msfF = resposta
    console.log('msfF', msfF)
  }
  avsdT() {
    let resposta = (sdT * selected) + (sdF * (7 - selected))
    avsdT = resposta
    console.log('avsdT', avsdT)
  }
  msfSC() {
    let resposta = ((msfF * 0.5) * (sdF - avsdT)) / 2
    msfSC = resposta
    console.log('msfSC', msfSC)
  }
  jls() {
    let resposta = msfF - msfT
    jls = resposta
    console.log('jls', jls)
  }

  async cad() {
    const { pergunta1, pergunta2, pergunta3, pergunta4, pergunta5, pergunta6, pergunta7, pergunta8,
      pergunta9, pergunta10, pergunta11, pergunta12, diaTrab, foraTrab } = this.state;
    var a = pergunta1.split(':');
    var b = pergunta3.split(':');
    var c = pergunta7.split(':');
    var d = pergunta9.split(':');

    var per1 = parseInt(a[0]) * 60 + parseInt(a[1]);
    var per3 = parseInt(b[0]) * 60 + parseInt(b[1]);
    var per7 = parseInt(c[0]) * 60 + parseInt(c[1]);
    var per9 = parseInt(d[0]) * 60 + parseInt(d[1]);
    if (selected2 === 'Não' && selected === null) {
      await this.sonsetT()
      await this.sonsetF()
      await this.sdT()
      await this.sdF()
      await this.msfT()
      await this.msfF()
      await this.avsdT()
      await this.msfSC()
      await this.jls()
      const calculos = {
        sonsetT: sonsetT,
        sonsetF: sonsetF,
        sdT: sdT,
        sdF: sdF,
        msfT: msfT,
        msfF: msfF,
        avsdT: avsdT,
        msfSC: msfSC,
        jls: jls,
      }
      question = {
        0: { question: pergunta1 },
        1: { question: pergunta2 },
        2: { question: pergunta3 },
        3: { question: pergunta4 },
        4: { question: pergunta5 },
        5: { question: pergunta6 },
        6: { question: pergunta7 },
        7: { question: pergunta8 },
        8: { question: pergunta9 },
        9: { question: pergunta10 },
        10: { question: pergunta11 },
        11: { question: pergunta12 },
        12: { question: diaTrab },
        12: { question: foraTrab },
        calculos: calculos,
      }

      const { params } = this.props.navigation.state
      await this.props.navigation.replace('form', {
        question: question,
        escala: 'CronotipoMunique',
        idPesquisador: params.id
      })
    }
    else if (selected2 = 'Sim') {
      if (selected === null) {
        Alert.alert('Falha', 'Informe o número de dias trabalhados')
      }
      else if (per1 > per3) {
        Alert.alert('Dias de trabalho', 'O seu horario de ir para cama não pode ser maior que está pronto para dormir')
      }
      else if (per7 > per9) {
        Alert.alert('Dias livres', 'O seu horario de ir para cama não pode ser maior que está pronto para dormir')
      }
      else {
        await this.sonsetT()
        await this.sonsetF()
        await this.sdT()
        await this.sdF()
        await this.msfT()
        await this.msfF()
        await this.avsdT()
        await this.msfSC()
        await this.jls()
        const calculos = {
          sonsetT: sonsetT,
          sonsetF: sonsetF,
          sdT: sdT,
          sdF: sdF,
          msfT: msfT,
          msfF: msfF,
          avsdT: avsdT,
          msfSC: msfSC,
          jls: jls,
        }
        question = {
          0: { question: pergunta1 },
          1: { question: pergunta2 },
          2: { question: pergunta3 },
          3: { question: pergunta4 },
          4: { question: pergunta5 },
          5: { question: pergunta6 },
          6: { question: pergunta7 },
          7: { question: pergunta8 },
          8: { question: pergunta9 },
          9: { question: pergunta10 },
          10: { question: pergunta11 },
          11: { question: pergunta12 },
          12: { question: diaTrab },
          12: { question: foraTrab },
          calculos: calculos,
        }

        const { params } = this.props.navigation.state
        await this.props.navigation.replace('form', {
          question: question,
          escala: 'CronotipoMunique',
          idPesquisador: params.id
        })
      }
    }
  }

  mostrar() {

  }
  renderRadioButton() {
    const options = [
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ]

    function setSelectedOption(selectedOption) {
      selected = selectedOption
      console.log(selected)
    }

    function renderOption(option, selected, onSelect, index) {
      const style = selected ? styles.escolhido : styles.naoEscolhido;

      return (
        <TouchableWithoutFeedback onPress={onSelect} key={index}>
          <Text style={style}>{option}</Text>
        </TouchableWithoutFeedback>
      );
    }

    function renderContainer(optionNodes) {
      return <View>{optionNodes}</View>;
    }

    return (
      <View style={{ width: "100%", alignItems: 'center' }} >
        <RadioButtons
          // style={{ flexDirection: "row", flex: 1 }}
          options={options}
          onSelection={setSelectedOption.bind(this)}
          selectedOption={this.state.selectedOption}
          renderOption={renderOption}
          renderContainer={RadioButtons.renderHorizontalContainer}
        />
        {/* <Text>Selected option: {this.state.selectedOption || 'none'}</Text> */}
      </View>
    )
  }

  renderRadioButton2() {
    function setSelectedOption(selectedOption) {
      selected2 = selectedOption
      if (selected2 === 'Não') {
        selected = null
      }
    }

    function renderOption(option, selected, onSelect, index) {
      const style = selected ? styles.escolhido2 : styles.naoEscolhido2;

      return (
        <TouchableWithoutFeedback onPress={onSelect} key={index}>
          <Text style={style}>{option}</Text>
        </TouchableWithoutFeedback>
      );
    }

    function renderContainer(optionNodes) {
      return <View>{optionNodes}</View>;
    }

    return (
      <View style={{ width: "100%", alignItems: 'center' }} >
        <RadioButtons
          // style={{ flexDirection: "row", flex: 1 }}
          options={options2}
          onSelection={setSelectedOption.bind(this)}
          selectedOption={this.state.selectedOption}
          renderOption={renderOption}
          renderContainer={RadioButtons.renderHorizontalContainer}
        />
        {/* <Text>Selected option: {this.state.selectedOption || 'none'}</Text> */}
      </View>
    )
  }


  render() {

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.inic}>
            <Text style={styles.textTrue}>Você tem um horário regular de {'\n'}trabalho
          (também como dono(a){'\n'} de casa, etc)?</Text>

            {this.renderRadioButton2()}

            <Text style={styles.textTrue2}>Quantos dias por semana?</Text>
            {this.renderRadioButton()}
            <Image
              source={ciclo}
              style={styles.logo}
            />
          </View>
          <View style={styles.diaTrab}>
            <Text style={{
              fontSize: 16, fontWeight: 'bold', color: '#fff',
              margin: 10
            }}>
              Nos dias de trabalho(incluindo a{'\n'}noite anterior ao primeiro dia de trabalho)
            </Text>
          </View>
          {/* <--pergunta 01--> */}
          {/* <Image
              style={styles.logo}
              source={sleep}
              aspectRatio={1}
            // resizeMode='stretch'
            /> */}
          <View style={styles.perguntas}>
            <Text style={styles.textPerg}>Vou para a cama às</Text>
            <DatePicker
              style={{ width: 80 }}
              date={this.state.pergunta1}
              androidMode="spinner"
              mode='time'
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
                  borderColor: '#fff',
                  // marginHorizontal: 10
                },
                dateText: {
                  color: '#fff',
                  textAlign: 'center',
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => { this.setState({ pergunta1: date }) }}
            />
            <Text style={styles.textPerg}>horas</Text>
          </View>
          {/* <--pergunta 02--> */}
          <View style={styles.perguntas}>
            <Text style={styles.textPerg}>Algumas pessoas permanecem algum{'\n'}tempo acordadas depois de se deitar!</Text>
            {/* <TextInput
              style={styles.input}
              autoCorrect={false}
              autoCapitalize='none'
              placeholder=''
              placeholderTextColor='#999'
              value={this.state.pergunta1}
              onChangeText={pergunta2 => this.setState({ pergunta2 })}
            /> */}
            <Text style={styles.textPerg}></Text>
          </View>
          {/* <--pergunta 02--> */}
          {/* <--pergunta 03--> */}
          <View style={styles.perguntas}>
            <Text style={styles.textPerg}>Às</Text>
            <DatePicker
              style={{ width: 80 }}
              date={this.state.pergunta3}
              androidMode="spinner"
              mode='time'
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
                  borderColor: '#fff',
                  // marginHorizontal: 10
                },
                dateText: {
                  color: '#fff',
                  textAlign: 'center',
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => { this.setState({ pergunta3: date }) }}
            />
            <Text style={styles.textPerg}>horas, estou pronto para dormir</Text>
          </View>
          {/* <--pergunta 04--> */}
          <View style={styles.perguntas}>
            <Text style={styles.textPerg}>Necessito de</Text>
            <TextInput
              style={styles.input}
              autoCorrect={false}
              autoCapitalize='none'
              placeholder=''
              keyboardType={'numeric'}
              placeholderTextColor='#999'
              value={this.state.pergunta4}
              onChangeText={pergunta4 => this.setState({ pergunta4 })}
            />
            {/* <DatePicker
              style={{ width: 80 }}
              date={this.state.pergunta4}
              androidMode="spinner"
              mode='time'
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
                  borderColor: '#fff',
                  // marginHorizontal: 10
                },
                dateText: {
                  color: '#fff',
                  textAlign: 'center',
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => { this.setState({ pergunta4: date }) }}
            /> */}
            <Text style={styles.textPerg}>minutos para adormecer</Text>
          </View>
          {/* <--pergunta 04--> */}
          {/* <--pergunta 05--> */}
          <View style={styles.perguntas}>
            <Text style={styles.textPerg}>Acordo às</Text>
            <DatePicker
              style={{ width: 80 }}
              date={this.state.pergunta5}
              androidMode="spinner"
              mode='time'
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
                  borderColor: '#fff',
                  // marginHorizontal: 10
                },
                dateText: {
                  color: '#fff',
                  textAlign: 'center',
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => { this.setState({ pergunta5: date }) }}
            />
            <Text style={styles.textPerg}>horas</Text>
          </View>
          {/* <--pergunta 05--> */}
          {/* <--pergunta 06--> */}
          <View style={styles.perguntas}>
            <Text style={styles.textPerg}>Passados</Text>
            <TextInput
              style={styles.input}
              autoCorrect={false}
              autoCapitalize='none'
              placeholder=''
              keyboardType={'numeric'}
              placeholderTextColor='#999'
              value={this.state.pergunta6}
              onChangeText={pergunta6 => this.setState({ pergunta6 })}
            />
            {/* <DatePicker
              style={{ width: 80 }}
              date={this.state.pergunta6}
              androidMode="spinner"
              mode='time'
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
                  borderColor: '#fff',
                  // marginHorizontal: 10
                },
                dateText: {
                  color: '#fff',
                  textAlign: 'center',
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => { this.setState({ pergunta6: date }) }}
            /> */}
            <Text style={styles.textPerg}>minutos, levanto-me</Text>
          </View>
          {/* <--pergunta 06--> */}
          <View style={styles.diaTrab}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff', textAlign: 'justify', margin: 10 }}>
              Fora dos dias de trabalho(incluindo a noite anterior ao primeiro dia de descanso ou lazer)
            </Text>
          </View>
          <View style={styles.perguntas}>
            <Text style={styles.textPerg}>Vou para a cama às</Text>
            <DatePicker
              style={{ width: 80 }}
              date={this.state.pergunta7}
              androidMode="spinner"
              mode='time'
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
                  borderColor: '#fff',
                  // marginHorizontal: 10
                },
                dateText: {
                  color: '#fff',
                  textAlign: 'center',
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => { this.setState({ pergunta7: date }) }}
            />
            <Text style={styles.textPerg}>horas</Text>
          </View>
          {/* <--pergunta 02--> */}
          <View style={styles.perguntas}>
            <Text style={styles.textPerg}>Algumas pessoas permanecem algum{'\n'}tempo acordadas depois de se deitar!</Text>
            {/* <TextInput
              style={styles.input}
              autoCorrect={false}
              autoCapitalize='none'
              placeholder=''
              placeholderTextColor='#999'
              value={this.state.pergunta1}
              onChangeText={pergunta2 => this.setState({ pergunta2 })}
            /> */}
            <Text style={styles.textPerg}></Text>
          </View>
          {/* <--pergunta 02--> */}
          {/* <--pergunta 03--> */}
          <View style={styles.perguntas}>
            <Text style={styles.textPerg}>Às</Text>
            <DatePicker
              style={{ width: 80 }}
              date={this.state.pergunta9}
              androidMode="spinner"
              mode='time'
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
                  borderColor: '#fff',
                  // marginHorizontal: 10
                },
                dateText: {
                  color: '#fff',
                  textAlign: 'center',
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => { this.setState({ pergunta9: date }) }}
            />
            <Text style={styles.textPerg}>horas, estou pronto para dormir</Text>
          </View>
          {/* <--pergunta 04--> */}
          <View style={styles.perguntas}>
            <Text style={styles.textPerg}>Necessito de</Text>
            <TextInput
              style={styles.input}
              autoCorrect={false}
              autoCapitalize='none'
              placeholder=''
              keyboardType={'numeric'}
              placeholderTextColor='#999'
              value={this.state.pergunta10}
              onChangeText={pergunta10 => this.setState({ pergunta10 })}
            />

            {/* <DatePicker
              style={{ width: 80 }}
              date={this.state.pergunta10}
              androidMode="spinner"
              mode='time'
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
                  borderColor: '#fff',
                  // marginHorizontal: 10
                },
                dateText: {
                  color: '#fff',
                  textAlign: 'center',
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => { this.setState({ pergunta10: date }) }}
            /> */}
            <Text style={styles.textPerg}>minutos para adormecer</Text>
          </View>
          {/* <--pergunta 04--> */}
          {/* <--pergunta 05--> */}
          <View style={styles.perguntas}>
            <Text style={styles.textPerg}>Acordo às</Text>
            <DatePicker
              style={{ width: 80 }}
              date={this.state.pergunta11}
              androidMode="spinner"
              mode='time'
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
                  borderColor: '#fff',
                  // marginHorizontal: 10
                },
                dateText: {
                  color: '#fff',
                  textAlign: 'center',
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => { this.setState({ pergunta11: date }) }}
            />
            <Text style={styles.textPerg}>horas</Text>
          </View>
          {/* <--pergunta 05--> */}
          {/* <--pergunta 06--> */}
          <View style={styles.perguntas}>
            <Text style={styles.textPerg}>Passados</Text>
            <TextInput
              style={styles.input}
              autoCorrect={false}
              autoCapitalize='none'
              placeholder=''
              keyboardType={'numeric'}
              placeholderTextColor='#999'
              value={this.state.pergunta12}
              onChangeText={pergunta12 => this.setState({ pergunta12 })}
            />
            {/* <DatePicker
              style={{ width: 80 }}
              date={this.state.pergunta12}
              // androidMode="spinner"
              mode='time'
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
                  borderColor: '#fff',
                  // marginHorizontal: 10
                },
                dateText: {
                  color: '#fff',
                  textAlign: 'center',
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => { this.setState({ pergunta12: date }) }}
            /> */}
            <Text style={styles.textPerg}>minutos, levanto-me</Text>
          </View>
          {/* <--pergunta 06--> */}
          <View style={styles.view}>
            <View style={styles.diaTrab}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff', textAlign: 'justify', margin: 10 }}>
                Em média, quanto tempo por dia você passa exposto a luz do dia (ao ar livre)?
            </Text>
            </View>
            {/* <--pergunta 06--> */}
            <View style={styles.perguntas}>
              <Text style={styles.textPerg}>Nos Dias de Trabalho</Text>
              <DatePicker
                style={{ width: 80 }}
                date={this.state.diaTrab}
                androidMode="spinner"
                mode='time'
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
                    borderColor: '#fff',
                    // marginHorizontal: 10
                  },
                  dateText: {
                    color: '#fff',
                    textAlign: 'center',
                  },
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => { this.setState({ diaTrab: date }) }}
              />
            </View>
            {/* <--pergunta 06--> */}

            {/* <--pergunta 06--> */}
            <View style={styles.perguntas}>
              <Text style={styles.textPerg}>Fora Dos Dias de Trabalho</Text>
              <DatePicker
                style={{ width: 80 }}
                date={this.state.foraTrab}
                androidMode="spinner"
                mode='time'
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
                    borderColor: '#fff',
                    // marginHorizontal: 10
                  },
                  dateText: {
                    color: '#fff',
                    textAlign: 'center',
                  },
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => { this.setState({ foraTrab: date }) }}
              />
            </View>
            {/* <--pergunta 06--> */}

            <TouchableOpacity
              onPress={() => this.cad()}
              style={styles.botao}
            >
              <Text style={styles.textButton}>Finalizar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: '#252C4A',
    width: '100%',
  },
  textTrue: {
    color: '#fff',
    fontSize: 20,
    marginTop: 15,
    // textAlign: 'justify'
  },
  textTrue2: {
    color: '#fff',
    fontSize: 20,
    // marginTop: ,
    marginLeft: -45
    // textAlign: 'justify'
  },
  input: {
    fontSize: 16,
    color: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    marginHorizontal: 5,
    // marginTop: -15
  },
  perguntas: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  textPerg: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
    // margin: 1
    // marginRight: 8
  },
  diaTrab: {
    width: '100%',
    height: 60,
    backgroundColor: '#268AEC',
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  botao: {
    width: 225,
    height: 40,
    backgroundColor: '#268AEC',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 20
  },
  textButton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  view: {
    alignItems: 'center',
    width: '100%'
  },
  viewInput: {
    height: 45,
    width: 50,
    // backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    // marginTop: -,
    borderBottomWidth: 2,
    borderColor: '#fff'
  },
  logo: {
    width: width - 5,
    height: 230,
    marginVertical: 15
  },
  inic: {
    width: '100%',
    alignItems: 'center'
  },
  escolhido: {
    fontSize: 20,
    color: '#fff',
    borderWidth: 2,
    textAlign: 'center',
    backgroundColor: '#3B54B8',
    borderRadius: 10,
    // margin: 8,
    // height: 40,
    width: 40,
    marginTop: 8,
    borderColor: '#3B54B8',
    marginHorizontal: 3
  },
  naoEscolhido: {
    fontSize: 20,
    color: '#fff',
    borderWidth: 2,
    textAlign: 'center',
    borderColor: '#3B54B8',
    borderRadius: 10,
    // margin: 8,
    // height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginHorizontal: 3
  },
  escolhido2: {
    fontSize: 20,
    color: '#fff',
    borderWidth: 2,
    textAlign: 'center',
    backgroundColor: '#3B54B8',
    borderRadius: 10,
    margin: 8,
    height: 40,
    width: 100,
    marginTop: 20,
    borderColor: '#3B54B8',
    marginHorizontal: 3
  },
  naoEscolhido2: {
    fontSize: 20,
    color: '#fff',
    borderWidth: 2,
    textAlign: 'center',
    borderColor: '#3B54B8',
    borderRadius: 10,
    margin: 8,
    height: 40,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginHorizontal: 3
  },
})



{/* <FlatList
data={list}
showsVerticalScrollIndicator={false}
renderItem={({ item }) => (
  <Text>{item.perguntas1}</Text>
  <TextInput
    style={styles.input}
    autoCorrect={false}
    autoCapitalize='none'
    placeholder=''
    placeholderTextColor='#999'
    value={this.state.pergunta1}
    onChangeText={pergunta1 => this.setState({ pergunta1 })}
  />
)}
keyExtractor={(item, index) => index.toString()}
/> */}