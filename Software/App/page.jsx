'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { scanForBluetoothDevices } from "@/services/bluetooth";
import { BluetoothDevice } from "@/services/bluetooth";
import { estimateLocationConfidence } from "@/ai/flows/estimate-location-confidence";
import { Map } from "@/components/map";
import { toast } from "@/hooks/use-toast";

export default function Home() {
  const [userId, setUserId] = useState("");
  const [locationConfidence, setLocationConfidence] = useState<{ confidenceLevel: string; reason: string } | null>(null);
  const [rssi, setRssi] = useState<number | undefined>(undefined);
  const [isLost, setIsLost] = useState(false);
  const [bluetoothDevices, setBluetoothDevices] = useState<BluetoothDevice[]>([]);
  const [pairedDevice, setPairedDevice] = useState<BluetoothDevice | null>(null);
  const [thirdPartyDeviceId, setThirdPartyDeviceId] = useState<string | null>(null);
  const [thirdPartyLocation, setThirdPartyLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const handlePairDevice = async () => {
    const devices = await scanForBluetoothDevices();
    if (devices.length > 0) {
      // Assume the first device found is the one to pair with
      setPairedDevice(devices[0]);
      toast({
        title: "Device Paired",
        description: `Paired with device: ${devices[0].name}`,
      });
    } else {
      toast({
        title: "No Devices Found",
        description: "No Bluetooth devices found. Please try again.",
      });
    }
  };

  const handleSimulateLostItem = () => {
    setIsLost(true);
    if (pairedDevice) {
      // Simulate finding the device via a third party
      simulateThirdPartyLocation(pairedDevice.id);
      toast({
        title: "Alert!",
        description: "LocaSense device reports lost item. Attempting to locate via 3rd party...",
      });
    } else {
      toast({
        title: "No Paired Device",
        description: "Please pair a device before simulating a lost item.",
      });
    }
  };

  const simulateThirdPartyLocation = (deviceId: string) => {
    // Simulate a 3rd party Bluetooth device sending location data
    setThirdPartyDeviceId(deviceId);
    // Generate a random location
    setThirdPartyLocation({
      latitude: 34.0522 + Math.random() * 0.02,
      longitude: -118.2437 + Math.random() * 0.02,
    });
    toast({
      title: "Location Found (3rd Party)",
      description: `Location data received from 3rd party for device ${deviceId}`,
    });
  };

  const handleEstimateLocationConfidence = async () => {
    if (rssi === undefined) {
      toast({
        title: "Error!",
        description: "Please simulate a scan first.",
      });
      return;
    }

    const estimation = await estimateLocationConfidence({ rssi, deviceName: "LocaSense Device" });
    setLocationConfidence(estimation);
    toast({
      title: "Location Confidence Estimated",
      description: `Confidence Level: ${estimation.confidenceLevel}`,
    });
  };

  const handleSimulateScan = async () => {
    const devices = await scanForBluetoothDevices();
    setBluetoothDevices(devices);
    setRssi(devices[0]?.rssi);
    toast({
      title: "Bluetooth Scan Simulated",
      description: "Simulated Bluetooth scan completed.",
    });
  };

  useEffect(() => {
    // Generate a unique user ID if one doesn't exist in local storage
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      const newUserId = generateUserId();
      setUserId(newUserId);
      localStorage.setItem("user_id", newUserId);
    }
  }, []);

  // Function to generate a unique user ID
  const generateUserId = () => {
    return "user-" + Math.random().toString(36).substring(2, 15);
  };

  return (
    <SidebarProvider>
      <Sidebar className="w-64">
        <SidebarHeader>
          <h2 className="font-semibold text-lg">LocaFind</h2>
          <p className="text-sm text-muted-foreground">
            Your personal tracking solution.
          </p>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Label>User ID</Label>
                <Input
                  type="text"
                  value={userId}
                  disabled
                />
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handlePairDevice}>Pair Device</SidebarMenuButton>
            </SidebarMenuItem>
            {pairedDevice && (
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Label>Paired Device</Label>
                  <Input
                    type="text"
                    value={pairedDevice.name}
                    disabled
                  />
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleSimulateScan}>Simulate Scan</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleSimulateLostItem} disabled={!pairedDevice}>Simulate Lost Item</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleEstimateLocationConfidence} disabled={rssi === undefined}>
                Estimate Location Confidence
              </SidebarMenuButton>
            </SidebarMenuItem>
            {locationConfidence && (
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Label>Confidence Level</Label>
                  <Input
                    type="text"
                    value={locationConfidence.confidenceLevel}
                    disabled
                  />
                  <Label>Reason</Label>
                  <Textarea value={locationConfidence.reason} disabled />
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <p className="text-xs text-muted-foreground">
            Powered by Firebase Studio
          </p>
        </SidebarFooter>
      </Sidebar>
      <div className="flex-1 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Location Map</CardTitle>
            <CardDescription>Last known location of your item.</CardDescription>
          </CardHeader>
          <CardContent>
            <Map isLost={isLost} bluetoothDevices={bluetoothDevices} thirdPartyLocation={thirdPartyLocation} />
          </CardContent>
        </Card>
      </div>
    </SidebarProvider>
  );
}
