import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Alert
} from 'react-native';
import firebase from 'firebase'
import AsyncStorage from '@react-native-community/async-storage';
import { RadioButtons } from 'react-native-radio-buttons'
const { width, height } = Dimensions.get('window')
var index = -1
var question = []
var selected = ''
var calculo = 1
var options = []
export default class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myText:
        [
          '',
          'Dormência ou formigamento',
          'Sensação de calor',
          'Tremores nas pernas',
          'Incapaz de relaxar',
          'Medo que aconteça o pior',
          'Atordoado ou tonto',
          'Palpitação ou aceleração do coração',
          'Sem equilibrio',
          'Aterrorizado',
          'Nervoso',
          'Sensação de sufocação',
          'Tremores nas mãos',
          'Tremulo',
          'Medo de perder o controle',
          'Dificuldade de respirar',
          'Medo de morrer',
          'Assustado',
          'Indigestão ou desconforto no abdômen',
          'Sensação de desmaio',
          'Rosto afogueado/Rubor facial',
          'Suor (não devido ao calor)'
        ],
      nquestion: null,
      total: null,
      question: [],
      Proximo: 'Iniciar',
      Anterior: '',
      pesquisador: ''
      // selectedOption: 'esquerda'
    }
  }


  loadQustion = async (i) => {
    let pesoSelected = options.indexOf(selected)
    if (pesoSelected >= 0) {
      calculo = calculo + pesoSelected
      console.log(calculo)
    }
    options = [
      "Não",
      "Não me incomodou muito",
      "Foi muito desagradável mas pude suportar",
      "Dificilmente pude suportar",
    ]
    this.setState({ Proximo: 'Proximo' })
    await this.setState({ question: this.state.myText[i + 1], nquestion: i + 1, total: this.state.myText.length - 1 });
    if (pesoSelected >= 0) {
      await question.push({ question: this.state.myText[i], resposta: selected, peso: pesoSelected })
    }
    let res = options.indexOf(selected)
    if (res >= 0) {
      calculo = calculo + res
    }
    if (i === this.state.myText.length - 2) {
      this.setState({ Proximo: 'Finalizar', Anterior: '' })
    }
    if (i === this.state.myText.length - 1) {
      const { params } = this.props.navigation.state
      await this.props.navigation.replace('form', {
        question: question,
        escala: 'Ansiedade',
        idPesquisador: params.id
      })
    }
  }


  render() {
    function setSelectedOption(selectedOption) {
      selected = selectedOption
      // console.log(selected)
    }

    function renderOption(option, selected, onSelect, index) {
      const style = selected ? styles.escolhido : styles.naoEscolhido;
      return (
        <TouchableWithoutFeedback onPress={onSelect} key={index} style={{ flexDirection: 'row' }}>
          <Text style={style}>{option}</Text>
        </TouchableWithoutFeedback>
      );
    }

    function renderContainer(optionNodes) {
      return <View>{optionNodes}</View>;
    }
    // this.state.question = 'Para lançar um objeto ?'
    return (
      <View style={styles.container}>
        <View style={styles.ViewNQUIZ}>
          <Text style={styles.numQuiz}>Questão {this.state.nquestion}</Text>
          <Text style={{ fontSize: 20, color: '#8F98C1' }}> /{this.state.total}</Text>
        </View>

        <View style={{ margin: 20, alignItems: 'center' }}>
          <Text style={styles.textQuiz}>
            {this.state.question}
          </Text>
          <RadioButtons
            options={options}
            onSelection={setSelectedOption.bind(this)}
            selectedOption={this.state.selectedOption}
            renderOption={renderOption}
            renderContainer={renderContainer}
          />
          <TouchableOpacity style={styles.Botao} onPress={() => { this.loadQustion(++index) }}>
            <Text style={styles.textButton} >{this.state.Proximo}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#252C4A',
    flex: 1
  },
  textQuiz: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 12
  },
  containerButton: {
    flexDirection: 'row',
  },
  Botao: {
    backgroundColor: '#3B54B8',
    borderRadius: 12,
    height: 40,
    width: 250,
    // alignItems: 'center'
    justifyContent: 'center',
    marginTop: 20,
  },
  textButton: {
    textAlign: 'center',
    color: '#fff',
    alignItems: 'center',
    fontSize: 18
  },
  numQuiz: {
    color: '#8F98C1',
    fontWeight: 'bold',
    fontSize: 22
  },
  ViewNQUIZ: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#8F98C1',
    width: width - 40,
    borderRadius: 1,
    marginTop: 25,
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
    width: 250,
    marginTop: 20,
    borderColor: '#3B54B8',
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
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  }
});