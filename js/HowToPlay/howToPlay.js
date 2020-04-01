'use strict';

import React, {Component} from 'react';

import {
  Text,
  View,
  StyleSheet,
  Button,
} from 'react-native';

class HowToPlay extends Component {
  constructor() {
    super();
  }

  render() {
      return (
        <View>
          <Button title="back" onPress={() => this.props.exitViro()}>
            Back
          </Button>
        </View>
      );


  }
}

module.exports = HowToPlay;
