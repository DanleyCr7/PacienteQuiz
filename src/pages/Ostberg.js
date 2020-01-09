import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions
} from 'react-native';
import firebase from 'firebase'
import { RadioButtons } from 'react-native-radio-buttons'
const { width, height } = Dimensions.get('window')
var index = -1
var question = []
var selected = ''
var options = []
export default class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myText:
        [
          '',
          'Considerando apenas o seu bem-estar pessoal e com liberdade total de planejar seu dia, a que horas você se levantaria?',
          // 'Considerando apenas o seu bem-estar pessoal e com liberdade total de planejar sua noite a que horas você se deitaria?',
          // 'Até que ponto você depende do despertado para acordar de manhã?',
          // 'Você acha fácil acordar de manhã?',
          // 'Você se sente alerta durante a primeira meia hora depois de acordar?',
          // 'Como é o seu apetite durante a primeira meia hora depois de acordar?',
          // 'Durante a primeira meia hora depois de acordar você se sente cansado?',
          // 'Se você não tem compromisso no dia seguinte e comparando com sua hora habitual, a que horas voce gostaria de ir deitar?',
          // 'Você decidiu fazer exercícios físicos. Um amigo sugeriu o horário das 7h00 às 8h00 da manhã, duas vezes por semana. Considerando apenas seu bem-estar pessoal, o que você acha que fazer exercícios nesse horário?',
          // 'A que horas da noite você se sente cansado e com vontade de dormir?',
          // 'Você quer estar no máximo de sua forma para fazer um teste que dura duas horas e que você sabe que é mentalmente cansativo. Considerando apenas seu bem-estar pessoal, qual desses horários você escolhereria para fazer esse teste?',
          // 'Se você fosse deitar às 23:00 horas em que nivel de cansaço você se sentiria?',
          // 'Por alguma razão você foi dormir várias horas mais tarde do que é seu costume. Se no dia seguinte você não tiver hora certa para acordar, o que aconteceria com você?',
          // 'Se você que ficar acordado das 4:00 às 6:00 horas para realizar uma tarefa e não tiver compromissos no dia seguinte, o que você faria?',
          // 'Se você tiver que fazer duas horas de exercício físico pesado e considerando apenas o seu bem-estar pessoal, qual destes horários você escolheria?',
          // 'Você decidiu fazer exercícios físicos. Um amigo sugeriu o horário das 22:00 às 23:00 horas, duas vezes por semana. Considerando apenas seu bem-estar pessoal, o que você acha que fazer exercícios nesse horário?',
          // // 'Suponha você possa escolher o seu próprio horário de trabalho e que você e que você deva trabalhar cinco horas seguidas por dia. Imagine que seja um serviço interessante e que você ganhe por produção. Qual o horário que você escolheria?(Marque a hora do início)',
          // 'A que hora do dia você atinge seu melhor momento de bem-estar?',
          // 'Fala-se em pessoas matutinas e vespertinas (as primeiras gostam de acordar cedo e dormir cedo, as segundas de acordar tarde e dormir tarde). Com que desses tipos você se identifica?',

        ],
      options: [
        [
          '5h00-06h30',
          '6h00-07h45',
          '07h45-09h45',
          '09h45-11h00'
        ],
        [
          '20h00-21h00',
          '21h00-22h45',
          '22h15-24h30',
          '24h30-01h45',
          '01h45-03h00'
        ],
        [
          'Nada dependente',
          'Não muito dependente',
          'Razoalvemente dependente',
          'Muito dependente'
        ],
        [
          'Nada fácil',
          'Não muito fácil',
          'Razoalvemente fácil',
          'Muito fácil'
        ],
        [
          'Nada alerta',
          'Não muito alerta',
          'Razoalvemente alerta',
          'Muito alerta'
        ],
        [
          'Muito ruim',
          'Não muito ruim',
          'Razoalvemente ruim',
          'Muito bom'
        ],
        [
          'Muito cansado',
          'Não muito cansado',
          'Razoalvemente em forma',
          'Em plena forma'
        ],
        [
          'Nunca mais tarde',
          'Menos que uma hora mais tarde',
          'Entre uma e duas horas mais tarde',
          'Mais do que duas horas mais tarde'
        ],
        [
          'Estaria em boa forma',
          'Estaria razoalvemente em forma',
          'Acharia isso difícil',
          'Acharia isso muito difícil'
        ],
        [
          '20h00-21h00',
          '21h00-22h15',
          '22h15-00h45',
          '00h45-02h00',
          '2h00-03h00'
        ],
        [
          'Das 8:00 às 10:00',
          'Das 11:00 às 13:00',
          'Das 15:00 às 17:00',
          'Das 19:00 às 21:00'
        ],
        [
          'Nada cansado',
          'Um pouco cansado',
          'Razoavelmente cansado',
          'Muito cansado'
        ],
        [
          'Acordaria na hora normal sem sono',
          'Acordaria na hora normal com sono',
          'Acordaria na hora normal e dormiria novamente',
          'Acordaria mais tarde do que seu costume'
        ],
        [
          'Só dormiria depois de fazer a tarefa',
          'Tiraria uma soneca antes da tarefa e dormiria depois',
          'Dormiria bastante antes e tiraria uma soneca depois',
          'Só dormiria antes de fazer a tarefa'
        ],
        [
          'Das 8:00 às 10:00',
          'Das 11:00 às 13:00',
          'Das 15:00 às 17:00',
          'Das 19:00 às 21:00'
        ],
        [
          'Estaria em boa forma',
          'Estaria razoavelmente em forma',
          'Acharia isso difícil',
          'Acharia isso muito difícil'
        ],
        [
          '23h:00-05h00',
          '05h00-08h00',
          '08h00-10h00',
          '10h0-17h00',
          '17h00-22h00',
          '22h00-24h00'
        ],
        [
          'Tipo matutino',
          'Mais matutino  que vepertino',
          'Mais vespertino que matutino',
          'Tipo Vespertino'
        ],
        [
          'teste',
          'teste2'
        ]
      ],
      nquestion: null,
      total: null,
      questions: [],
      question: '',
      Proximo: 'Iniciar',
      Anterior: '',
      pesquisador: '',
      selected: ''
    }
  }


  loadQustion = async (i) => {
    options = this.state.options[i]
    this.setState({ Proximo: 'Proximo', Anterior: 'Anterior' })
    // console.log(i)
    // console.log(selected)

    await this.setState({ question: this.state.myText[i + 1], nquestion: i + 1, total: this.state.myText.length - 1 });
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

      await this.props.navigation.navigate('form', {
        respostas: respostas,
        rota: 'Ostberg'
      })
    }
  }


  render() {
    const { params } = this.props.navigation.state;
    this.state.pesquisador = params.ostberg

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
    // borderWidth: 2,
    textAlign: 'center',
    backgroundColor: '#21496B',
    borderRadius: 10,
    // margin: 8,
    // height: 40,
    width: 250,
    marginTop: 20

  },
  naoEscolhido: {
    fontSize: 20,
    color: '#fff',
    borderWidth: 2,
    textAlign: 'center',
    borderColor: '#21496B',
    borderRadius: 10,
    // margin: 8,
    // height: 40,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  }
});