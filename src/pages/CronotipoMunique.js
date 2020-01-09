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
  TextInput
} from 'react-native';
import DatePicker from 'react-native-datepicker'
var question = []

export default class pages extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // respostas: [],
      pergunta1: '',
      pergunta2: '',
      pergunta3: '',
      pergunta4: '',
      pergunta5: '',
      pergunta6: '',
      pergunta7: '',
      pergunta8: '',
      pergunta9: '',
      pergunta10: '',
      pergunta11: '',
      pergunta12: '',
      nome: '',
      idPesquisador: ''
      // date: "",
    }
  }
  onShare = async () => {
    try {
      const { currentUser } = firebase.auth();
      const id = currentUser.uid;
      const result = await Share.share({
        message:
          `https://www.nitlab.com/munique/${id}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  onAddItem = () => {
    // not allowed AND not working
    this.setState(state => {
      const list = state.respostas.push(state.value);
      return {
        list,
        value: '',
      };
    });
  };

  // async cad() {
  //   const { pesquisador, nome, pergunta1, pergunta2, pergunta3, pergunta4, pergunta5, pergunta6 } = this.state;
  //   // const no = nome
  //   const respostas = {
  //     pergunta01: `Vou para a cama às ${pergunta1} horas`,
  //     pergunta2,
  //     pergunta03: `Às ${pergunta3} horas, estou pronto para dormir`,
  //     pergunta04: `Necessito de ${pergunta4} minutos para adormecer`,
  //     pergunta05: `Acordo às ${pergunta5} horas`,
  //     pergunta06: `Passados ${pergunta6} minutos acordo`,
  //     pesquisador: 'Jacks'
  //   }
  //   const dados = {
  //     cpf: `07376714324`,
  //     dataNasci: '26/10/1996',
  //     CidadeOrig: 'Parnaíba',
  //     peso: '65 kg',
  //     altura: '1.72',
  //     email: 'Danrleysil46@gmail.com',
  //     Telefone: '86 995430844',
  //     Curso: 'Sistemas de informação',
  //     periodo: 6,
  //     dataColeta: '10/12/2019',
  //   }
  //   // console.log(respostas)
  //   const db = firebase.database();
  //   await db.ref(`/${pesquisador}/CronotipoMunique/${nome}/respostas`).set(respostas)
  //   await db.ref(`/${pesquisador}/CronotipoMunique/${nome}/dados`).set(dados)
  //   await db.ref(`/CronotipoMunique/${nome}/resposta`).set(respostas)
  //   await db.ref(`/CronotipoMunique/${nome}/dados`).set(dados)
  // }


  async cad() {
    const { pesquisador, nome, pergunta1, pergunta2, pergunta3, pergunta4, pergunta5, pergunta6, pergunta7, pergunta8, pergunta9, pergunta10, pergunta11, pergunta12 } = this.state;
    // const no = nome
    question = {
      0: { question: `Vou para a cama às ${pergunta1} horas` },
      1: { question: pergunta2 },
      2: { question: `Às ${pergunta3} horas, estou pronto para dormir` },
      3: { question: `Necessito de ${pergunta4} minutos para adormecer` },
      4: { question: `Acordo às ${pergunta5} horas` },
      5: { question: `Passados ${pergunta6} minutos acordo` },
      6: { question: `Vou para a cama às ${pergunta7} horas` },
      7: { question: '' },
      8: { question: `Às ${pergunta9} horas, estou pronto para dormir` },
      9: { question: `Necessito de ${pergunta10} minutos para adormecer` },
      10: { question: `Acordo às ${pergunta11} horas` },
      11: { question: `Passados ${pergunta12} minutos acordo` }
    }
    const respostas = {
      question,
      idPesquisador: this.state.idPesquisador
    }
    this.props.navigation.navigate('form', {
      respostas: respostas,
      rota: 'CronotipoMunique'
    })
  }
  render() {
    const { navigation } = this.props;
    const { nome } = navigation.state.params;
    const { params } = this.props.navigation.state;
    this.state.idPesquisador = params.munique
    this.state.nome = 'danrley'
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.textTrue}>Você tem um horário regular de {'\n'}trabalho
          (também como dono(a){'\n'} de casa, etc)?</Text>
          <View style={styles.diaTrab}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>
              Nos dias de trabalho(incluindo a{'\n'}noite anterior ao primeiro trabalho)
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
            <View style={styles.viewInput}>
              <TextInput
                style={styles.input}
                autoCorrect={false}
                autoCapitalize='none'
                placeholder=''
                keyboardType={'numeric'}
                placeholderTextColor='#fff'
                value={this.state.pergunta1}
                onChangeText={pergunta1 => this.setState({ pergunta1 })}
              />
            </View>
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
            <View style={styles.viewInput}>
              <TextInput
                style={styles.input}
                autoCorrect={false}
                autoCapitalize='none'
                placeholder=''
                keyboardType={'numeric'}
                placeholderTextColor='#fff'
                value={this.state.pergunta3}
                onChangeText={pergunta3 => this.setState({ pergunta3 })}
              />
            </View>
            <Text style={styles.textPerg}>horas, estou pronto para dormir</Text>
          </View>
          {/* <--pergunta 04--> */}
          <View style={styles.perguntas}>
            <Text style={styles.textPerg}>Necessito de</Text>
            <View style={styles.viewInput}>
              <TextInput
                style={styles.input}
                autoCorrect={false}
                autoCapitalize='none'
                placeholder=''
                keyboardType={'numeric'}
                placeholderTextColor='#fff'
                value={this.state.pergunta4}
                onChangeText={pergunta4 => this.setState({ pergunta4 })}
              />
            </View>
            <Text style={styles.textPerg}>minutos para adormecer</Text>
          </View>
          {/* <--pergunta 04--> */}
          {/* <--pergunta 05--> */}
          <View style={styles.perguntas}>
            <Text style={styles.textPerg}>Acordo às</Text>
            <View style={styles.viewInput}>
              <TextInput
                style={styles.input}
                autoCorrect={false}
                autoCapitalize='none'
                placeholder=''
                keyboardType={'numeric'}
                placeholderTextColor='#fff'
                value={this.state.pergunta5}
                onChangeText={pergunta5 => this.setState({ pergunta5 })}
              />
            </View>
            <Text style={styles.textPerg}>horas</Text>
          </View>
          {/* <--pergunta 05--> */}
          {/* <--pergunta 06--> */}
          <View style={styles.perguntas}>
            <Text style={styles.textPerg}>Passados</Text>
            <View style={styles.viewInput}>
              <TextInput
                style={styles.input}
                autoCorrect={false}
                autoCapitalize='none'
                placeholder=''
                keyboardType={'numeric'}
                placeholderTextColor='#fff'
                value={this.state.pergunta6}
                onChangeText={pergunta6 => this.setState({ pergunta6 })}
              />
            </View>
            <Text style={styles.textPerg}>minutos, levanto-me</Text>
          </View>
          {/* <--pergunta 06--> */}

          <View style={styles.diaTrab}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000', textAlign: 'justify', margin: 10 }}>
              Fora dos dias de trabalho(incluindo a noite anterior ao primeiro dia de descanso ou lazer)
            </Text>
          </View>
          <View style={styles.perguntas}>

            <Text style={styles.textPerg}>Vou para a cama às</Text>
            <View style={styles.viewInput}>
              <TextInput
                style={styles.input}
                autoCorrect={false}
                autoCapitalize='none'
                placeholder=''
                keyboardType={'numeric'}
                placeholderTextColor='#fff'
                value={this.state.pergunta7}
                onChangeText={pergunta7 => this.setState({ pergunta7 })}
              />
            </View>
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
            <View style={styles.viewInput}>
              <TextInput
                style={styles.input}
                autoCorrect={false}
                autoCapitalize='none'
                placeholder=''
                keyboardType={'numeric'}
                placeholderTextColor='#fff'
                value={this.state.pergunta9}
                onChangeText={pergunta9 => this.setState({ pergunta9 })}
              />
            </View>
            <Text style={styles.textPerg}>horas, estou pronto para dormir</Text>
          </View>
          {/* <--pergunta 04--> */}
          <View style={styles.perguntas}>
            <Text style={styles.textPerg}>Necessito de</Text>
            <View style={styles.viewInput}>
              <TextInput
                style={styles.input}
                autoCorrect={false}
                autoCapitalize='none'
                placeholder=''
                keyboardType={'numeric'}
                placeholderTextColor='#fff'
                value={this.state.pergunta10}
                onChangeText={pergunta10 => this.setState({ pergunta10 })}
              />
            </View>
            <Text style={styles.textPerg}>minutos para adormecer</Text>
          </View>
          {/* <--pergunta 04--> */}
          {/* <--pergunta 05--> */}
          <View style={styles.perguntas}>
            <Text style={styles.textPerg}>Acordo às</Text>
            <View style={styles.viewInput}>
              <TextInput
                style={styles.input}
                autoCorrect={false}
                autoCapitalize='none'
                placeholder=''
                keyboardType={'numeric'}
                placeholderTextColor='#fff'
                value={this.state.pergunta11}
                onChangeText={pergunta11 => this.setState({ pergunta11 })}
              />
            </View>
            <Text style={styles.textPerg}>horas</Text>
          </View>
          {/* <--pergunta 05--> */}
          {/* <--pergunta 06--> */}
          <View style={styles.perguntas}>
            <Text style={styles.textPerg}>Passados</Text>
            <View style={styles.viewInput}>
              <TextInput
                style={styles.input}
                autoCorrect={false}
                autoCapitalize='none'
                placeholder=''
                keyboardType={'numeric'}
                placeholderTextColor='#fff'
                value={this.state.pergunta12}
                onChangeText={pergunta12 => this.setState({ pergunta12 })}
              />
            </View>
            <Text style={styles.textPerg}>minutos, levanto-me</Text>
          </View>
          {/* <--pergunta 06--> */}
          <View style={styles.view}>
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
    backgroundColor: '#000',
    width: '100%',
  },
  textTrue: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center'
  },
  input: {
    fontSize: 17,
    color: '#fff'
  },
  perguntas: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    width: '100%',
  },
  textPerg: {
    color: '#fff',
    fontSize: 16,
  },
  diaTrab: {
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  botao: {
    width: 200,
    height: 40,
    backgroundColor: '#ab1fcf',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
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
    width: 250,
    height: 200
  }
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