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

class Room extends Component {
  constructor() {
    super();
    this.state = {
      lockedText: false
    };

    this.displayLocked = this.displayLocked.bind(this);
  }

  displayLocked() {
    this.setState({
      lockedText: true
    });

    setTimeout(() => this.setState({lockedText: false}), 4000);
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
          onClick={this.displayLocked}
          />
        {this.props.entered && <ViroSound source={require("./sounds/doorlock.wav")} loop={false} />}
        {this.state.lockedText && <ViroText text="The door is locked! Find a key!" color="yellow" position={[0, -0.5, 3.46]} rotation={[0, 180, 0]}/> }
        <ViroBox position={[0, 3.5, 0]} scale={[8, .1, 8]} materials={["cabinWall"]} />
        <ViroBox position={[0, -3.6, 0]} scale={[8, .1, 8]} materials={["cabinFloor"]} />
      </ViroNode>
    );
  }
}

export default Room;

ViroMaterials.createMaterials({
    cabinWall: {
      diffuseTexture: require('./res/cabin_wall_sample.jpg'),
    },
    cabinFloor: {
      diffuseTexture: require('./res/cabin_floor_sample.jpg'),
    }
  });

module.exports = Room;
