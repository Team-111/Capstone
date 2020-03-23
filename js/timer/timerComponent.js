import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ViroNode, ViroText, ViroImage} from 'react-viro';

// const styles = StyleSheet.create({
//   body: {
//     backgroundColor: '#191919',
//   },

//   tubeclock: {
//     height: 300,
//     width: 560,
//     color: 'rgba(50, 50, 50, 0.35)',
//     flex: 1,
//     justifyContent: 'space-evenly',
//     alignItems: 'center',
//     margin: 10,
//     textAlign: 'center',
//   },

//   h1: {
//     color: 'rgba(241, 196, 112)',
//     textShadowOffset: {width: 1, height: 1},
//     opacity: 0.7,
//   },
// });

export default class TimerComponent extends Component {
  constructor() {
    super();

    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  componentDidMount = () => {
    setInterval(() => this.timer(), 1000);
  };

  timer = () => {
    if (this.state.seconds < 60) {
      this.setState({
        seconds: this.state.seconds + 1,
      });
    } else if (this.state.minutes < 60) {
      this.setState({
        seconds: 0,
        minutes: this.state.minutes + 1,
      });
    } else {
      this.setState({
        seconds: 0,
        minutes: 0,
        hours: this.state.hours + 1,
      });
    }
  };

  render() {
    return (
      <ViroNode>
        <ViroImage
          source={require('./images/tubeclockbase.png')}
          position={[0, -0.92, 2]}
          scale={[1, 1, 1]}
        />

        <ViroText
          text={`${this.state.hours}:${this.state.minutes}:${
            this.state.seconds
          }`}
          position={[0.15, -1.3, 2]}
          width={1}
          height={1}
        />
      </ViroNode>
    );
  }
}
