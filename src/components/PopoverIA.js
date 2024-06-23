import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { IconSparkles } from '@tabler/icons-react-native'
import { useNavigation } from '@react-navigation/native';

export default function PopoverIa() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Asistent')}>
      <IconSparkles style={{color: '#000'}}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20, 
    right: 10, 
    borderRadius: 50,
    backgroundColor: '#fff',
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 16, 
    shadowColor: '#000',  
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
    elevation: 5, 
  },
});