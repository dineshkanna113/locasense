import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDPO3GCCduL2T6ww669NsKGqTP-OCPTFlc",
  databaseURL: "https://locasense_dd.firebaseio.com",
  projectId: "studio-12565546",
  // ...rest from Firebase web config
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function App() {
  const [deviceId, setDeviceId] = useState("");
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!deviceId) return;
    const locRef = ref(database, 'devices/' + deviceId);
    onValue(locRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setLocation(data);
    });
  }, [deviceId]);

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="Enter Device ID"
        style={styles.input}
        value={deviceId}
        onChangeText={setDeviceId}
      />
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}>
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude
            }}
            title={`Device: ${deviceId}`}
            description={`Last updated: ${new Date(location.timestamp * 1000).toLocaleString()}`}
          />
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 10, marginTop: 50, marginHorizontal: 10,
    borderColor: 'gray', borderWidth: 1, borderRadius: 5
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 100
  }
});
