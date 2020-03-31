'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {saveGameThunk, useHint} from '../store/gameReducer';
import TimerComponent from '../js/timer/timerComponent';

import {
  ViroButton,
  ViroNode,
  ViroCamera,
  ViroImage,
  ViroText,
} from 'react-viro';

class RoomCamera extends Component {
  constructor() {
    super();
    this.state = {
      selectedItem: 0,
    };

    this.changeItem = this.changeItem.bind(this);
  }

  changeItem(direction) {
    if (direction === 'right') {
      if (this.state.selectedItem === this.props.inventory.length - 1) {
        this.setState({selectedItem: 0});
      } else {
        let newNum = this.state.selectedItem;
        newNum += 1;
        this.setState({selectedItem: newNum});
      }
    }
    if (direction === 'left') {
      if (this.state.selectedItem === 0) {
        this.setState({selectedItem: this.props.inventory.length - 1});
      } else {
        let newNum = this.state.selectedItem;
        newNum -= 1;
        this.setState({selectedItem: newNum});
      }
    }
  }

  render() {
    return (
      <ViroCamera position={[0, 0, 0]} active={this.props.isActive}>
        <TimerComponent
          time={this.props.time}
          updateTime={this.props.updateTime}
        />
        <ViroNode scale={[0.18, 0.1, 0.1]} position={[0.35, 0.8, -1.5]}>
          <ViroButton
            source={require('./res/firewood-clipart-20-original.png')}
            onClick={() => this.props.saveGame(this.props.uid, this.props.currentGame)}
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
            onClick={this.props.useHint}
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
          <ViroImage source={this.props.inventory[this.state.selectedItem].itemIMG} />
          {/* <ViroText text={this.props.inventory[this.state.selectedItem].name}/> */}
        </ViroNode>
        <ViroImage position={[.7, -1, -3]} scale={[.5,.5,.5]} source={require('./Inventory/images/icon_right.png')} onClick={() => {this.changeItem('right')}}/>
        <ViroImage position={[-.7, -1, -3]} scale={[.5,.5,.5]} source={require('./Inventory/images/icon_left.png')} onClick={() => {this.changeItem('left')}}/>

      </ViroCamera>
    );
  }
}

const mapStateToProps = state => ({
  currentGame: state.game,
  uid: state.user.uid,
});

const mapDispatchToProps = dispatch => {
  return {
    saveGame: (userID, updatedGame) => dispatch(saveGameThunk(userID, updatedGame)),
    useHint: () => dispatch(useHint()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomCamera);
