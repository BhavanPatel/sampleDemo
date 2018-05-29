import React, { Component } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	TextInput
} from "react-native";
import { Actions } from "react-native-router-flux";
import axios from 'axios';
import _ from 'lodash';
import Container from './Container';

export default class Quiz extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			data: null,
		};
	}

	componentDidMount() {
		const url = "https://opentdb.com/api.php?amount=10";
		axios
			.get(url)
			.then(response => {
				var newData = _.forEach(response.data.results, (val, i) => {
					val.selected = null;
					val.id = i;
				});
				this.setState({
					data: newData,
					loading: false
				});
				console.log(this.state.data)
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	_goToResult = () => {
		var score = 0;
		_.forEach(this.state.data, (res) => {
			if (res.selected == res.correct_answer) {
				score++
			}
		});
		Actions.Result({
			result: score
		});
	};

	_onClickOption = (res, answer) => {
		var changingData = this.state.data;
		changingData = _.forEach(changingData, (val) => {
			if (val.id == res.id) {
				val.selected = answer;
			}
		});
		this.setState({ data: changingData });
	}
	renderOptions = (res) => {
		return (
			<View style={styles.optionsView}>
				<TouchableOpacity onPress={() => this._onClickOption(res, res.correct_answer)}>
					<Text style={(res.selected == res.correct_answer) ? styles.selected : styles.notSelected}>
						{res.correct_answer}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => this._onClickOption(res, res.incorrect_answers[0])}>
					<Text style={(res.selected == res.incorrect_answers[0]) ? styles.selected : styles.notSelected}>
						{(res.incorrect_answers[0]) ? res.incorrect_answers[0] : null}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => this._onClickOption(res, res.incorrect_answers[1])}>
					<Text style={(res.selected == res.incorrect_answers[1]) ? styles.selected : styles.notSelected}>
						{(res.incorrect_answers[1]) ? res.incorrect_answers[1] : null}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => this._onClickOption(res, res.incorrect_answers[2])}>
					<Text style={(res.selected == res.incorrect_answers[2]) ? styles.selected : styles.notSelected}>
						{(res.incorrect_answers[2]) ? res.incorrect_answers[2] : null}
					</Text>
				</TouchableOpacity>
			</View>
		)
	}

	renderQuestions = () => {
		var Ques = this.state.data.map((res, i) => {
			return (
				<View key={i} style={styles.questionView}>
					<Text style={styles.questionText}>{i + 1}. {res.question}</Text>
					{this.renderOptions(res)}
				</View>)
		});
		return Ques;
	}
	render() {
		if (this.state.loading) {
			return (
				<Container>
					<View style={styles.container}>
						<Text style={styles.welcome}>Loading... Please Wait</Text>
					</View>
				</Container>
			)
		} else {
			return (
				<Container>
					<ScrollView >
						{this.renderQuestions()}
						<TouchableOpacity
							style={styles.button}
							onPress={() => this._goToResult()}
						>
							<Text style={styles.buttonText}>Submit Answers</Text>
						</TouchableOpacity>
					</ScrollView>
				</Container>
			);
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	welcome: {
		fontSize: 20,
		textAlign: "center",
		margin: 10,
      color: "#fff"
	},
	button: {
		backgroundColor: "#000",
		margin: 10,
		padding: 20
	},
	buttonText: {
		fontSize: 20,
		color: "#fff"
	},
	questionView: {
		padding: 20,
		flex: 1,
		justifyContent: "center",
		alignItems: "flex-start",
	},
	questionText: {
		fontSize: 20,
		color: "#fff",
		fontWeight:'bold',
	},
	optionsView: {
		padding: 5
	},
	selected: {
		fontSize:20,
		fontWeight:'bold',
		color: 'green'
	},
	notSelected: {
		fontSize:15,
		color: '#fff'
	}
});
