import { StyleSheet, Text, View } from 'react-native';


export default function Home() {
  return (
    <View>
      <Text>hola mundo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});