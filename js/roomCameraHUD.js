'use strict';

import React, {Component} from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroMaterials,
  ViroBox,
  ViroButton,
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
    console.log('roomCameraHud props', this.props);
    return (
      <ViroCamera position={[0, 0, 0]} active={this.props.isActive}>
        <TimerComponent />
        <ViroButton
          source={require('./res/firewood-clipart-20-original.png')}
          onClick={this.props.saveGame}
          scale={[.18,.1,.1]}
          position={[0.35, 0.8, -1.5]}
          height={1}
          width={1}
        />
        <ViroText
          position={[0, 0, -1]}
          text={this.props.hudText}
          textAlign="center"
          scale={[0.5, 0.5, 0.5]}
          textClipMode="ClipToBounds"
          width={1}
        />

        <ViroNode position={[0, -0.5, -1.5]} scale={[.5, .5, .5]}>
          <InventoryContainer currPage = {this.state.inventory[this.state.currentInventoryPage]}/>
        </ViroNode>
      </ViroCamera>
    );
  }
}

export default RoomCamera;
