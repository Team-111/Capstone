import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ViroNode, ViroText, ViroImage} from 'react-viro';

export default class TimerComponent extends Component {
  constructor(props) {
    super(props);

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
      <ViroNode position={[0,0,0]}>
        <ViroImage
          source={require('./images/tubeclockbase.png')}
          position={[0, 0.8, -1.5]}
          scale={[0.4, 0.4, 0.4]}
        />

        <ViroText
          text={`${this.state.hours}:${this.state.minutes}:${
            this.state.seconds
          }`}
          position={[0.1, 0.6, -1.4]}
          scale={[0.4, 0.4, 0.4]}
          width={1}
          height={1}
          color="#F5B041"
          style={{fontFamily: 'Arial', fontSize: 20}}
        />
      </ViroNode>
    );
  }
}
