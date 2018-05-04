import { Text, View } from 'react-native';
import React from 'react';

const Loading = (props) => {
  const { text, isLoading } = props;
  if (!isLoading) { return null; }
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

const styles = {
  container: {
    position: 'absolute',
    top: 100,
    right: 40,
    left: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    borderRadius: 4,
    backgroundColor: '#fff',
    elevation: 3,
    shadowOpacity: 0.8,
    shadowRadius: 4,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: { width: 0, height: 4 },
  },
  text: {
    fontSize: 16,
    marginTop: 40,
    marginBottom: 40,
  },
};

export default Loading;
