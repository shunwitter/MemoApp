import { ActivityIndicator, Text, View } from 'react-native';
import React from 'react';

const Loading = (props) => {
  const { text, isLoading } = props;
  if (!isLoading) { return null; }
  return (
    <View style={styles.container}>
      <View>
        <ActivityIndicator size="large" />
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.95)',
  },
  text: {
    fontSize: 16,
    marginTop: 40,
    marginBottom: 40,
  },
};

export default Loading;
