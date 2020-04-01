import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  ViroNode,
  ViroText,
  ViroImage,
  ViroFlexView,
  ViroQuad,
  ViroMaterials,
  ViroSound,
} from 'react-viro';

class Pallindrome extends Component {
  constructor() {
    super();
    this.state = {
      solution1: '0959',
      solution2: '1001',
      guess1: [0, 0, 0, 0],
      guess2: [0, 0, 0, 0],
      solved: false,
    };

    this.handleClick1 = this.handleClick1.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.checkSolved = this.checkSolved.bind(this);
  }

  handleClick1(idx) {
    const digitsCopy = [...this.state.guess1];
    digitsCopy[idx]++;

    if (digitsCopy[idx] > 9) {
      digitsCopy[idx] = 0;
    }

    this.setState(
      {
        guess1: digitsCopy,
      },
      () => {
        this.checkSolved();
      },
    );
  }

  handleClick2(idx) {
    const digitsCopy = [...this.state.guess2];
    digitsCopy[idx]++;

    if (digitsCopy[idx] > 9) {
      digitsCopy[idx] = 0;
    }

    this.setState(
      {
        guess2: digitsCopy,
      },
      () => {
        this.checkSolved();
      },
    );
  }

  checkSolved() {
    let g1 = this.state.guess1.join('');
    let g2 = this.state.guess2.join('');
    let s1 = this.state.solution1;
    let s2 = this.state.solution2;

    if ((s1 === g1 && s2 === g2) || (s1 === g2 && s2 === g1)) {
      this.setState({solved: true});
    }
  }

  render() {
    return (
      <ViroNode>
        {!this.state.solved || this.props.lightOn
          ? (<ViroQuad
            materials={['clockImage']}
            position={[2, 0.4, 0]}
            width={0.7}
            height={0.75}
            rotation={[0, 270, 0]}
          />
        ) : (
          <ViroText
            text={this.props.codeDigit}
            color="green"
            style={{fontSize: 32, textAlign: 'center'}}
            position={[2, 0.4, 0]}
            rotation={[0, 270, 0]}
          />
          )
        }
        <ViroFlexView
          backgroundColor="black"
          materials={['input']}
          width={1}
          height={0.4}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          position={[2, -0.4, 0]}
          rotation={[0, 270, 0]}>
          {this.state.guess1.map((digit, idx) => {
            return (
              <ViroFlexView
                key={`digit${idx}`}
                width={0.2}
                height={0.2}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingTop: 0.1,
                }}
                onClick={
                  !this.state.solved ? () => this.handleClick1(idx) : () => {}
                }>
                <ViroText
                  color="#cc6600"
                  height={0.3}
                  width={0.3}
                  textAlign="center"
                  textAlignVertical="center"
                  text={digit.toString()}
                />
              </ViroFlexView>
            );
          })}
        </ViroFlexView>
        <ViroFlexView
          backgroundColor="black"
          materials={['input']}
          width={1}
          height={0.3}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          position={[2, -0.7, 0]}
          rotation={[0, 270, 0]}>
          {this.state.guess2.map((digit, idx) => {
            return (
              <ViroFlexView
                key={`digit${idx}`}
                width={0.2}
                height={0.2}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingTop: 0.1,
                }}
                onClick={
                  !this.state.solved ? () => this.handleClick2(idx) : () => {}
                }>
                <ViroText
                  color="#cc6600"
                  height={0.3}
                  width={0.3}
                  textAlign="center"
                  textAlignVertical="center"
                  text={digit.toString()}
                />
              </ViroFlexView>
            );
          })}
        </ViroFlexView>
      </ViroNode>
    );
  }
}
ViroMaterials.createMaterials({
  input: {
    diffuseTexture: require('./res/input.jpg'),
  },
  clockImage: {
    diffuseTexture: require('../images/1221.jpeg'),
    lightingModel: 'Blinn',
  },
});

const mapStateToProps = state => ({
  codeDigit: state.game.lockCombo[2],
  lightOn: state.game.lightOn,
});

export default connect(mapStateToProps)(Pallindrome);