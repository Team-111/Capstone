'use strict';

import React, { Component } from 'react';

import {  AppRegistry,
  Text,
  View,
  StyleSheet,
  Button,
  PixelRatio,
  TouchableHighlight,} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroFlexView,
  Viro360Image,
} from 'react-viro';

import {getScores} from '../server/api/scores'

export default class HighScores extends Component {

  constructor() {
    super();

    this.state = {
      hiScores: []
    } // Set initial state here
  }
  componentDidMount() {
    //callback func for getScores takes in the mapped array of objects from api/scores
    getScores((inputArr) => {
      this.setState({hiScores: inputArr})
    })
  }

  render() {
    return (
        <View style={styles.highScoreStyle}>
          <Text>High Scores:</Text>
          {this.state.hiScores.map(element => {
            return (<View key={element.id}><Text>{element.user}, {(element.score).toString()}</Text></View>)
          })}
          <Button title="back">Back</Button>
        </View>


    );
  }

}

var styles = StyleSheet.create({
  highScoreStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    fontFamily: 'Arial',
    fontSize: 60,
    color: '#FF9800',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = HighScores;
