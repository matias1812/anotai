import { useState } from 'react';

const useAssistantRequest = () => {
  const [response, setResponse] = useState(null);

  const sendRequestToAssistant = async (requestData, updateMessages) => {
    try {
      let url = 'https://vltdnxfz-5000.brs.devtunnels.ms/analyze_audio';
      let requestOptions = {};

      if (requestData.audio) {
        const formData = new FormData();
        formData.append('audio', {
          uri: requestData.audio,
          name: 'recording.3gp',
          type: 'audio/3gp'
        });
        requestOptions = {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
      } else if (requestData.text) {
        requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: requestData.text }),
        };
        url = 'https://vltdnxfz-5000.brs.devtunnels.ms/analyze_audio';
      } else {
        throw new Error('Request data must contain "audio" or "text" field.');
      }

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Respuesta del asistente:', result);
      setResponse(result);
      updateMessages(requestData.text || requestData.audio, result.text);
    } catch (error) {
      console.error('Error al hacer la petición al asistente:', error);
      setResponse(null);
    }
  };

  return {
    response,
    sendRequestToAssistant,
  };
};

export default useAssistantRequest;