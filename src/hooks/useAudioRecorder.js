import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions';

const useAudioRecorder = () => {
  const [recording, setRecording] = useState(null);
  const [audioUri, setAudioUri] = useState(null);

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (status !== 'granted') {
      alert('Se requiere permiso para grabar audio');
    }
  };

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
    } catch (error) {
      console.error('Error al iniciar la grabación:', error);
    }
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setAudioUri(uri);
      setRecording(null);
    } catch (error) {
      console.error('Error al detener la grabación:', error);
    }
  };

  return {
    recording: !!recording,
    startRecording,
    stopRecording,
    audioUri,
  };
};

export default useAudioRecorder;