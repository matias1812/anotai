import {useState} from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { IconArrowLeft } from '@tabler/icons-react-native';
import { PaperProvider, MD3LightTheme, MD3DarkTheme, adaptNavigationTheme, Tooltip } from 'react-native-paper';

import Home from './src/views/home';
import Nota from './src/views/nota';
import Asistent from './src/views/asistent';


const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
  },
};

const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
  },
};

const Stack = createStackNavigator();

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home" 
            component={Home} 
            options={({ navigation }) => ({
              headerRight: () => (
                <Tooltip title="New">
                  <TouchableOpacity onPress={() => navigation.navigate('Nota')}>
                    <Text style={styles.new}>+</Text>
                  </TouchableOpacity>            
                </Tooltip>
              ),
            })} 
          />
          <Stack.Screen 
            name="Nota" 
            options={({ navigation }) => ({
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                  <IconArrowLeft style={styles.back} />
                </TouchableOpacity>            
              )
            })} 
            component={Nota} />
          <Stack.Screen 
            name="Asistent" 
            options={({ navigation }) => ({
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                  <IconArrowLeft style={styles.back} />
                </TouchableOpacity>            
              )
            })} 
            component={Asistent} />

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
  },
  new: {
    fontSize: 30,
    marginRight: 10,
    color: '#fff',
  },
  back: {
    fontSize: 30,
    color: '#fff',
    marginLeft: 10,
  }
});