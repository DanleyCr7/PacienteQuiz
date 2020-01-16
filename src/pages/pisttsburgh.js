import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
  Dimensions
} from 'react-native';
import firebase from 'firebase'
import { RadioButtons } from 'react-native-radio-buttons'
import DatePicker from 'react-native-datepicker'

const { width, height } = Dimensions.get('window')

var index = -1
var question = []
var selected = ''
var options = [];
var horario = ''
export default class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pergunta1: '00:00',
      myText:
        [
          '',
          'Durante o mês passado, a que horas se deitou a noite na maioria das vezes ?',
          'Durante o mês passado, quanto tempo (em média , isso em minutos) demorou a adormecer, na maioria das vezes ?',
          'Durante o mês passado, a que horas acordou de manhã, na maioria das vezes ?',
          'Durante o mês passado, quantas horas de sono, em média, você dormiu por noite?',
          'Durante o mês passado, quantas vezes teve problemas para dormir por causa de: ',
          'Demorar mais de 30 minutos para adormecer:',
          'Acordar no meio da noite ou de manhã muito cedo.',
          'Levantar-se para ir ao banheiro',
          'Ter dificuldade para respirar',
          'Tossir ou roncar muito alto.',
          'Sentir muito frio',
          'Sentir muito calor',
          'Ter maus sonhos ou pesadelos',
          'Sentir dores.',
          'Outra razão, por favor, descreva. quantas vezes teve problema para dormir por esta razão durante o mês passado?',
          'Durante o mês passado, como classificaria a qualidade do seu sono',
          'Durante o mês passado, você tomou algum medicamento para dormir, receitado por médico, ou por algum (amigo, farmacêutico, familiar) ou mesmo por sua conta?',
          'Durante o mês passado, se teve problemas para ficar acordado enquanto estava a conduzir, a fazer suas refeições ou a participar noutra atividade social, quantas vezes isso aconteceu',
          'Durante o mês passado, sentiu alguma indisposição ou falta de entusiasmo para realizar as suas atividades diárias?'
        ],
      teste:
        [
          'Horário de deitar: ',
          'Horário de adormecer: ',
          'Horário de levantar: ',
          'Horas de sono por noite: ',
        ],
      nquestion: null,
      total: null,
      question: [],
      Proximo: 'Iniciar',
      Anterior: '',
      pesquisador: '',
      resposta: '',
      pergunta: '',
      horario: '',
    }
  }
  // setHorario = async (i) => {
  //   await this.setState({ horario: this.state.teste[i + 1] });
  // }

  horario = (i) => {
    if (i <= 4 && i >= 0) {
      return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontSize: 20 }}>{horario}</Text>
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
        </View>
      )
    }
    else if (i > 4) {
      return null;
    }
  }
  loadQustion = async (i) => {
    if (i <= 4) {
      horario = this.state.teste[i]
      await question.push({ question: this.state.myText[i], resposta: this.state.pergunta1 })
    }
    if (i === 19) {
      options = [
        'muito boa',
        'boa',
        'má',
        'muito má',
      ]
    }
    else if (i <= 21 && i >= 5) {
      options = [
        'nenhuma vez',
        'menos de uma vez por semana',
        'uma a duas vezes por semana',
        'três vezes por semana ou mais',
      ]
    } else if (i == 22) {
      options = [
        'nenhuma indisposição ou falta de entusiasmo',
        'Indisposição e falta de entusiasmo pequenas',
        'Indisposição e falta de entusiasmo moderadas',
        'Indisposição e falta de entusiasmo',
      ]
    }
    //  else if (i <= 5) {
    //   this.setState({ horario: this.state.teste[i] })
    // }
    this.setState({ Proximo: 'Proximo', Anterior: 'Anterior' })
    await this.setState({ question: this.state.myText[i + 1], nquestion: i + 1, total: this.state.myText.length - 1, horario: options[i] });
    // console.log(i)
    if (i > 4) {
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
        // console.log(question)
        await this.props.navigation.replace('form', {
          respostas: respostas,
          rota: 'Pisttsburgh'
        })
      }
    }

  }


  render() {
    const { params } = this.props.navigation.state;
    this.state.pesquisador = params.pisttsburgh
    // console.log(this.state.myText.length)

    function setSelectedOption(selectedOption) {
      selected = selectedOption
      // console.log(selected)
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
            {this.horario(index)}
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
    fontSize: 20,
    textAlign: 'center'
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
    fontSize: 16,
    color: '#8F98C1',
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
});




// perguntas
// '',
// 'Durante o mês passado, a que horas se deitou a noite na maioria das vezes ?',
// 'Durante o mês passado, quanto tempo (em média , isso em minutos) demorou a adormecer, na maioria das vezes ?',
// 'Durante o mês passado, a que horas acordou de manhã, na maioria das vezes ?',
// 'Durante o mês passado, quantas horas de sono, em média, você dormiu por noite?',
// 'Durante o mês passado, quantas vezes teve problemas para dormir por causa de: ',
// 'Durante o mês passado, como classificaria a qualidade do seu sono ?',
// 'Durante o mês passado, você tomou algum medicamento para dormir, receitado por médico, ou por algum (amigo, farmacêutico, familiar) ou mesmo por sua conta?',
// 'Durante o mês passado, se teve problemas para ficar acordado enquanto estava a conduzir, a fazer suas refeições ou a participar noutra atividade social, quantas vezes isso aconteceu ?',
// 'Durante o mês passado, sentiu alguma indisposição ou falta de  entusiasmo para realizar as suas atividades diárias ?',