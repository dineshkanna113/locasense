# LocaSense – Intelligent Bluetooth Tracking System

LocaSense is a prototype of a low-energy Bluetooth-based personal tracking system designed to help users recover lost belongings in real-time. It uses a small ESP32-based device that broadcasts a unique ID when disconnected from the user. If another Bluetooth-enabled device detects it, the device's location is uploaded to a central server and relayed back to the owner's app.

## 🔍 Abstract

This project presents a prototype for LocaSense, a personal tracking system designed to aid users in recovering lost belongings. LocaSense utilizes Bluetooth technology to provide a simple and efficient solution for locating misplaced items. Each user pairs a small, low-power device with their account, which broadcasts a unique ID when triggered. When detected by another Bluetooth device, the lost item's location is sent to a server and shared with the original user.

## 🎯 Objectives

- Develop a working prototype using BLE
- Enable item tracking via central server
- Minimize power usage using ESP32 low-power modes
- Ensure data privacy and encryption
- Simulate real-world scenarios of item recovery

## 🔧 Tools & Technologies

- **Hardware**: ESP32, Bluetooth Low Energy (BLE)
- **Software**: Arduino IDE, Firebase/MQTT for backend (optional), React Native (for mobile app prototype)
- **Protocols**: BLE Advertising, GATT
- **Security**: Basic ID obfuscation

## 📚 Literature Survey

| YEAR | AUTHOR | KEY FEATURES | TOOLS USED / ALGORITHM | APPLICATION |
|------|--------|---------------|-------------------------|-------------|
| 2018 | M. S. Pan, C. H. Tsai, Y. C. Tseng | BLE for personnel tracking | BLE, RSSI | Indoor tracking |
| 2021 | S. S. Manvi, P. Venkatachala | BLE for asset tracking | BLE, Location tracking | Industrial tracking |
| 2022 | Bharath S. Prabakaran et al. | Anonymous secure tracking | IoT, Secure BLE | Smartphone tracking |

## ✅ Advantages over Existing System

- Automatic broadcasting and detection
- Server-based real-time updates
- Extended range via crowdsourced detection
- Improved data security and energy efficiency
- App notifications for instant recovery

## 📦 Folder Overview

| Folder | Purpose |
|--------|---------|
| `/hardware` | Schematics, ESP32 wiring diagrams |
| `/firmware` | Arduino BLE code for ESP32 |
| `/software` | Optional app/backend code |
| `/docs` | Report, literature survey |
| `/images` | Demo GIFs, diagrams |

## 📸 Demo

![Model](images/model.jpg)

## 👨‍🎓 Author

**Dinesh Kanna**  
B.E. Final Year Project  
Dept. of Electronics and Communication Engineering  
Adhiyamaan College of Engineering

---

