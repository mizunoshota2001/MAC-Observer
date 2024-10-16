import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), 'data', 'devices.json');

interface Device {
  mac: string;
  name: string;
}

function getDevices(): Device[] {
  try {
    const data = fs.readFileSync(dataDir, "utf-8");
    const devices: Device[] = JSON.parse(data);
    return devices.filter((device) => device.name !== "Unknown");
    } catch (error: unknown) {
    console.error("Error reading devices:", error);
    return [];
  }
}

function save(data: Device[]): void {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(path.dirname(dataDir), { recursive: true });
    fs.writeFileSync(dataDir, JSON.stringify([]), "utf-8");
  }
  fs.writeFileSync(dataDir, JSON.stringify(data, null, 2), "utf-8");
}

function upsert(device: Device): void {
  const saved = getDevices();
  const existingDeviceIndex = saved.findIndex((saved) => saved.mac === device.mac);

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
