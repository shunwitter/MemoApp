import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, FlatList } from 'react-native';

class MemoList extends React.Component {
  renderMemo({ item }) {
    console.log(item);
    return (
      <TouchableHighlight onPress={() => { this.props.navigation.navigate('MemoDetail'); }}>
        <View style={styles.memoListItem}>
          <Text style={styles.memoTitle}>{item.body}</Text>
          <Text style={styles.memoDate}>2017/10/10</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.memoList}>
        <FlatList data={this.props.memoList} renderItem={this.renderMemo.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  memoList: {
    width: '100%',
    flex: 1,
  },
  memoListItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  memoTitle: {
    fontSize: 18,
    marginBottom: 4,
  },
  memoDate: {
    fontSize: 12,
    color: '#a2a2a2',
  },
});

export default MemoList;
