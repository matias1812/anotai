import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { IconArrowLeft } from '@tabler/icons-react-native';
import { PaperProvider, MD3LightTheme, MD3DarkTheme, adaptNavigationTheme, Tooltip } from 'react-native-paper';

import Home from './src/views/home';
import Nota from './src/views/nota';
import Assistant from './src/views/assistant';

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
            component={Nota} 
            options={({ navigation, route }) => ({
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                  <IconArrowLeft style={styles.back} />
                </TouchableOpacity>            
              ),
              headerRight: () => (
                <TouchableOpacity onPress={() => route.params?.handleSave()}>
                  <Text style={styles.save}>Save</Text>
                </TouchableOpacity>
              ),
            })} 
          />
          <Stack.Screen 
            name="Assistant" 
            component={Assistant}
            options={({ navigation }) => ({
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                  <IconArrowLeft style={styles.back} />
                </TouchableOpacity>            
              ),
            })} 
          />
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
  },
  save: {
    fontSize: 18,
    marginRight: 10,
    color: '#fff',
  },
});