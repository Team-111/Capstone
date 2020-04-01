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
  username: t.String,
  password: t.String,
});

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      options: {
        fields: {
          username: {
            error: 'Invalid username',
          },
          password: {
            secureTextEntry: true,
            error: 'Invalid password',
          },
        },
      },
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.convertUsername = this.convertUsername.bind(this);
  }

  async handleSubmit() {
    try {
      let {username, password} = this._form.getValue();
      if (!username.includes('@')) username = this.convertUsername(username);
      await auth.signInWithEmailAndPassword(username, password);
      this.props.exitViro();
    } catch (error) {
      this.setState({
        options: {
          fields: {
            username: {
              error: 'Invalid username',
            },
            password: {
              secureTextEntry: true,
              hasError: true,
              error: 'Invalid password',
            },
          },
        },
      })
    }
  }

  convertUsername(username) {
    return `${username}@team111EscapeRoom.com`;
  }

  render() {
    return (
      <View style={styles.otherStyle}>
      <View style={styles.container}>
        <Text style={styles.otherStyle}>Welcome back...</Text>
        <Form ref={c => this._form = c} type={login} options={this.state.options} />
        <Button title="submit" onPress={this.handleSubmit} style={styles.otherStyle}>
          Submit
        </Button>

        <View style={styles.separator} />

        <Button title="Back" onPress={this.props.exitViro} style={styles.otherStyle}>
          Back
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
  },
  separator: {
    marginVertical: 8,
  }
});

module.exports = Login;
