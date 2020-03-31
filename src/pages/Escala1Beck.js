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
// var question = []
var selected = ''
var options = []
var question = []
var calculo = 1
export default class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myText:
        [
          [
            'Não me sinto triste',
            'me sinto triste',
            'Estou sempre triste e não consigo sair disto',
            'Estou tão triste ou infeliz que não consigo suportar'
          ],
          [
            'Não estou especialmente desanimado quanto ao futuro',
            'Eu me sinto desanimado quanto ao futuro',
            'Acho que nada tenho a esperar',
            'Acho o futuro sem esperanças e tenho a impressão de que as coisas não podem melhorar'
          ],
          [
            'Não me sinto um fracasso',
            'Acho que fracassei mais do que uma pessoa comum',
            'Quando olho pra trás, na minha vida, tudo o que posso ver é um monte de fracasssos',
            'Acho que, como pessoa, sou um completo fracasso',
          ],
          [
            'tenho prazer em tudo como antes',
            'Não sinto mais prazer nas coisas como antes',
            'Não encontro prazer real em mais nada',
            'Estou insastifeito ou aborrecido com tudo'
          ],
          [
            'Não me sinto especialmente culpado',
            'Eu me sinto culpado grande parte parte do tempo',
            'Eu me sinto culpado na maior parte do tempo',
            'Eu sempre me sinto culpado'
          ],
          [
            'Não acho que esteja sendo punido',
            'Acho que posso ser punido',
            'Creio que vou ser punido',
            'Acho que estou sendo punido'
          ],
          [
            'Não me sinto decepcionado comigo mesmo',
            'Estou decepcionado comigo mesmo',
            'Estou enojado de mim',
            'Eu me odeio'
          ],
          [
            'Não me sinto de qualquer modo pior que os outros',
            'Sou crítico em relação a mim por minha fraquezas ou erros',
            'Eu me culpo sempre por minhas falhas',
            'Eu me culpo por tudo de mal que acontece'
          ],
          [
            'Não tenho quaisquer ideias de me matar',
            'Tenho ideias de me matar, mas não as executaria',
            'Gostaria de me matar',
            'Eu me mataria se tivesse oportunidade'
          ],
          [
            'Não choro mais que o habitual',
            'Choro mais agora do que costumava',
            'Agora choro o tempo todo',
            'Costumava ser capaz de chorar, mas agora não consigo, mesmo que o queira',
          ],
          [
            'Não sou mais irritado agora do que já fui',
            'Fico aborrecido ou irritado mais facilmente do que costumava',
            'Agora me sinto irritado o tempo todo',
            'Não me irrito mais com coisas que costumavam me irritar',
          ],
          [
            'Não perdi o interesse pelas outras pessoas',
            'Estou menos interessado pelas outras pessoas do que costumava',
            'Perdi a maior parte do meu interesse pelas outras pessoas',
            'Perdi todo o interesse pelas outras pessoas'
          ],
          [
            'Tomo decisões tão bem quanto antes',
            'Adio as tomadas de decisões do que antes',
            'Tenho mais dificuldades de tomar decisões do que antes',
            'Absolutamente não consigo mais tomar decisões'
          ],
          [
            'Não acho que de qualquer modo pareço pior do que antes',
            'Estou preocupado em estar parecendo velho ou sem atrativo',
            'Acho que há mudanças permanentes na minha aparência, que me fazer parecer mais atrativo',
            'Acredito que pareço feio'
          ],
          [
            'Posso trabalhar tão bem quanto antes',
            'É preciso algum esforço extra para fazer alguma coisa',
            'Tenho que me esforçar muito para fazer alguma coisa',
            'Não consigo mais fazer qualquer trabalho'
          ],
          [
            'Consigo dormir tão bem como o habitual',
            'Não durmo tão bem como costumava',
            'Acordo 1 a 2 horas mais cedo do que habitualmente e acho dificil voltar a dormir',
            'Acordo várias hora mais cedo do que costumava e não consigo voltar a dormir'
          ],
          [
            'Não fico mais cansado do que o habitual',
            'Fico cansado mais facilmente do que costumava',
            'Fico cansado em fazer qualquer coisa',
            'Estou cansado demais pra fazer qualquer coisa'
          ],
          [
            'O meu apetite não está pior que o habitual',
            'Meu apetite não é tão bom como costumava ser',
            'Meu apetite é muito pior agora',
            'Absolutamente não tenho mais apetite'
          ],
          [
            'Não tenho perdido muito peso se é que perdi algum recetemente',
            'Perdi mais do que 2 quilos e meio',
            'Perdi mais do que 5 quilos',
            'Perdi mais do que 7 quilos',
          ],
          [
            'Não estou mais preocupado com a minha saúde do que o habitual',
            'Estou preocupado com problemas fisicos, tais como como dores, indisposição do estômago ou constipação',
            'Estou muito preocupado com meus problemas físicos e é dificil pensar em outra',
            'Estou tão preocupado com meus problemas físicos que não pensar em qualquer outra coisa'
          ],
          [
            'Não notei qualquer mudança recente no meu interesse por sexo',
            'Estou menos interessado em por sexo do que costumava',
            'Estou muito menos interessado por sexo agora',
            'Perdi completamente o interesse por sexo'
          ],
          [
            '',
            ''
          ],
        ],
      nquestion: null,
      total: null,
      question: [],
      Proximo: 'Iniciar',
      Anterior: '',
      pesquisador: '',
      options: []
      // selectedOption: 'esquerda'
    }
  }


  loadQustion = async (i) => {
    this.setState({ Proximo: 'Proximo', Anterior: 'Anterior' })
    let pesoSelected = options.indexOf(selected)
    if (pesoSelected >= 0) {
      calculo = calculo + pesoSelected
      console.log(calculo)
    }
    options = this.state.myText[i]

    await this.setState({ nquestion: i + 1, total: this.state.myText.length - 1 });
    if (pesoSelected >= 0) {
      await question.push({ resposta: selected, peso: pesoSelected })
    }
    if (i === this.state.myText.length - 2) {
      this.setState({ Proximo: 'Finalizar', Anterior: '' })
    }
    if (i === this.state.myText.length - 1) {
      const { params } = this.props.navigation.state
      await this.props.navigation.replace('form', {
        question: question,
        escala: 'beck1',
        idPesquisador: params.id
      })
    }

  }


  render() {
    function setSelectedOption(selectedOption) {
      selected = selectedOption
      // console.log(options.lastIndexOf(selected))
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
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30
  },
  textButton: {
    textAlign: 'center',
    color: '#fff',
    alignItems: 'center',
    fontSize: 18
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
  ViewNQUIZ: {
    // flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#8F98C1',
    width: width - 40,
    borderRadius: 1,
    marginTop: 25,
    alignItems: 'center'
  },
  numQuiz: {
    color: '#8F98C1',
    fontWeight: 'bold',
    fontSize: 22
  },
});