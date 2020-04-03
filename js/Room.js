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
  ViroSound,
  Viro3DObject,
  ViroFlexView,
  ViroAmbientLight,
  ViroOmniLight,
  ViroSpotLight,
  ViroText,
  ViroQuad,
} from 'react-viro';

import {
  itemVisibleThunk,
  addToInventoryThunk,
  selectItemThunk,
  toggleLight,
  saveGameThunk,
  toggleChainsThunk,
} from '../store';

class Room extends Component {
  constructor() {
    super();
    this.state = {
      hudText: '',
      investigateObjDisplay: false,
      shownObject: 'newspaper',
      interval: () => {},
    };

    this.doorInteract = this.doorInteract.bind(this);
    this.skullInteract = this.skullInteract.bind(this);
    this.chainedLegsInteract = this.chainedLegsInteract.bind(this);
    this.getItem = this.getItem.bind(this);
    this.putItemAway = this.putItemAway.bind(this);
    this.endGameProcessing = this.endGameProcessing.bind(this);
  }
  componentDidMount = () => {
    this.setState({interval: setInterval(() => this.flickerLights(), 60000)});
  };
  componentWillUnmount = () => {
    clearInterval(this.state.interval);
  }
  flickerLights() {
    this.props.toggleLight();
    setTimeout(this.props.toggleLight, 100);
    setTimeout(this.props.toggleLight, 300);
    setTimeout(this.props.toggleLight, 50);
  }

  doorInteract() {
    //change to check curr selected inventory item
    if (
      !this.props.currentGame.legsBound &&
      this.props.currentGame.puzzles.combo.complete
    ) {
      this.props.gameOver();
      setTimeout(this.endGameProcessing, 5000);
    } else {
      this.setState({hudText: 'Enter the combo'});
      setTimeout(() => this.setState({hudText: ''}), 4000);
    }
  }

  skullInteract() {
    //change to check curr selected inventory item
    if (
      this.props.currentGame.inventory[
        this.props.currentGame.selectedItemIndex
      ] === 'spoon'
    ) {
      this.props.visibleItems('skull');
    } else {
      this.setState({hudText: 'A Skull.'});
      setTimeout(() => this.setState({hudText: ''}), 4000);
    }
  }

  chainedLegsInteract() {
    if (this.props.currentGame.legsBound) {
      if (
        this.props.currentGame.inventory[
          this.props.currentGame.selectedItemIndex
        ] === 'key'
      ) {
        this.setState({hudText: 'Yes! My legs are free!'});
        this.props.toggleChains();
        setTimeout(() => this.setState({hudText: ''}), 4000);
      } else {
        this.setState({hudText: "I'll need a key to free my legs..."});
        setTimeout(() => this.setState({hudText: ''}), 4000);
      }
    } else {
      this.setState({
        hudText: 'I could just walk out! If I knew the door combo...',
      });
      setTimeout(() => this.setState({hudText: ''}), 4000);
    }
  }

  getItem(passedObj, isCollectable, itemText = '', hudPopup = false) {
    if (isCollectable) {
      this.props.visibleItems(passedObj);
      this.props.addToInventory(passedObj);
      //Sets the selectedItem Index to 0 whenever you get a new item
      this.props.selectItem(0);
    } else if (hudPopup) {
      //set state to value
      this.setState({shownObject: passedObj, investigateObjDisplay: true});
    } else {
      this.setState({hudText: itemText});
      setTimeout(() => this.setState({hudText: ''}), 4000);
    }
  }

  putItemAway() {
    this.setState({investigateObjDisplay: false});
  }

  endGameProcessing() {
    this.props.exitViro('youWin');
    this.props.saveGame(this.props.uid, {});
  }

