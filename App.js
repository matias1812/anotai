import { StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { IconArrowLeft } from '@tabler/icons-react-native'

import Home from './src/views/home';
import Nota from './src/views/nota';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Home" style={styles.container}>
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Nota')}>
                <Text style={styles.new}>+</Text>
              </TouchableOpacity>            
            ),
          })} 
        />
        <Stack.Screen 
          name="Nota" 
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <IconArrowLeft style={styles.back}/>
              </TouchableOpacity>            
            )
          })} 
          component={Nota} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
  },
  new: {
    fontSize: 30,
    marginRight: 10,
    tintColor: '#000'
  },
  back: {
    fontSize: 30,
    color: '#000',
    marginLeft: 10
  }
});