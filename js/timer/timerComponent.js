import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ViroNode, ViroText, ViroImage} from 'react-viro';
import {connect} from 'react-redux';
import {timeThunk} from '../../store/gameReducer';

class TimerComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    setInterval(() => this.timer(), 1000);
  };

  timer = () => {
    let minutes = this.props.currentGame.currentTime.min;
    let seconds = this.props.currentGame.currentTime.sec;
    if (seconds < 60) {
      this.props.updateTime({min: minutes, sec: seconds + 1});
    } else if (minutes < 60) {
      this.props.updateTime({min: minutes + 1, sec: 0});
    }
    //else {
    //   // this.setState({
    //   //   seconds: 0,
    //   //   minutes: 0,
    //   //   hours: this.state.hours + 1,
    //   // });
    //   this.props.updateTime(this.state.minutes, this.state.seconds)
    // }
  };

  render() {
    return (
      <ViroNode position={[0, 0, 0]}>
        <ViroImage
          source={require('./images/digitalclock.png')}
          position={[0, 0.74, -1.5]}
          scale={[0.4, 0.2, 0.4]}
        />

        <ViroText
          text={`00:${this.props.currentGame.currentTime.min}:${
            this.props.currentGame.currentTime.sec
          }`}
          position={[0.1, 0.6, -1.4]}
          scale={[0.4, 0.4, 0.4]}
          width={1}
          height={1}
          color="#F5B041"
          // eslint-disable-next-line react-native/no-inline-styles
          style={{fontFamily: 'Arial', fontSize: 20}}
        />
      </ViroNode>
    );
  }
}
const mapStateToProps = state => {
  return {currentGame: state.game};
};

const mapDispatchToProps = dispatch => {
  return {
    updateTime: newTime => dispatch(timeThunk(newTime)),
  };
};

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimerComponent);
