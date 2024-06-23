import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CardNota from '../components/card';
import PopoverIa from '../components/PopoverIA';

export default function Home() {
  const [notas, setNotas] = useState([]);

  useEffect(() => {
    fetch('https://apimocha.com/anotai/notas')
      .then(response => response.json())
      .then(data => setNotas(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <View style={styles.container}>
      {notas.map(nota => (
        <CardNota key={nota.id} nota={nota} />
      ))}
      <View style={styles.popover}>
        <PopoverIa/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  popover: {
    width: '100%',
    marginTop: 350
  }
});