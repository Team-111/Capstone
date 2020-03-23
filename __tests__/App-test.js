/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('react-native-firebase', () => {  return {    messaging: jest.fn(() => {      return {        hasPermission: jest.fn(() => Promise.resolve(true)),        subscribeToTopic: jest.fn(),        unsubscribeFromTopic: jest.fn(),        requestPermission: jest.fn(() => Promise.resolve(true)),        getToken: jest.fn(() => Promise.resolve('myMockToken'))      };    }),    notifications: jest.fn(() => {      return {        onNotification: jest.fn(),        onNotificationDisplayed: jest.fn()      };    })  };});

it('renders correctly', () => {
  renderer.create(<App />);
});
