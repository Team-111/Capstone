import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updatePuzzleStatus} from '../store';
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
      this.props.updatePuzzleStatus('palindrome');
    }
  }

  render() {
    return (
      <ViroNode shadowCastingBitMask={2}>
        {!this.props.solved || this.props.lightOn ? (
          <ViroQuad
            materials={['clockImage']}
            position={[2, 0.4, 0]}
            width={0.7}
            height={0.75}
            rotation={[0, 270, 0]}
            onClick={() => this.props.getItem('palindrome', false, '', true)}
            shadowCastingBitMask={2}
          />
        ) : (
          <ViroNode position={[2, 0.4, 0]} rotation={[0, 270, 0]} shadowCastingBitMask={2}>
            <ViroQuad materials={['scary']} height={1.2} width={0.9} shadowCastingBitMask={2}/>
            <ViroText
              text={this.props.codeDigit}
              position={[0, -0.2, 0.1]}
              color="green"
              style={{fontSize: 32, textAlign: 'center'}}
              shadowCastingBitMask={2}
            />
          </ViroNode>
        )}
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
          rotation={[0, 270, 0]}
          shadowCastingBitMask={2}>
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
                  !this.props.solved ? () => this.handleClick1(idx) : () => {}
                }
                shadowCastingBitMask={2}>
                <ViroText
                  color="#cc6600"
                  height={0.3}
                  width={0.3}
                  textAlign="center"
                  textAlignVertical="center"
                  text={digit.toString()}
                  shadowCastingBitMask={2}
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
          rotation={[0, 270, 0]}
          shadowCastingBitMask={2}
          >
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
                  !this.props.solved ? () => this.handleClick2(idx) : () => {}
                }
                shadowCastingBitMask={2}
                >
                <ViroText
                  color="#cc6600"
                  height={0.3}
                  width={0.3}
                  textAlign="center"
                  textAlignVertical="center"
                  text={digit.toString()}
                  shadowCastingBitMask={2}
                />
              </ViroFlexView>
            );
          })}
        </ViroFlexView>
        {this.props.solved && (
          <ViroSound
            source={require('./sounds/laughhowl1.wav')}
            loop={false}
            muted={false}
            paused={false}
            volume={1}
          />
        )}
      </ViroNode>
    );
  }
}
ViroMaterials.createMaterials({
  input: {
    diffuseTexture: require('./res/input.jpg'),
  },
  clockImage: {
    diffuseTexture: require('./res/Pallindrome/1221.jpeg'),
    lightingModel: 'Blinn',
  },
  scary: {
    diffuseTexture: require('./res/Pallindrome/scary.jpg'),
  },
});

const mapStateToProps = state => ({
  codeDigit: state.game.lockCombo[2],
  lightOn: state.game.lightOn,
  solved: state.game.puzzles.palindrome.complete,
});

const mapDispatchToProps = dispatch => ({
  updatePuzzleStatus: puzzle => dispatch(updatePuzzleStatus(puzzle)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Pallindrome);
