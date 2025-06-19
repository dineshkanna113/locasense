import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export default function App() {
  const [deviceId, setDeviceId] = useState('');
  const [location, setLocation] = useState(null);

  const getLocation = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/get-location/${deviceId}`);
      setLocation(res.data);
    } catch (error) {
      setLocation(null);
      alert("Device not found");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LocaSense Tracker</Text>
      <TextInput
        placeholder="Enter Device ID"
        value={deviceId}
        onChangeText={setDeviceId}
        style={styles.input}
      />
      <Button title="Get Location" onPress={getLocation} />
      {location && (
        <View style={styles.result}>
          <Text>Latitude: {location.latitude}</Text>
          <Text>Longitude: {location.longitude}</Text>
          <Text>Time: {new Date(location.timestamp * 1000).toLocaleString()}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold' },
  input: { borderWidth: 1, padding: 10, marginVertical: 10 },
  result: { marginTop: 20 }
});
