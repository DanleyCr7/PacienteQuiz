import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput
} from 'react-native';
import firebase from 'firebase'
import { RadioButtons } from 'react-native-radio-buttons'
var index = -1
var question = []
var selected = ''
var options = [];
export default class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myText:
        [
          '',
          'Durante o mês passado, a que horas se deitou a noite na maioria das vezes ?',
          'Durante o mês passado, quanto tempo (em média , isso em minutos) demorou a adormecer, na maioria das vezes ?',
          'Durante o mês passado, a que horas acordou de manhã, na maioria das vezes ?',
          'Durante o mês passado, quantas horas de sono, em média, você dormiu por noite?',
          'Durante o mês passado, quantas vezes teve problemas para dormir por causa de: ',
          'Durante o mês passado, como classificaria a qualidade do seu sono ?',
          'Durante o mês passado, você tomou algum medicamento para dormir, receitado por médico, ou por algum (amigo, farmacêutico, familiar) ou mesmo por sua conta?',
          'Durante o mês passado, se teve problemas para ficar acordado enquanto estava a conduzir, a fazer suas refeições ou a participar noutra atividade social, quantas vezes isso aconteceu ?',
          'Durante o mês passado, sentiu alguma indisposição ou falta de  entusiasmo para realizar as suas atividades diárias ?',
        ],
      perguntas: [
        'Horário de deitar',
        'Horário de adormecer',
        'Horas de sono por noite'
      ],
      nquestion: null,
      total: null,
      question: [],
      Proximo: 'Iniciar',
      Anterior: '',
      pesquisador: '',
      resposta: '',
      pergunta: '',
    }
  }


  loadQustion = async (i) => {
    this.setState({ Proximo: 'Proximo', Anterior: 'Anterior' })
    // console.log(i)
    await this.setState({ question: this.state.myText[i + 1], pergunta: this.state.perguntas[i] });
    await question.push({ question: this.state.myText[i], resposta: selected })
    // console.log(question)
    if (i === this.state.myText.length - 2) {
      this.setState({ Proximo: 'Finalizar', Anterior: '' })
    }
    if (i === this.state.myText.length - 1) {
      const respostas = {
        question: question,
        idPesquisador: this.state.pesquisador
      }
      // console.log(teste)
      this.props.navigation.navigate('form', {
        respostas: respostas,
        rota: 'Pisttsburgh'
      })
    }
  }


  render() {
    const { params } = this.props.navigation.state;
    this.state.pesquisador = params.pisttsburgh
    return (
      <View style={styles.container}>
        <Text style={styles.textQuiz}>
          {this.state.question}
        </Text>

        <View style={{ margin: 20 }}>
          <View style={styles.viewInput}>
            <Text style={styles.text}>{this.state.pergunta}</Text>
            <TextInput
              style={styles.input}
              autoCorrect={false}
              autoCapitalize='none'
              placeholder='resposta'
              placeholderTextColor='#8F98C1'
              value={this.state.resposta}
              onChangeText={resposta => this.setState({ resposta })}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.Botao} onPress={() => { this.loadQustion(++index) }}>
          <Text style={styles.textButton} >{this.state.Proximo}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#252C4A',
    flex: 1
  },
  quiz: {
    marginTop: 180,
    height: 180,
    width: 300,
    borderRadius: 15,
    // borderWidth: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',

  },
  textQuiz: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center'
  },
  containerButton: {
    flexDirection: 'row',
  },
  Botao: {
    backgroundColor: '#268AEC',
    borderRadius: 12,
    height: 50,
    width: 110,
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
  viewInput: {
    height: 50,
    width: 250,
    // backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
    flexDirection: 'row',
  },
  input: {
    fontSize: 18,
    color: '#8F98C1',
    borderBottomWidth: 1,
    borderColor: '#8F98C1',
    marginLeft: 10
  },
  text: {
    fontSize: 18,
    color: '#8F98C1',
  }
});