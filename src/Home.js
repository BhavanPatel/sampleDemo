import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from "react-native";
import { Actions } from "react-native-router-flux";
import  Container from './Container';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _goToQuiz = () => {
    Actions.Quiz();
  };

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Text style={styles.welcome}>Press Below Button to Start Quiz</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this._goToQuiz()}
          >
            <Text style={styles.buttonText}> LETS PLAY!</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
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
  }
});
