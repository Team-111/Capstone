'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroMaterials,
  ViroBox,
  ViroNode,
  ViroCamera,
  ViroImage,
  ViroText,
  ViroFlexView,
} from 'react-viro';
import PuzzleColoredSquares from './PuzzleColoredSquares';

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
      {props.puzzle && 
        <ViroFlexView
          style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}} 
          backgroundColor="white"
          width={2}
          height={2}
          position={[0, 0, -1.1]}
          onClick={props.showPuzzle}>
          <PuzzleColoredSquares />
        </ViroFlexView>}
    </ViroCamera>
  )
}

export default RoomCamera;
