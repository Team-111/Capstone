'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux'
import PuzzleColoredSquares from './PuzzleColoredSquares';
import RoomCamera from './roomCameraHUD';
import PuzzleSliding from './PuzzleSliding';
import Combo from './Combo';

import {
  ViroMaterials,
  ViroBox,
  ViroNode,
  ViroImage,
  ViroSound,
  ViroText,
  Viro3DObject,
  ViroFlexView,
  ViroAmbientLight,
} from 'react-viro';

class Room extends Component {
  constructor() {
    super();
    this.state = {
      hudText: '',
      puzzle: false,
      visibleItems: {key: true, bucket: true, desk: true},
      inventory: [{name: 'Empty', itemIMG: require('../js/Inventory/images/icon_close.png')}],
      currGame: {},
      time: {
        min: 0,
        sec: 0,
      },
    };

    this.doorInteract = this.doorInteract.bind(this);
    this.getItem = this.getItem.bind(this);
    this.updateTime = this.updateTime.bind(this);
  }

  updateTime(min, sec) {
    this.setState({
      time: {
        min,
        sec,
      },
    });
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
    if (isCollectable) {
      let stateCopy = {...this.state.visibleItems};
      stateCopy[passedObj] = false;
      let updatedInventory = [...this.state.inventory];
      updatedInventory.unshift({name: passedObj, itemIMG: inventoryIMG});
      this.setState({visibleItems: stateCopy, inventory: updatedInventory});
    } else {
      this.setState({hudText: itemText});
      setTimeout(() => this.setState({hudText: ''}), 4000);
    }
  }

  render() {
    // Initialize Objects MAKE SURE AFTER INITIALIZING OBJECTS TO ADD THEM BELOW IN RETURN STATEMENT
    const Key = (
      <Viro3DObject
        source={require('../js/Objects/models/key/worn_key.obj')}
        resources={[
          require('./Objects/models/key/worn_key.mtl'),
          require('./Objects/models/key/t_worn_key.png'),
        ]}
        highAccuracyEvents={true} type="OBJ" 
        position={[0, -3, -1]}
        visible={this.state.visibleItems.key} 
        onClick={() => this.getItem('key',require('../js/Inventory/images/key.png'), true)} 
        materials={['key']}
      />
    );

    const Desk = (
      <Viro3DObject
        source={require('./Objects/models/desk/desk.obj')}
        highAccuracyEvents={true}
        type="OBJ"
        position={[-4, -3, 0]}
        scale={[.03, .03, .03]}
        rotation={[0, 90, 0]}
        onClick={() => this.getItem('desk', 'noIMG', false, "A sturdy wooden desk.")}
        materials={['desk']}
      />
    );

    return (
      <ViroNode position={[0, 0, -4.6]}>
        <RoomCamera
          isActive={this.props.entered}
          hudText={this.state.hudText}
          inventory={this.state.inventory}
          updateTime={this.updateTime}
          time={this.state.time}
        />
        <ViroAmbientLight color="#ffffff" />
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
        <Combo code={this.props.currentGame.lockCombo} getItem={this.getItem}/>
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
  desk: {
    diffuseTexture: require('./Objects/models/desk/desk_texture.png')
  },
  key: {
    diffuseTexture: require('./Objects/models/key/t_worn_key.png')
  }
});

const mapStateToProps = state => ({
  currentGame: state.game,
});

module.exports = connect(mapStateToProps)(Room)
