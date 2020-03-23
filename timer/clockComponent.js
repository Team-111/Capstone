import React, {Component} from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import {ViroScene, ViroText, ViroImage} from 'react-viro';

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#191919',
  },

  tubeclock: {
    height: 300,
    width: 560,
    color: 'rgba(50, 50, 50, 0.35)',
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 10,
    textAlign: 'center',
  },

  h1: {
    color: 'rgba(241, 196, 112)',
    textShadowOffset: {width: 1, height: 1},
    opacity: 0.7,
  },
});

export default class ClockComponent extends Component {
  render() {
    return (
      <ViroScene style={styles.body}>
        <ViroImage
          height={2}
          width={2}
          source={{uri: './images/tubeclockbase.png'}}
          styles={styles.tubeclock}>
          <time styles={styles.h1}>00:00:00</time>
        </ViroImage>
      </ViroScene>
    );
  }
}
