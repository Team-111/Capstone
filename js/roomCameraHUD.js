'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroMaterials,
  ViroBox,
  ViroNode,
  ViroCamera,
  ViroImage,
  ViroText
} from 'react-viro';

const RoomCamera = props => {
  return (
    <ViroCamera position={[0,0,0]} active={props.isActive} >
      <ViroText
        position={[0, 0, -1]}
        text={props.hudText}
        textAlign="center"
        scale={[0.5, 0.5, 0.5]}
        textClipMode="ClipToBounds"
        width={1} />
    </ViroCamera>
  )
}

export default RoomCamera;
