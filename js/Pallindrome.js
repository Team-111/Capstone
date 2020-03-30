import React, {Component} from 'react';
import {ViroNode, ViroText, ViroImage, ViroFlexView} from 'react-viro';

export default class Pallindrome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solved: false,
      solution1: [9, 59],
      solution2: [10, 1],
      answer1: [],
      answer2: [],
      // riddle:
      //   'A pallindrome is a word, phrase or sequence that reads the same backward as forward. On a digital clock, an example of a pallindrome is 12:21. What is the shortest interval between two pallindromic times? e.g. 11:11 and 12:21 has an interval of 1 hour and 10 minutes. Enter your answers below.',
    };

    this.handleClick1 = this.handleClick1.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.checkSolved = this.checkSolved.bind(this);
  }

  handleClick1(idx) {
    const a1Copy = [...this.state.answer1];
    a1Copy[idx]++;

    if (a1Copy[idx] > 9) {
      a1Copy[idx] = 0;
    }

    this.checkSolved();

    this.setState({
      answer1: a1Copy,
    });
  }
  handleClick2(idx) {
    const a2Copy = [...this.state.answer2];
    a2Copy[idx]++;

    if (a2Copy[idx] > 9) {
      a2Copy[idx] = 0;
    }

    this.checkSolved();

    this.setState({
      answer2: a2Copy,
    });
  }

  checkSolved() {
    let a1 = this.state.answer1;
    let a2 = this.state.answer2;
    let s1 = this.state.solution1;
    let s2 = this.state.solution2;

    if ((a1 === s1 && a2 === s2) || (a1 === s2 && a2 === s1)) {
      this.setState({solved: true});
    }
  }

  render() {
    return (
      <ViroNode
        background={'black'}
        position={[2, 0, 0]}
        rotation={[0, 270, 0]}>
        <ViroImage
          source={require('../images/1221.jpeg')}
          heigth={4}
          width={1}
        />
      </ViroNode>
    );
  }
}
