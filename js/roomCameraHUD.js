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
    super(props)
    this.state = {
      selectedItem : 0
    }
    // this.changeItem = this.changeItem.bind(this)

  }
  // changeItem() {
  //   if(!this.props.inventory[this.props.inventory.length]) {
  //     this.setState({selectedItem: 0})
  //   } else {
  //     this.setState({selectedItem: this.state.selectedItem + 1})
  //   }
  // }
  _onSwipe(swipeState, source) {
    if(swipeState == 4) {
      if(!this.props.inventory[this.props.inventory.length]) {
        this.setState({selectedItem: 0})
      } else {
        this.setState({selectedItem: this.state.selectedItem + 1})
      }
    }
  }


  render() {
    return (
      <ViroCamera position={[0, 0, 0]} active={this.props.isActive}>
        <TimerComponent />
        <ViroText
          position={[0, 0, -1]}
          text={this.props.hudText}
          textAlign="center"
          scale={[0.5, 0.5, 0.5]}
          textClipMode="ClipToBounds"
          width={1} />
        <ViroNode position={[0, -.6, -1.5]} scale={[.3, .3, .3]}>
          <ViroImage source={this.props.inventory[this.state.selectedItem].itemIMG} onSwipe={this._onSwipe}/>
        </ViroNode>

      </ViroCamera>
    );
  }
}

export default RoomCamera;
