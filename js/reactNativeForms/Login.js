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
        <Text style={styles.title}>Welcome back...</Text>
        <Form ref={c => this._form = c} type={login} options={this.state.options} />

          {/* <View style={styles.buttonContainer}>
            <TouchableHighlight
              title="submit"
              onPress={this.handleSubmit}
              style={styles.button}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableHighlight>

            <View style={styles.separator} />

            <TouchableHighlight
              title="Back"
              onPress={() => this.props.exitViro()}
              style={styles.button}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableHighlight>
          </View> */}
          <Button title="Login" onPress={()=>this.handleSubmit()} color= '#ff0000' style={styles.otherStyle}>
          Register
        </Button>

        <View style={styles.separator} />

        <Button title="Back" onPress={()=>this.props.exitViro()} color= '#ff0000' style={styles.otherStyle}>
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
    flex: 1,
    color: '#ff0000',
    backgroundColor: '#000000',
    textAlign: 'center',
    fontSize: 30,
    paddingTop: 10,
  },
  title: {
    color: '#ff0000',
    fontSize: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  separator: {
    marginVertical: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
  button: {
    height: 60,
    width: 120,
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#ff0000',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ae0000',
    borderTopColor: '#ff5555',
  },
});

module.exports = Login;
