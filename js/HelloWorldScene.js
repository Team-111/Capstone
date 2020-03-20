'use strict';

import React, { Component } from 'react';

import {  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroFlexView,
  Viro360Image,
} from 'react-viro';

export default class HelloWorldScene extends Component {

  constructor() {
    super();

    this.state = {} // Set initial state here
  }

  render() {
    return (

        <View style={styles.helloWorldTextStyle}>
          <Text>High Scores:</Text>
        </View>

    );
  }

}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 60,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = HelloWorldScene;
