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

const Form = t.form.Form;

const Signup = t.struct({
  email: t.String,
  username: t.String,
  password: t.String
});


export default class SignUp extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit() {
    const newUser = this._form.getValue();
    this.props.exitViro()
  }
  render() {
    return(
      <View>
        <Form ref={c => this._form = c} type={Signup} />
        <Button title="back" onPress={this.handleSubmit}>Submit</Button>
      </View>

    )
  }
}

module.exports = SignUp;
