import React from 'react';
import { StyleSheet, KeyboardAvoidingView, TextInput } from 'react-native';

import firebase from 'firebase';
import { db } from '../../App';

import CircleButton from '../elements/CircleButton';

class MemoEditScreen extends React.Component {
  state = {
    body: '',
    key: '',
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    this.setState({
      body: params.memo.body,
      body2: params.memo.body,
      key: params.memo.key,
    });
  }

  handlePress() {
    const { currentUser } = firebase.auth();
    const newDate = new Date();
    const docRef = db.collection(`users/${currentUser.uid}/memos`).doc(this.state.key);
    // ReactNativeのバグ
    // https://github.com/facebook/react-native/issues/18403
    // WORKAROUND: bodyの代わりにbody2を使う
    docRef
      .update({
        body: this.state.body2,
        createdOn: newDate, // firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        this.setState({ body: this.state.body2 }); // WORKAROUND: bodyもここで更新しておく
        const { navigation } = this.props;
        navigation.state.params.returnMemo({
          body: this.state.body,
          key: this.state.key,
          createdOn: newDate,
        });
        navigation.goBack();
      })
      .catch((error) => {
        global.console.log(error);
      });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="height" keyboardVerticalOffset={80}>
        <TextInput
          style={styles.memoEditInput}
          multiline
          value={this.state.body}
          onChangeText={(text) => { this.setState({ body2: text }); }}
          underlineColorAndroid="transparent"
          textAlignVertical="top"
        />
        <CircleButton onPress={this.handlePress.bind(this)}>
          {'\uf00c'}
        </CircleButton>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  memoEditInput: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    fontSize: 16,
  },
});

export default MemoEditScreen;
