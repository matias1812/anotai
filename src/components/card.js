import React from 'react';
import { Card, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { IconDotsVertical } from '@tabler/icons-react-native';

export default function CardNota({ nota }) {
  return (
    <Card style={styles.container}>
      <Card.Content>
        <Card.Content style={styles.header}>
          <Text variant="titleLarge">{nota.title}</Text>
          <IconDotsVertical style={styles.options} />
        </Card.Content>
        <Card.Content style={styles.description}>
          <Text variant="bodyMedium">{nota.descripcion}</Text>
        </Card.Content>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 40,
    width: 380,
  },
  header: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  options: {
    color: '#fff',
    fontSize: 5,
  },
  description: {
    width: '100%',
    marginTop: 8,
    color: '#fff',
  },
});