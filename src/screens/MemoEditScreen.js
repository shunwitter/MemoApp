import React from 'react';
import { StyleSheet, KeyboardAvoidingView, TextInput } from 'react-native';

import firebase from 'firebase';

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
      key: params.memo.key,
    });
  }

  handlePress() {
    const db = firebase.firestore();
    db.settings({ timestampsInSnapshots: true });
    const { currentUser } = firebase.auth();
    // returnMemo に渡すので new Date() ではなくて firestore の Timestamp 型を直接使う
    const newDate = firebase.firestore.Timestamp.now();
    const docRef = db.collection(`users/${currentUser.uid}/memos`).doc(this.state.key);
    docRef
      .update({
        body: this.state.body,
        createdOn: newDate,
      })
      .then(() => {
        this.setState({ body: this.state.body }); // WORKAROUND: bodyもここで更新しておく
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
          onChangeText={(text) => { this.setState({ body: text }); }}
          underlineColorAndroid="transparent"
          textAlignVertical="top"
        />
        <CircleButton name="check" onPress={this.handlePress.bind(this)} />
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
