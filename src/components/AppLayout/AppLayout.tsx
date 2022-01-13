import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
interface componentNameProps {
  data: string;
}

const componentName = (props: componentNameProps) => {
  return (
    <View style={styles.container}>
      <Text>{props.data}</Text>
    </View>
  );
};

export default componentName;

const styles = StyleSheet.create({
  container: {},
});
