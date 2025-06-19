#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>

// Unique ID for each LocaSense device (can be generated dynamically or stored in EEPROM)
#define DEVICE_ID "LOCA123456"

// BLE Service and Characteristic UUIDs
#define SERVICE_UUID        "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define CHARACTERISTIC_UUID "beb5483e-36e1-4688-b7f5-ea07361b26a8"

// Advertising interval in milliseconds (e.g., 1000ms = 1 second)
#define ADVERTISING_INTERVAL 1000

BLEServer* pServer = NULL;
BLEAdvertising* pAdvertising;

void startBLEAdvertising() {
  // Create BLE Device
  BLEDevice::init(DEVICE_ID);

  // Create BLE Server
  pServer = BLEDevice::createServer();

  // Create BLE Service
  BLEService *pService = pServer->createService(SERVICE_UUID);

  // Create BLE Characteristic
  BLECharacteristic *pCharacteristic = pService->createCharacteristic(
                                        CHARACTERISTIC_UUID,
                                        BLECharacteristic::PROPERTY_READ |
                                        BLECharacteristic::PROPERTY_NOTIFY
                                      );

  // Set value to the unique device ID
  pCharacteristic->setValue(DEVICE_ID);

  // Start the service
  pService->start();

  // Start advertising
  pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->setScanResponse(true);
  pAdvertising->setMinPreferred(0x06);  // For iOS compatibility
  pAdvertising->setMinPreferred(0x12);
  BLEDevice::startAdvertising();

  Serial.println("LocaSense BLE Advertising Started...");
}

void setup() {
  Serial.begin(115200);
  delay(1000);
  
  Serial.println("LocaSense Device Starting...");
  startBLEAdvertising();
}

void loop() {
  // For power efficiency, deep sleep can be implemented here with wake-up intervals
  delay(ADVERTISING_INTERVAL);
}
