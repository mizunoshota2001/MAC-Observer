interface Device {
  name: string;
  ip: string;
  mac: string;
  lastAccess: string;
  avatar: string;
}

interface Devices {
  known: Device[];
  unknown: Device[];
}
// exports
export type { Device, Devices };
