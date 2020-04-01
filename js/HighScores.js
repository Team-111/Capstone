'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAllScores} from '../store/scoreReducer';

import {Text, View, StyleSheet, Button} from 'react-native';

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
          <Button title="back" onPress={() => this.props.exitViro()}>
            Back
          </Button>
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
    backgroundColor: 'white',
    //fontFamily: 'Arial',
    // fontSize: 60,
    color: '#FF9800',
    // textAlignVertical: 'center',
    // textAlign: 'center',
  },
  hsTitle: {
    fontSize: 58,
  },
  score: {
    fontSize: 22,
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
