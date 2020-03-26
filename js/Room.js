'use strict';

import React, {Component} from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroMaterials,
  ViroBox,
  ViroNode,
  ViroImage,
  ViroSound,
  ViroText,
  ViroFlexView,
} from 'react-viro';
import HighScores from './HighScores';
import PuzzleColoredSquares from './PuzzleColoredSquares';

import RoomCamera from './roomCameraHUD';

function objIsEquivalent(a,b){
  //base case
  if (a === b) return true;

  if (a === null || typeof a !== "object" ||
      b === null || typeof b !== "object") return false;

  let keysA = Object.keys(a);
  let keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (let key of keysA) {
    if (!keysB.includes(key) || !objIsEquivalent(a[key], b[key])) return false;
  }

  return true;
}


class Room extends Component {
  constructor() {
    super();
    this.state = {
      keyPossessed: false,
      hudText: '',
      puzzle: false,
      currGame: {},
    };

    this.doorInteract = this.doorInteract.bind(this);
    this.getKey = this.getKey.bind(this);
    this.showPuzzle = this.showPuzzle.bind(this);
    this.getCurrentGame = this.getCurrentGame.bind(this);
    this.gotHint = this.gotHint.bind(this);
    // this.saveGame = this.saveGame.bind(this);
  }


  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (!objIsEquivalent(this.props.currentGame, prevProps.currentGame)) {
      // console.log('Here is the current props=', this.props.currentGame);
      // console.log('Here are the previous props', prevProps.currentGame);
      this.getCurrentGame();
      // console.log('Here is the State after get currentGame', this.state);
    }
  }

  // saveGame(){

  // }

  getCurrentGame() {
    this.setState({currGame: this.props.currentGame});
  }

  gotHint() {
    let currentHints = this.state.currGame.hintsLeft;
    if (currentHints > 0) {
      this.setState({
        currGame: {...this.state.currGame, hintsLeft: currentHints - 1},
      });
    }
  }

  doorInteract() {
    if (!this.state.keyPossessed) {
      this.setState({hudText: 'The door is locked! Find a key!'});
      setTimeout(() => this.setState({hudText: ''}), 4000);
    } else {
      this.setState({hudText: "You've escaped the room!"});
    }
  }

  getKey() {
    this.setState({
      keyPossessed: true,
    });
  }

  showPuzzle() {
    const puzzleState = this.state.puzzle;
    this.setState({
      puzzle: !puzzleState,
    });
  }

  render() {
    // console.log('This in Room',this)
    console.log('Render - State in Room=', this.state);
    console.log('Render - Props in Room=', this.props);
    return (
      <ViroNode position={[0, 0, -4.6]}>
        <RoomCamera
          isActive={this.props.entered}
          hudText={this.state.hudText}
          puzzle={this.state.puzzle}
          showPuzzle={this.showPuzzle}
          saveGame={this.props.saveGame}
        />
        <ViroBox position={[-4, 0, 0]} scale={[8, 7, .1]} materials={["cabinWall"]} rotation={[0, 90, 0]} />
        <ViroBox position={[4, 0, 0]} scale={[8, 7, .1]} materials={["cabinWall"]} rotation={[0, 90, 0]} />
        <ViroBox position={[0, 0, -4]} scale={[8, 7, .1]} materials={["cabinWall"]} />
        <ViroBox position={[0, 0, 4]} scale={[8, 7, .1]} materials={["cabinWall"]} visible={this.props.entered} />
        <ViroImage
          source={require('./res/cabindoor.jpg')}
          position={[0, -0.92, 3.48]}
          scale={[0.8, 3.2, 1]}
          rotation={[0, 180, 0]}
          visible={this.props.entered}
          onClick={this.doorInteract}
        />

        {!!this.state.currGame.hintsLeft && (
          <ViroNode position={[0, 0, -0.3]}>
            <ViroText
              text={`Hints = ${this.state.currGame.hintsLeft}`}
              style={styles.helloWorldTextStyle}
              // scale={[0.5, 0.5, 0.5]}
              position={[0, 0, -1]}
              onClick={this.gotHint}
            />
          </ViroNode>
        )}

        {this.props.entered && (
          <ViroSound source={require('./sounds/doorlock.wav')} loop={false} />
        )}

        <ViroBox
          position={[0, 3.5, 0]}
          scale={[8, 0.1, 8]}
          materials={['cabinWall']}
        />
        <ViroBox
          position={[0, -3.6, 0]}
          scale={[8, 0.1, 8]}
          materials={['cabinFloor']}
        />

        <ViroFlexView
          style={{flexDirection: "column", justifyContent: "center", alignItems: "center"}}
          width={.7}
          height={.7}
          position={[-2, 0, 0]}
          rotation={[0,90,0]}
          backgroundColor="transparent"
        >
          <PuzzleColoredSquares />
        </ViroFlexView>
      </ViroNode>
    );
  }
}

export default Room;

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg'),
  },
  cabinWall: {
    diffuseTexture: require('./res/cabin_wall_sample.jpg'),
  },
  cabinFloor: {
    diffuseTexture: require('./res/cabin_floor_sample.jpg'),
  },
});

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 40,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = Room;
