'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAllScores} from '../store/scoreReducer';

import {Text, View, StyleSheet, Button, TouchableHighlight, ImageBackground} from 'react-native';

//Photo by rabidcoyotetudios instagram https://www.instagram.com/p/BcZFccyHymE/
const image = require('./res/cabin.jpeg');

class HighScores extends Component {
  constructor() {
    super();
    this.state = {
      imageLoaded: false,
    };
    this._onLoad = this._onLoad.bind(this);
  }
  componentDidMount() {
    this.props.getScores();
  }
  _onLoad() {
    this.setState({imageLoaded: true});
  }

  sortFunc = (a, b) => a.milliseconds - b.milliseconds;

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={image}
          style={styles.image}
          onLoad={this._onLoad}
        />
        {this.props.highScores[0] && this.state.imageLoaded ? (
          <View style={styles.highScoreStyle}>
            <Text style={styles.hsTitle}>High Scores</Text>
            {this.props.highScores
              .sort(this.sortFunc)
              .map((element, idx) => {
                return (
                  <View key={element.id}>
                    <Text style={styles.score}>
                      {idx + 1}. {element.user} {element.score}
                    </Text>
                  </View>
                );
              })
              .slice(0, 10)}
            <TouchableHighlight
              style={styles.button}
              title="back"
              onPress={() => this.props.exitViro()}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableHighlight>
          </View>
        ) : (
          <Text style={{color: 'red', fontSize: 90}}>...</Text>
        )}
      </View>
    )
  }
}

var styles = StyleSheet.create({
  image: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    width: null,
    height: '100%',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    color: '#FF9800',
  },
  highScoreStyle:{
    height: 600,
    width: 330,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#ff0000',
    backgroundColor: '#000000',
    opacity: 0.85,
  },
  hsTitle: {
    marginBottom: 10,
    fontSize: 58,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Arial',
  },
  score: {
    fontSize: 22,
    color: '#fff',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
  button: {
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
  loading: {
    textAlign: 'center',
    paddingTop: 20,
    fontSize: 32,
  }
});

const mapStateToProps = state => {
  return {highScores: state.score.allScores};
}


const mapDispatchToProps = dispatch => {
  return {getScores: () => dispatch(getAllScores())};
};

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HighScores);
