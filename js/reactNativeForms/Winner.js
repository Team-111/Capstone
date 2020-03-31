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
    await this.props.submitScore(this.props.currentUser.username, this.props.currentGame.currentTime.min)
    this.props.exitViro('highScores')
  }
  render() {
    return(
      <View>
        <Text>{`Congratulations, ${this.props.currentUser.username}`}</Text>
        <Text>{`You got a highscore of: ${this.props.currentGame.currentTime.min}: ${this.props.currentGame.currentTime.sec}`}</Text>
        <Text>Rachel, Lauren, Karen, and Danielle are so proud of you.</Text>
        <Button title="Submit Your Score" onPress={this.handleSubmit}></Button>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  currentGame: state.game,
  currentUser: state.user,
})

const mapDispatchToProps = dispatch => ({
  submitScore: (leaderboardName, time) => dispatch(newScoreThunk(leaderboardName, time))
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(Winner);
