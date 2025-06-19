/**
 * Represents a Bluetooth device.
 */
export interface BluetoothDevice {
  /**
   * The unique identifier of the Bluetooth device.
   */
  id: string;
  /**
   * The name of the Bluetooth device.
   */
  name: string;
  /**
   * The signal strength of the Bluetooth device.
   */
  rssi: number;
}

/**
 * Asynchronously scans for nearby Bluetooth devices.
 *
 * @returns A promise that resolves to an array of BluetoothDevice objects.
 */
export async function scanForBluetoothDevices(): Promise<BluetoothDevice[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      id: '12:34:56:78:90:AB',
      name: 'LocaSense Device',
      rssi: -60,
    },
  ];
}
