import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Dimensions
} from 'react-native';

import firebase from 'firebase'
import { RadioButtons } from 'react-native-radio-buttons'
const { width, height } = Dimensions.get('window')
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
					'Para lançar um objeto ?',
					'Para escrever ?',
					'Para desenhar ?',
					'Para jogar tênis ou pingue-pongue?',
					'Para usar a tesoura ?',
					'Para usar o barbeador ou passar batom ?',
					'Para se pentear ?',
					'Para escovar os dentes ?',
					'Para usar uma faca sem ser para comer(cortar um barbante, apontar um lapís) ?',
					'Para comer com uma colher ?',
					'Para martelar ?',
					'Para usar a chave de fenda ?',
					'Com que mão você segura uma faca para comer, ao mesmo tempo que o garfo?',
					'Se tiver duas malas, com que mão segura a mais pesada?',
					'Ao varrer, qual a mao que fica por cima, no cabo da vassoura?',
					'E no cabo da ancinho (CISCADOR)',
					'Que mão você usa para desenroscar a tampa de um frasco?',
					'Com que mão você segura um fosforo para acendê-lo?',
					'Com que mão você distribui as cartas do baralho?',
					'Com que mão você segura a linha para enfiar no buraco da agulha?',
					'Com qual pé você prefere chutar?',
					'Que olho você usa quando precisa usar apenas um dos olhos?'

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
		this.setState({ Proximo: 'Proximo', Anterior: 'Anterior' })
		options = [
			"Esquerda",
			"Direita"
		];
		// console.log(i)
		await this.setState({ question: this.state.myText[i + 1], nquestion: i + 1, total: this.state.myText.length - 1 });
		await question.push({ question: this.state.myText[i], resposta: selected })
		// console.log(question)
		if (i === this.state.myText.length - 2) {
			this.setState({ Proximo: 'Finalizar', Anterior: '' })
			// const teste = {
			// 	question: question
			// }
			// console.log(teste)
			// const db = firebase.database();
			// db.ref(`/Edinburgh`).push(teste)
		}
		if (i === this.state.myText.length - 1) {
			// this.setState({ Proximo: 'Finalizar' })
			const respostas = {
				question: question,
				idPesquisador: this.state.pesquisador
			}
			// console.log(teste)
			this.props.navigation.navigate('form', {
				respostas: respostas,
				rota: 'Edinburgh'
			})
			await this.setState({ question: [0], nquestion: null })
		}

	}


	render() {
		const { params } = this.props.navigation.state;
		this.state.pesquisador = params.edinburgh


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
				<View style={styles.quiz}>
					<Text style={styles.textQuiz}>
						{this.state.question}
					</Text>
					<View >
						<RadioButtons
							options={options}
							onSelection={setSelectedOption.bind(this)}
							selectedOption={this.state.selectedOption}
							renderOption={renderOption}
							renderContainer={renderContainer}
						/>
						{/* <Text>Selected option: {this.state.selectedOption || 'none'}</Text> */}
					</View>
				</View>
				<View style={styles.containerButton}>
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
	quiz: {
		marginTop: 100,
		height: 180,
		width: 300,
		borderRadius: 15,
		// borderWidth: 1,
		// backgroundColor: 'rgba(0,0,0,0.3)',
		alignItems: 'center',
		justifyContent: 'center',
		// marginBottom: 30
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
		backgroundColor: '#268AEC',
		borderRadius: 12,
		height: 50,
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
		alignItems: 'center'
	},
	escolhido: {
		fontSize: 20,
		color: '#fff',
		// borderWidth: 2,
		textAlign: 'center',
		backgroundColor: '#21496B',
		borderRadius: 10,
		// margin: 8,
		height: 40,
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
		height: 40,
		width: 250,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20
	}
});