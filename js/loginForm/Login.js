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
t.form.Form.stylesheet.textbox.normal.color = '#ff0000';
t.form.Form.stylesheet.textbox.normal.borderColor = '#ff0000';
t.form.Form.stylesheet.controlLabel.normal.color = '#ff0000';


const login = t.struct({
  email: t.String,
  password: t.String,
});


export default class Login extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit() {
    try {
      const {email, password} = this._form.getValue();
      await auth.signInWithEmailAndPassword(email, password);
      this.props.exitViro();
    } catch (error) {
      console.log('error', error);
    }
  }

  render() {
    return (
      <View style={styles.otherStyle}>
      <View style={styles.container}>
        <Text style={styles.otherStyle}>Welcome back...</Text>
        <Form ref={c => this._form = c} type={login} />
        <Button title="submit" onPress={this.handleSubmit} style={styles.otherStyle}>
          Submit
        </Button>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 400,
    padding: 20,
    backgroundColor: '#000000'
  },
  otherStyle: {
    color: '#ff0000',
    backgroundColor: '#000000',
    textAlign: 'center',
    fontSize: 30,
    paddingBottom: 10,
  }
});

module.exports = Login;
