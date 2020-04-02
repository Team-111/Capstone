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
      itemImageKeys: {
        key: require('./Inventory/images/key.png'),
        spoon: require('./Inventory/images/spoon.jpg'),
        empty: require('./Inventory/images/icon_close.png')
      }
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
          <ViroButton
            source={require('./res/firewood-clipart-20-original.png')}
            onClick={() => {
              this.props.saveGame(this.props.uid, this.props.currentGame);
              this.props.exitViro();
            }}
            height={1}
            width={1}
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
          />
        </ViroNode>
        <ViroText
          position={[0, 0, -1]}
          text={this.props.hudText}
          textAlign="center"
          scale={[0.5, 0.5, 0.5]}
          textClipMode="ClipToBounds"
          width={1} />
        <ViroNode position={[0, -.6, -1.5]} scale={[.3, .3, .3]}>
          <ViroImage source={this.state.itemImageKeys[this.props.currentGame.inventory[this.props.currentGame.selectedItemIndex]]} />
          {/* <ViroText text={this.props.inventory[this.state.selectedItem].name}/> */}
        </ViroNode>
        <ViroQuad position={[.5, -1, -2]} scale={[.4,.4,.4]} materials={['right']} onClick={() => {this.changeItem('right')}}/>
        <ViroQuad position={[-.5, -1, -2]} scale={[.4,.4,.4]} materials={['left']} onClick={() => {this.changeItem('left')}}/>
        {/*This ViroQuad is passed the material for a 'pop up display item' ie newspaper */}
          <ViroQuad materials={[this.props.shownObject]} position={[0,0, -1.4]} onClick={this.props.putItemAway} visible={this.props.objectDisplay}/>


      </ViroCamera>
    );
  }
}

//Materials for camera pop up
ViroMaterials.createMaterials({
  newspaper: {
    diffuseTexture: require('./res/newspaper.jpg'),
  },
  right: {
    diffuseTexture: require('./Inventory/images/icon_right.png'),
  },
  left: {
    diffuseTexture: require('./Inventory/images/icon_left.png'),
  }
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
