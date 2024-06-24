import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native-paper';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { IconMicrophone, IconPlayerPause, IconSend } from '@tabler/icons-react-native';
import useAudioRecorder from '../hooks/useAudioRecorder';
import useAssistantRequest from '../hooks/useAssistantRequest';
import { Audio } from 'expo-av';

const InputIa = ({ updateMessages }) => {
  const [text, setText] = useState("");
  const { recording, startRecording, stopRecording, audioUri } = useAudioRecorder();
  const { response, sendRequestToAssistant } = useAssistantRequest();
  const [sound, setSound] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    if (response?.audioUrl) {
      console.log('Playing audio from URL:', response.audioUrl);
      playAudio(response.audioUrl);
    }
  }, [response]);

  useEffect(() => {
    if (!recording && audioUri) {
      console.log('Audio URI disponible:', audioUri);
      handleSendAudio();
    }
  }, [recording, audioUri]);

  const playAudio = async (audioUrl) => {
    try {
      const absoluteUrl = `https://vltdnxfz-5000.brs.devtunnels.ms${audioUrl}`;
      const { sound } = await Audio.Sound.createAsync({ uri: absoluteUrl });
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.error('Error al reproducir el audio:', error);
    }
  };

  const handleSendText = () => {
    if (text.trim() !== "") {
      sendRequestToAssistant({ text }, updateMessages);
      setText("");
    }
  };

  const handleSendAudio = () => {
    if (audioUri) {
      console.log('Enviando audio al asistente:', audioUri);
      sendRequestToAssistant({ audio: audioUri }, updateMessages);
    }
  };

  const handleToggleRecording = async () => {
    if (!isRecording) {
      await startRecording();
      console.log('Grabación iniciada');
      setIsRecording(true);
    } else {
      await stopRecording();
      console.log('Grabación detenida');
      setIsRecording(false);
    }
  };

  const handleStopAudio = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }
  };

  const handleMicButtonPress = () => {
    if (isRecording) {
      handleToggleRecording();
    } else if (sound) {
      handleStopAudio();
    } else {
      handleToggleRecording();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={handleMicButtonPress} style={styles.iconButton}>
          {(isRecording || sound) ? (
            <IconPlayerPause size={24} color="black" />
          ) : (
            <IconMicrophone size={24} color="black" />
          )}
        </TouchableOpacity>
        <TextInput
          label="Ingresa tu petición"
          value={text}
          onChangeText={setText}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={text.trim() !== "" ? handleSendText : handleSendAudio}
          style={styles.iconButton}
        >
          <IconSend size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {    
  },
  input: {
    flex: 1,
    width: 330
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  iconButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default InputIa;