import fs from "fs";
import path from "path";
import { devicesJsonPath } from "./config";
interface Device {
  mac: string;
  name: string;
}

function getDevices(): Device[] {
  try {
    const data = fs.readFileSync(devicesJsonPath, "utf-8");
    const devices: Device[] = JSON.parse(data);
    return devices.filter((device) => device.name !== "Unknown");
  } catch (error: unknown) {
    console.error("Error reading devices:", error);
    return [];
  }
}

function save(data: Device[]): void {
  if (!fs.existsSync(devicesJsonPath)) {
    fs.mkdirSync(path.dirname(devicesJsonPath), { recursive: true });
    fs.writeFileSync(devicesJsonPath, JSON.stringify([]), "utf-8");
  }
  fs.writeFileSync(devicesJsonPath, JSON.stringify(data, null, 2), "utf-8");
}

function upsert(device: Device): void {
  const saved = getDevices();
  const existingDeviceIndex = saved.findIndex(
    (saved) => saved.mac === device.mac
  );

  if (existingDeviceIndex > -1) {
    saved[existingDeviceIndex] = {
      ...saved[existingDeviceIndex],
      ...device,
    };
  } else {
    saved.push(device);
  }
  save(saved);
}

export { getDevices, upsert };