  render() {
    // Initialize Objects MAKE SURE AFTER INITIALIZING OBJECTS TO ADD THEM BELOW IN RETURN STATEMENT
    // let Legs = (<ViroBox height = {1.4} width={.2} length={.2} position={[0,-1,0]}  visible={this.props.entered} onClick={this.chainedLegsInteract}/>)
    const Legs = (
      <Viro3DObject
        source={require('./Objects/models/ARoomModels/legs.obj')}
        resources={[
          require('./Objects/models/ARoomModels/legTextureSmall.png'),
        ]}
        highAccuracyEvents={true}
        type="OBJ"
        position={[0, -3, -0.1]}
        visible={this.props.entered}
        scale={[0.3, 0.3, 0.3]}
        materials={['legs']}
        onClick={this.chainedLegsInteract}
      />
    );

    const Chains = (
      <Viro3DObject
        source={require('./Objects/models/ARoomModels/chains.obj')}
        highAccuracyEvents={true}
        type="OBJ"
        position={[0, -3, -0.1]}
        visible={this.props.entered && this.props.currentGame.legsBound}
        scale={[0.3, 0.3, 0.3]}
        materials={['chains']}
        onClick={this.chainedLegsInteract}
      />
    );

    const Newspaper = (
      <Viro3DObject
        source={require('./Objects/models/ARoomModels/newspaper.obj')}
        type="OBJ"
        materials={['newspaper']}
        position={[-3.4, -1.5, 1]}
        scale={[0.09, 0.09, 0.09]}
        onClick={() => this.getItem('newspaper', false, '', true)}
      />
    );

    const Spoon = (
      <Viro3DObject
        source={require('../js/Objects/models/ARoomModels/spoonLowPoly.obj')}
        type="OBJ"
        position={[-2, -3, 3]}
        rotation={[90, 0, 90]}
        scale={[0.006, 0.006, 0.006]}
        visible={this.props.currentGame.visibleInRoom.spoon}
        materials={['spoon']}
        onClick={() => this.getItem('spoon', true)}
      />
    );

    let Key = (
      <Viro3DObject
        source={require('../js/Objects/models/key/worn_key.obj')}
        resources={[
          require('./Objects/models/key/worn_key.mtl'),
          require('./Objects/models/key/t_worn_key.png'),
        ]}
        type="OBJ"
        position={[2.5, -1.9, 1]}
        scale={[0.8, 0.8, 0.8]}
        visible={this.props.currentGame.visibleInRoom.key && !this.props.currentGame.visibleInRoom.skull}
        onClick={() => this.getItem('key', true)}
        materials={['key']}
      />
    );

    let Cot = (
      <Viro3DObject
        source={require('./Objects/models/cot/Old_bed.obj')}
        highAccuracyEvents={true}
        type="OBJ"
        position={[3, -3.5, 1]}
        scale={[0.015, 0.015, 0.015]}
        rotation={[0, 90, 0]}
        onClick={() => this.getItem('cot', false, 'An Old bed.')}
        materials={['cot']}
      />
    );

    const Desk = (
      <Viro3DObject
        source={require('./Objects/models/desk/desk.obj')}
        highAccuracyEvents={true}
        type="OBJ"
        position={[-4, -3, 0]}
        scale={[0.03, 0.03, 0.03]}
        rotation={[0, 90, 0]}
        onClick={() => this.getItem('desk', false, 'A sturdy wooden desk.')}
        materials={['desk']}
      />
    );

    const Knife = (
      <Viro3DObject
        source={require('./Objects/models/knife/knife.obj')}
        type="OBJ"
        position={[-3.1, -0.9, 0]}
        scale={[0.01, 0.01, 0.01]}
        rotation={[90, 110, 0]}
        onClick={() => this.getItem('knife', false, 'A bloody knife')}
        materials={['knife']}
      />
    );

    const Skull = (
      <Viro3DObject
        source={require('./Objects/models/skull/12140_Skull_v3_L2.obj')}
        type="OBJ"
        position={[2.5, -1.9, 1]}
        scale={[0.017, 0.017, 0.017]}
        rotation={[260, 230, -10]}
        materials={['skull']}
        visible={this.props.currentGame.visibleInRoom.skull}
        onClick={this.skullInteract}
      />
    );

    const Grenade = (
      <Viro3DObject
        source={require('./Objects/models/Grenade/MK2.obj')}
        highAccuracyEvents={true}
        type="OBJ"
        position={[-3, -3, -1.5]}
        scale={[0.05, 0.05, 0.05]}
        rotation={[0, 20, 270]}
        materials={['grenade']}
        visible={this.props.currentGame.visibleInRoom.grenade}
        onClick={() => this.getItem('grenade', true)}
      />
    );

    return (
      <ViroNode position={[0, 0, -4.6]}>
        <RoomCamera
          isActive={this.props.entered}
          hudText={this.state.hudText}
          exitViro={this.props.exitViro}
          shownObject={this.state.shownObject}
          objectDisplay={this.state.investigateObjDisplay}
          putItemAway={this.putItemAway}
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
          <ViroSpotLight
            position={[0, 3.4, 0]}
            color="#ffffff"
            direction={[0, -1, 0]}
            attenuationStartDistance={5}
            attenuationEndDistance={10}
            innerAngle={20}
            outerAngle={100}
            castsShadow={true}
            lightInfluenceBitMask={2}
          />
        ) : (
          // <ViroAmbientLight color="#191520" intensity={50000} />
          <ViroOmniLight color="#191520" position={[0, 3, 0]} attenuationStartDistance={1} attenuationEndDistance={5}/>
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
          // This needs to be clickable even when invisible to make the zombie disappear,
          // so instead of using the visibility prop the quad can be turned invisible
          // by rotating 180 degrees
          rotation={!this.props.endGame ? [0, 180, 0] : [0, 0, 0]}
          onClick={
            !this.props.endGame ? this.doorInteract : this.props.zombieClick
          }
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
        {/* {Key} */}
        {Legs}
        {Chains}
        {Desk}
        {Cot}
        {Knife}
        {Skull}
        {Newspaper}
        {Spoon}
        {Key}
        {Grenade}

        {this.props.isLoaded && (
          <ViroNode shadowCastingBitMask={2}>
            <PuzzleColoredSquares />
            <Pallindrome getItem={this.getItem} />
            <PuzzleSliding />
            {!this.props.endGame && (
              <Combo
                code={this.props.currentGame.lockCombo}
                getItem={this.getItem}
              />
            )}
          </ViroNode>
        )}

        {!this.props.lightOn && (
          <ViroText
            text={this.props.codeDigit}
            color="purple"
            style={{fontSize: 32}}
            position={[0, 3, -1]}
            rotation={[90, 0, 0]}
            shadowCastingBitMask={2}
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
  },
  skull: {
    diffuseTexture: require('./Objects/models/skull/Skull.jpg'),
    lightingModel: 'Blinn',
  },
  grenade: {
    diffuseTexture: require('./Objects/models/Grenade/PBR_MK2_Base_Color.png'),
    metalnessTexture: require('./Objects/models/Grenade/PBR_MK2_Metallic.png'),
    normalTexture: require('./Objects/models/Grenade/PBR_MK2_Normal_DirectX.png'),
    roughnessTexture: require('./Objects/models/Grenade/PBR_MK2_Roughness.png'),
    lightingModel: 'Blinn',
  },
  legs: {
    diffuseTexture: require('./Objects/models/ARoomModels/legTextureSmall.png'),
    lightingModel: 'Blinn',
  },
  chains: {
    diffuseTexture: require('./Objects/models/ARoomModels/chains.jpg'),
    lightingModel: 'Blinn',
  },
  spoon: {
    diffuseTexture: require('./Objects/models/ARoomModels/spoondiffuse.png'),
    lightingModel: 'Blinn',
  },
  newspaper: {
    diffuseTexture: require('./Objects/models/ARoomModels/newspaper.png'),
    lightingModel: 'Blinn',
  },
});

const mapStateToProps = state => {
  return {
    currentGame: state.game,
    isLoaded: state.game.isLoaded,
    codeDigit: state.game.lockCombo[3],
    lightOn: state.game.lightOn,
    uid: state.user.uid,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    visibleItems: itemKey => dispatch(itemVisibleThunk(itemKey)),
    addToInventory: itemObj => dispatch(addToInventoryThunk(itemObj)),
    selectItem: selectInd => dispatch(selectItemThunk(selectInd)),
    toggleLight: () => dispatch(toggleLight()),
    toggleChains: () => dispatch(toggleChainsThunk()),
    saveGame: (userId, gameState) => dispatch(saveGameThunk(userId, gameState)),
  };
};

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Room);
