import React, {Component} from 'react';
import {connect} from 'react-redux'

import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  Button,
  PixelRatio,
  TouchableHighlight,
  Alert,
} from 'react-native';

import {newScoreThunk} from '../../store/scoreReducer'

class Winner extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  async handleSubmit() {
    const timeInMilliseconds = (inputGame) => {
      let minAsSec = inputGame.currentTime.min * 60;
      let minAndSec = minAsSec + inputGame.currentTime.sec;
      return minAndSec * 1000;
    }
    await this.props.submitScore(this.props.currentUser.username.split('@')[0], timeInMilliseconds(this.props.currentGame))
    this.props.exitViro('highScores')
  }
  render() {
    return(
      <View style={styles.bigContainer}>
        <View style={styles.container}>
          <Text style={styles.bigCongrats}>{`Congratulations, ${this.props.currentUser.username.split('@')[0]}`}</Text>
          <Text style={styles.littleCongrats}>{`You got a highscore of: ${this.props.currentGame.currentTime.min}: ${this.props.currentGame.currentTime.sec}`}</Text>
          <Text style={styles.littleCongrats}>Rachel, Lauren, Karen, and Danielle are so proud of you.</Text>
          <Button title="Submit Your Score" onPress={this.handleSubmit}></Button>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  bigContainer: {
    backgroundColor: '#000000'
  },
  container: {
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 400,
    padding: 20,
    backgroundColor: '#000000'
  },
  bigCongrats: {
    color: '#ff0000',
    backgroundColor: '#000000',
    textAlign: 'center',
    fontSize: 30,
    paddingBottom: 10,
  },
  littleCongrats: {
    color: '#ff0000',
    backgroundColor: '#000000',
    textAlign: 'center',
    fontSize: 10,
    paddingBottom: 10,
  },
});

const mapStateToProps = state => ({
  currentGame: state.game,
  currentUser: state.user,
})

const mapDispatchToProps = dispatch => ({
  submitScore: (leaderboardName, time) => dispatch(newScoreThunk(leaderboardName, time))
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(Winner);

