import { NavigationActions } from 'react-navigation';
import { StyleSheet, View, Text, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native';
import Expo from 'expo';
import React from 'react';
import firebase from 'firebase';

import Loading from '../elements/Loading';

class LoginScreen extends React.Component {
  state = {
    email: '',
    password: '',
    isLoading: true,
  }

  async componentDidMount() {
    const email = await Expo.SecureStore.getItemAsync('email');
    const password = await Expo.SecureStore.getItemAsync('password');
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ isLoading: false });
        this.navigateToHome();
      })
      .catch(() => {
        this.setState({ email: '', password: '', isLoading: false });
      });
  }

  navigateToHome() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  handleSubmit() {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        Expo.SecureStore.setItemAsync('email', this.state.email);
        Expo.SecureStore.setItemAsync('password', this.state.password);
        this.navigateToHome();
      })
      .catch(() => {
      });
  }

  handlePress() {
    this.props.navigation.navigate('Signup');
  }

  render() {
    return (
      <View style={styles.container}>
        <Loading text="ログイン中" isLoading={this.state.isLoading} />
        <Text style={styles.title}>
          ログイン
        </Text>
        <TextInput
          style={styles.input}
          value={this.state.email}
          onChangeText={(text) => { this.setState({ email: text }); }}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Email Address"
          underlineColorAndroid="transparent"
        />
        <TextInput
          style={styles.input}
          value={this.state.password}
          onChangeText={(text) => { this.setState({ password: text }); }}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Password"
          secureTextEntry
          underlineColorAndroid="transparent"
        />
        <TouchableHighlight style={styles.button} onPress={this.handleSubmit.bind(this)} underlayColor="#C70F66">
          <Text style={styles.buttonTitle}>ログインする</Text>
        </TouchableHighlight>

        <TouchableOpacity style={styles.signup} onPress={this.handlePress.bind(this)}>
          <Text style={styles.signupText}>メンバー登録する</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 24,
    backgroundColor: '#fff',
  },
  input: {
    backgroundColor: '#eee',
    height: 48,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 8,
  },
  title: {
    fontSize: 28,
    alignSelf: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#E31676',
    height: 48,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center',
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 18,
  },
  signup: {
    marginTop: 16,
    alignSelf: 'center',
  },
  signupText: {
    fontSize: 16,
  },
});

export default LoginScreen;
