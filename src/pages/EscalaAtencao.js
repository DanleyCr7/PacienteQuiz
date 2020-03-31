import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
  Alert
} from 'react-native';
import firebase from 'firebase'
import AsyncStorage from '@react-native-community/async-storage';
import { RadioButtons } from 'react-native-radio-buttons'
const { width, height } = Dimensions.get('window')
var index = -1
var question = []
var selected = ''
var options = [];
var calculo = 1
export default class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myText:
        [
          '',
          'Com que frequência você comete erros por falta de atenção, quando tem que trabalhar num projeto chato ou dificil?',
          'Com que frequência você tem dificuldade para manter a atenção quando está fazendo um trabalho chato ou repetitivo?',
          'Com que frequência você tem dificuldade para se concetrar no que as pessoas dizem, mesmo quando elas estão falando diretamente com você?',
          'Com que frequência você deixa um projeto pela metade depois de já ter feito as partes mais dificeis?',
          'Com que frequência você tem dificuldade para fazer um trabalho que exige organização?',
          'Quando você precisa fazer algo que exige muita concentração, com que frenquência você evita ou adia?',
          'Com que frequência você coloca as coisas fora do lugar ou tem dificuldade para encontrar as coisas em casa ou no trabalho?',
          'Com que frequência você se distrai com atividades ou barulho a sua volta?',
          'Com que frequência você tem dificuldade para lembrar de compromissos ou obrigações?',
          //parte b
          'Com que frequência você fica se mexendo na cadeira ou balançando as mãos ou os pés quando precisa ficar sentado(a) por muito tempo?',
          'Com que frequência você se levanta da cadeira em reuniões ou em outras situações onde deveria ficar sentado(a)?',
          'Com que frequência você se sente inquieto(a) ou agitado?',
          'Com que frequência você tem dificuldade para sossegar e relaxar quando tem tempo livre para você?',
          'Com que frequência você se sente ativo demais e necessitando fazer coisas , como se tivesse "com um motor ligado?"',
          'Com que frequência você se pega falando demais em situações sociais?',
          'Quando você está conversando, com que frequência você se pega terminando as frases das pessoas antes delas?',
          'Com que frequência você tem dificuldade para esperar nas situações onde cada um tem a sua vez?',
          'Com que frequência você interrope os outros quando eles estão ocupados?',
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
      "Nunca",
      "Raramente",
      "Algumas Vezes",
      "Frequentemente",
      "Muito Frenquente"
    ];

    this.setState({ Proximo: 'Proximo', Anterior: 'Anterior' })
    // console.log(i)
    await this.setState({ question: this.state.myText[i + 1], nquestion: i + 1, total: this.state.myText.length - 1 });
    if (pesoSelected >= 0) {
      await question.push({ question: this.state.myText[i], resposta: selected, peso: pesoSelected })
    }
    if (i === this.state.myText.length - 2) {
      this.setState({ Proximo: 'Finalizar', Anterior: '' })
    }
    if (i === this.state.myText.length - 1) {
      const { params } = this.props.navigation.state
      await this.props.navigation.replace('form', {
        question: question,
        escala: 'Atencao',
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

        <ScrollView>
          <View style={{ alignItems: 'center', width: width }}>
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
        </ScrollView>
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
  Botao: {
    backgroundColor: '#3B54B8',
    borderRadius: 12,
    height: 40,
    width: 250,
    // alignItems: 'center'
    justifyContent: 'center',
    marginTop: 20,
    margin: 40
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
    alignItems: 'center',
    marginBottom: 25,
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