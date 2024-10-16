import { Device } from "@/lib/types";
function DeviceListItem({
  device,
  color = "blue",
}: {
  device: Device;
  color?: string;
  disabled?: boolean;
}) {
  return (
    <li
      key={`${device.ip}-${device.mac}`}
      className={`relative flex items-center p-5 bg-white rounded-lg shadow hover:bg-${color}-50 transition duration-300`}
    >
      <div className="relative">
        <div
          className={`animate-ping absolute w-5 h-5 rounded-full bg-${color}-100 opacity-50`}
        />
        <div
          className={`relative w-5 h-5 rounded-full shadow-inner mr-3 bg-${color}-100`}
        />
      </div>

      {/* デバイス名と編集ボタン */}
      <div className="flex items-center flex-1">
        <span className="font-medium text-gray-800 break-all">
          {device.name}
        </span>
      </div>
    </li>
  );
}

export default DeviceListItem;
