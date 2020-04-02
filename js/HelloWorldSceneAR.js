'use strict';

import React, {Component} from 'react';

import {StyleSheet, TouchableHighlightBase} from 'react-native';
import Room from './Room';
import {connect} from 'react-redux';
import {getSingleGame, updateGame} from '../server/api/games';
import {fetchGame, setUser, secretCode} from '../store';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroSound,
  ViroPortal,
  ViroPortalScene,
  Viro3DObject,
} from 'react-viro';

class HelloWorldSceneAR extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: 'Initializing AR ...',
      entered: false,
      endGame: false,
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this.enterPortal = this.enterPortal.bind(this);
    this.exitPortal = this.exitPortal.bind(this);
    this.gameOver = this.gameOver.bind(this);
  }

  async componentDidMount() {
    const currentUser = this.props.arSceneNavigator.viroAppProps.user;

    this.props.getGame(currentUser.uid);
    this.props.setUser(currentUser.uid, currentUser.email);
  }

  enterPortal() {
    this.setState({
      entered: true,
    });
  }

  // Exit just exists for testing purposes, can probably delete in final code
  exitPortal() {
    this.setState({
      entered: false,
    });
  }

  gameOver() {
    this.setState({endGame: true});
  }

  render() {
    const exitViro = this.props.arSceneNavigator.viroAppProps.exitViro;
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroText
          text={this.state.text}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
          style={styles.helloWorldTextStyle}
        />

        <Viro3DObject
          source={require('./Objects/models/zombie/zombie.obj')}
          position={[0, -3.5, 0.5]}
          rotation={[0, 180, 0]}
          scale={[2, 2, 2]}
          resources={[
            require('./Objects/models/zombie/temp_skin_21411_140723359993168_914921521.fbm/Zombi_Body_diffuse.png'),
            require('./Objects/models/zombie/temp_skin_21411_140723359993168_914921521.fbm/Zombi_Body_gloss.png'),
            require('./Objects/models/zombie/temp_skin_21411_140723359993168_914921521.fbm/Zombi_Body_normal.png'),
            require('./Objects/models/zombie/temp_skin_21411_140723359993168_914921521.fbm/Zombi_Body_specular.png'),
            require('./Objects/models/zombie/temp_skin_21411_140723359993168_914921521.fbm/Zombi_Bottom_diffuse.png'),
            require('./Objects/models/zombie/temp_skin_21411_140723359993168_914921521.fbm/Zombi_Bottom_gloss.png'),
            require('./Objects/models/zombie/temp_skin_21411_140723359993168_914921521.fbm/Zombi_Bottom_normal.png'),
            require('./Objects/models/zombie/temp_skin_21411_140723359993168_914921521.fbm/Zombi_Bottom_specular.png'),
            require('./Objects/models/zombie/temp_skin_21411_140723359993168_914921521.fbm/Zombi_Top_diffuse.png'),
          ]}
          highAccuracyEvents={true}
          type="OBJ"
          visible={this.state.endGame}
        />

        {this.state.endGame && (
          <ViroSound
            source={require('./sounds/zombie_groan.mp3')}
            loop={false}
          />
        )}

        {/* <ViroAmbientLight color="#ffffff" intensity={200} /> */}
        <ViroPortalScene
          passable={true}
          dragType="FixedDistance"
          onPortalEnter={this.enterPortal}
          onPortalExit={this.exitPortal}
          onDrag={() => {}}>
          <ViroPortal position={[0, -1, -1.1]} scale={[0.7, 1.4, 0.08]}>
            <Viro3DObject
              source={require('./ARportal/portal_wood_frame/portal_wood_frame.vrx')}
              resources={[
                require('./ARportal/portal_wood_frame/portal_wood_frame_diffuse.png'),
                require('./ARportal/portal_wood_frame/portal_wood_frame_normal.png'),
                require('./ARportal/portal_wood_frame/portal_wood_frame_specular.png'),
              ]}
              type="VRX"
            />
          </ViroPortal>
          <Room
            entered={this.state.entered}
            exitViro={exitViro}
            endGame={this.state.endGame}
            gameOver={this.gameOver}
          />
        </ViroPortalScene>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state === ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: '',
      });
    } else if (state === ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

const mapStateToProps = state => ({
  currentGame: state.game,
  lockCombo: state.code,
});

const mapDispatchToProps = dispatch => {
  return {
    getGame: userID => dispatch(fetchGame(userID)),
    setUser: (uid, name) => dispatch(setUser(uid, name)),
    secretCode: code => dispatch(secretCode(code)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HelloWorldSceneAR);
