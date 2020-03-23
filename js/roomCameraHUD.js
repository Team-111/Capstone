'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroMaterials,
  ViroBox,
  ViroNode,
  ViroCamera,
  ViroImage
} from 'react-viro';

const RoomCamera = props => {
  return (
    <ViroCamera position={[0,0,0]} active={props.isActive} >
      <ViroBox position={[0, 0, -5]} />
    </ViroCamera>
  )
}

export default RoomCamera;
