'use strict';

import React, {Component} from 'react';

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
import TimerComponent from '../js/timer/timerComponent';
import InventoryContainer from '../js/Inventory/inventoryContainer'

class RoomCamera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: [
        [[], [], [], [], []],
        [[], [], [], [], []],
        [[], [], [], [], []],
      ],
      currentInventoryPage: 0,
    };
  }

  collectItem(item) {
    if (this.state.inventory[this.state.currInventoryPage].length < 5) {
      let updatedInventory = [...this.state.inventory]

      this.setState({inventory: []})
    }

  }

  changeInventoryPage(inputDirection) {
    if (inputDirection === 'left') {
      if (this.state.currentInventoryPage === 0)
        this.setState({currentInventoryPage: 2});
      else
        this.setState({
          currentInventoryPage: this.state.currentInventoryPage - 1,
        });
    } else if (inputDirection === 'right') {
      if (this.state.currentInventoryPage === 2)
        this.setState({currentInventoryPage: 0});
      else
        this.setState({
          currentInventoryPage: this.state.currentInventoryPage + 1,
        });
    }
  }

  render() {
    return (
      <ViroCamera position={[0, 0, 0]} active={this.props.isActive}>
        <TimerComponent />
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
        <ViroNode position={[0, -0.5, -1.5]} scale={[.5, .5, .5]}>
        <InventoryContainer currPage = {this.state.inventory[this.state.currentInventoryPage]}/>
        </ViroNode>
      </ViroCamera>
    );
  }
}

export default RoomCamera;
