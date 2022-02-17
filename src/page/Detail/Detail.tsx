import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { DetailProps } from '~/types/Navigation';

const Detail = ({ navigation }: DetailProps) => {
  return (
    <View style={styles.container}>
      <Text>Detail</Text>
      <Button title="Go back to Home" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
