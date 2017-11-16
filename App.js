import { StackNavigator } from 'react-navigation';
import firebase from 'firebase';

import MemoListScreen from './src/screens/MemoListScreen';
import MemoDetailScreen from './src/screens/MemoDetailScreen';
import MemoEditScreen from './src/screens/MemoEditScreen';
import MemoCreateScreen from './src/screens/MemoCreateScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';

// eslint-disable-next-line
require("firebase/firestore");

const config = {
  apiKey: 'AIzaSyCkwklsfDsKA8vd5Cn2pwHZZLcBLPIg8Pg',
  authDomain: 'memoapp-ec175.firebaseapp.com',
  databaseURL: 'https://memoapp-ec175.firebaseio.com',
  projectId: 'memoapp-ec175',
  storageBucket: 'memoapp-ec175.appspot.com',
  messagingSenderId: '954272588142',
};
firebase.initializeApp(config);

const App = StackNavigator({
  Login:      { screen: LoginScreen },
  Signup:     { screen: SignupScreen },
  Home:       { screen: MemoListScreen },
  MemoDetail: { screen: MemoDetailScreen },
  MemoEdit:   { screen: MemoEditScreen },
  MemoCreate: { screen: MemoCreateScreen },
}, {
  navigationOptions: {
    headerTitle: 'Memot',
    headerTintColor: '#fff',
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: '#265366',
    },
    headerTitleStyle: {
      color: '#fff',
    },
  },
});

export default App;
