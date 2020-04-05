'use strict';

import React, {Component} from 'react';

import {StyleSheet} from 'react-native';
import {connect} from 'react-redux'
import {saveGameThunk, useHint, selectItemThunk} from '../store/gameReducer'
import TimerComponent from '../js/timer/timerComponent';

import {
  ViroButton,
  ViroNode,
  ViroCamera,
  ViroImage,
  ViroText,
  ViroMaterials,
  ViroQuad,
} from 'react-viro';

class RoomCamera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hintVisible: false,
    }
    this.showHint = this.showHint.bind(this);
    this.changeItem = this.changeItem.bind(this);
  }

  changeItem(direction) {
    if(direction === "right") {
      if(this.props.currentGame.selectedItemIndex === (this.props.currentGame.inventory.length -1)) {
        this.props.selectItem(0);
      } else {
        let newNum = this.props.currentGame.selectedItemIndex;
        newNum += 1;
        this.props.selectItem(newNum)
      }
    }
    if(direction === "left") {
      if (this.props.currentGame.selectedItemIndex === 0) {
        this.props.selectItem(this.props.currentGame.inventory.length - 1)
      } else {
        let newNum = this.props.currentGame.selectedItemIndex;
        newNum -= 1;
        this.props.selectItem(newNum)
      }
    }
  }

  showHint() {

  }

  render() {
    return (
      <ViroCamera position={[0, 0, 0]} active={this.props.isActive}>
        <TimerComponent />
        <ViroNode scale={[0.18, 0.1, 0.1]} position={[0.35, 0.8, -1.5]}>
          <ViroQuad
            materials={['save']}
            onClick={() => {
              this.props.saveGame(this.props.uid, this.props.currentGame);
              this.props.exitViro();
            }}
            height={1}
            width={1}
            shadowCastingBitMask={2}
          />
        </ViroNode>
        <ViroNode position={[-0.25, 0.6, -1.5]} scale={[0.38, 0.38, 0.38]}>
          <ViroText
            text={`Hints = ${this.props.currentGame.hintsLeft}`}
            width={1}
            height={1}
            color="#F5B041"
            style={{fontFamily: 'Arial', fontSize: 15}}
            onClick={() => {
              this.props.useHint();

            }}
            shadowCastingBitMask={2}
          />
        </ViroNode>
        <ViroText
          position={[0, 0, -1]}
          text={this.props.hudText}
          textAlign="center"
          scale={[0.5, 0.5, 0.5]}
          textClipMode="ClipToBounds"
          width={1} shadowCastingBitMask={2}/>
        <ViroNode position={[0, -.6, -1.5]} scale={[.3, .3, .3]} shadowCastingBitMask={2}>
          {/* <ViroImage source={this.state.itemImageKeys[this.props.currentGame.inventory[this.props.currentGame.selectedItemIndex]]} /> */}
          <ViroQuad materials={[`${this.props.currentGame.inventory[this.props.currentGame.selectedItemIndex]}Inv`]} shadowCastingBitMask={2}/>
          {/* <ViroText text={this.props.currentGame.inventory[this.props.currentGame.selectedItemIndex]} /> */}
        </ViroNode>
        <ViroQuad position={[.5, -.9, -2]} scale={[.4,.4,.4]} materials={['right']} onClick={() => {this.changeItem('right')}} shadowCastingBitMask={2}/>
        <ViroQuad position={[-.5, -.9, -2]} scale={[.4,.4,.4]} materials={['left']} onClick={() => {this.changeItem('left')}} shadowCastingBitMask={2}/>
        {/*This ViroQuad is passed the material for a 'pop up display item' ie newspaper */}
          <ViroQuad materials={[this.props.shownObject]} position={[0,0, -1.6]} onClick={this.props.putItemAway} visible={this.props.objectDisplay} shadowCastingBitMask={2}/>


      </ViroCamera>
    );
  }
}

//Materials for camera pop up
ViroMaterials.createMaterials({
  newspaper: {
    diffuseTexture: require('./res/newspaper.jpg'),
  },
  palindrome: {
    diffuseTexture: require('./res/Pallindrome/1221.jpeg'),
  },
  right: {
    diffuseTexture: require('./Inventory/images/icon_right.png'),
  },
  left: {
    diffuseTexture: require('./Inventory/images/icon_left.png'),
  },
  keyInv: {
    diffuseTexture: require('./Inventory/images/key.png'),
  },
  spoonInv: {
    diffuseTexture: require('./Inventory/images/spoon.png'),
  },
  grenadeInv: {
    diffuseTexture: require('./Inventory/images/grenade.png')
  },
  emptyInv: {
    diffuseTexture: require('./Inventory/images/icon_close.png'),
  },
  save: {
    diffuseTexture: require('./res/firewood-clipart-20-original.png'),
  },

})

const mapStateToProps = state => ({
  currentGame: state.game,
  uid: state.user.uid,
});

const mapDispatchToProps = dispatch => {
  return {
    saveGame: (userID, updatedGame) => dispatch(saveGameThunk(userID, updatedGame)),
    useHint: () => dispatch(useHint()),
    selectItem: newIndex => dispatch(selectItemThunk(newIndex)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomCamera);
