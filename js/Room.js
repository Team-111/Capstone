'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroMaterials,
  ViroBox,
  ViroARPlaneSelector,
} from 'react-viro';

export default class Room extends Component {

  render() {
    return (
        <ViroARScene onTrackingUpdated={this._onInitialized} >
            <ViroARPlaneSelector minHeight={.5} minWidth={.5} >
              <ViroBox position={[-4, 0, 0]} scale={[8, 7, .1]} materials={["cabinWall"]} rotation={[0, 90, 0]}/>
              <ViroBox position={[4, 0, 0]} scale={[8, 7, .1]} materials={["cabinWall"]} rotation={[0, 90, 0]}/>
              <ViroBox position={[0, 0, -4]} scale={[8, 7, .1]} materials={["cabinWall"]} />
              <ViroBox position={[0, 0, 4]} scale={[8, 7, .1]} materials={["cabinWall"]} />
              <ViroBox position={[0, 3.5, 0]} scale={[8, .1, 8]} materials={["cabinWall"]} />
              <ViroBox position={[0, -3.6, 0]} scale={[8, .1, 8]} materials={["cabinFloor"]} />

            </ViroARPlaneSelector>
        </ViroARScene>
    );
  }
}

ViroMaterials.createMaterials({
    grid: {
      diffuseTexture: require('./res/grid_bg.jpg'),
    },
    cabinWall: {
      diffuseTexture: require('./res/cabin_wall_sample.jpg'),
    },
    cabinFloor: {
      diffuseTexture: require('./res/cabin_floor_sample.jpg'),
    }
  });

module.exports = Room;
