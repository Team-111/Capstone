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
import TimerComponent from '../js/timer/timerComponent'

const RoomCamera = props => {
  return (
    <ViroCamera position={[0,0,0]} active={props.isActive} >
      <TimerComponent />
    </ViroCamera>
  )
}

export default RoomCamera;
