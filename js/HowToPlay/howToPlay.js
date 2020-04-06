'use strict';

import React, {Component} from 'react';

import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';

//Photo by rabidcoyotetudios instagram https://www.instagram.com/p/BcZFccyHymE/
const image = require('../res/cabin.jpeg');

class HowToPlay extends Component {
  constructor() {
    super();
    this.state = {
      imageLoaded: false,
    };
    this._onLoad = this._onLoad.bind(this)
  }

  _onLoad(){
    this.setState({imageLoaded: true});
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={image}
          style={styles.image}
          onLoad={this._onLoad}
        />
        {this.state.imageLoaded && (
          <View style={styles.content}>
            <View style={styles.inner}>
              <Text style={styles.titleText}>How To Play</Text>
              <Text style={styles.instructionsText}>Obtain a key to escape the room.</Text>
              <Text style={styles.instructionsText}>Solve all puzzles to get clues.</Text>
              <Text style={styles.instructionsText}>Use hints if you are stuck. Choose wisely since you only have 3.</Text>
              <Text style={styles.instructionsText}>Use save button to save game and return later.</Text>
              <Text style={styles.instructionsText}>Finish quickly to be placed on highscore list.</Text>
            </View>
            <TouchableHighlight
              style={styles.buttons}
              title="back"
              onPress={() => this.props.exitViro()}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableHighlight>
          </View>
        )}
        {!this.state.imageLoaded && (
          <Text style={{color:'red', fontSize: 90}}>...</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    width: null,
    height: '100%',
    //opacity: 0.8,
  },
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
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    height: 600,
    width: 330,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#ff0000',
    backgroundColor: '#000000',
    opacity: 0.85,
  },
  titleText:{
    color: '#fff',
    textAlign: 'center',
    fontSize: 45,
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
