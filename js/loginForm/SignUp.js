import React, {Component} from 'react';

import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  Button,
  PixelRatio,
  TouchableHighlight,
  Alert,
} from 'react-native';

import t from 'tcomb-form-native';
import {auth} from '../../server/db/firebase';

const Form = t.form.Form;

const Signup = t.struct({
  email: t.String,
  username: t.String,
  password: t.String,
});


export default class SignUp extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit() {
    try {
      const {email, password} = this._form.getValue();
      await auth.createUserWithEmailAndPassword(email, password);
      this.props.exitViro();
    } catch (error) {
      console.log('error', error);
    }
  }

  render() {
    return (
      <View>
        <Form ref={c => this._form = c} type={Signup} />
        <Button title="back" onPress={this.handleSubmit}>
          Submit
        </Button>
      </View>
    );
  }
}

module.exports = SignUp;
