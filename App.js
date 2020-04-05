/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import {decode, encode} from 'base-64';
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

import React, {Component} from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
  Button,
} from 'react-native';

import {connect} from 'react-redux';

import {ViroARSceneNavigator} from 'react-viro';
import {auth} from './server/db/firebase';
import InitialARScene from './js/HelloWorldSceneAR';

/*
 TODO: Insert your API key below
 */
var sharedProps = {
  apiKey: 'API_KEY_HERE',
};

// Sets the default scene you want for AR and VR
var InitialVRScene = require('./js/HighScores');
var SignUp = require('./js/reactNativeForms/SignUp');
var Login = require('./js/reactNativeForms/Login');
var Winner = require('./js/reactNativeForms/Winner');
var HowToPlay = require('./js/HowToPlay/howToPlay');

var UNSET = 'UNSET';
var SCORE_NAVIGATOR_TYPE = 'VR';
var LOGIN_NAVIGATOR_TYPE = 'LOGIN';
var SIGNUP_NAVIGATOR_TYPE = 'SIGNUP';
var AR_NAVIGATOR_TYPE = 'AR';
var WINNER_NAVIGATOR_TYPE = 'WINNER';
var HOWTOPLAY_NAVIGATOR_TYPE = 'HOW TO PLAY';

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
var defaultNavigatorType = UNSET;

class ViroSample extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType: defaultNavigatorType,
      sharedProps: sharedProps,
    };
    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._getARNavigator = this._getARNavigator.bind(this);
    this._getScoreNavigator = this._getScoreNavigator.bind(this);
    this._getSignUpNavigator = this._getSignUpNavigator.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(
      this,
    );
    this._getWinner = this._getWinner.bind(this);
    this._exitViro = this._exitViro.bind(this);
    this._getHowToPlayNavigator = this._getHowToPlayNavigator.bind(this);
  }

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    if (this.state.navigatorType === UNSET) {
      return this._getExperienceSelector();
    } else if (this.state.navigatorType === SCORE_NAVIGATOR_TYPE) {
      return this._getScoreNavigator();
    } else if (this.state.navigatorType === AR_NAVIGATOR_TYPE) {
      return this._getARNavigator();
    } else if (this.state.navigatorType === SIGNUP_NAVIGATOR_TYPE) {
      return this._getSignUpNavigator();
    } else if (this.state.navigatorType === LOGIN_NAVIGATOR_TYPE) {
      return this._getLoginNavigator();
    } else if (this.state.navigatorType === WINNER_NAVIGATOR_TYPE) {
      return this._getWinner();
    } else if (this.state.navigatorType === HOWTOPLAY_NAVIGATOR_TYPE){
      return this._getHowToPlayNavigator();
    }
  }

  // Presents the user with a choice of an AR or VR experience
  _getExperienceSelector() {
    //if (auth.currentUser) console.log('Auth=', auth.currentUser.uid);
    return (
      <View style={localStyles.outer}>
        <View style={localStyles.inner}>
          {/* {auth.currentUser ??
            <Text style={localStyles.titleText}>
              Welcome {`${auth.currentUser.email.split('@')[0]}`} to
            </Text>
          } */}
          <Text style={localStyles.titleText}>Escape the Room AR</Text>
          {auth.currentUser ? (
            <View>
              <TouchableHighlight
                style={localStyles.buttons}
                onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}
                underlayColor={'#68a0ff'}>
                <Text style={localStyles.buttonText}>Start</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={localStyles.buttons}
                onPress={this._getExperienceButtonOnPress(HOWTOPLAY_NAVIGATOR_TYPE)}
                underlayColor={'#68a0ff'}>
                <Text style={localStyles.buttonText}>How to play</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={localStyles.buttons}
                onPress={this._getExperienceButtonOnPress(SCORE_NAVIGATOR_TYPE)}
                underlayColor={'#68a0ff'}>
                <Text style={localStyles.buttonText}>Highscores</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={localStyles.buttons}
                onPress={async () => {
                  await auth.signOut();
                  this._exitViro();
                }}
                underlayColor={'#68a0ff'}>
                <Text style={localStyles.buttonText}>Log out</Text>
              </TouchableHighlight>
            </View>
          ) : (
            <View>
              <TouchableHighlight
                style={localStyles.buttons}
                onPress={this._getExperienceButtonOnPress(
                  SIGNUP_NAVIGATOR_TYPE,
                )}
                underlayColor={'#68a0ff'}>
                <Text style={localStyles.buttonText}>Sign up!</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={localStyles.buttons}
                onPress={this._getExperienceButtonOnPress(LOGIN_NAVIGATOR_TYPE)}
                underlayColor={'#68a0ff'}>
                <Text style={localStyles.buttonText}>Log In!</Text>
              </TouchableHighlight>
            </View>
          )}
        </View>
      </View>
    );
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() {
    // if (auth.currentUser) console.log('Auth=', auth.currentUser);
    return (
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
        }}>
        <ViroARSceneNavigator
          {...this.state.sharedProps}
          initialScene={{scene: InitialARScene}}
          viroAppProps={{user: auth.currentUser, exitViro: this._exitViro}}
        />
      </View>
    );
  }

  // Returns the ViroSceneNavigator which will start the VR experience
  _getScoreNavigator() {
    return (
      <InitialVRScene {...this.state.sharedProps} exitViro={this._exitViro} />
    );
  }

  _getLoginNavigator() {
    return <Login {...this.state.sharedProps} exitViro={this._exitViro} />;
  }

  _getSignUpNavigator() {
    return <SignUp {...this.state.sharedProps} exitViro={this._exitViro} />;
  }

  _getWinner() {
    return (<Winner {...this.state.sharedProps} exitViro={this._exitViro} />);
  }

  _getHowToPlayNavigator() {
    return <HowToPlay {...this.state.sharedProps} exitViro={this._exitViro} />;
  }

  // This function returns an anonymous/lambda function to be used
  // by the experience selector buttons
  _getExperienceButtonOnPress(navigatorType) {
    return () => {
      this.setState({
        navigatorType: navigatorType,
      });
    };
  }

  // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro(navType = UNSET) {
    if(navType === UNSET) {
      this.setState({
        navigatorType: UNSET,
      });
    } else if (navType === 'youWin') {
      this.setState({
        navigatorType: WINNER_NAVIGATOR_TYPE,
      })
    } else if (navType === 'highScores') {
      this.setState({
        navigatorType: SCORE_NAVIGATOR_TYPE,
      })
    }

  }
}

var localStyles = StyleSheet.create({
  viroContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  outer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: '#ff0000',
    textAlign: 'center',
    fontSize: 25,
    // fontFamily: 'CFNightofTerrorPERSONAL-Reg'
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
  buttons: {
    height: 80,
    width: 150,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#ff0000',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ae0000',
    borderTopColor: '#ff5555',
  },
  exitButton: {
    height: 50,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#000000',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000000',
  },
});

const mapStateToProps = state => {
  return {wow: 'cool'};
};

export default connect(mapStateToProps)(ViroSample);

// module.exports = ViroSample;
