'use strict';

import React, {Component} from 'react';

import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableHighlight,
} from 'react-native';

class HowToPlay extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inner}>
          <Text style={styles.titleText}>How To Play</Text>
          <Text style={styles.instructionsText}>Obtain key to escape the room.</Text>
          <Text style={styles.instructionsText}>Solve all puzzles to get clues.</Text>
          <Text style={styles.instructionsText}>Use hints if you are stuck. Choose wisely since you only have 3.</Text>
          <Text style={styles.instructionsText}>Use save button to save game and return later.</Text>
          <Text style={styles.instructionsText}>Finish quickly to be placed on highscore list.</Text>
        </View>
        <TouchableHighlight style={styles.buttons} title="back" onPress={() => this.props.exitViro()}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 50,
    // marginBottom: 400,
    //padding: 20,
    backgroundColor: '#000000',
  },
  inner: {
    height: 600,
    width: 400,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#ff0000',
    backgroundColor: '#000000',
  },
  titleText:{
    color: '#fff',
    textAlign: 'center',
    fontSize: 32,
    marginTop: 13,
    marginBottom: 10,
  },
  instructionsText: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
  buttons: {
    height: 60,
    width: 120,
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#ff0000',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ae0000',
    borderTopColor: '#ff5555',
  },
  separator: {
    marginVertical: 8,
  },
});

module.exports = HowToPlay;
