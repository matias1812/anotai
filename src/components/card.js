import { StyleSheet, Text, View } from 'react-native';


export default function Card() {
  return (
    <View>
      <Text>Card</Text>
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