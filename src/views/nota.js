import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import PopoverIa from '../components/PopoverIA';

export default function Nota({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = useCallback(() => {
    // Handle save action here
    console.log('Title:', title);
    console.log('Description:', description);
    navigation.navigate('Home'); // Navigate back to Home after saving
  }, [navigation, title, description]);

  useEffect(() => {
    navigation.setParams({ handleSave });
  }, [navigation, handleSave]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter title"
        placeholderTextColor="#ccc"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.inputDescripcion}
        placeholder="Enter description"
        placeholderTextColor="#ccc"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <View style={styles.popover}>
        <PopoverIa/>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 40,
    color: '#fff'
  },
  inputDescripcion: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
    fontSize: 15,
    marginBottom: 15,
    color: '#fff'
  },
  popover: {
    width: '100%',
    marginTop: 450
  }

});