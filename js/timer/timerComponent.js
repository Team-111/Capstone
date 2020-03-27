import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ViroNode, ViroText, ViroImage} from 'react-viro';

export default class TimerComponent extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   hours: 0,
    //   minutes: 0,
    //   seconds: 0,
    // };
  }

  componentDidMount = () => {
    setInterval(() => this.timer(), 1000);
  };

  timer = () => {
    let minutes = this.props.time.min;
    let seconds = this.props.time.sec;
    if (seconds < 60) {
      // this.setState({
      //   seconds: this.state.seconds + 1,
      // });
      this.props.updateTime(minutes, seconds + 1);
    } else if (minutes < 60) {
      // this.setState({
      //   seconds: 0,
      //   minutes: this.state.minutes + 1,
      // });
      this.props.updateTime(minutes + 1, 0);
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
    console.log('props in timerComponent', this.props)
    return (
      <ViroNode position={[0, 0, 0]}>
        <ViroImage
          source={require('./images/digitalclock.png')}
          position={[0, 0.74, -1.5]}
          scale={[0.4, 0.2, 0.4]}
        />

        <ViroText
          text={`00:${this.props.time.min}:${this.props.time.sec}`}
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
