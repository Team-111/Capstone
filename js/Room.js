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
} from 'react-viro';
import HighScores from './HighScores';

import RoomCamera from './roomCameraHUD';

class Room extends Component {
  constructor() {
    super();
    this.state = {
      keyPossessed: false,
      hudText: '',
      puzzle: false,
    };

    this.doorInteract = this.doorInteract.bind(this);
    this.getKey = this.getKey.bind(this);
    this.showPuzzle = this.showPuzzle.bind(this);
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
    return (
      <ViroNode position={[0, 0, -4.6]}>
        <RoomCamera
          isActive={this.props.entered}
          hudText={this.state.hudText}
          puzzle={this.state.puzzle} 
          showPuzzle={this.showPuzzle} />
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

        <ViroBox
          position={[0, 0, -2]}
          scale={[0.5, 0.5, 0.5]}
          materials={['grid']}
          onClick={this.showPuzzle}
          visible={!this.state.keyPossessed}
        />

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

module.exports = Room;
