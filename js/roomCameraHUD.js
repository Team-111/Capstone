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
    this.changeItem = this.changeItem.bind(this)

  }
  // changeItem() {
  //   if(!this.props.inventory[this.props.inventory.length]) {
  //     this.setState({selectedItem: 0})
  //   } else {
  //     this.setState({selectedItem: this.state.selectedItem + 1})
  //   }
  // }
  changeItem(direction) {
    if(direction === "right") {
      if(this.state.selectedItem === (this.props.inventory.length -1)) {
        this.setState({selectedItem: 0})
      } else {
        let newNum = this.state.selectedItem;
        newNum += 1;
        this.setState({selectedItem: newNum})
      }
    }
    if(direction === "left") {
      if (this.state.selectedItem === 0) {
        this.setState({selectedItem: this.props.inventory.length -1})
      } else {
        let newNum = this.state.selectedItem;
        newNum -= 1;
        this.setState({selectedItem: newNum})
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
          <ViroImage source={this.props.inventory[this.state.selectedItem].itemIMG} />
          {/* <ViroText text={this.props.inventory[this.state.selectedItem].name}/> */}
        </ViroNode>
        <ViroImage position={[.7, -1, -3]} scale={[.5,.5,.5]} source={require('./Inventory/images/icon_right.png')} onClick={() => {this.changeItem('right')}}/>
        <ViroImage position={[-.7, -1, -3]} scale={[.5,.5,.5]} source={require('./Inventory/images/icon_left.png')} onClick={() => {this.changeItem('left')}}/>

      </ViroCamera>
    );
  }
}

export default RoomCamera;
