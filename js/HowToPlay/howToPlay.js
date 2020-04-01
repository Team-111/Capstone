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
    fontSize: 30,
    marginTop: 13,
    marginBottom: 13,
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
