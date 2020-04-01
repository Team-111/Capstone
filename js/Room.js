'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PuzzleColoredSquares from './PuzzleColoredSquares';
import RoomCamera from './roomCameraHUD';
import PuzzleSliding from './PuzzleSliding';
import Combo from './Combo';
import Pallindrome from './Pallindrome';

import {
  ViroMaterials,
  ViroBox,
  ViroNode,
  ViroImage,
  ViroSound,
  Viro3DObject,
  ViroFlexView,
  ViroAmbientLight,
  ViroText,
  ViroQuad,
} from 'react-viro';

import {
  itemVisibleThunk,
  addToInventoryThunk,
  selectItemThunk,
  toggleLight,
} from '../store';

class Room extends Component {
  constructor() {
    super();
    this.state = {
      hudText: '',
      time: {
        min: 0,
        sec: 0,
      },
    };

    this.doorInteract = this.doorInteract.bind(this);
    this.getItem = this.getItem.bind(this);
  }

  doorInteract() {
    if (this.props.currentGame.visibleInRoom.key) {
      this.setState({hudText: 'The door is locked! Find a key!'});
      setTimeout(() => this.setState({hudText: ''}), 4000);
    } else {
      this.setState({hudText: "You've escaped the room!"});
    }
  }

  getItem(passedObj, inventoryIMG, isCollectable, itemText = '') {
    if (isCollectable) {
      this.props.visibleItems(passedObj);
      this.props.addToInventory({name: passedObj, itemIMG: inventoryIMG});
      //Sets the selectedItem Index to 0 whenever you get a new item
      this.props.selectItem(0);
    } else {
      this.setState({hudText: itemText});
      setTimeout(() => this.setState({hudText: ''}), 4000);
    }
  }

  render() {
    // Initialize Objects MAKE SURE AFTER INITIALIZING OBJECTS TO ADD THEM BELOW IN RETURN STATEMENT
    let Key = (
      <Viro3DObject
        source={require('../js/Objects/models/key/worn_key.obj')}
        resources={[
          require('./Objects/models/key/worn_key.mtl'),
          require('./Objects/models/key/t_worn_key.png'),
        ]}
        highAccuracyEvents={true}
        type="OBJ"
        position={[0, -3, -1]}
        visible={this.props.currentGame.visibleInRoom.key}
        onClick={() =>
          this.getItem('key', require('../js/Inventory/images/key.png'), true)
        }
        materials={['key']}
      />
    );


    let Cot = <Viro3DObject source={require('./Objects/models/cot/Old_bed.obj')} highAccuracyEvents={true} type="OBJ" position={[3,-3.5,1]} scale={[.015,.015,.015]} rotation={[0,90,0]} onClick={() => this.getItem('cot', 'noIMG', false, "An Old bed.")} materials={['cot']}/>

    const Desk = (
      <Viro3DObject
        source={require('./Objects/models/desk/desk.obj')}
        highAccuracyEvents={true}
        type="OBJ"
        position={[-4, -3, 0]}
        scale={[0.03, 0.03, 0.03]}
        rotation={[0, 90, 0]}
        onClick={() =>
          this.getItem('desk', 'noIMG', false, 'A sturdy wooden desk.')
        }
        materials={['desk']}
      />
    );

    const Knife = (
      <Viro3DObject
        source={require('./Objects/models/knife/knife.obj')}
        highAccuracyEvents={true}
        type="OBJ"
        position={[-3.1, -0.9, 0]}
        scale={[0.01, 0.01, 0.01]}
        rotation={[90, 110, 0]}
        onClick={() => this.getItem('knife', 'noIMG', false, 'A bloody knife')}
        materials={['knife']}
      />
    );

    return (
      <ViroNode position={[0, 0, -4.6]}>
        <RoomCamera
          isActive={this.props.entered}
          hudText={this.state.hudText}
        />

        <ViroQuad
          materials={['lightSwitch']}
          height={0.3}
          width={0.2}
          position={[0.8, 0, 3.48]}
          rotation={[0, 180, 0]}
          onClick={this.props.toggleLight}
        />
        {this.props.lightOn ? (
          <ViroAmbientLight color="#ffffff" />
        ) : (
          <ViroAmbientLight color="#00001a" intensity={50000} />
        )}

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

        <ViroQuad
          materials={['door']}
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
        {Cot}
        {Knife}

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

        <Pallindrome />
        <PuzzleSliding />
        <Combo code={this.props.currentGame.lockCombo} getItem={this.getItem} />
        
        {!this.props.lightOn && (
          <ViroText
            text={this.props.codeDigit}
            color="purple"
            style={{fontSize: 32}}
            position={[0, 3, -1]}
            rotation={[90, 0, 0]}
          />
        )}
      </ViroNode>
    );
  }
}

// export default Room;

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg'),
  },
  cabinWall: {
    diffuseTexture: require('./res/cabin_wall_sample.jpg'),
    lightingModel: 'Blinn',
  },
  cabinFloor: {
    diffuseTexture: require('./res/cabin_floor_sample.jpg'),
    lightingModel: 'Blinn',
  },
  desk: {
    diffuseTexture: require('./Objects/models/desk/desk_texture.png'),
    lightingModel: 'Blinn',
  },
  key: {
    diffuseTexture: require('./Objects/models/key/t_worn_key.png'),
    lightingModel: 'Blinn',
  },
  cot: {
    diffuseTexture: require('./Objects/models/cot/M_bed_BaseColor.png'),
    lightingModel: 'Blinn',
  },
  knife: {
    diffuseTexture: require('./Objects/models/knife/knife_D.jpg'),
    lightingModel: 'Blinn',
  },
  lightSwitch: {
    diffuseTexture: require('./res/lightswitch.png'),
  },
  door: {
    diffuseTexture: require('./res/cabindoor.jpg'),
    lightingModel: 'Blinn',
  }
});

const mapStateToProps = state => {
  return {
    currentGame: state.game,
    codeDigit: state.game.lockCombo[3],
    lightOn: state.game.lightOn,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    visibleItems: itemKey => dispatch(itemVisibleThunk(itemKey)),
    addToInventory: itemObj => dispatch(addToInventoryThunk(itemObj)),
    selectItem: selectInd => dispatch(selectItemThunk(selectInd)),
    toggleLight: () => dispatch(toggleLight()),
  };
};

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Room);
