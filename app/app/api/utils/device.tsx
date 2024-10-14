import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data/devices.json");

function getDevices(): { mac: any; name: any }[] {
  try {
    const data = fs.readFileSync(dataDir, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function save(data: any) {
  fs.writeFileSync(dataDir, JSON.stringify(data, null, 2), "utf-8");
}

function upsert(device: { mac: any; name: any }) {
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
