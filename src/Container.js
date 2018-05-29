import React, { Component } from "react";
import {
   View,
   StyleSheet
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
const THEME = ['#2b5876', '#2E5676', '#315476', '#345276', '#375076', '#3A4E76', '#3E4C76', '#414A76', '#444876', '#474676', '#4A4476', '#4e4376'];

export default class Container extends Component {
   render() {
      return (
         <LinearGradient colors={THEME} style={styles.container}>
            {this.props.children}
         </LinearGradient>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
});
