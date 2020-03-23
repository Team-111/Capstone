'use strict';

import React, { Component } from 'react';

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

class Room extends Component {
  constructor() {
    super();
    this.state = {
      displayDoorText: false,
      displayHighScores: false,
      keyPossessed: false
    };

    this.doorInteract = this.doorInteract.bind(this);
    this.getKey = this.getKey.bind(this);
  }

  doorInteract() {
    this.setState({displayDoorText: true});

    if (!this.state.keyPossessed) {
      setTimeout(() => this.setState({displayDoorText: false}), 4000);
    }
    else {
      this.setState({displayHighScores: true});
    }
  }

  getKey() {
    this.setState({
      keyPossessed: true
    });
  }

  render() {
    return (
      <ViroNode position={[0, 0, -4.6]}>
        <ViroBox position={[-4, 0, 0]} scale={[8, 7, .1]} materials={["cabinWall"]} rotation={[0, 90, 0]} />
        <ViroBox position={[4, 0, 0]} scale={[8, 7, .1]} materials={["cabinWall"]} rotation={[0, 90, 0]} />
        <ViroBox position={[0, 0, -4]} scale={[8, 7, .1]} materials={["cabinWall"]} />
        <ViroBox position={[0, 0, 4]} scale={[8, 7, .1]} materials={["cabinWall"]} visible={this.props.entered} />
        <ViroImage 
          source={require('./res/cabindoor.jpg')}
          position={[0, -.92, 3.48]}
          scale={[.8, 3.2, 1]}
          rotation={[0, 180, 0]}
          visible={this.props.entered}
          onClick={this.doorInteract}
          />
        <ViroBox 
          position={[0,0,-2]} 
          scale={[.5, .5, .5]} 
          materials={["grid"]} 
          onClick={this.getKey} 
          visible={!this.state.keyPossessed}/>

        {this.props.entered && <ViroSound source={require("./sounds/doorlock.wav")} loop={false} />}
        {this.state.displayDoorText &&
          ( this.state.displayHighScores
          ? <ViroText text="You escaped!" color="yellow" position={[0, -0.5, 3.46]} rotation={[0, 180, 0]}/>
          : <ViroText text="The door is locked! Find a key!" color="yellow" position={[0, -0.5, 3.46]} rotation={[0, 180, 0]}/> )
        }
        <ViroBox position={[0, 3.5, 0]} scale={[8, .1, 8]} materials={["cabinWall"]} />
        <ViroBox position={[0, -3.6, 0]} scale={[8, .1, 8]} materials={["cabinFloor"]} />
      </ViroNode>
    );
  }
}

export default Room;

ViroMaterials.createMaterials({
    grid: {
      diffuseTexture: require('./res/grid_bg.jpg')
    },
    cabinWall: {
      diffuseTexture: require('./res/cabin_wall_sample.jpg'),
    },
    cabinFloor: {
      diffuseTexture: require('./res/cabin_floor_sample.jpg'),
    }
  });

module.exports = Room;
