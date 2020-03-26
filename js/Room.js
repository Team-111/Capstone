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
import BaseItem from '../js/Objects/baseItem'



import RoomCamera from './roomCameraHUD';

class Room extends Component {
  constructor() {
    super();
    this.state = {
      hudText: '',
      puzzle: false,
      visibleItems: {key: true},
      inventory: ['Empty']
    };

    this.doorInteract = this.doorInteract.bind(this);
    this.getItem = this.getItem.bind(this);
    this.showPuzzle = this.showPuzzle.bind(this);
  }

  doorInteract() {
    if (this.state.visibleItems.key) {
      this.setState({hudText: 'The door is locked! Find a key!'});
      setTimeout(() => this.setState({hudText: ''}), 4000);
    } else {
      this.setState({hudText: "You've escaped the room!"});
    }
  }

  getItem(passedObj, inventoryIMG) {
    // this.setState({
    //   keyPossessed: true,
    // });
    let stateCopy = {...this.state.visibleItems}
    stateCopy[passedObj] = false;
    let updatedInventory = [...this.state.inventory]
    updatedInventory.unshift(passedObj);
    this.setState({visibleItems: stateCopy, inventory: updatedInventory})

  }

  showPuzzle() {
    const puzzleState = this.state.puzzle;
    this.setState({
      puzzle: !puzzleState,
    });
  }

  render() {
    // Initialize Objects
    let Key = new BaseItem('key', 'a small key', <ViroBox height={.4} length={.4} width={.4} position={[0, 0, -4]} visible={this.state.visibleItems.key} onClick={() => this.getItem('key', 'placeholder')}/>, true)


    return (
      <ViroNode position={[0, 0, -4.6]}>
        <RoomCamera
          isActive={this.props.entered}
          hudText={this.state.hudText}
          puzzle={this.state.puzzle}
          showPuzzle={this.showPuzzle}
          inventory={this.state.inventory[0]}
        />

        <ViroBox position={[-4, 0, 0]} scale={[8, 7, .1]} materials={["cabinWall"]} rotation={[0, 90, 0]} />
        <ViroBox position={[4, 0, 0]} scale={[8, 7, .1]} materials={["cabinWall"]} rotation={[0, 90, 0]} />
        <ViroBox position={[0, 0, -4]} scale={[8, 7, .1]} materials={["cabinWall"]} />
        <ViroBox position={[0, 0, 4]} scale={[8, 7, .1]} materials={["cabinWall"]} visible={this.props.entered} />
        <ViroImage
          source={require('./res/cabindoor.jpg')}
          position={[0, -0.92, 3.48]}
          scale={[0.8, 3.2, 1]}
          rotation={[0, 180, 0]}
          visible={this.props.entered}
          onClick={this.doorInteract}
        />

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
        {Key.mesh}


        <ViroFlexView
          style={{flexDirection: "column", justifyContent: "center", alignItems: "center"}}
          width={.7}
          height={.7}
          position={[-2, 0, 0]}
          rotation={[0,90,0]}
          backgroundColor="transparent"
        >
          <PuzzleColoredSquares />
        </ViroFlexView>

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
