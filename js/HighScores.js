'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAllScores} from '../store/scoreReducer';

import {Text, View, StyleSheet, Button, TouchableHighlight} from 'react-native';

class HighScores extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.getScores();
  }

  sortFunc = (a, b) => a.milliseconds - b.milliseconds;

  render() {
    if (this.props.highScores[0]) {
      return (
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
          <TouchableHighlight style={styles.button} title="back" onPress={() => this.props.exitViro()}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableHighlight>
        </View>
      );
    } else {
      return <Text>Loading HighScores</Text>;
    }
  }
}

var styles = StyleSheet.create({
  highScoreStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    color: '#FF9800',
  },
  hsTitle: {
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
