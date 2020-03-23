'use strict';

import React, {Component} from 'react';

import {StyleSheet} from 'react-native';
import Room from './Room'
import RoomCamera from './roomCameraHUD'

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroAmbientLight,
  ViroPortal,
  ViroPortalScene,
  Viro3DObject,
  ViroBox,
  Text,
  TouchableHighlight,
  ViroImage,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: 'Initializing AR ...',
      entered: false
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this.enterPortal = this.enterPortal.bind(this);
    this.exitPortal = this.exitPortal.bind(this);
  }

  enterPortal() {
    this.setState({
      entered: true
    })
  }

  // Exit just exists for testing purposes, can probably delete in final code
  exitPortal() {
    this.setState({
      entered: false
    })
  }

  render() {
    // console.log('These are the props on HelloWorldAr', this.props);
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroAmbientLight color="#ffffff" intensity={200} />
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

          <Room entered={this.state.entered} />

        </ViroPortalScene>
        {/* <Viro360Image source={require("./portal_res/360_island.jpg")} /> */}
        <ViroText
          text={this.state.text}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
          style={styles.helloWorldTextStyle}
        />
        {/* <TouchableHighlight
          // style={localStyles.buttons}
          onPress={this.props.exitViro}
          underlayColor={'#68a0ff'}>
          <Text>Start</Text>
        </TouchableHighlight> */}
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

module.exports = HelloWorldSceneAR;
