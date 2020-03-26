'use strict';

import React, {Component} from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroMaterials,
  ViroBox,
  ViroNode,
  ViroImage,
  ViroSound,
  ViroText,
  ViroFlexView,
} from 'react-viro';
import HighScores from './HighScores';
import PuzzleColoredSquares from './PuzzleColoredSquares';


import RoomCamera from './roomCameraHUD';
import PuzzleSliding from './PuzzleSliding';
import Combo from './Combo';

function objIsEquivalent(a,b){
  const objAproperties = Object.getOwnPropertyNames(a);
  const objBproperties = Object.getOwnPropertyNames(b);

  if (objAproperties.length !== objBproperties.length) {
    return false;
  }

  for (let i = 0; i < objAproperties.length; i++) {
    let objAprop = objAproperties[i]

    if (a[objAprop] !== b[objAprop]) {
      return false;
    }
  }
  return true;
}


class Room extends Component {
  constructor() {
    super();
    this.state = {
      hudText: '',
      puzzle: false,
      visibleItems: {key: true, bucket: true, desk: true},
      inventory: [{name: 'Empty', imgURL: ''}],
      currGame: {},
    };

    this.doorInteract = this.doorInteract.bind(this);
    this.getItem = this.getItem.bind(this);
    this.showPuzzle = this.showPuzzle.bind(this);
    this.getCurrentGame = this.getCurrentGame.bind(this);
  }


  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (!objIsEquivalent(this.props.currentGame, prevProps.currentGame)) {
      // console.log('Here is the current props=', this.props.currentGame);
      // console.log('Here are the previous props', prevProps.currentGame);
      this.getCurrentGame();
      // console.log('Here is the State after get currentGame', this.state);
    }
  }


  getCurrentGame() {
    this.setState({currGame: this.props.currentGame});
  }

  doorInteract() {
    if (this.state.visibleItems.key) {
      this.setState({hudText: 'The door is locked! Find a key!'});
      setTimeout(() => this.setState({hudText: ''}), 4000);
    } else {
      this.setState({hudText: "You've escaped the room!"});
    }
  }

  getItem(passedObj, inventoryIMG, isCollectable, itemText = '') {
    // this.setState({
    //   keyPossessed: true,
    // });
    if(isCollectable) {
      let stateCopy = {...this.state.visibleItems}
      stateCopy[passedObj] = false;
      let updatedInventory = [...this.state.inventory]
      updatedInventory.unshift({name: passedObj, itemIMG: inventoryIMG});
      this.setState({visibleItems: stateCopy, inventory: updatedInventory})
    } else {
      this.setState({hudText: itemText});
      setTimeout(() => this.setState({hudText: ''}), 4000);
    }


  }

  showPuzzle() {
    const puzzleState = this.state.puzzle;
    this.setState({
      puzzle: !puzzleState,
    });
  }

  render() {
    // Initialize Objects
    let Key = <ViroBox height={.4} length={.4} width={.4} position={[4, 0, 0]} visible={this.state.visibleItems.key} onClick={() => this.getItem('key',require('../js/Inventory/images/key.png'), true)}/>
    let Desk = <ViroBox height={3} length={3} width={2} position={[-4,-3,0]} onClick={() => this.getItem('desk', 'noIMG', false, "A sturdy wooden desk.")} />


    return (
      <ViroNode position={[0, 0, -4.6]}>
        <RoomCamera
          isActive={this.props.entered}
          hudText={this.state.hudText}
          puzzle={this.state.puzzle}
          showPuzzle={this.showPuzzle}
          inventory={this.state.inventory}
        />

        <ViroBox
          position={[-4, 0, 0]}
          scale={[8, 7, 0.1]}
          materials={['cabinWall']}
          rotation={[0, 90, 0]}
        />
        <ViroBox
          position={[4, 0, 0]}
          scale={[8, 7, 0.1]}
          materials={['cabinWall']}
          rotation={[0, 90, 0]}
        />
        <ViroBox
          position={[0, 0, -4]}
          scale={[8, 7, 0.1]}
          materials={['cabinWall']}
        />
        <ViroBox
          position={[0, 0, 4]}
          scale={[8, 7, 0.1]}
          materials={['cabinWall']}
          visible={this.props.entered}
        />

        <ViroImage
          source={require('./res/cabindoor.jpg')}
          position={[0, -0.92, 3.48]}
          scale={[0.8, 3.2, 1]}
          rotation={[0, 180, 0]}
          visible={this.props.entered}
          onClick={this.doorInteract}
        />
        {/* {!!this.state.currGame.hintsLeft && (
          <ViroText
            text={`Hints = ${this.state.currGame.hintsLeft}`}
            scale={[0.5, 0.5, 0.5]}
            position={[0, 0, -1]}
          />
        )} */}
        {this.props.entered && (
          <ViroSound source={require('./sounds/doorlock.wav')} loop={false} />
        )}

        <ViroBox
          position={[0, 3.5, 0]}
          scale={[8, 0.1, 8]}
          materials={['cabinWall']}
        />
        <ViroBox
          position={[0, -3.6, 0]}
          scale={[8, 0.1, 8]}
          materials={['cabinFloor']}
        />
        {/* //Objects Here */}
        {Key}
        {Desk}


        <ViroFlexView
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          width={0.7}
          height={0.7}

          position={[-2, 0, 0]}
          rotation={[0, 90, 0]}
          backgroundColor="transparent">
          <PuzzleColoredSquares />
        </ViroFlexView>


        <PuzzleSliding />
        <Combo code={"2468"} getItem={this.getItem}/>
      </ViroNode>
    );
  }
}

export default Room;



ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg'),
  },
  cabinWall: {
    diffuseTexture: require('./res/cabin_wall_sample.jpg'),
  },
  cabinFloor: {
    diffuseTexture: require('./res/cabin_floor_sample.jpg'),
  },
});

module.exports = Room;
